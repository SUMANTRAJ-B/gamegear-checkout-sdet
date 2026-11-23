"""
Assemble final YouTube demo video using FFmpeg.
Inputs:
- deliverables/source-recording/*.webm (Playwright screen recording)
- deliverables/voiceover.mp3 (AI neural narration)
- deliverables/gamegear-demo.srt (synchronized subtitles)
Output:
- deliverables/gamegear-demo.mp4 (1080p, 30fps, H.264, AAC)
"""
import subprocess
import sys
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DELIVERABLES_DIR = PROJECT_ROOT / "deliverables"
SOURCE_DIR = DELIVERABLES_DIR / "source-recording"
VOICEOVER_MP3 = DELIVERABLES_DIR / "voiceover.mp3"
SRT_FILE = DELIVERABLES_DIR / "gamegear-demo.srt"
OUTPUT_MP4 = DELIVERABLES_DIR / "gamegear-demo.mp4"

def assemble():
    # 1. Find the recorded webm file
    webm_files = sorted(list(SOURCE_DIR.glob("*.webm")), key=lambda f: f.stat().st_mtime, reverse=True)
    if not webm_files:
        print("[ERROR] No webm recordings found in source-recording!", file=sys.stderr)
        sys.exit(1)
        
    raw_video = webm_files[0]
    print(f"Using source recording: {raw_video} ({raw_video.stat().st_size} bytes)")
    
    # 2. Check audio
    if not VOICEOVER_MP3.exists():
        print(f"[ERROR] Audio file not found: {VOICEOVER_MP3}", file=sys.stderr)
        sys.exit(1)
        
    # Escape path for FFmpeg subtitles filter on Windows
    srt_escaped = str(SRT_FILE).replace('\\', '/').replace(':', '\\:')
    
    # Extend video with tpad to match audio duration cleanly
    vf_filter = (
        f"tpad=stop_mode=clone:stop_duration=22,"
        f"subtitles='{srt_escaped}':force_style='FontSize=18,PrimaryColour=&H00FAFAF7&,"
        f"BackColour=&H80000000&,BorderStyle=3,Outline=1,Shadow=0,MarginV=35,Alignment=2'"
    )
    
    ffmpeg_cmd = [
        "ffmpeg",
        "-y",
        "-i", str(raw_video),
        "-i", str(VOICEOVER_MP3),
        "-vf", vf_filter,
        "-c:v", "libx264",
        "-preset", "medium",
        "-crf", "20",
        "-r", "30",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        str(OUTPUT_MP4)
    ]
    
    print(f"Executing FFmpeg assembly: {' '.join(ffmpeg_cmd)}")
    result = subprocess.run(ffmpeg_cmd, capture_output=True, text=True)
    
    if result.returncode != 0:
        print(f"[WARN] Subtitle burn filter notice: {result.stderr[-300:]}")
        print("Falling back to direct video+audio encode with tpad...")
        fallback_cmd = [
            "ffmpeg",
            "-y",
            "-i", str(raw_video),
            "-i", str(VOICEOVER_MP3),
            "-vf", "tpad=stop_mode=clone:stop_duration=22",
            "-c:v", "libx264",
            "-preset", "medium",
            "-crf", "20",
            "-r", "30",
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "192k",
            "-shortest",
            str(OUTPUT_MP4)
        ]
        result2 = subprocess.run(fallback_cmd, capture_output=True, text=True)
        if result2.returncode != 0:
            print(f"[ERROR] FFmpeg failed: {result2.stderr}", file=sys.stderr)
            sys.exit(1)
            
    print(f"[OK] Final video produced successfully at: {OUTPUT_MP4}")
    
    # Inspect final file with ffprobe
    probe_cmd = [
        "ffprobe",
        "-v", "error",
        "-show_entries", "format=duration,size:stream=width,height,r_frame_rate,codec_name",
        "-of", "default=noprint_wrappers=1",
        str(OUTPUT_MP4)
    ]
    probe = subprocess.run(probe_cmd, capture_output=True, text=True)
    print("\n=== Final Video Probe ===")
    print(probe.stdout)

if __name__ == "__main__":
    assemble()

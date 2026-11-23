"""
Generate AI Voiceover Audio (MP3) and Subtitles (SRT) using Edge TTS.
"""
import asyncio
import edge_tts
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
DELIVERABLES_DIR = PROJECT_ROOT / "deliverables"
AUDIO_OUTPUT = DELIVERABLES_DIR / "voiceover.mp3"
SRT_OUTPUT = DELIVERABLES_DIR / "gamegear-demo.srt"

SECTIONS = [
    {
        "id": 1,
        "text": "Welcome to GameGear Signature Edition, a precision-focused gaming accessories storefront developed for the Fynd Hiring Hackathon, SDET Intern track.",
    },
    {
        "id": 2,
        "text": "GameGear presents two synthetic gaming products: the Arc M1 Gaming Mouse at 1,499 rupees, and the Forge TKL Mechanical Keyboard at 3,499 rupees.",
    },
    {
        "id": 3,
        "text": "Each product features custom technical vector artwork and an interactive inspection modal with three distinct architectural views: isometric 3/4, top plan blueprint, and macro component engineering details.",
    },
    {
        "id": 4,
        "text": "The shopping experience includes dynamic cart management, real-time quantity adjustments, and zero-floating-point financial calculations performed strictly in integer rupees.",
    },
    {
        "id": 5,
        "text": "Customers can inspect their order ledger, review unit totals, and proceed through a validated checkout protected by a synchronous double-submission lock.",
    },
    {
        "id": 6,
        "text": "The application rigorously prevents empty-cart checkout and rejects blank customer names while non-destructively preserving cart state. Placing an order generates a unique hexadecimal order reference and a printable digital receipt.",
    },
    {
        "id": 7,
        "text": "Behind the storefront is a comprehensive browser automation harness built with Python, pytest, and Playwright, featuring 21 passing automated tests with zero flaky steps.",
    },
    {
        "id": 8,
        "text": "The suite verifies mandatory user journeys, regression edge cases, accessibility standards, theme persistence, and multi-viewport responsiveness, backed by genuine screenshot evidence.",
    },
    {
        "id": 9,
        "text": "GameGear is a pure client-side prototype using synthetic demonstration data with zero real payments. The complete source code, test plan, and execution reports are published openly on GitHub.",
    },
    {
        "id": 10,
        "text": "GameGear Signature Edition. Designed for control. Engineered for confidence.",
    }
]

VOICE = "en-IN-PrabhatNeural"

def format_timestamp(seconds: float) -> str:
    millis = int((seconds % 1) * 1000)
    secs = int(seconds)
    mins = secs // 60
    hours = mins // 60
    secs = secs % 60
    mins = mins % 60
    return f"{hours:02d}:{mins:02d}:{secs:02d},{millis:03d}"

async def main():
    full_text = " ".join(s["text"] for s in SECTIONS)
    print(f"Generating voiceover using voice: {VOICE}...")
    
    communicate = edge_tts.Communicate(full_text, VOICE, rate="-2%")
    
    # We can collect subtitle events
    submaker = edge_tts.SubMaker()
    
    with open(AUDIO_OUTPUT, "wb") as f:
        async for chunk in communicate.stream():
            if chunk["type"] == "audio":
                f.write(chunk["data"])
            elif chunk["type"] == "WordBoundary":
                submaker.feed(chunk)
                
    srt_content = submaker.get_srt()
    with open(SRT_OUTPUT, "w", encoding="utf-8") as f:
        f.write(srt_content)
        
    print(f"[OK] Audio generated at: {AUDIO_OUTPUT}")
    print(f"[OK] Subtitles generated at: {SRT_OUTPUT}")

if __name__ == "__main__":
    asyncio.run(main())

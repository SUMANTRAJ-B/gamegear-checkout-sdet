"""
Generate high-fidelity 1280x720 YouTube thumbnail for GameGear Signature Edition.
"""
from pathlib import Path
from playwright.sync_api import sync_playwright

PROJECT_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_PNG = PROJECT_ROOT / "deliverables" / "gamegear-thumbnail.png"

HTML_CONTENT = """
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1280px;
    height: 720px;
    background: #171817;
    color: #FAFAF7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 60px 80px;
    position: relative;
    overflow: hidden;
  }
  
  /* Technical Grid Background */
  .grid-bg {
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(to right, rgba(217, 217, 209, 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(217, 217, 209, 0.05) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }
  
  .top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  .system-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-family: monospace;
    font-size: 14px;
    letter-spacing: 2px;
    color: #858780;
    border: 1px solid rgba(217, 217, 209, 0.2);
    padding: 6px 14px;
    border-radius: 4px;
    background: #202321;
  }
  .signal-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #DB633B;
  }
  .track-tag {
    font-family: monospace;
    font-size: 14px;
    letter-spacing: 1.5px;
    color: #DB633B;
  }
  
  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  .headline-group {
    max-width: 650px;
  }
  .brand-title {
    font-size: 76px;
    font-weight: 900;
    letter-spacing: -2px;
    line-height: 1;
    color: #FAFAF7;
    margin-bottom: 8px;
  }
  .edition-title {
    font-size: 44px;
    font-weight: 300;
    letter-spacing: 6px;
    color: #DB633B;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .subtitle {
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 4px;
    color: #858780;
    text-transform: uppercase;
    margin-bottom: 24px;
  }
  .chips {
    display: flex;
    gap: 12px;
  }
  .chip {
    font-family: monospace;
    font-size: 13px;
    background: #202321;
    border: 1px solid rgba(217, 217, 209, 0.25);
    color: #FAFAF7;
    padding: 8px 16px;
    border-radius: 4px;
  }
  .chip.highlight {
    border-color: #DB633B;
    color: #DB633B;
  }
  
  .visual-card {
    width: 440px;
    height: 380px;
    background: #202321;
    border: 1px solid rgba(217, 217, 209, 0.2);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
  }
  .blueprint-svg {
    width: 380px;
    height: 300px;
  }
  
  .bottom-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid rgba(217, 217, 209, 0.15);
    padding-top: 20px;
    position: relative;
    z-index: 2;
  }
  .spec-metrics {
    display: flex;
    gap: 40px;
  }
  .spec-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .spec-val {
    font-size: 24px;
    font-weight: 700;
    font-family: monospace;
    color: #FAFAF7;
  }
  .spec-lbl {
    font-size: 11px;
    letter-spacing: 1.5px;
    color: #858780;
    font-family: monospace;
  }
  .repo-tag {
    font-family: monospace;
    font-size: 14px;
    color: #858780;
  }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  
  <div class="top-bar">
    <div class="system-badge">
      <span class="signal-dot"></span>
      FYND HIRING HACKATHON 2026
    </div>
    <div class="track-tag">SDET INTERN TRACK // 21 TESTS PASSING</div>
  </div>
  
  <div class="main-content">
    <div class="headline-group">
      <h1 class="brand-title">GAMEGEAR</h1>
      <h2 class="edition-title">SIGNATURE EDITION</h2>
      <p class="subtitle">PRECISION GAMING COMMERCE</p>
      <div class="chips">
        <span class="chip highlight">PLAYWRIGHT AUTOMATION</span>
        <span class="chip">PURE INTEGER RUPEES</span>
        <span class="chip">SYNCHRONOUS GUARD</span>
      </div>
    </div>
    
    <div class="visual-card">
      <svg class="blueprint-svg" viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Blueprint Grid -->
        <rect x="10" y="10" width="360" height="240" stroke="#DB633B" stroke-width="0.8" stroke-dasharray="4 4" opacity="0.4" />
        
        <!-- Arc M1 Mouse Profile -->
        <g transform="translate(40, 30)">
          <path d="M 30 100 C 30 50, 70 30, 120 30 C 170 30, 190 60, 190 100 C 190 140, 170 170, 120 170 C 70 170, 30 150, 30 100 Z" 
                fill="#171817" stroke="#FAFAF7" stroke-width="2" />
          <line x1="120" y1="30" x2="120" y2="85" stroke="#FAFAF7" stroke-width="2" />
          <rect x="112" y="42" width="16" height="32" rx="4" fill="#202321" stroke="#DB633B" stroke-width="2" />
          <line x1="115" y1="52" x2="125" y2="52" stroke="#DB633B" stroke-width="1.5" />
          <line x1="115" y1="62" x2="125" y2="62" stroke="#DB633B" stroke-width="1.5" />
          <circle cx="120" cy="120" r="14" stroke="#DB633B" stroke-width="1" stroke-dasharray="2 2" />
          <circle cx="120" cy="120" r="3" fill="#DB633B" />
          <text x="35" y="185" fill="#858780" font-family="monospace" font-size="9">GG-M1-OPT // 54G</text>
        </g>
        
        <!-- Forge TKL Keyboard Key Cluster Accent -->
        <g transform="translate(230, 45)">
          <rect x="0" y="0" width="110" height="150" rx="6" fill="#171817" stroke="#D9D9D1" stroke-width="1.5" />
          <rect x="10" y="15" width="26" height="26" rx="3" fill="#202321" stroke="#D9D9D1" stroke-width="1" />
          <rect x="42" y="15" width="26" height="26" rx="3" fill="#202321" stroke="#D9D9D1" stroke-width="1" />
          <rect x="74" y="15" width="26" height="26" rx="3" fill="#DB633B" fill-opacity="0.25" stroke="#DB633B" stroke-width="1.5" />
          
          <rect x="10" y="48" width="26" height="26" rx="3" fill="#202321" stroke="#D9D9D1" stroke-width="1" />
          <rect x="42" y="48" width="26" height="26" rx="3" fill="#DB633B" stroke="#DB633B" stroke-width="1.5" />
          <rect x="74" y="48" width="26" height="26" rx="3" fill="#202321" stroke="#D9D9D1" stroke-width="1" />
          
          <rect x="10" y="81" width="26" height="26" rx="3" fill="#202321" stroke="#D9D9D1" stroke-width="1" />
          <rect x="42" y="81" width="26" height="26" rx="3" fill="#202321" stroke="#D9D9D1" stroke-width="1" />
          <rect x="74" y="81" width="26" height="26" rx="3" fill="#202321" stroke="#D9D9D1" stroke-width="1" />
          <text x="12" y="135" fill="#858780" font-family="monospace" font-size="8">GG-KB-TKL // 55cN</text>
        </g>
      </svg>
    </div>
  </div>
  
  <div class="bottom-bar">
    <div class="spec-metrics">
      <div class="spec-item">
        <span class="spec-val">&lt; 0.20 ms</span>
        <span class="spec-lbl">STUDIO WIRELESS</span>
      </div>
      <div class="spec-item">
        <span class="spec-val">26,000 DPI</span>
        <span class="spec-lbl">PIXART 3395</span>
      </div>
      <div class="spec-item">
        <span class="spec-val">21 / 21 PASS</span>
        <span class="spec-lbl">AUTOMATED TESTS</span>
      </div>
    </div>
    <div class="repo-tag">github.com/SUMANTRAJ-B/gamegear-checkout-sdet</div>
  </div>
</body>
</html>
"""

def generate_thumbnail():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720}, device_scale_factor=1)
        page.set_content(HTML_CONTENT)
        page.screenshot(path=str(OUTPUT_PNG))
        browser.close()
    print(f"[OK] Thumbnail generated at: {OUTPUT_PNG}")

if __name__ == "__main__":
    generate_thumbnail()

"""
Generate proper SRT subtitle file for GameGear demo.
"""
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
SRT_PATH = PROJECT_ROOT / "deliverables" / "gamegear-demo.srt"

SUBS = [
    (1, "00:00:00,500", "00:00:09,000", "Welcome to GameGear Signature Edition,\na precision-focused gaming accessories storefront developed for the Fynd Hiring Hackathon."),
    (2, "00:00:09,200", "00:00:20,000", "GameGear presents two synthetic gaming products:\nthe Arc M1 Gaming Mouse at ₹1,499, and the Forge TKL Mechanical Keyboard at ₹3,499."),
    (3, "00:00:20,200", "00:00:33,000", "Each product features custom technical vector artwork and an interactive inspection modal\nwith three distinct views: isometric 3/4, top plan, and macro component details."),
    (4, "00:00:33,200", "00:00:46,000", "The shopping experience includes dynamic cart management, real-time quantity adjustments,\nand zero-floating-point financial calculations performed strictly in integer rupees."),
    (5, "00:00:46,200", "00:00:58,000", "Customers can inspect their order ledger, review unit totals,\nand proceed through a validated checkout protected by a synchronous double-submission lock."),
    (6, "00:00:58,200", "00:01:12,000", "The application rigorously prevents empty-cart checkout and rejects blank customer names.\nPlacing an order generates a unique reference and a printable digital receipt."),
    (7, "00:01:12,200", "00:01:26,000", "Behind the storefront is a comprehensive browser automation harness built with Python,\npytest, and Playwright, featuring 21 passing automated tests with zero flaky steps."),
    (8, "00:01:26,200", "00:01:38,000", "The suite verifies mandatory user journeys, regression edge cases, accessibility standards,\ntheme persistence, and multi-viewport responsiveness with genuine screenshot evidence."),
    (9, "00:01:38,200", "00:01:48,000", "GameGear is a pure client-side prototype using synthetic demonstration data.\nThe complete source code, test plan, and execution reports are published openly on GitHub."),
    (10, "00:01:48,200", "00:01:56,000", "GameGear Signature Edition.\nDesigned for control. Engineered for confidence.")
]

def main():
    lines = []
    for idx, start, end, text in SUBS:
        lines.append(f"{idx}\n{start} --> {end}\n{text}\n")
    
    content = "\n".join(lines)
    with open(SRT_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"[OK] Generated valid SRT file at: {SRT_PATH}")

if __name__ == "__main__":
    main()

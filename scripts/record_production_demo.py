"""
Record 1920x1080 Full Production Screen Interaction of GameGear Signature Edition.
Target URL: https://gamegear-signature-edition.vercel.app
Output Video: deliverables/source-recording/
"""
import time
from pathlib import Path
from playwright.sync_api import sync_playwright

PROJECT_ROOT = Path(__file__).resolve().parent.parent
RECORDING_DIR = PROJECT_ROOT / "deliverables" / "source-recording"
RECORDING_DIR.mkdir(parents=True, exist_ok=True)

PROD_URL = "https://gamegear-signature-edition.vercel.app"
GITHUB_URL = "https://github.com/SUMANTRAJ-B/gamegear-checkout-sdet"

def record():
    # Remove older raw webm files from source-recording directory first
    for old_vid in RECORDING_DIR.glob("*.webm"):
        try:
            old_vid.unlink()
        except Exception:
            pass

    with sync_playwright() as p:
        browser = p.chromium.launch(
            headless=True,
            args=[
                "--disable-blink-features=AutomationControlled",
                "--no-sandbox",
                "--hide-scrollbars=false"
            ]
        )
        
        context = browser.new_context(
            viewport={"width": 1920, "height": 1080},
            record_video_dir=str(RECORDING_DIR),
            record_video_size={"width": 1920, "height": 1080},
            device_scale_factor=1,
            color_scheme="dark"
        )
        
        page = context.new_page()
        print(f"Navigating to production: {PROD_URL}", flush=True)
        page.goto(PROD_URL, wait_until="networkidle")
        
        # [00:00 - 00:09] Section 1: Hero & Brand presentation
        time.sleep(2)
        # Highlight theme toggle (Dark -> Light -> Dark)
        theme_btn = page.get_by_role("button", name="Toggle light or dark theme")
        theme_btn.click()
        time.sleep(2)
        theme_btn.click()
        time.sleep(3)
        
        # [00:09 - 00:20] Section 2: Explore Equipment Catalogue
        print("Scrolling to catalogue...", flush=True)
        page.locator("#collection").scroll_into_view_if_needed()
        time.sleep(2.5)
        
        # Inspect Arc M1 and Forge TKL cards
        mouse_card = page.locator("#product-title-arc-m1-mouse")
        mouse_card.hover()
        time.sleep(3)
        
        kb_card = page.locator("#product-title-forge-tkl-keyboard")
        kb_card.hover()
        time.sleep(3.5)
        
        # [00:20 - 00:33] Section 3: Product Detail Modal & View Switchers
        print("Opening product modal...", flush=True)
        page.get_by_role("button", name="Explore details for Arc M1 Gaming Mouse").click()
        time.sleep(3)
        
        # Switch views inside modal: Top View, Macro Detail, 3/4 View
        modal_top_btn = page.locator(".modal-view-tabs button[data-view='top']")
        modal_top_btn.click()
        time.sleep(2.5)
        
        modal_detail_btn = page.locator(".modal-view-tabs button[data-view='detail']")
        modal_detail_btn.click()
        time.sleep(2.5)
        
        modal_3q_btn = page.locator(".modal-view-tabs button[data-view='three_quarter']")
        modal_3q_btn.click()
        time.sleep(2)
        
        # Close modal
        page.keyboard.press("Escape")
        time.sleep(2)
        
        # [00:33 - 00:46] Section 4: Card view switching & Slide-over cart drawer
        print("Interacting with card view pills...", flush=True)
        card_top_pill = page.get_by_role("button", name="Arc M1 Gaming Mouse top plan view")
        card_top_pill.click()
        time.sleep(2)
        
        card_detail_pill = page.get_by_role("button", name="Arc M1 Gaming Mouse macro detail view")
        card_detail_pill.click()
        time.sleep(2)
        
        # Add Arc M1 and Forge TKL
        page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
        time.sleep(1.5)
        page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
        time.sleep(2)
        
        # Open Slide-over cart drawer
        page.locator("#nav-cart-btn").click()
        time.sleep(3.5)
        page.locator("#cart-drawer-close").click()
        time.sleep(1.5)
        
        # [00:46 - 00:58] Section 5: Order register & integer calculations
        print("Scrolling to order register and adjusting quantities...", flush=True)
        page.locator("#cart-section").scroll_into_view_if_needed()
        time.sleep(2.5)
        
        # Increment Arc M1 quantity to 2 (Line total ₹2,998)
        inc_mouse_btn = page.get_by_role("button", name="Increase quantity for Arc M1 Gaming Mouse")
        inc_mouse_btn.click()
        time.sleep(3)
        
        # Increment Keyboard quantity to 2 (Line total ₹6,998)
        inc_kb_btn = page.get_by_role("button", name="Increase quantity for Forge TKL Mechanical Keyboard")
        inc_kb_btn.click()
        time.sleep(3)
        
        # Decrement Keyboard back to 1 (Line total ₹3,499, Order Total ₹6,497)
        dec_kb_btn = page.get_by_role("button", name="Decrease quantity for Forge TKL Mechanical Keyboard")
        dec_kb_btn.click()
        time.sleep(3)
        
        # [00:58 - 01:12] Section 6: Validation, Synchronous guard & Order confirmation
        print("Testing validation and order placement...", flush=True)
        page.locator("#checkout-heading").scroll_into_view_if_needed()
        time.sleep(2)
        
        # Click Place Order with empty name
        place_order_btn = page.get_by_role("button", name="Place Order")
        place_order_btn.click()
        time.sleep(3.5)
        
        # Fill customer name "Alex Morgan"
        name_input = page.locator("#customer-name")
        name_input.fill("Alex Morgan")
        time.sleep(2)
        
        # Place order
        place_order_btn.click()
        time.sleep(4.5)
        
        # Hover over confirmed receipt
        receipt = page.locator("#confirmation-section")
        receipt.scroll_into_view_if_needed()
        time.sleep(4)
        
        # [01:12 - 01:26] Section 7: Studio Engineering Philosophy & Architecture
        print("Scrolling to engineering philosophy...", flush=True)
        page.locator("#studio-about").scroll_into_view_if_needed()
        time.sleep(5)
        
        try:
            page.locator(".pillar-card").first.hover()
            time.sleep(4)
            page.locator(".pillar-card").nth(1).hover()
            time.sleep(4)
        except Exception as e:
            print(f"Pillar hover note: {e}", flush=True)
            time.sleep(8)
        
        # [01:26 - 01:38] Section 8: Specs benchmark & system footer
        print("Inspecting specs and system footer...", flush=True)
        page.locator("footer.site-footer").scroll_into_view_if_needed()
        time.sleep(5)
        page.locator("#specs-section").scroll_into_view_if_needed()
        time.sleep(5)
        
        # [01:38 - 01:56] Section 9 & 10: GitHub Repository Showcase
        print(f"Navigating to public GitHub repo: {GITHUB_URL}", flush=True)
        page.goto(GITHUB_URL, wait_until="networkidle")
        time.sleep(4)
        page.evaluate("window.scrollBy({ top: 400, behavior: 'smooth' })")
        time.sleep(4.5)
        page.evaluate("window.scrollBy({ top: 600, behavior: 'smooth' })")
        time.sleep(4.5)
        page.evaluate("window.scrollTo({ top: 0, behavior: 'smooth' })")
        time.sleep(3.5)
        
        # Close context to flush video to disk
        context.close()
        browser.close()
        
    print("[OK] Production recording complete.", flush=True)

if __name__ == "__main__":
    record()

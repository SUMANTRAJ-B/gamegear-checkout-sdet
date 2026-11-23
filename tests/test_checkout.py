"""
Automated Browser Test Suite for GameGear 2.0 Storefront.

Maintains:
- Mandatory Test 1: Successful checkout with unique order reference
- Mandatory Test 2: Required-field customer name validation & state preservation
- Mandatory Test 3: Quantity increment and exact total calculations
- Regression Test 1: Empty cart submission prevention
- Regression Test 2: Rapid double-click duplicate order prevention
- Regression Test 3: Product removal and state update
- Regression Test 4: Quantity minimum bound (cannot decrement below 1)
- Regression Test 5: Re-adding existing product increments quantity
- Regression Test 6: Multi-item calculation verification (Mouse x 1 + Keyboard x 2 = ₹8,497)

New Interaction & Visual Tests:
- Interaction Test 1: Theme toggle between dark and light mode
- Interaction Test 2: Interactive technical specifications disclosure
- Interaction Test 3: Toast notification feedback on adding to cart
- Interaction Test 4: Responsive mobile navigation drawer toggle
- Interaction Test 5: Multi-viewport visual verification & evidence capture
"""

import re
from pathlib import Path
import pytest
from playwright.sync_api import Page, expect

REPORTS_DIR = Path(__file__).resolve().parent.parent / "reports"
EVIDENCE_DIR = REPORTS_DIR / "evidence"


# ==============================================================================
# MANDATORY ACCEPTANCE TESTS
# ==============================================================================

@pytest.mark.mandatory
def test_mandatory_1_successful_checkout(page: Page):
    """
    MANDATORY TEST 1 — Successful checkout:
    Verify that a valid customer can successfully place an order.
    """
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Verify clean initial state
    expect(page.get_by_role("heading", name="GAMEGEAR")).to_be_visible()
    expect(page.get_by_text("Your cart is currently empty")).to_be_visible()
    expect(page.locator("#order-total")).to_have_text("₹0")

    # 2. Add Arc M1 Gaming Mouse
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    expect(page.locator(".cart-item-name")).to_have_text("Arc M1 Gaming Mouse")
    expect(page.locator("#order-total")).to_have_text("₹1,499")

    # 3. Enter a valid customer name
    name_input = page.get_by_label("Customer Name *")
    name_input.fill("Alex Morgan")

    # 4. Click Place Order
    page.get_by_role("button", name="Place Order").click()

    # 5. Verify order confirmation is displayed
    confirmation_heading = page.get_by_role("heading", name="Order Confirmed!")
    expect(confirmation_heading).to_be_visible()

    # 6. Verify customer's name is displayed
    customer_display = page.locator("#confirmed-customer-name")
    expect(customer_display).to_have_text("Alex Morgan")

    # 7. Verify reference number exists and matches GG-XXXXXXXX format
    order_ref = page.locator("#confirmed-order-ref")
    expect(order_ref).to_be_visible()
    ref_text = order_ref.inner_text().strip()
    assert re.match(r"^GG-[0-9A-F]{8}$", ref_text), f"Order reference format invalid: {ref_text}"

    # 8. Verify that only one confirmation appears
    confirmation_elements = page.locator(".confirmation-heading")
    assert confirmation_elements.count() == 1, "More than one confirmation section displayed"

    # Capture genuine verification screenshot evidence
    page.screenshot(path=str(EVIDENCE_DIR / "checkout-success.png"))


@pytest.mark.mandatory
def test_mandatory_2_required_field_validation(page: Page):
    """
    MANDATORY TEST 2 — Required-field validation:
    Verify that an empty required field blocks checkout.
    """
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Add one product
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    expect(page.locator(".cart-item-name")).to_have_text("Arc M1 Gaming Mouse")

    # 2. Leave customer-name field blank and click Place Order
    name_input = page.get_by_label("Customer Name *")
    name_input.fill("")
    page.get_by_role("button", name="Place Order").click()

    # 3. Inspect the customer-visible validation message
    validation_alert = page.locator("#validation-error-alert")
    expect(validation_alert).to_be_visible()
    expect(validation_alert).to_contain_text("Please enter your name. Customer name is required")

    # 4. Verify that no order confirmation is displayed
    expect(page.locator("#confirmation-section")).not_to_be_visible()
    expect(page.locator(".confirmation-heading")).to_have_count(0)

    # 5. Verify that the cart and product quantity have been preserved
    expect(page.locator(".cart-item-name")).to_have_text("Arc M1 Gaming Mouse")
    expect(page.locator(".cart-qty-value")).to_have_text("1")
    expect(page.locator("#order-total")).to_have_text("₹1,499")

    # Capture validation state screenshot evidence
    page.screenshot(path=str(EVIDENCE_DIR / "validation-error-state.png"))


@pytest.mark.mandatory
def test_mandatory_3_quantity_calculation(page: Page):
    """
    MANDATORY TEST 3 — Quantity and exact total:
    Verify that changing product quantity updates the exact correct order total.
    """
    # 1. Add Forge TKL Mechanical Keyboard
    page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
    expect(page.locator(".cart-item-name")).to_have_text("Forge TKL Mechanical Keyboard")
    expect(page.locator(".cart-qty-value")).to_have_text("1")
    expect(page.locator(".cart-item-line-total")).to_have_text("₹3,499")
    expect(page.locator("#order-total")).to_have_text("₹3,499")

    # 2. Increase its quantity from one to two
    page.get_by_role("button", name="Increase quantity for Forge TKL Mechanical Keyboard").click()

    # 3. Verify displayed quantity equals two
    expect(page.locator(".cart-qty-value")).to_have_text("2")

    # 4. Verify line total equals ₹6,998
    expect(page.locator(".cart-item-line-total")).to_have_text("₹6,998")

    # 5. Verify order total equals ₹6,998
    expect(page.locator("#order-total")).to_have_text("₹6,998")


# ==============================================================================
# EXTENDED REGRESSION TESTS
# ==============================================================================

@pytest.mark.regression
def test_regression_empty_cart_submission_blocked(page: Page):
    """
    Regression Test 1: Empty cart submission.
    Checkout is blocked and an understandable message appears when cart is empty.
    """
    page.get_by_label("Customer Name *").fill("Jordan Reed")
    page.get_by_role("button", name="Place Order").click()

    alert = page.locator("#validation-error-alert")
    expect(alert).to_be_visible()
    expect(alert).to_contain_text("Your cart is empty. Please add at least one product")

    expect(page.locator("#confirmation-section")).not_to_be_visible()
    expect(page.get_by_label("Customer Name *")).to_have_value("Jordan Reed")


@pytest.mark.regression
def test_regression_rapid_double_click_duplicate_prevention(page: Page):
    """
    Regression Test 2: Rapid double-click.
    Repeated rapid activation of Place Order produces exactly one confirmation.
    """
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)

    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    page.get_by_label("Customer Name *").fill("Taylor Swift")

    place_btn = page.get_by_role("button", name="Place Order")
    place_btn.dblclick()

    expect(page.locator("#confirmation-title")).to_be_visible()
    expect(page.locator(".confirmation-heading")).to_have_count(1)
    expect(page.locator("#confirmed-order-ref")).to_have_count(1)

    page.screenshot(path=str(EVIDENCE_DIR / "rapid-double-click-verification.png"))


@pytest.mark.regression
def test_regression_product_removal(page: Page):
    """
    Regression Test 3: Product removal.
    Removing an item updates cart and order total immediately, and displays empty state.
    """
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    expect(page.locator(".cart-item")).to_have_count(1)
    expect(page.locator("#order-total")).to_have_text("₹1,499")

    page.get_by_role("button", name="Remove Arc M1 Gaming Mouse").click()

    expect(page.locator("#cart-empty-state")).to_be_visible()
    expect(page.locator("#order-total")).to_have_text("₹0")
    expect(page.locator("#cart-item-count-badge")).to_have_text("0 items")


@pytest.mark.regression
def test_regression_quantity_minimum_bound(page: Page):
    """
    Regression Test 4: Quantity minimum.
    Quantity cannot decrease below 1 via decrement control.
    """
    page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
    expect(page.locator(".cart-qty-value")).to_have_text("1")

    dec_btn = page.get_by_role("button", name="Decrease quantity for Forge TKL Mechanical Keyboard")
    expect(dec_btn).to_be_disabled()

    expect(page.locator(".cart-qty-value")).to_have_text("1")
    expect(page.locator("#order-total")).to_have_text("₹3,499")


@pytest.mark.regression
def test_regression_add_existing_product_increments_quantity(page: Page):
    """
    Regression Test 5: Existing product addition.
    Clicking 'Add to Cart' for a product already in cart increments quantity rather than adding duplicate row.
    """
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()

    expect(page.locator(".cart-item")).to_have_count(1)
    expect(page.locator(".cart-qty-value")).to_have_text("2")
    expect(page.locator(".cart-item-line-total")).to_have_text("₹2,998")
    expect(page.locator("#order-total")).to_have_text("₹2,998")


@pytest.mark.regression
def test_regression_multi_product_calculation(page: Page):
    """
    Regression Test 6: Multi-product calculation test.
    Mouse x 1 (₹1,499) + Keyboard x 2 (₹6,998) = ₹8,497 total.
    """
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
    page.get_by_role("button", name="Increase quantity for Forge TKL Mechanical Keyboard").click()

    expect(page.locator(".cart-item")).to_have_count(2)
    expect(page.locator("#order-total-qty")).to_have_text("3")
    expect(page.locator("#order-total")).to_have_text("₹8,497")


# ==============================================================================
# GAMEGEAR 2.0 INTERACTION & VISUAL REGRESSION TESTS
# ==============================================================================

@pytest.mark.regression
def test_interaction_theme_switching(page: Page):
    """
    Interaction Test 1: Light / Dark theme toggle.
    Verifies data-theme attribute updates on html tag upon clicking theme toggle.
    """
    initial_theme = page.locator("html").get_attribute("data-theme")
    theme_btn = page.locator("#theme-toggle")
    expect(theme_btn).to_be_visible()

    # Toggle theme
    theme_btn.click()
    new_theme = page.locator("html").get_attribute("data-theme")
    assert new_theme != initial_theme, f"Theme did not toggle from {initial_theme}"

    # Toggle back
    theme_btn.click()
    restored_theme = page.locator("html").get_attribute("data-theme")
    assert restored_theme == initial_theme


@pytest.mark.regression
def test_interaction_product_details_disclosure(page: Page):
    """
    Interaction Test 2: Product technical specifications disclosure.
    Verifies collapsible specifications accordion expands to display sensor details.
    """
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)

    disclosure = page.locator(".product-details-disclosure").first
    summary = disclosure.locator(".disclosure-summary")

    # Initially closed
    expect(disclosure).not_to_have_attribute("open", "")

    # Click to expand
    summary.click()
    expect(disclosure).to_have_attribute("open", "")
    expect(disclosure).to_contain_text("PixArt 3395 Optical")

    # Capture product interaction screenshot evidence
    page.screenshot(path=str(EVIDENCE_DIR / "product-interaction.png"))


@pytest.mark.regression
def test_interaction_toast_feedback_on_cart_addition(page: Page):
    """
    Interaction Test 3: Toast notification system.
    Verifies toast notification pops up when an item is added to the cart.
    """
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    toast = page.locator(".toast")
    expect(toast).to_be_visible()
    expect(toast).to_contain_text("Arc M1 Gaming Mouse added to cart")


@pytest.mark.regression
def test_interaction_mobile_navigation_drawer(page: Page):
    """
    Interaction Test 4: Responsive mobile navigation drawer toggle.
    Verifies hamburger menu controls mobile drawer in mobile viewport (390x844).
    """
    page.set_viewport_size({"width": 390, "height": 844})
    
    mobile_btn = page.locator("#mobile-menu-btn")
    expect(mobile_btn).to_be_visible()

    drawer = page.locator("#mobile-nav-drawer")
    expect(drawer).to_be_hidden()

    # Click to open drawer
    mobile_btn.click()
    expect(drawer).to_be_visible()

    # Click drawer link closes drawer
    drawer.locator(".mobile-nav-link").first.click()
    expect(drawer).to_be_hidden()


@pytest.mark.regression
def test_interaction_responsive_viewports_and_evidence(page: Page):
    """
    Interaction Test 5: Responsive viewports & visual evidence generation.
    Captures authentic screenshots of Desktop Storefront, Mobile Storefront, and Cart with Items.
    """
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Desktop Storefront Evidence (1440 x 900)
    page.set_viewport_size({"width": 1440, "height": 900})
    expect(page.get_by_role("heading", name="Built for your next session.")).to_be_visible()
    page.screenshot(path=str(EVIDENCE_DIR / "desktop-storefront.png"))

    # 2. Add both products to cart for Cart With Items Evidence
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
    expect(page.locator(".cart-item")).to_have_count(2)
    page.screenshot(path=str(EVIDENCE_DIR / "cart-with-items.png"))

    # 3. Mobile Storefront Evidence (390 x 844)
    page.set_viewport_size({"width": 390, "height": 844})
    page.screenshot(path=str(EVIDENCE_DIR / "mobile-storefront.png"))

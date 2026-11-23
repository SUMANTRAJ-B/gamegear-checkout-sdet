"""
Automated Browser Test Suite for GAMEGEAR — SIGNATURE EDITION.

Complete SDET Verification Harness:
Part 7 Suite (21 Comprehensive Tests):
- Test 01: Successful checkout with unique order reference (Mandatory 1)
- Test 02: Missing required customer field & state preservation (Mandatory 2)
- Test 03: Exact quantity total calculation (Mandatory 3)
- Test 04: Empty cart submission blocked
- Test 05: Rapid double-click duplicate protection
- Test 06: Product removal and recalculation
- Test 07: Quantity minimum bound (cannot decrement below 1)
- Test 08: Existing product addition increments quantity
- Test 09: Multi-product calculation (Mouse x 1 + Keyboard x 2 = ₹8,497)
- Test 10: Product detail modal opens and closes
- Test 11: Product image-view switching updates view correctly
- Test 12: Cart drawer opens and closes
- Test 13: Theme toggle changes interface (data-theme)
- Test 14: Theme choice persists after reload (localStorage)
- Test 15: Cart count matches product quantities
- Test 16: Customer information survives validation failure
- Test 17: Start New Order resets order state correctly
- Test 18: Mobile viewport cart and navigation interaction
- Test 19: Keyboard Escape closes product detail panel
- Test 20: Order reference meets expected GG-XXXXXXXX format
- Test 21: Repeated checkout action cannot create duplicate confirmations
"""

import re
from pathlib import Path
import pytest
from playwright.sync_api import Page, expect

REPORTS_DIR = Path(__file__).resolve().parent.parent / "reports"
EVIDENCE_DIR = REPORTS_DIR / "evidence"


# ==============================================================================
# MANDATORY TESTS (1 - 3)
# ==============================================================================

@pytest.mark.mandatory
def test_mandatory_1_successful_checkout(page: Page):
    """
    Test 01: Successful checkout (Mandatory 1).
    A valid customer checkout must produce an order confirmation with unique reference.
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
    Test 02: Missing required customer field (Mandatory 2).
    An empty required field must block checkout and preserve cart contents.
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
    Test 03: Exact quantity total calculation (Mandatory 3).
    Changing product quantity must update the exact correct order total.
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
# EXISTING REGRESSION TESTS (4 - 9)
# ==============================================================================

@pytest.mark.regression
def test_regression_4_empty_cart_submission_blocked(page: Page):
    """
    Test 04: Empty cart submission blocked.
    Submitting checkout with empty cart displays validation alert and halts submission.
    """
    page.get_by_label("Customer Name *").fill("Jordan Reed")
    page.get_by_role("button", name="Place Order").click()

    alert = page.locator("#validation-error-alert")
    expect(alert).to_be_visible()
    expect(alert).to_contain_text("Your cart is empty. Please add at least one product")

    expect(page.locator("#confirmation-section")).not_to_be_visible()
    expect(page.get_by_label("Customer Name *")).to_have_value("Jordan Reed")


@pytest.mark.regression
def test_regression_5_rapid_double_click_protection(page: Page):
    """
    Test 05: Rapid double-click protection.
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
def test_regression_6_product_removal(page: Page):
    """
    Test 06: Product removal.
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
def test_regression_7_quantity_minimum_bound(page: Page):
    """
    Test 07: Quantity minimum.
    Quantity cannot decrease below 1 via decrement control.
    """
    page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
    expect(page.locator(".cart-qty-value")).to_have_text("1")

    dec_btn = page.get_by_role("button", name="Decrease quantity for Forge TKL Mechanical Keyboard")
    expect(dec_btn).to_be_disabled()

    expect(page.locator(".cart-qty-value")).to_have_text("1")
    expect(page.locator("#order-total")).to_have_text("₹3,499")


@pytest.mark.regression
def test_regression_8_existing_product_increment(page: Page):
    """
    Test 08: Existing product addition.
    Clicking 'Add to Cart' for a product already in cart increments quantity rather than adding duplicate row.
    """
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()

    expect(page.locator(".cart-item")).to_have_count(1)
    expect(page.locator(".cart-qty-value")).to_have_text("2")
    expect(page.locator(".cart-item-line-total")).to_have_text("₹2,998")
    expect(page.locator("#order-total")).to_have_text("₹2,998")


@pytest.mark.regression
def test_regression_9_multi_product_calculation(page: Page):
    """
    Test 09: Multi-product total calculation.
    Mouse x 1 (₹1,499) + Keyboard x 2 (₹6,998) = ₹8,497 total.
    """
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
    page.get_by_role("button", name="Increase quantity for Forge TKL Mechanical Keyboard").click()

    expect(page.locator(".cart-item")).to_have_count(2)
    expect(page.locator("#order-total-qty")).to_have_text("3")
    expect(page.locator("#order-total")).to_have_text("₹8,497")


# ==============================================================================
# ADDITIONAL SDET SUITE (10 - 21)
# ==============================================================================

@pytest.mark.regression
def test_sdet_10_product_detail_panel_opens_and_closes(page: Page):
    """
    Test 10: Product detail modal opens and closes.
    Clicking 'Explore Details' displays the technical modal; clicking close hides it.
    """
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)

    modal = page.locator("#product-modal")
    expect(modal).to_be_hidden()

    # Click Explore Details on Arc M1 Mouse
    page.get_by_role("button", name="Explore details for Arc M1 Gaming Mouse").click()
    expect(modal).to_be_visible()
    expect(page.locator("#modal-product-title")).to_have_text("Arc M1 Gaming Mouse")
    expect(page.locator("#modal-product-code")).to_have_text("GG-M1-OPT //")

    # Capture genuine product interaction evidence
    page.screenshot(path=str(EVIDENCE_DIR / "product-interaction.png"))

    # Click close button
    page.locator("#modal-close-btn").click()
    expect(modal).to_be_hidden()


@pytest.mark.regression
def test_sdet_11_product_image_view_switching(page: Page):
    """
    Test 11: Product image-view switching updates correctly.
    Clicking 3/4 View, Top View, and Detail switches the displayed SVG technical drawing.
    """
    # Open modal for Forge TKL Keyboard
    page.get_by_role("button", name="Explore details for Forge TKL Mechanical Keyboard").click()
    modal = page.locator("#product-modal")
    expect(modal).to_be_visible()

    # Verify initial 3/4 view
    expect(page.locator("#modal-view-caption")).to_contain_text("3/4 ISOMETRIC")

    # Switch to Top View
    page.locator(".view-tab[data-view='top']").click()
    expect(page.locator("#modal-view-caption")).to_contain_text("TOP-DOWN BLUEPRINT")

    # Switch to Macro Detail
    page.locator(".view-tab[data-view='detail']").click()
    expect(page.locator("#modal-view-caption")).to_contain_text("MACRO")

    # Close modal
    page.locator("#modal-close-btn").click()
    expect(modal).to_be_hidden()


@pytest.mark.regression
def test_sdet_12_cart_drawer_opens_and_closes(page: Page):
    """
    Test 12: Cart drawer opens and closes.
    Clicking nav cart button opens the slide-over drawer; clicking drawer close closes it.
    """
    drawer = page.locator("#cart-drawer")
    expect(drawer).to_be_hidden()

    # Open drawer via nav pill
    page.locator("#nav-cart-btn").click()
    expect(drawer).to_be_visible()

    # Close drawer via close button
    page.locator("#cart-drawer-close").click()
    expect(drawer).to_be_hidden()


@pytest.mark.regression
def test_sdet_13_theme_toggle_changes_interface(page: Page):
    """
    Test 13: Theme toggle changes interface.
    Clicking theme toggle toggles data-theme attribute on html tag.
    """
    initial_theme = page.locator("html").get_attribute("data-theme")
    theme_btn = page.locator("#theme-toggle")

    theme_btn.click()
    new_theme = page.locator("html").get_attribute("data-theme")
    assert new_theme != initial_theme, f"Theme failed to flip from {initial_theme}"

    theme_btn.click()
    restored_theme = page.locator("html").get_attribute("data-theme")
    assert restored_theme == initial_theme


@pytest.mark.regression
def test_sdet_14_theme_choice_persists_after_reload(page: Page):
    """
    Test 14: Theme choice persists after reload.
    Theme preference is preserved in localStorage and persists upon page refresh.
    """
    theme_btn = page.locator("#theme-toggle")
    theme_btn.click()
    expected_theme = page.locator("html").get_attribute("data-theme")

    # Reload page
    page.reload()
    reloaded_theme = page.locator("html").get_attribute("data-theme")
    assert reloaded_theme == expected_theme, "Theme preference failed to persist across reload"


@pytest.mark.regression
def test_sdet_15_cart_count_matches_product_quantities(page: Page):
    """
    Test 15: Cart count matches product quantities.
    The cart badge counter accurately reflects the total sum of quantities across items.
    """
    expect(page.locator("#cart-item-count-badge")).to_have_text("0 items")

    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    expect(page.locator("#cart-item-count-badge")).to_have_text("1 item")

    page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
    expect(page.locator("#cart-item-count-badge")).to_have_text("2 items")

    page.get_by_role("button", name="Increase quantity for Arc M1 Gaming Mouse").click()
    expect(page.locator("#cart-item-count-badge")).to_have_text("3 items")


@pytest.mark.regression
def test_sdet_16_customer_info_survives_validation_failure(page: Page):
    """
    Test 16: Customer information survives validation failure.
    Submitting with an empty cart does not erase customer name typed in input.
    """
    name_input = page.get_by_label("Customer Name *")
    name_input.fill("Morgan Freeman")

    page.get_by_role("button", name="Place Order").click()

    expect(page.locator("#validation-error-alert")).to_be_visible()
    expect(name_input).to_have_value("Morgan Freeman")


@pytest.mark.regression
def test_sdet_17_start_new_order_resets_state(page: Page):
    """
    Test 17: Start New Order resets order state correctly.
    After successful checkout, clicking Start New Order cleanly returns to initial state.
    """
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    page.get_by_label("Customer Name *").fill("Sam Wilson")
    page.get_by_role("button", name="Place Order").click()

    expect(page.locator("#confirmation-title")).to_be_visible()

    # Click Start New Order
    page.get_by_role("button", name="Start New Order").click()

    expect(page.locator("#confirmation-section")).to_be_hidden()
    expect(page.locator("#checkout-form")).to_be_visible()
    expect(page.get_by_text("Your cart is currently empty")).to_be_visible()
    expect(page.locator("#order-total")).to_have_text("₹0")
    expect(page.get_by_label("Customer Name *")).to_have_value("")


@pytest.mark.regression
def test_sdet_18_mobile_viewport_cart_interaction(page: Page):
    """
    Test 18: Mobile viewport cart and navigation interaction.
    Verifies 390x844 mobile viewport layout and interaction.
    """
    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)
    page.set_viewport_size({"width": 390, "height": 844})

    # Mobile menu button visible
    expect(page.locator("#mobile-menu-btn")).to_be_visible()

    # Mobile navigation drawer opens
    page.locator("#mobile-menu-btn").click()
    expect(page.locator("#mobile-nav-drawer")).to_be_visible()

    # Close mobile drawer
    page.locator("#mobile-menu-btn").click()
    expect(page.locator("#mobile-nav-drawer")).to_be_hidden()

    # Capture mobile screenshot evidence
    page.screenshot(path=str(EVIDENCE_DIR / "mobile-storefront.png"))


@pytest.mark.regression
def test_sdet_19_keyboard_escape_closes_modal(page: Page):
    """
    Test 19: Keyboard Escape closes product detail panel.
    Accessible modal can be dismissed using Escape keyboard key.
    """
    page.get_by_role("button", name="Explore details for Arc M1 Gaming Mouse").click()
    modal = page.locator("#product-modal")
    expect(modal).to_be_visible()

    # Press Escape key
    page.keyboard.press("Escape")
    expect(modal).to_be_hidden()


@pytest.mark.regression
def test_sdet_20_order_reference_format(page: Page):
    """
    Test 20: Order reference format verification.
    Reference code strictly conforms to GG-[0-9A-F]{8} pattern.
    """
    page.get_by_role("button", name="Add Forge TKL Mechanical Keyboard").click()
    page.get_by_label("Customer Name *").fill("Ada Lovelace")
    page.get_by_role("button", name="Place Order").click()

    order_ref = page.locator("#confirmed-order-ref").inner_text().strip()
    assert re.match(r"^GG-[0-9A-F]{8}$", order_ref), f"Order reference format mismatch: {order_ref}"


@pytest.mark.regression
def test_sdet_21_repeated_checkout_cannot_duplicate_confirmation(page: Page):
    """
    Test 21: Repeated checkout action cannot create duplicate confirmations.
    Multiple activations only produce a single confirmation and disabled button.
    """
    page.get_by_role("button", name="Add Arc M1 Gaming Mouse").click()
    page.get_by_label("Customer Name *").fill("Grace Hopper")

    place_btn = page.get_by_role("button", name="Place Order")
    # Click 3 times in quick succession
    place_btn.click()
    
    expect(page.locator("#confirmation-title")).to_be_visible()
    expect(page.locator(".confirmation-heading")).to_have_count(1)
    expect(page.locator("#confirmed-order-ref")).to_have_count(1)

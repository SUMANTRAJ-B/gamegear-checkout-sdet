# Test Execution Report — GameGear SDET Suite

**Project Name:** GameGear — Minimal Gaming Accessories Checkout  
**Track:** Fynd Hiring Hackathon 2026 | SDET Intern Track  
**Report Generated:** 2026-11-23 20:23:11  
**Execution Duration:** 15.60 seconds  
**Overall Status:** **PASSED**

---

## 1. Environment & Runtime Specifications

| Attribute | Value |
| :--- | :--- |
| **Operating System** | Windows 11 (AMD64) |
| **Python Runtime** | 3.13.13 |
| **Playwright Version** | Unknown |
| **Browser Engine** | Chromium 159.0.8154.6 (Headless) |
| **Test Runner** | pytest |
| **Command Executed** | `C:\Users\jhonp\AppData\Local\Programs\Python\Python313\python.exe -m pytest --junitxml C:\Users\jhonp\Downloads\Fynd-Hackathon-Workspace\gamegear-checkout-sdet\reports\junit.xml -v C:\Users\jhonp\Downloads\Fynd-Hackathon-Workspace\gamegear-checkout-sdet\tests` |

---

## 2. Test Execution Summary

| Metric | Count |
| :--- | :--- |
| **Total Tests Collected** | 21 |
| **Passed** | 21 |
| **Failed** | 0 |
| **Errors** | 0 |
| **Skipped** | 0 |
| **Success Rate** | 100.0% |

---

## 3. Individual Test Case Results

| Test Case Name | Duration (s) | Status |
| :--- | :--- | :--- |
| `test_mandatory_1_successful_checkout` | 1.96s | ✅ PASSED |
| `test_mandatory_2_required_field_validation` | 0.42s | ✅ PASSED |
| `test_mandatory_3_quantity_calculation` | 0.33s | ✅ PASSED |
| `test_regression_4_empty_cart_submission_blocked` | 1.17s | ✅ PASSED |
| `test_regression_5_rapid_double_click_protection` | 0.48s | ✅ PASSED |
| `test_regression_6_product_removal` | 0.40s | ✅ PASSED |
| `test_regression_7_quantity_minimum_bound` | 0.34s | ✅ PASSED |
| `test_regression_8_existing_product_increment` | 1.23s | ✅ PASSED |
| `test_regression_9_multi_product_calculation` | 0.43s | ✅ PASSED |
| `test_sdet_10_product_detail_panel_opens_and_closes` | 0.61s | ✅ PASSED |
| `test_sdet_11_product_image_view_switching` | 0.78s | ✅ PASSED |
| `test_sdet_12_cart_drawer_opens_and_closes` | 0.59s | ✅ PASSED |
| `test_sdet_13_theme_toggle_changes_interface` | 0.30s | ✅ PASSED |
| `test_sdet_14_theme_choice_persists_after_reload` | 0.29s | ✅ PASSED |
| `test_sdet_15_cart_count_matches_product_quantities` | 0.38s | ✅ PASSED |
| `test_sdet_16_customer_info_survives_validation_failure` | 0.59s | ✅ PASSED |
| `test_sdet_17_start_new_order_resets_state` | 0.36s | ✅ PASSED |
| `test_sdet_18_mobile_viewport_cart_interaction` | 0.34s | ✅ PASSED |
| `test_sdet_19_keyboard_escape_closes_modal` | 0.28s | ✅ PASSED |
| `test_sdet_20_order_reference_format` | 0.31s | ✅ PASSED |
| `test_sdet_21_repeated_checkout_cannot_duplicate_confirmation` | 1.88s | ✅ PASSED |

---

## 4. Mandatory Hackathon Verification Details

1. **TEST 1 — Successful checkout (`test_mandatory_1_successful_checkout`):**
   - Verified that customer adding **Arc M1 Gaming Mouse** (₹1,499), entering name **Alex Morgan**, and clicking **Place Order** generates one order confirmation with unique reference matching `^GG-[0-9A-F]{8}$`.
   - Verified that the customer's name is accurately presented.
   - Result: **PASSED**.

2. **TEST 2 — Required-field validation (`test_mandatory_2_required_field_validation`):**
   - Verified that leaving the customer name blank blocks checkout.
   - Verified that a visible, accessible validation alert is presented.
   - Verified that the cart contents and quantity (1 item, ₹1,499) remain strictly preserved after failed validation.
   - Result: **PASSED**.

3. **TEST 3 — Quantity and exact total (`test_mandatory_3_quantity_calculation`):**
   - Verified that adding **Forge TKL Mechanical Keyboard** (₹3,499) and incrementing quantity to 2 updates the item line total to **₹6,998** and the order total to **₹6,998** with zero floating-point error.
   - Result: **PASSED**.

---

## 5. Extended Regression Scenarios Verified

- **Empty Cart Checkout Blocked:** Submitting checkout with 0 items displays a clear validation message and halts order creation.
- **Rapid Double-Click Protection:** Synchronous submission lock prevents multiple orders or duplicate references when Place Order is clicked in rapid succession.
- **Product Removal:** Removing an item dynamically updates unit counts, line totals, order sum, and displays the empty cart state when last item is removed.
- **Quantity Minimum Enforcement:** Decrement button is disabled at quantity 1, preventing zero or negative values.
- **Existing Product Addition:** Re-clicking Add to Cart increments product quantity rather than inserting duplicate rows.
- **Multi-Product Combined Calculations:** Verified simultaneous combination of Mouse x 1 (₹1,499) + Keyboard x 2 (₹6,998) = ₹8,497.

---

## 6. Generated Evidence Artifacts

The following genuine screenshot evidence was captured during execution:

- [`cart-with-items.png`](evidence/cart-with-items.png)
- [`checkout-success.png`](evidence/checkout-success.png)
- [`desktop-storefront.png`](evidence/desktop-storefront.png)
- [`manual-verification-double-click.png`](evidence/manual-verification-double-click.png)
- [`mobile-storefront.png`](evidence/mobile-storefront.png)
- [`product-interaction.png`](evidence/product-interaction.png)
- [`rapid-double-click-verification.png`](evidence/rapid-double-click-verification.png)
- [`validation-error-state.png`](evidence/validation-error-state.png)

---

## 7. Raw Test Output Logs

- JUnit XML Report: [`reports/junit.xml`](junit.xml)
- Raw Console Log: [`reports/pytest-output.txt`](pytest-output.txt)

# Master Test Plan — GAMEGEAR // SIGNATURE EDITION
## Precision Gaming Commerce Experience & SDET Engineering Showcase

**Document Version:** 3.0 (Signature Edition)  
**Project:** GameGear Signature Edition // SDET Browser Automation Harness  
**Track:** Fynd Hiring Hackathon 2026 | SDET Intern Track  
**Author:** SDET Intern / QA Automation Engineer  
**Date:** November 23, 2026  

---

## 1. Objective

The objective of this test plan is to establish a rigorous, systematic, and reproducible quality assurance framework for **GameGear — Signature Edition**. The primary mission is to verify functional correctness, integer financial accuracy, client-side input validation, synchronous duplicate-order prevention, theme switching, multi-view industrial SVG rendering, and UI responsiveness under real browser interactions via 21 automated Playwright tests and exploratory manual inspection.

---

## 2. Scope & Risk Matrix

| Risk ID | Identified Risk | Impact | Likelihood | Mitigation & Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **IEEE-754 Floating-Point Calculation Drift** | High | Low | Stored and calculated strictly in integer rupees. Verified in `test_mandatory_3_quantity_calculation` and `test_regression_9_multi_product_calculation`. |
| **RSK-02** | **Duplicate Order Creation on Rapid Click** | Critical | Medium | Immediate synchronous lock (`isOrderProcessing = true; isOrderCompleted = true`) and button disabling prior to any microtask queue release. Verified in `test_regression_5_rapid_double_click_protection` and `test_sdet_21_repeated_checkout_cannot_duplicate_confirmation`. |
| **RSK-03** | **State Loss on Failed Validation** | High | Medium | Validation stops submission without resetting DOM input fields or cart array. Verified in `test_mandatory_2_required_field_validation` and `test_sdet_16_customer_info_survives_validation_failure`. |
| **RSK-04** | **Negative or Zero Quantity in Cart** | Medium | Medium | Decrement control physically disabled when quantity is 1; algorithmic guard in update function prevents `< 1`. Verified in `test_regression_7_quantity_minimum_bound`. |
| **RSK-05** | **Empty Cart Checkout Bypass** | High | Medium | Explicit validation check verifying `cart.length > 0` before allowing order reference generation. Verified in `test_regression_4_empty_cart_submission_blocked`. |
| **RSK-06** | **Missing Customer Name Bypass** | High | Low | Strict whitespace trimming (`customerName.trim()`) preventing empty or whitespace-only bypass. Verified in `test_mandatory_2_required_field_validation`. |
| **RSK-07** | **Inconsistent Duplicate Cart Items** | Medium | Low | Adding an existing item modifies existing entry quantity instead of pushing duplicate object into array. Verified in `test_regression_8_existing_product_increment`. |
| **RSK-08** | **Non-Unique / Malformed Order Reference** | High | Low | Cryptographically generated 8-character uppercase hex string prefixed with `GG-`, validated via regex. Verified in `test_sdet_20_order_reference_format`. |

---

## 3. Product Test Data & Benchmarks

| Product ID | Product Code | Product Name | Fixed Unit Price |
| :--- | :--- | :--- | :--- |
| `arc-m1-mouse` | `GG-M1-OPT` | Arc M1 Gaming Mouse | **₹1,499** |
| `forge-tkl-keyboard` | `GG-KB-TKL` | Forge TKL Mechanical Keyboard | **₹3,499** |

- Mouse &times; 1 = **₹1,499**
- Mouse &times; 2 = **₹2,998**
- Keyboard &times; 1 = **₹3,499**
- Keyboard &times; 2 = **₹6,998**
- Mouse &times; 1 + Keyboard &times; 2 = **₹8,497**

---

## 4. Test Suite Traceability (21 Automated Tests)

| # | Test Identifier | Category | Verification Scope | Status |
| :---: | :--- | :--- | :--- | :---: |
| 1 | `test_mandatory_1_successful_checkout` | Mandatory | Valid customer checkout produces order confirmation with unique `GG-XXXXXXXX` ref | **PASSED** |
| 2 | `test_mandatory_2_required_field_validation` | Mandatory | Blank required field blocks checkout & preserves cart contents | **PASSED** |
| 3 | `test_mandatory_3_quantity_calculation` | Mandatory | Changing quantity updates exact correct order total (₹6,998) | **PASSED** |
| 4 | `test_regression_4_empty_cart_submission_blocked` | Regression | Empty cart blocks checkout and shows visible alert | **PASSED** |
| 5 | `test_regression_5_rapid_double_click_protection` | Regression | Rapid double-click produces exactly 1 confirmation | **PASSED** |
| 6 | `test_regression_6_product_removal` | Regression | Product removal updates cart and order total immediately | **PASSED** |
| 7 | `test_regression_7_quantity_minimum_bound` | Regression | Decrement button disabled at quantity 1 (cannot drop below 1) | **PASSED** |
| 8 | `test_regression_8_existing_product_increment` | Regression | Adding existing product increments quantity without duplicate row | **PASSED** |
| 9 | `test_regression_9_multi_product_calculation` | Regression | Mouse &times; 1 (₹1,499) + Keyboard &times; 2 (₹6,998) = ₹8,497 | **PASSED** |
| 10 | `test_sdet_10_product_detail_panel_opens_and_closes` | SDET Extension | Technical inspection modal opens on Explore Details and closes on exit | **PASSED** |
| 11 | `test_sdet_11_product_image_view_switching` | SDET Extension | 3-view switcher updates displayed SVG technical drawing (3/4, Top, Detail) | **PASSED** |
| 12 | `test_sdet_12_cart_drawer_opens_and_closes` | SDET Extension | Slide-over cart drawer opens via nav pill and closes via close button | **PASSED** |
| 13 | `test_sdet_13_theme_toggle_changes_interface` | SDET Extension | Theme switcher toggles `data-theme` between dark and light modes | **PASSED** |
| 14 | `test_sdet_14_theme_choice_persists_after_reload` | SDET Extension | Theme choice persisted in `localStorage` survives page refresh | **PASSED** |
| 15 | `test_sdet_15_cart_count_matches_product_quantities` | SDET Extension | Cart badge count accurately reflects sum of item quantities | **PASSED** |
| 16 | `test_sdet_16_customer_info_survives_validation_failure` | SDET Extension | Customer name input survives empty-cart validation failure without wiping | **PASSED** |
| 17 | `test_sdet_17_start_new_order_resets_state` | SDET Extension | Start New Order button resets cart, form, and confirmation state | **PASSED** |
| 18 | `test_sdet_18_mobile_viewport_cart_interaction` | SDET Extension | Responsive layout and mobile drawer navigation at 390&times;844 viewport | **PASSED** |
| 19 | `test_sdet_19_keyboard_escape_closes_modal` | SDET Extension | Keyboard Escape key dismisses open product inspection modal | **PASSED** |
| 20 | `test_sdet_20_order_reference_format` | SDET Extension | Order reference strictly conforms to `^GG-[0-9A-F]{8}$` | **PASSED** |
| 21 | `test_sdet_21_repeated_checkout_cannot_duplicate_confirmation` | SDET Extension | Repeated clicks produce only 1 confirmation and lock submission | **PASSED** |

---

## 5. Exit Criteria & Quality Verification

- **100% Passing Test Suite:** All 21 Playwright tests executed and passing in headless Chromium.
- **Zero Console Errors:** Clean execution without unhandled exceptions or script errors.
- **Visual Evidence:** Genuine screenshots stored in `reports/evidence/` documenting desktop, mobile, product interaction, validation, and confirmation states.
- **Cross-Viewport Responsiveness:** Verified on 1440&times;900, 1280&times;800, 768&times;1024, and 390&times;844 viewports.

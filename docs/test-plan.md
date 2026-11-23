# Master Test Plan — GameGear 2.0 Premium Gaming Accessories Storefront

**Document Version:** 2.0  
**Project:** GameGear 2.0 Storefront & SDET Browser Automation Suite  
**Track:** Fynd Hiring Hackathon 2026 | SDET Intern Track  
**Author:** SDET Intern / QA Automation Engineer  
**Date:** November 23, 2026  

---

## 1. Objective

The objective of this test plan is to establish a rigorous, systematic, and reproducible quality assurance framework for **GameGear 2.0**, an editorial gaming peripherals storefront. The primary mission is to verify functional correctness, integer financial accuracy, client-side input validation, synchronous duplicate-order prevention, theme switching, interactive disclosures, and UI responsiveness under real browser interactions via automated Playwright tests and exploratory manual inspection.

---

## 2. Scope

### In-Scope
- **Storefront Presentation:** Two synthetic hardware peripherals (Arc M1 Mouse, Forge TKL Keyboard), bespoke vector artwork, and category badges.
- **Dynamic Interaction Engine:** Light/dark theme toggle with persistence, interactive technical specifications accordion, and toast notification feedback.
- **Cart Management:** Adding items, incrementing/decrementing quantities, deleting items, preventing zero or negative values, dynamic badge updates, and empty state representation.
- **Financial Calculations:** Precise calculation of line totals (`Unit Price × Quantity`) and aggregate order total (`Sum of Line Totals`) utilizing pure integer arithmetic.
- **Input Validation & State Preservation:** Enforcing non-empty customer name (trimming whitespace), preventing empty cart submissions, presenting accessible error alerts, and preserving cart/form contents on validation failure.
- **Checkout Process & Duplicate Guard:** Synchronous submission lock preventing double-clicks from duplicating orders, generation of cryptographically random references (`GG-XXXXXXXX`), and clean single-confirmation display.
- **Multi-Viewport Responsiveness:** Verification across Desktop (1440 × 900), Laptop (1280 × 800), and Mobile (390 × 844) viewports.
- **Browser Automation:** Automated headless execution via Python `pytest` and `Playwright` against Chromium.

### Out-of-Scope
- External payment gateways (Stripe, Razorpay, etc.).
- Backend databases or cloud infrastructure.
- User accounts or authentication systems.

---

## 3. Application Overview

GameGear 2.0 is built with vanilla HTML5, CSS3, and JavaScript, served locally via Python standard-library `ThreadingHTTPServer`. It delivers high performance, zero external framework overhead, and accessible semantic markup.

---

## 4. Test Environment

| Component | Specification |
| :--- | :--- |
| **Operating System** | Windows 11 (amd64) |
| **Runtime Environment** | Python 3.13 |
| **Automation Framework** | pytest 9.0.3 + Playwright 1.65.2 |
| **Browser Engine** | Chromium (Chrome for Testing 159.0.8154.6 headless) |
| **Local Web Server** | Python `ThreadingHTTPServer` (Ephemeral port / 4173) |
| **Target Viewports** | 1440 × 900 (Desktop), 1280 × 800 (Laptop), 390 × 844 (Mobile) |

---

## 5. Synthetic Test Data & Calculation Benchmarks

| Product ID | Product Name | Category | Fixed Unit Price |
| :--- | :--- | :--- | :--- |
| `arc-m1-mouse` | Arc M1 Gaming Mouse | Gaming Mouse | ₹1,499 |
| `forge-tkl-keyboard` | Forge TKL Mechanical Keyboard | Mechanical Keyboard | ₹3,499 |

- Mouse × 1 = **₹1,499**
- Mouse × 2 = **₹2,998**
- Keyboard × 1 = **₹3,499**
- Keyboard × 2 = **₹6,998**
- Mouse × 1 + Keyboard × 2 = **₹8,497**

---

## 6. Test Scenarios and Traceability Matrix (14 Test Cases)

### Mandatory Acceptance Scenarios
1. **TC-001 (Mandatory 1): Successful Checkout** (`test_mandatory_1_successful_checkout`) — Adding product, entering valid name, and clicking Place Order produces single confirmation with unique `GG-XXXXXXXX` reference. (**PASSED**)
2. **TC-002 (Mandatory 2): Required Customer Name Validation** (`test_mandatory_2_required_field_validation`) — Empty customer name blocks checkout, displays accessible alert, and strictly preserves cart contents. (**PASSED**)
3. **TC-003 (Mandatory 3): Quantity Calculation & Exact Total** (`test_mandatory_3_quantity_calculation`) — Incrementing Forge TKL Keyboard to 2 calculates exact ₹6,998 line and order totals. (**PASSED**)

### Extended Regression Scenarios
4. **TC-004: Empty Cart Submission Guard** (`test_regression_empty_cart_submission_blocked`) — Submitting checkout with 0 items displays validation error. (**PASSED**)
5. **TC-005: Rapid Double-Click Duplicate Protection** (`test_regression_rapid_double_click_duplicate_prevention`) — Rapid double-click generates strictly 1 confirmation and 1 order reference. (**PASSED**)
6. **TC-006: Product Removal & Recalculation** (`test_regression_product_removal`) — Removing product updates cart, line totals, and displays empty-cart state. (**PASSED**)
7. **TC-007: Quantity Minimum Boundary Guard** (`test_regression_quantity_minimum_bound`) — Decrement button disabled at quantity 1, preventing zero or negative values. (**PASSED**)
8. **TC-008: Add Existing Product Increments Quantity** (`test_regression_add_existing_product_increments_quantity`) — Adding existing item increments quantity without duplicate list rows. (**PASSED**)
9. **TC-009: Multi-Product Combined Calculation** (`test_regression_multi_product_calculation`) — Mouse × 1 + Keyboard × 2 = ₹8,497 total. (**PASSED**)

### Interaction & Responsiveness Scenarios (GameGear 2.0)
10. **TC-010: Theme Switching** (`test_interaction_theme_switching`) — Toggling theme updates `data-theme` attribute between dark and light modes. (**PASSED**)
11. **TC-011: Technical Specifications Disclosure** (`test_interaction_product_details_disclosure`) — Expanding specifications accordion displays sensor and hardware telemetry. (**PASSED**)
12. **TC-012: Toast Feedback System** (`test_interaction_toast_feedback_on_cart_addition`) — Adding product triggers non-blocking toast notification. (**PASSED**)
13. **TC-013: Mobile Navigation Drawer** (`test_interaction_mobile_navigation_drawer`) — Mobile hamburger menu toggles mobile drawer in 390 × 844 viewport. (**PASSED**)
14. **TC-014: Responsive Viewports & Visual Evidence** (`test_interaction_responsive_viewports_and_evidence`) — Validates desktop (1440px) and mobile (390px) rendering and captures authentic visual evidence. (**PASSED**)

---

## 7. Exit Criteria
- 100% of the 14 automated test cases pass with zero failures.
- Zero fatal console errors.
- Clean visual layout across desktop and mobile viewports.
- All evidence screenshots refreshed in `reports/evidence/`.

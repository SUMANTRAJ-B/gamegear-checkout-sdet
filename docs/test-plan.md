# Master Test Plan — GameGear Minimal Gaming Accessories Checkout

**Document Version:** 1.0  
**Project:** GameGear Checkout & SDET Automation Suite  
**Track:** Fynd Hiring Hackathon 2026 | SDET Intern Track  
**Author:** Senior SDET / QA Automation Engineer  
**Date:** November 23, 2026  

---

## 1. Objective

The objective of this test plan is to establish a rigorous, systematic, and reproducible quality assurance framework for the **GameGear** single-page gaming accessories storefront. The primary mission is to verify functional correctness, integer financial accuracy, client-side input validation, duplicate-order prevention, and UI accessibility under real browser interactions via automated Playwright tests and exploratory manual inspection.

---

## 2. Scope

### In-Scope
- **Storefront & Catalogue Presentation:** Verification of the two synthetic product cards, category badges, fixed pricing display, and accessible action buttons.
- **Cart Management:** Adding items, incrementing/decrementing quantities, deleting items, preventing zero or negative values, dynamic badge updates, and empty state representation.
- **Financial Calculations:** Precise calculation of line totals (`Unit Price × Quantity`) and aggregate order total (`Sum of Line Totals`) utilizing pure integer arithmetic.
- **Input Validation & State Preservation:** Enforcing non-empty customer name (trimming whitespace), preventing empty cart submissions, presenting accessible error alerts, and preserving cart/form contents on validation failure.
- **Checkout Process & Duplicate Guard:** Synchronous submission lock preventing double-clicks from duplicating orders, generation of cryptographically random references (`GG-XXXXXXXX`), and clean single-confirmation display.
- **Browser Automation:** Automated headless execution via Python `pytest` and `Playwright` against Chromium.
- **Accessibility & Diagnostics:** ARIA live region announcements, keyboard focus preservation, and zero console error enforcement.

### Out-of-Scope
- External payment gateways (Stripe, Razorpay, etc.).
- Backend databases or cloud infrastructure.
- User authentication, multi-tenant accounts, or session persistence across server restarts.
- Dynamic discounting, coupon codes, tax configurations, or shipping fee calculators.

---

## 3. Application Overview

GameGear is a modern, single-page web application built with vanilla HTML5, CSS3, and JavaScript, served locally via Python standard-library `ThreadingHTTPServer`. It provides high-performance client-side reactivity without external dependencies or heavy frontend frameworks, emphasizing pristine code organization and testability.

---

## 4. Test Environment

| Component | Specification |
| :--- | :--- |
| **Operating System** | Windows 11 (amd64) |
| **Runtime Environment** | Python 3.13 |
| **Automation Framework** | pytest 9.0.3 + Playwright 1.65.2 |
| **Browser Engine** | Chromium (Chrome for Testing 159.0.8154.6 headless) |
| **Local Web Server** | Python `http.server.ThreadingHTTPServer` (Ephemeral port / 4173) |
| **Display Viewport** | 1280 × 800 (Standard Desktop) |

---

## 5. Assumptions

1. Products and prices are strictly fixed test fixtures defined in client memory.
2. The browser supports modern Web APIs, including `window.crypto.getRandomValues()` and `Intl.NumberFormat`.
3. Financial values are represented exclusively as integers (Indian Rupees ₹) to prevent IEEE-754 floating-point inaccuracies.
4. Testing runs locally without internet connectivity requirements once Playwright browser binaries are present.

---

## 6. Key Risks and Mitigation Strategy

| Risk ID | Identified Risk | Impact | Likelihood | Mitigation & Verification Method |
| :--- | :--- | :--- | :--- | :--- |
| **RSK-01** | **IEEE-754 Floating-Point Calculation Errors** | High | Low | Pure integer arithmetic in rupees; explicit assertion across multiple quantity permutations. |
| **RSK-02** | **Duplicate Order Creation on Rapid Click** | Critical | Medium | Immediate synchronous lock (`isOrderProcessing = true; isOrderCompleted = true`) and button disabling prior to any microtask queue release. |
| **RSK-03** | **State Loss on Failed Validation** | High | Medium | Validation stops submission without resetting DOM input fields or cart array; verified in automated tests. |
| **RSK-04** | **Negative or Zero Quantity in Cart** | Medium | Medium | Decrement control physically disabled when quantity is 1; algorithmic guard in update function prevents `< 1`. |
| **RSK-05** | **Empty Cart Checkout Bypass** | High | Medium | Explicit validation check verifying `cart.length > 0` before allowing order reference generation. |
| **RSK-06** | **Missing Customer Name Bypass** | High | Low | Strict whitespace trimming (`customerName.trim()`) preventing empty or whitespace-only bypass. |
| **RSK-07** | **Inconsistent Duplicate Cart Items** | Medium | Low | Adding an existing item modifies existing entry quantity instead of pushing duplicate object into array. |
| **RSK-08** | **Non-Unique / Malformed Order Reference** | High | Low | Cryptographically generated 8-character uppercase hex string prefixed with `GG-`, validated via regex. |

---

## 7. Synthetic Test Data

| Product ID | Product Name | Category | Fixed Unit Price |
| :--- | :--- | :--- | :--- |
| `arc-m1-mouse` | Arc M1 Gaming Mouse | Gaming Mouse | ₹1,499 |
| `forge-tkl-keyboard` | Forge TKL Mechanical Keyboard | Mechanical Keyboard | ₹3,499 |

### Expected Calculation References
- Mouse × 1 = **₹1,499**
- Mouse × 2 = **₹2,998**
- Keyboard × 1 = **₹3,499**
- Keyboard × 2 = **₹6,998**
- Mouse × 1 + Keyboard × 2 = **₹8,497**

---

## 8. Test Scenarios and Traceability Matrix

### Functional Scenarios

#### TC-001: Catalogue Display Verification
- **Description:** Verify that both synthetic products are rendered with correct names, categories, descriptions, and fixed prices.
- **Preconditions:** Storefront loaded at initial URL.
- **Steps:** Inspect product catalogue grid.
- **Expected Result:** Arc M1 Gaming Mouse (₹1,499) and Forge TKL Mechanical Keyboard (₹3,499) are visible.
- **Actual Result:** Both products rendered accurately with accessible attributes.
- **Status:** PASSED.

#### TC-002: Add Existing Product to Cart
- **Description:** Verify that adding an already present item increments quantity instead of adding a new row.
- **Preconditions:** Storefront loaded with clean state.
- **Steps:** Click "Add to Cart" on Arc M1 Gaming Mouse twice.
- **Expected Result:** Exactly 1 cart row rendered with quantity = 2, line total = ₹2,998.
- **Actual Result:** Single row exists; quantity reflects 2; line total reflects ₹2,998.
- **Status:** PASSED.

#### TC-003: Product Removal from Cart
- **Description:** Verify that removing an item immediately updates the cart, line items, and aggregate total.
- **Preconditions:** Arc M1 Gaming Mouse in cart.
- **Steps:** Click "Remove Arc M1 Gaming Mouse".
- **Expected Result:** Item is removed, cart shows empty state, total is ₹0.
- **Actual Result:** Cart displays "Your cart is currently empty", order total updates to ₹0.
- **Status:** PASSED.

#### TC-004: Quantity Minimum Boundary Guard
- **Description:** Verify that item quantity cannot be reduced below 1 via decrement button.
- **Preconditions:** Forge TKL Mechanical Keyboard in cart with quantity = 1.
- **Steps:** Inspect decrement button state; click decrement button.
- **Expected Result:** Decrement button is disabled; quantity remains 1; total remains ₹3,499.
- **Actual Result:** Decrement button is disabled (`disabled="true"`); quantity strictly remains 1.
- **Status:** PASSED.

---

### Validation Test Scenarios

#### TC-005: Mandatory Test 2 — Required Customer Name Validation
- **Description:** Verify that attempting checkout with an empty customer name halts order submission and presents a clear error message.
- **Preconditions:** Arc M1 Gaming Mouse in cart; customer name field is blank.
- **Steps:** Click "Place Order".
- **Expected Result:** Checkout blocked; validation alert "Please enter your name. Customer name is required to complete checkout." appears; no order confirmation created; cart state preserved.
- **Actual Result:** Alert rendered; confirmation hidden; cart items and ₹1,499 total intact.
- **Status:** PASSED.

#### TC-006: Empty Cart Submission Guard
- **Description:** Verify that submitting checkout with zero items in cart halts order submission and displays an informative alert.
- **Preconditions:** Clean storefront; customer name filled with "Jordan Reed".
- **Steps:** Click "Place Order" with empty cart.
- **Expected Result:** Checkout blocked; validation alert "Your cart is empty. Please add at least one product before placing an order." appears; customer name preserved.
- **Actual Result:** Alert rendered; customer name preserved in input field; no order created.
- **Status:** PASSED.

---

### Calculation Test Scenarios

#### TC-007: Mandatory Test 3 — Quantity Calculation and Exact Total
- **Description:** Verify that incrementing Forge TKL Mechanical Keyboard quantity from 1 to 2 calculates exact ₹6,998 line and order totals.
- **Preconditions:** Forge TKL Mechanical Keyboard added to cart.
- **Steps:** Click "Increase quantity for Forge TKL Mechanical Keyboard".
- **Expected Result:** Displayed quantity = 2, line total = ₹6,998, order total = ₹6,998.
- **Actual Result:** Displayed quantity = 2; line total = ₹6,998; order total = ₹6,998.
- **Status:** PASSED.

#### TC-008: Multi-Item Combined Calculation
- **Description:** Verify combined arithmetic for Mouse × 1 (₹1,499) + Keyboard × 2 (₹6,998) = ₹8,497.
- **Preconditions:** Clean storefront.
- **Steps:** Add 1 Mouse, add 1 Keyboard, increment Keyboard to 2.
- **Expected Result:** Total units = 3, order total = ₹8,497.
- **Actual Result:** Units = 3, order total = ₹8,497.
- **Status:** PASSED.

---

### Browser Automation & Duplicate Prevention Scenarios

#### TC-009: Mandatory Test 1 — Successful Checkout Workflow
- **Description:** Verify complete end-to-end checkout flow for valid customer.
- **Preconditions:** Clean storefront.
- **Steps:** Add Arc M1 Gaming Mouse; enter "Alex Morgan"; click "Place Order".
- **Expected Result:** Single order confirmation rendered; customer name displayed; order reference matches format `GG-[0-9A-F]{8}`.
- **Actual Result:** Confirmation rendered; order reference `GG-XXXXXXXX` generated; customer name matches.
- **Status:** PASSED.

#### TC-010: Rapid Double-Click Duplicate Submission Protection
- **Description:** Verify that rapid sequential activations of "Place Order" produce exactly one confirmation and one reference.
- **Preconditions:** Arc M1 Gaming Mouse in cart; customer name "Taylor Swift".
- **Steps:** Execute rapid double-click on "Place Order".
- **Expected Result:** Exactly one order confirmation rendered; submission lock prevents duplicate orders.
- **Actual Result:** Synchronous guard locks execution; 1 confirmation element exists; 1 reference generated.
- **Status:** PASSED.

---

## 9. Entry and Exit Criteria

### Entry Criteria
1. Application source files (`index.html`, `styles.css`, `app.js`) are implemented.
2. Playwright Chromium browser binaries are installed.
3. Test harness starts local HTTP server on ephemeral port.

### Exit Criteria
1. 100% of mandatory acceptance tests (TC-005, TC-007, TC-009) pass.
2. 100% of extended regression tests pass.
3. Zero fatal console errors or unhandled exceptions.
4. Genuine screenshot evidence captured in `reports/evidence/`.
5. Automated test report generated from actual JUnit XML output.

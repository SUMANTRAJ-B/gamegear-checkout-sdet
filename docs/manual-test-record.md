# Manual Test Execution Record — GameGear

**Project:** GameGear — Minimal Gaming Accessories Checkout  
**Track:** Fynd Hiring Hackathon 2026 | SDET Intern Track  
**Tester:** QA Automation Engineer / SDET  
**Execution Environment:** Chromium Webview / Chrome for Testing  
**Application URL:** `http://127.0.0.1:4173`  
**Execution Date:** 2026-11-23 19:02 IST  

---

## Overview

In strict compliance with Section 11 of the Fynd Hiring Hackathon requirements, manual browser testing was performed against the running GameGear storefront application to observe user-perceived behavior under edge scenarios: an empty shopping cart submission and a rapid double-click on the "Place Order" button.

---

## MANUAL TEST 1 — Empty Shopping Cart Submission

### Scenario Details
- **Test ID:** MTC-001
- **Title:** Empty Cart Checkout Attempt
- **Date & Time:** 2026-11-23 19:02:15 IST
- **Browser:** Chromium 159.0.8154.6 / Antigravity Interactive Browser
- **Status:** **PASSED**

### Steps Actually Performed
1. Navigated to `http://127.0.0.1:4173/` in a clean browser session.
2. Verified initial application state:
   - Cart header badge: `0 items`
   - Cart item area message: `"Your cart is currently empty"`
   - Order total display: `₹0`
3. Left all products unselected (did not click "Add to Cart").
4. Focused the **Customer Name** input field and entered `"Manual Tester One"`.
5. Clicked the **Place Order** button.
6. Observed visual output, form state, and DOM changes.

### Actual Observations
- The checkout process was immediately halted.
- No order confirmation section was rendered.
- An alert container appeared directly above the action button with the message:
  > *"Your cart is empty. Please add at least one product before placing an order."*
- The customer's entered name (`"Manual Tester One"`) remained preserved in the text input without reset.
- The cart remained cleanly in its empty state with ₹0 order total.

### Evidence Location
- Automated equivalent screenshot: `reports/evidence/validation-error-state.png`

---

## MANUAL TEST 2 — Rapid Double-Click Duplicate Order Prevention

### Scenario Details
- **Test ID:** MTC-002
- **Title:** Rapid Double-Click on Place Order
- **Date & Time:** 2026-11-23 19:02:22 IST
- **Browser:** Chromium 159.0.8154.6 / Antigravity Interactive Browser
- **Status:** **PASSED**

### Steps Actually Performed
1. Navigated to `http://127.0.0.1:4173/` with clean state.
2. Clicked `"Add to Cart"` on the **Arc M1 Gaming Mouse** card.
3. Verified cart was updated to 1 item with unit price `₹1,499` and order total `₹1,499`.
4. Entered customer name `"Rapid Clicker"` into the Customer Name input field.
5. Performed a rapid double-click (`dblclick`) directly on the **Place Order** button.
6. Inspected the resulting confirmation area, DOM element counts, and generated order references.

### Actual Observations
- Exactly **one** order confirmation screen was rendered.
- Exactly **one** `<h3>Order Confirmed!</h3>` heading was present in the DOM (`confirmationHeadingsCount: 1`).
- Exactly **one** unique order reference was generated and displayed:
  - **Generated Order Reference:** `GG-B086F440`
- The confirmation card accurately displayed:
  - Customer Name: `"Rapid Clicker"`
  - Total Paid: `₹1,499`
  - Items Ordered: `1 units`
- The checkout form and Place Order button were synchronously removed from view upon initial submission acceptance, physically and logically barring duplicate order records from being created.
- A "Start New Order" secondary button appeared, allowing clean application reset.

### Evidence Location
- Live interactive session screenshot: `reports/evidence/manual-verification-double-click.png`
- Automated test verification screenshot: `reports/evidence/rapid-double-click-verification.png`

---

## Defect Log

**Defects Discovered:** 0  
*Note: In accordance with requirement Section 2.P, no defects were invented. All functional edge cases behaved as specified.*

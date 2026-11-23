# GAMEGEAR — SIGNATURE EDITION
## Precision Gaming Commerce Experience & SDET Engineering Showcase
### Fynd Hiring Hackathon 2026 | SDET Intern Track Submission

[![Playwright Tests](https://img.shields.io/badge/playwright-21%20passing-brightgreen.svg)](#16-automated-testing-instructions)
[![Pytest Suite](https://img.shields.io/badge/pytest-21%20passed-success.svg)](#16-automated-testing-instructions)
[![Python](https://img.shields.io/badge/python-3.13-blue.svg)](#10-prerequisites)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Vercel Production](https://img.shields.io/badge/Vercel-Production%20Active-black?logo=vercel)](https://gamegear-signature-edition.vercel.app)

---

## 1. Project Identity & Overview
**GAMEGEAR — SIGNATURE EDITION** is a premium gaming accessories storefront prototype and comprehensive browser test engineering showcase. Built for the **Fynd Hiring Hackathon 2026 (SDET Intern Track)**, the application combines an industrial equipment studio aesthetic with exhaustive client-side verification and 21 automated browser tests in Playwright.

- **Central Concept:** *"Precision is a feeling."*
- **Role Alignment:** SDET Intern
- **Production Live URL:** [https://gamegear-signature-edition.vercel.app](https://gamegear-signature-edition.vercel.app)
- **Core Mission:** Deliver a high-fidelity single-page storefront that embodies thoughtful industrial design principles while maintaining rigorous software quality standards, deterministic financial arithmetic, synchronous race condition guards, and reproducible visual testing evidence.

---

## 2. Design Philosophy & Industrial Language
Drawing inspiration from functionalist industrial design (Teenage Engineering, Nothing Tech, and high-end esports engineering studios), GameGear emphasizes product-first composition, technical precision, and meaningful interaction:

- **Signature Palette:**
  - **Ink:** `#171817` (Deep typographic grounding)
  - **Deep Surface:** `#202321` (Tactile component housings)
  - **Paper:** `#F2F1EC` (Warm tactile background)
  - **White Surface:** `#FAFAF7` (Clean elevation cards)
  - **Muted Text:** `#858780` (Technical specification labels)
  - **Hairline Border:** `#D9D9D1` (Architectural grid alignment)
  - **Signal Accent:** `#DB633B` (Restrained technical safety orange)
- **Multi-View Technical Artwork:** Custom, hand-crafted local SVG vector blueprints for both peripherals:
  - *Main 3/4 Isometric View*
  - *Top Plan Orthogonal View*
  - *Macro Component Architecture Detail View*
- **Restrained Geometry:** Clean hairline borders, subtle 2px–4px radiuses, technical monospace metadata tags, and deliberate negative space.
- **Zero Generic AI Clutter:** No floating glowing orbs, no heavy purple-blue gradients, no cartoonish bento cards, and no fake customer reviews.

---

## 3. Product Catalogue Data
The application features exactly two synthetic hardware peripherals with centrally fixed pricing:

| Code | Product Name | Category | Fixed Unit Price | Architecture & Demo Specifications |
| :--- | :--- | :--- | :--- | :--- |
| `GG-M1-OPT` | **Arc M1 Gaming Mouse** | Gaming Mouse | **₹1,499** | PixArt 3395 (26,000 DPI), 54g Solid Shell, 100M Optical Switches, &lt;0.2ms Wireless |
| `GG-KB-TKL` | **Forge TKL Mechanical Keyboard** | Mechanical Keyboard | **₹3,499** | Tenkeyless 87-Key, Pre-lubed Tactile (55cN), Doubleshot PBT, CNC Aluminum Top Deck |

### Calculation Benchmarks
- Mouse &times; 1 = **₹1,499**
- Mouse &times; 2 = **₹2,998**
- Keyboard &times; 1 = **₹3,499**
- Keyboard &times; 2 = **₹6,998**
- Mouse &times; 1 + Keyboard &times; 2 = **₹8,497**

---

## 4. Feature Overview

1. **Restrained Navigation & Theme Engine:**
   - Wordmark, collection anchors, engineering specs, and live cart counter.
   - Accessible Dark / Light theme switcher with persistence in `localStorage`.
   - Responsive mobile navigation drawer with hamburger toggle.
2. **Interactive Equipment Inspection Modal:**
   - Full technical inspection modal with focus trapping and backdrop dismissal.
   - Dynamic 3-view switcher: Perspective 3/4, Top Plan Blueprint, and Macro Switch Detail.
   - Direct "Add to Order" action from modal.
3. **Slide-Over Cart Drawer & On-Page Register:**
   - Slide-over drawer synchronized with the on-page order register.
   - Increment (`+`), decrement (`-`), and item removal controls.
   - Physical and logical quantity boundary preventing values below 1.
4. **Resilient Validation & Synchronous Guard:**
   - Required customer name input (whitespace trimmed, empty values blocked).
   - Preserves customer name and cart contents upon validation failure.
   - Synchronous submission lock preventing duplicate order submissions during rapid clicks.
5. **Digital Order Receipt:**
   - Formatted confirmation receipt with unique reference (`GG-XXXXXXXX`), timestamp, and allocated equipment.
   - Dedicated "Print Receipt" (`window.print()`) and "Start New Order" reset actions.

---

## 5. Technology Stack
- **Frontend Core:** HTML5 Semantic Structure, Modern CSS3 with Custom Properties, Vanilla JavaScript (ES6+). Zero third-party runtime frameworks.
- **Test Automation:** Python 3.13, `pytest` 9.0+, `playwright` 1.65+.
- **Browser Engine:** Chromium (Chrome for Testing 159.0).
- **Server:** Python Standard Library `ThreadingHTTPServer` (Ephemeral port / 4173).

---

## 6. Engineering Decisions

### 1. Integer Arithmetic for Currency
Currency calculations in GameGear are performed strictly using integer rupee units rather than IEEE-754 floating-point numbers. Floating-point arithmetic introduces well-documented precision anomalies (e.g., `0.1 + 0.2 = 0.30000000000000004`). By storing and summing prices as pure integers and formatting via `Intl.NumberFormat`, rounding drift is eliminated across all quantity permutations.

### 2. Synchronous Duplicate-Submission Protection
Rather than relying on asynchronous timeouts or debouncing delays (which leave race-condition windows open during rapid clicks), checkout submission immediately executes a synchronous lock (`isOrderProcessing = true; isOrderCompleted = true; placeOrderBtn.disabled = true;`) before releasing control to the JavaScript event loop. Any secondary click arriving in the microtask queue is immediately ignored, preventing duplicate order submissions.

### 3. Deliberate Framework-Free Architecture (No Backend)
For an SDET demonstration, external backends, Node runtimes, and database services introduce operational complexity and non-deterministic network failure modes. Operating as a pure client-side architecture served via Python's standard-library `ThreadingHTTPServer` guarantees 100% offline reproducibility and predictable automation runs.

### 4. Browser-Visible Assertions
Playwright tests interact with and assert against customer-visible elements (`get_by_role`, `get_by_label`, `get_by_text`) rather than internal state variables or volatile CSS selector chains. This ensures tests validate the application exactly as experienced by an end user or assistive technology.

### 5. Clean Browser State Isolation
Every automated test function instantiates a fresh browser context and page via the pytest `page` fixture. This guarantees zero state leakage (cart items, form values, local storage) between tests, preventing cascading test failures.

### 6. Defect Reproducibility Through Genuine Evidence
Automated tests automatically capture timestamped screenshot artifacts during execution. This provides immutable audit evidence for defect investigations and test verification without fabricating results.

---

## 7. Requirements Traceability Matrix

| Requirement | Implementation Component | Test Identifier | Evidence Artifact |
| :--- | :--- | :--- | :--- |
| **REQ-01: Successful Checkout** | `app.js::handleCheckout` | `test_mandatory_1_successful_checkout` | `checkout-success.png` |
| **REQ-02: Required Field Validation** | `app.js::validateCheckout` | `test_mandatory_2_required_field_validation` | `validation-error-state.png` |
| **REQ-03: Quantity & Line Calculation** | `app.js::calculateTotals` | `test_mandatory_3_quantity_calculation` | Pytest report / XML |
| **REQ-04: Empty Cart Blocked** | `app.js::validateCheckout` | `test_regression_4_empty_cart_submission_blocked` | Pytest report / XML |
| **REQ-05: Rapid Double-Click Lock** | `app.js::isOrderProcessing` | `test_regression_5_rapid_double_click_protection` | `rapid-double-click-verification.png` |
| **REQ-06: Product Removal & Recalc** | `app.js::removeFromCart` | `test_regression_6_product_removal` | Pytest report / XML |
| **REQ-07: Quantity Minimum Bound** | `app.js::updateQuantity` | `test_regression_7_quantity_minimum_bound` | Pytest report / XML |
| **REQ-08: Existing Item Increment** | `app.js::addToCart` | `test_regression_8_existing_product_increment` | Pytest report / XML |
| **REQ-09: Multi-Product Total** | `app.js::calculateTotals` | `test_regression_9_multi_product_calculation` | `cart-with-items.png` |
| **REQ-10: Product Detail Modal** | `app.js::openProductModal` | `test_sdet_10_product_detail_panel_opens_and_closes` | `product-interaction.png` |
| **REQ-11: Multi-View Switching** | `app.js::updateModalImage` | `test_sdet_11_product_image_view_switching` | Pytest report / XML |
| **REQ-12: Slide-Over Cart Drawer** | `app.js::openCartDrawer` | `test_sdet_12_cart_drawer_opens_and_closes` | Pytest report / XML |
| **REQ-13: Theme Switching** | `app.js::initTheme` | `test_sdet_13_theme_toggle_changes_interface` | Pytest report / XML |
| **REQ-14: Theme Persistence** | `app.js::setTheme` | `test_sdet_14_theme_choice_persists_after_reload` | Pytest report / XML |
| **REQ-15: Accurate Cart Count** | `app.js::renderCart` | `test_sdet_15_cart_count_matches_product_quantities` | Pytest report / XML |
| **REQ-16: Form State Preservation** | `app.js::validateCheckout` | `test_sdet_16_customer_info_survives_validation_failure` | Pytest report / XML |
| **REQ-17: Clean Application Reset** | `app.js::resetApplication` | `test_sdet_17_start_new_order_resets_state` | Pytest report / XML |
| **REQ-18: Mobile Viewport Layout** | `styles.css::@media (max-width: 580px)` | `test_sdet_18_mobile_viewport_cart_interaction` | `mobile-storefront.png` |
| **REQ-19: Keyboard Escape Dismissal** | `app.js::initKeyboardShortcuts` | `test_sdet_19_keyboard_escape_closes_modal` | Pytest report / XML |
| **REQ-20: Order Reference Format** | `app.js::generateOrderReference` | `test_sdet_20_order_reference_format` | Pytest report / XML |
| **REQ-21: Duplicate Order Submission Prevention** | `app.js::handleCheckout` | `test_sdet_21_repeated_checkout_cannot_duplicate_confirmation` | Pytest report / XML |

---

## 8. Installation & Execution Instructions

### Prerequisites
- Python 3.10+ (tested on Python 3.13.13)
- Windows PowerShell, macOS, or Linux Terminal

### 1. Setup Virtual Environment
```powershell
cd gamegear-checkout-sdet
python -m venv .venv
.venv\Scripts\Activate.ps1
```

### 2. Install Dependencies & Playwright Browser
```powershell
python -m pip install -r requirements.txt
python -m playwright install chromium
```

### 3. Run Application Locally
```powershell
python -m http.server 4173
```
Navigate to `http://127.0.0.1:4173` in your browser.

### 4. Execute Full 21-Test Suite & Generate Genuine Report
```powershell
python scripts/run_tests.py
```
Or execute directly via `pytest`:
```powershell
pytest -v
```

---

## 9. Verified Test Execution Summary (21 / 21 Passed)

```text
tests/test_checkout.py::test_mandatory_1_successful_checkout PASSED                     [  4%]
tests/test_checkout.py::test_mandatory_2_required_field_validation PASSED                [  9%]
tests/test_checkout.py::test_mandatory_3_quantity_calculation PASSED                    [ 14%]
tests/test_checkout.py::test_regression_4_empty_cart_submission_blocked PASSED          [ 19%]
tests/test_checkout.py::test_regression_5_rapid_double_click_protection PASSED          [ 23%]
tests/test_checkout.py::test_regression_6_product_removal PASSED                         [ 28%]
tests/test_checkout.py::test_regression_7_quantity_minimum_bound PASSED                  [ 33%]
tests/test_checkout.py::test_regression_8_existing_product_increment PASSED             [ 38%]
tests/test_checkout.py::test_regression_9_multi_product_calculation PASSED               [ 42%]
tests/test_checkout.py::test_sdet_10_product_detail_panel_opens_and_closes PASSED        [ 47%]
tests/test_checkout.py::test_sdet_11_product_image_view_switching PASSED                [ 52%]
tests/test_checkout.py::test_sdet_12_cart_drawer_opens_and_closes PASSED                [ 57%]
tests/test_checkout.py::test_sdet_13_theme_toggle_changes_interface PASSED              [ 61%]
tests/test_checkout.py::test_sdet_14_theme_choice_persists_after_reload PASSED          [ 66%]
tests/test_checkout.py::test_sdet_15_cart_count_matches_product_quantities PASSED        [ 71%]
tests/test_checkout.py::test_sdet_16_customer_info_survives_validation_failure PASSED    [ 76%]
tests/test_checkout.py::test_sdet_17_start_new_order_resets_state PASSED                [ 80%]
tests/test_checkout.py::test_sdet_18_mobile_viewport_cart_interaction PASSED           [ 85%]
tests/test_checkout.py::test_sdet_19_keyboard_escape_closes_modal PASSED                [ 90%]
tests/test_checkout.py::test_sdet_20_order_reference_format PASSED                      [ 95%]
tests/test_checkout.py::test_sdet_21_repeated_checkout_cannot_duplicate_confirmation PASSED [100%]

============================= 21 passed in 12.64s =============================
```

- **Markdown Test Report:** [`reports/test-report.md`](reports/test-report.md)
- **JUnit XML Report:** [`reports/junit.xml`](reports/junit.xml)
- **Raw Console Log:** [`reports/pytest-output.txt`](reports/pytest-output.txt)

---

## 10. Visual Evidence Showcase

All screenshots in [`reports/evidence/`](reports/evidence/) reflect authentic live browser execution:

- [`desktop-storefront.png`](reports/evidence/desktop-storefront.png): Signature Edition 1440&times;900 desktop storefront.
- [`mobile-storefront.png`](reports/evidence/mobile-storefront.png): Responsive 390&times;844 mobile layout with active drawer.
- [`product-interaction.png`](reports/evidence/product-interaction.png): Technical inspection modal with 3-view architectural gallery.
- [`cart-with-items.png`](reports/evidence/cart-with-items.png): Active shopping cart with line items and calculated totals.
- [`checkout-success.png`](reports/evidence/checkout-success.png): Mandatory Test 1 successful checkout receipt.
- [`validation-error-state.png`](reports/evidence/validation-error-state.png): Mandatory Test 2 validation feedback with preserved cart.
- [`rapid-double-click-verification.png`](reports/evidence/rapid-double-click-verification.png): Automated double-click lock proof.
- [`manual-verification-double-click.png`](reports/evidence/manual-verification-double-click.png): Host-verified manual interactive browser session.

---

## 11. Video Demonstration & Media Deliverables

A complete, high-definition (1080p @ 30fps) walkthrough of the production deployment narrated with neural AI voiceover has been produced for the Fynd Hiring Hackathon evaluation:

- **Production Walkthrough Video:** [`deliverables/gamegear-demo.mp4`](deliverables/gamegear-demo.mp4) (Full HD 1080p, burned-in subtitles, 02:11.98 duration)
- **Synchronized Subtitles:** [`deliverables/gamegear-demo.srt`](deliverables/gamegear-demo.srt)
- **Narration Script (10 Sections):** [`deliverables/voiceover-script.md`](deliverables/voiceover-script.md)
- **Custom Thumbnail:** [`deliverables/gamegear-thumbnail.png`](deliverables/gamegear-thumbnail.png)
- **Video Production Report:** [`deliverables/video-production-report.md`](deliverables/video-production-report.md)
- **Vercel Deployment Report:** [`deliverables/deployment-report.md`](deliverables/deployment-report.md)

---

## 12. Known Limitations
- **Synthetic Frontend Demonstration:** GameGear is an SDET client prototype. No real commercial transactions, payment gateway integrations, or persisted remote databases are present.
- **In-Memory Cart State:** In accordance with the no-backend requirement, refreshing the browser restarts the cart in memory (theme preferences persist via `localStorage`).

---

## 13. GitHub Repository Information
- **Repository URL:** [https://github.com/SUMANTRAJ-B/gamegear-checkout-sdet](https://github.com/SUMANTRAJ-B/gamegear-checkout-sdet)
- **Visibility:** **PUBLIC**
- **Branch:** `main`
- **License:** MIT License (Copyright &copy; 2026 SUMANTRAJ-B)

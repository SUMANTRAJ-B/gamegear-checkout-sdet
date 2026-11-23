# GameGear 2.0 — Premium Gaming Accessories Storefront & Browser Test Suite

**Fynd Hiring Hackathon 2026 | SDET Intern Track Submission**

[![Playwright Tests](https://img.shields.io/badge/playwright-14%20passing-brightgreen.svg)](#16-automated-testing-instructions)
[![Pytest Suite](https://img.shields.io/badge/pytest-14%20passed-success.svg)](#16-automated-testing-instructions)
[![Python](https://img.shields.io/badge/python-3.13-blue.svg)](#10-prerequisites)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 1. Project Title
**GameGear 2.0 — Premium Gaming Accessories Storefront and Browser Test Suite**

## 2. Project Overview
GameGear 2.0 is a premium, single-page gaming accessories storefront engineered for the **Fynd Hiring Hackathon 2026 (SDET Intern Track)**. It pairs an editorial, high-performance gaming-commerce aesthetic with systematic, reproducible browser automation testing using Python, pytest, and Playwright.

The application showcases:
- Pristine visual hierarchy, dark/light theme switching, and custom technical SVG illustrations.
- Deterministic checkout logic with strict whitespace-trimmed validation and non-destructive state preservation.
- Synchronous duplicate order submission prevention.
- Zero-floating-point financial calculations using pure integer rupee arithmetic.
- 14 automated browser checks spanning functional flows, edge cases, accessibility, and multi-viewport responsiveness.

## 3. Fynd Hackathon Context
- **Event:** Fynd Hiring Hackathon 2026
- **Track:** SDET Intern Track
- **Role Alignment:** SDET Intern / QA Automation Engineer
- **Core SDET Focus:** Systematic test automation, synchronous submission lock reliability, IEEE-754 floating-point avoidance, accessible UI locators, genuine defect reporting, and multi-viewport regression testing.

## 4. Problem Statement
E-commerce checkout interfaces commonly suffer from subtle critical defects:
1. Floating-point arithmetic rounding errors in monetary sums.
2. Inadvertent form and cart state loss upon client-side validation failures.
3. Inconsistent duplicate cart lines on repeated additions.
4. Duplicate order submissions triggered by rapid double-clicking on checkout buttons.
5. Brittle end-to-end tests reliant on hardcoded sleeps and volatile CSS selectors.

GameGear 2.0 addresses these issues with a resilient, framework-free client architecture paired with an exhaustive Playwright test harness.

## 5. GameGear 2.0 Enhancements
- **Editorial Design System:** Dark graphite and charcoal surfaces, clean light mode, and technical electric-lime accents.
- **Bespoke Hardware Artwork:** Original SVG illustrations for both peripherals featuring ergonomic contours, scroll wheels, and tenkeyless keycap assemblies.
- **Interactive Technical Disclosures:** Expandable hardware specifications (sensors, switches, keycaps, latency) on each product card.
- **Accessible Theme Manager:** Dark/Light mode toggle with persistence in `localStorage` and system theme detection.
- **Toast Feedback System:** Non-intrusive live notifications for cart interactions.
- **Responsive Mobile Navigation:** Full-width mobile navigation drawer with hamburger toggle.
- **Dynamic Shopping Cart:**
  - Increment and decrement quantity controls.
  - Hard lower bound preventing zero or negative quantities.
  - Safe line-item removal with immediate order recalculation.
  - Adding an existing item cleanly increments quantity without duplicate entries.
  - Empty cart state notification.
- **Financial Calculation Engine:**
  - Pure integer arithmetic in Indian Rupees (₹) to prevent floating-point inaccuracies.
  - Real-time line item (`Price × Qty`) and aggregate order total updates.
- **Input Validation & Form Resilience:**
  - Required customer name validation (rejecting whitespace-only submissions).
  - Preserves entered customer name and cart state after failed validation.
  - Empty-cart submission guard displaying actionable error feedback.
- **Synchronous Duplicate Order Protection:**
  - Synchronous lock preventing multiple order confirmations on rapid double-clicks.
  - Cryptographically secure unique order references (`GG-XXXXXXXX`).
  - Seamless "Start New Order" reset mechanism.

## 6. Technology Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+). Zero third-party runtime dependencies.
- **Test Automation:** Python 3.13, `pytest` 9.0+, `playwright` 1.65+.
- **Browser Automation Engine:** Chromium (Chrome for Testing 159.0).
- **Server:** Python Standard Library `ThreadingHTTPServer`.

## 7. Product Test Data
The storefront displays exactly two synthetic hardware peripherals with fixed pricing:

| Product ID | Product Name | Category | Fixed Unit Price | Key Specs |
| :--- | :--- | :--- | :--- | :--- |
| `arc-m1-mouse` | **Arc M1 Gaming Mouse** | Gaming Mouse | ₹1,499 | PixArt 3395 (26K DPI), 54g, 100M Optical Switches |
| `forge-tkl-keyboard` | **Forge TKL Mechanical Keyboard** | Mechanical Keyboard | ₹3,499 | Tenkeyless 87-Key, Pre-lubed Tactile, Doubleshot PBT |

### Standard Calculation Benchmarks
- Mouse × 1 = **₹1,499**
- Mouse × 2 = **₹2,998**
- Keyboard × 1 = **₹3,499**
- Keyboard × 2 = **₹6,998**
- Mouse × 1 + Keyboard × 2 = **₹8,497**

## 8. Application Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                       index.html                                │
│  ┌───────────────────────┐           ┌───────────────────────┐  │
│  │   Navigation & Theme  │           │   Toast Notifications │  │
│  │   - Wordmark & Menu   │           │   - Live Action Alerts│  │
│  │   - Dark/Light Toggle │           └───────────────────────┘  │
│  └───────────┬───────────┘                                      │
│              ▼                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │   Editorial Hero Section & Technical Hardware SVGs        │  │
│  └───────────────────────────┬───────────────────────────────┘  │
│                              ▼                                  │
│  ┌───────────────────────┐           ┌───────────────────────┐  │
│  │   Product Catalogue   │           │     Order Summary     │  │
│  │   - Arc M1 Mouse      │           │     - Line Breakdown  │  │
│  │   - Forge Keyboard    │           │     - Total Amount    │  │
│  │   - Spec Disclosures  │           └───────────▲───────────┘  │
│  └───────────┬───────────┘                       │              │
│              ▼                                   │              │
│  ┌───────────────────────┐                       │              │
│  │     Shopping Cart     ├───────────────────────┘              │
│  │   - Qty Controls      │                                      │
│  │   - Remove Action     │                                      │
│  └───────────┬───────────┘                                      │
│              ▼                                                  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │      Checkout Form & Synchronous Duplicate Guard           │  │
│  │      - Customer Name Validation (Whitespace Trimmed)      │  │
│  │      - Cryptographic Order Ref Generator (GG-XXXXXXXX)    │  │
│  │      - Order Confirmation & Clean Reset                   │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## 9. Project Folder Structure
```
gamegear-checkout-sdet/
│
├── index.html                   # Single-page storefront & checkout UI
├── LICENSE                      # Official MIT License (Copyright 2026 SUMANTRAJ-B)
├── README.md                    # Project documentation & execution guide
├── requirements.txt             # Python automation dependencies
├── pytest.ini                   # Pytest runner configuration
├── .gitignore                   # Repository exclusion patterns
│
├── assets/
│   ├── css/
│   │   └── styles.css           # Premium gaming-commerce design system
│   ├── js/
│   │   └── app.js               # State, arithmetic, theme & submission lock
│   └── images/
│       └── README.md            # Note on bespoke vector SVG assets
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py              # Ephemeral server fixture & browser setup
│   └── test_checkout.py         # 14 automated Playwright checks
│
├── docs/
│   ├── test-plan.md             # Formal QA test plan & risk matrix
│   └── manual-test-record.md    # Documented manual browser test runs
│
├── scripts/
│   └── run_tests.py             # Automation runner & Markdown report generator
│
└── reports/
    ├── .gitkeep
    ├── test-report.md           # Generated test execution report
    ├── junit.xml                # JUnit XML output for CI
    ├── pytest-output.txt        # Raw console log
    └── evidence/                # Authentic captured browser screenshots
        ├── README.md
        ├── desktop-storefront.png
        ├── mobile-storefront.png
        ├── product-interaction.png
        ├── cart-with-items.png
        ├── checkout-success.png
        ├── validation-error-state.png
        ├── rapid-double-click-verification.png
        └── manual-verification-double-click.png
```

## 10. Prerequisites
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Python:** Python 3.10+ (tested on Python 3.13.13).
- **Git & GitHub CLI:** Git installed with `gh` CLI.

## 11. Windows Installation Instructions
Open PowerShell or Windows Terminal in your workspace directory:
```powershell
cd gamegear-checkout-sdet
```

## 12. Virtual Environment Instructions
Create and activate an isolated virtual environment:
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

## 13. Dependency Installation
Install required testing packages:
```powershell
python -m pip install -r requirements.txt
```

## 14. Playwright Browser Installation
Download and configure the Playwright Chromium browser binary:
```powershell
python -m playwright install chromium
```

## 15. Application Execution Instructions
To run the storefront locally for exploration:
```powershell
python -m http.server 4173
```
Open your browser and navigate to:
```
http://127.0.0.1:4173
```

## 16. Automated Testing Instructions
Run the complete automated test suite and generate the genuine test report:
```powershell
python scripts/run_tests.py
```
Or run directly via `pytest`:
```powershell
pytest
```
To run only the mandatory hackathon checks:
```powershell
pytest -m mandatory
```

### Verified Automated Checks (14/14 Passed)
1. `test_mandatory_1_successful_checkout`: Valid customer checkout with order confirmation and `GG-XXXXXXXX` reference.
2. `test_mandatory_2_required_field_validation`: Blank customer name blocks checkout & preserves cart contents.
3. `test_mandatory_3_quantity_calculation`: Incrementing keyboard quantity to 2 produces exact ₹6,998 total.
4. `test_regression_empty_cart_submission_blocked`: Submitting empty cart displays validation alert.
5. `test_regression_rapid_double_click_duplicate_prevention`: Rapid double-click generates strictly 1 confirmation.
6. `test_regression_product_removal`: Removing items updates totals and displays empty state.
7. `test_regression_quantity_minimum_bound`: Decrement button disabled at quantity 1.
8. `test_regression_add_existing_product_increments_quantity`: Adding existing item increments quantity without duplicate rows.
9. `test_regression_multi_product_calculation`: Mouse × 1 + Keyboard × 2 = ₹8,497.
10. `test_interaction_theme_switching`: Light and dark theme switching with attribute toggling.
11. `test_interaction_product_details_disclosure`: Collapsible technical specs disclosure accordion.
12. `test_interaction_toast_feedback_on_cart_addition`: Non-blocking toast notification on cart additions.
13. `test_interaction_mobile_navigation_drawer`: Mobile hamburger toggle and drawer navigation.
14. `test_interaction_responsive_viewports_and_evidence`: Viewport responsiveness (desktop 1440px, mobile 390px) & evidence generation.

## 17. Manual Testing Instructions
The manual tests specified in Section 11 were performed and recorded in [`docs/manual-test-record.md`](docs/manual-test-record.md):

- **Scenario 1: Empty Shopping Cart Submission**
  - Steps: Start clean app -> Do not add products -> Enter "Manual Tester" -> Click Place Order.
  - Expected: No order created; alert *"Your cart is empty. Please add at least one product..."* displayed; name preserved.
  - Status: **PASSED**.

- **Scenario 2: Rapid Double-Click on Place Order**
  - Steps: Add Arc M1 Mouse -> Enter "Rapid Clicker" -> Rapid double-click Place Order.
  - Expected: Exactly one order confirmation rendered (`GG-B086F440`); form disabled.
  - Status: **PASSED**.

## 18. Test Report Location
- Markdown Summary: [`reports/test-report.md`](reports/test-report.md)
- JUnit XML: [`reports/junit.xml`](reports/junit.xml)
- Raw Pytest Log: [`reports/pytest-output.txt`](reports/pytest-output.txt)

## 19. Evidence Location
Authentic screenshots captured during live browser runs are located in [`reports/evidence/`](reports/evidence/):
- [`desktop-storefront.png`](reports/evidence/desktop-storefront.png): GameGear 2.0 desktop storefront.
- [`mobile-storefront.png`](reports/evidence/mobile-storefront.png): Responsive mobile storefront layout.
- [`product-interaction.png`](reports/evidence/product-interaction.png): Technical specifications disclosure expanded.
- [`cart-with-items.png`](reports/evidence/cart-with-items.png): Cart populated with multiple peripherals.
- [`checkout-success.png`](reports/evidence/checkout-success.png): Mandatory Test 1 successful checkout.
- [`validation-error-state.png`](reports/evidence/validation-error-state.png): Mandatory Test 2 validation & state preservation.
- [`rapid-double-click-verification.png`](reports/evidence/rapid-double-click-verification.png): Automated double-click lock proof.
- [`manual-verification-double-click.png`](reports/evidence/manual-verification-double-click.png): Interactive manual browser verification.

## 20. Known Limitations
- The application is a client-side single-page demonstration; refreshing the browser resets the in-memory cart state.
- No cross-device persistent cart synchronization is implemented, in accordance with the no-backend requirement.

## 21. No-Backend / No-Payment Clarification
This project is an SDET demonstration focused on frontend correctness and test automation.
- **No external backend, database, or API service is used.**
- **No payment gateway or real financial transactions take place.**
- All items, prices, and references are purely synthetic.

## 22. GitHub Repository Information
- **Repository Name:** `gamegear-checkout-sdet`
- **Repository URL:** [https://github.com/SUMANTRAJ-B/gamegear-checkout-sdet](https://github.com/SUMANTRAJ-B/gamegear-checkout-sdet)
- **Branch:** `main`
- **License:** MIT License

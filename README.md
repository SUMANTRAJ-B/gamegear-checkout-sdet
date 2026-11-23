# GameGear — Minimal Gaming Accessories Checkout & Browser Test Suite

**Fynd Hiring Hackathon 2026 | SDET Intern Track Submission**

[![Playwright Tests](https://img.shields.io/badge/playwright-passing-brightgreen.svg)](#16-automated-testing-instructions)
[![Pytest Suite](https://img.shields.io/badge/pytest-9%20passed-success.svg)](#16-automated-testing-instructions)
[![Python](https://img.shields.io/badge/python-3.13-blue.svg)](#10-prerequisites)
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](#)

---

## 1. Project Title
**GameGear — Minimal Gaming Accessories Checkout and Browser Test Suite**

## 2. Project Overview
GameGear is a minimalist, single-page gaming accessories storefront engineered to demonstrate deterministic checkout functionality, robust client-side financial calculations, synchronous duplicate-order prevention, and reproducible end-to-end browser automation testing using Python, pytest, and Playwright.

## 3. Fynd Hackathon Context
- **Event:** Fynd Hiring Hackathon 2026
- **Track:** SDET Intern Track
- **Role Alignment:** Senior Software Engineer / SDET & QA Automation Engineer
- **Focus Areas:** Test architecture, synchronous race condition handling, IEEE-754 calculation precision, accessible UI locators, genuine defect reporting, and automation harness development.

## 4. Problem Statement
E-commerce checkout interfaces frequently suffer from subtle critical defects:
1. Floating-point arithmetic rounding errors in monetary sums.
2. Form state wiping upon client-side validation failures.
3. Inconsistent duplicate cart lines on repeated additions.
4. Duplicate submissions and duplicate charges triggered by rapid double-clicking on checkout buttons.
5. Brittle end-to-end tests reliant on hardcoded sleeps and volatile CSS selectors.

GameGear solves these challenges via a resilient client architecture paired with a comprehensive Playwright automation suite.

## 5. Features
- **Curated Catalogue:** Exactly two synthetic gaming accessories with fixed rupee pricing.
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
- **Accessibility & UX:**
  - Semantic HTML5 structure with ARIA live region notifications.
  - Responsive layout optimized for desktop, tablet, and mobile.
  - Zero external image dependencies (pure inline SVGs).

## 6. Technology Stack
- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+). Zero third-party runtime frameworks.
- **Test Automation:** Python 3.13, `pytest` 9.0+, `playwright` 1.65+.
- **Browser Automation Engine:** Chromium (Chrome for Testing 159.0).
- **Server:** Python Standard Library `ThreadingHTTPServer`.

## 7. Product Test Data
The application uses centrally defined synthetic test data:

| Product ID | Product Name | Category | Fixed Unit Price |
| :--- | :--- | :--- | :--- |
| `arc-m1-mouse` | **Arc M1 Gaming Mouse** | Gaming Mouse | ₹1,499 |
| `forge-tkl-keyboard` | **Forge TKL Mechanical Keyboard** | Mechanical Keyboard | ₹3,499 |

### Standard Calculation Benchmarks
- Mouse × 1 = **₹1,499**
- Mouse × 2 = **₹2,998**
- Keyboard × 1 = **₹3,499**
- Keyboard × 2 = **₹6,998**
- Mouse × 1 + Keyboard × 2 = **₹8,497**

## 8. Application Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                       index.html                            │
│  ┌───────────────────────┐       ┌───────────────────────┐  │
│  │   Product Catalogue   │       │     Order Summary     │  │
│  │   - Arc M1 Mouse      │       │     - Line Breakdown  │  │
│  │   - Forge Keyboard    │       │     - Total Amount    │  │
│  └───────────┬───────────┘       └───────────▲───────────┘  │
│              │                               │              │
│              ▼                               │              │
│  ┌───────────────────────┐                   │              │
│  │     Shopping Cart     ├───────────────────┘              │
│  │   - Qty Controls      │                                  │
│  │   - Remove Action     │                                  │
│  └───────────┬───────────┘                                  │
│              │                                              │
│              ▼                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │      Checkout Form & Synchronous Duplicate Guard       │  │
│  │      - Customer Name Validation (Whitespace Trim)     │  │
│  │      - Cryptographic Order Ref Generator (GG-XXXX)    │  │
│  │      - Order Confirmation & Clean Reset               │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 9. Project Folder Structure
```
gamegear-checkout-sdet/
│
├── index.html                   # Single-page storefront & checkout UI
├── README.md                    # Project documentation & execution guide
├── requirements.txt             # Python automation dependencies
├── pytest.ini                   # Pytest runner configuration
├── .gitignore                   # Repository exclusion patterns
│
├── assets/
│   ├── css/
│   │   └── styles.css           # Minimal, premium styling
│   ├── js/
│   │   └── app.js               # Centralized state, calculation & guards
│   └── images/
│       └── README.md            # Note on zero external image assets
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py              # Ephemeral server fixture & browser setup
│   └── test_checkout.py         # 3 Mandatory checks + 6 regression tests
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
    ├── test-report.md           # Genuine test execution report
    ├── junit.xml                # JUnit XML output for CI
    ├── pytest-output.txt        # Raw console log
    └── evidence/                # Authentic captured screenshots
        ├── README.md
        ├── checkout-success.png
        ├── rapid-double-click-verification.png
        ├── validation-error-state.png
        └── manual-verification-double-click.png
```

## 10. Prerequisites
- **Operating System:** Windows 10/11, macOS, or Linux.
- **Python:** Python 3.10+ (tested on Python 3.13.13).
- **Node/Git:** Standard Git installed.

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
*(If PowerShell restricts script execution, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` first).*

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
To run the storefront locally for manual exploration or inspection:
```powershell
python -m http.server 4173
```
Open your browser and navigate to:
```
http://127.0.0.1:4173
```

## 16. Automated Testing Instructions
Run the complete automated test suite and generate the genuine test execution report:
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

### Verified Automated Checks (9/9 Passed)
1. `test_mandatory_1_successful_checkout`: Valid customer checkout with order confirmation and `GG-XXXXXXXX` reference.
2. `test_mandatory_2_required_field_validation`: Empty required field halts submission and preserves cart.
3. `test_mandatory_3_quantity_calculation`: Increasing keyboard quantity to 2 produces exact ₹6,998 total.
4. `test_regression_empty_cart_submission_blocked`: Submitting empty cart displays validation alert.
5. `test_regression_rapid_double_click_duplicate_prevention`: Rapid double-click generates strictly 1 confirmation.
6. `test_regression_product_removal`: Removing items updates totals and displays empty state.
7. `test_regression_quantity_minimum_bound`: Decrement button prevents quantity dropping below 1.
8. `test_regression_add_existing_product_increments_quantity`: Adding existing item increments quantity without duplicate rows.
9. `test_regression_multi_product_calculation`: Mouse × 1 + Keyboard × 2 = ₹8,497.

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
- **Initial Commit:** `Initial Fynd SDET submission - GameGear checkout and browser tests`
- **Branch:** `main`

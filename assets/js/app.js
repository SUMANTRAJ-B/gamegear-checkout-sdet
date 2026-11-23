/**
 * GAMEGEAR — SIGNATURE EDITION
 * Core Storefront, Industrial Product Models, Multi-View Gallery,
 * Cart Drawer, Inspection Modal & SDET Verification Engine
 * 
 * Central Concept: "Precision is a feeling."
 */

'use strict';

// Centrally Defined Products with Multiple Original Technical Views
const PRODUCTS = [
  {
    id: 'arc-m1-mouse',
    code: 'GG-M1-OPT',
    name: 'Arc M1 Gaming Mouse',
    category: 'Gaming Mouse',
    description: 'Precision wireless gaming mouse with ergonomic contours, optical microswitches, and zero-latency wireless connectivity. Tuned for tactile control and minimal actuation resistance.',
    price: 1499, // Integer rupee value (no floats)
    specs: [
      { label: 'Sensor Architecture', val: 'PixArt 3395 Studio Tuned' },
      { label: 'Resolution Range', val: '50 – 26,000 DPI (50 DPI Steps)' },
      { label: 'Tracking Speed & Accel', val: '650 IPS / 50G Max Acceleration' },
      { label: 'Microswitch Actuation', val: '100M Click Optical Sensors' },
      { label: 'Wireless Transmission', val: '2.4 GHz Studio-Link (<0.2ms)' },
      { label: 'Chassis Mass', val: '54g Solid Honeycomb-Free' },
      { label: 'Skate Material', val: '100% Virgin-Grade PTFE Skates' }
    ],
    views: {
      three_quarter: `
        <svg class="product-svg-icon" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Arc M1 Mouse 3/4 View">
          <defs>
            <linearGradient id="m1_3q_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--card-surface)" />
              <stop offset="100%" stop-color="var(--deep-surface)" />
            </linearGradient>
          </defs>
          <!-- Main Chassis Sculpt -->
          <path d="M 50 85 C 50 40, 95 24, 150 24 C 205 24, 225 55, 225 85 C 225 115, 205 142, 150 142 C 95 142, 50 128, 50 85 Z" 
                fill="url(#m1_3q_grad)" stroke="var(--hairline-border)" stroke-width="1.8" />
          <!-- Ergonomic Flare Ridge -->
          <path d="M 75 85 C 75 55, 115 38, 155 38 C 190 38, 208 62, 208 85 C 208 108, 190 128, 155 128 C 115 128, 75 115, 75 85 Z" 
                fill="none" stroke="var(--hairline-border)" stroke-width="1" stroke-dasharray="3 3" />
          <!-- Split Trigger Seam -->
          <line x1="150" y1="24" x2="150" y2="72" stroke="var(--hairline-border)" stroke-width="1.8" />
          <!-- Tactile Wheel Cavity & Wheel -->
          <rect x="142" y="34" width="16" height="28" rx="4" fill="var(--deep-surface)" stroke="var(--signal-accent)" stroke-width="1.5" />
          <line x1="145" y1="41" x2="155" y2="41" stroke="var(--signal-accent)" stroke-width="1.2" />
          <line x1="145" y1="48" x2="155" y2="48" stroke="var(--signal-accent)" stroke-width="1.2" />
          <line x1="145" y1="55" x2="155" y2="55" stroke="var(--signal-accent)" stroke-width="1.2" />
          <!-- DPI Switch -->
          <rect x="146" y="70" width="8" height="6" rx="1.5" fill="var(--hairline-border)" />
          <!-- Side Buttons -->
          <rect x="70" y="52" width="6" height="16" rx="2" fill="var(--signal-accent)" />
          <rect x="70" y="74" width="6" height="16" rx="2" fill="var(--hairline-border)" />
          <!-- Technical Grid Accent -->
          <circle cx="175" cy="85" r="14" stroke="var(--hairline-border)" stroke-width="0.8" stroke-dasharray="2 2" />
          <circle cx="175" cy="85" r="3" fill="var(--signal-accent)" />
          <text x="55" y="152" fill="var(--muted-text)" font-family="monospace" font-size="8">VIEW // 3/4 ISOMETRIC</text>
        </svg>
      `,
      top: `
        <svg class="product-svg-icon" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Arc M1 Mouse Top Architectural View">
          <!-- Symmetrical Plan Blueprint -->
          <rect x="25" y="20" width="210" height="120" stroke="var(--hairline-border)" stroke-width="0.75" stroke-dasharray="4 4" />
          <!-- Mouse Outer Plan Contour -->
          <path d="M 65 80 C 65 35, 100 28, 150 28 C 195 28, 215 50, 215 80 C 215 110, 195 132, 150 132 C 100 132, 65 125, 65 80 Z" 
                fill="var(--card-surface)" stroke="var(--hairline-border)" stroke-width="2" />
          <!-- Central Symmetry Axis -->
          <line x1="45" y1="80" x2="230" y2="80" stroke="var(--hairline-border)" stroke-width="0.8" stroke-dasharray="2 2" />
          <!-- Trigger Separation -->
          <line x1="145" y1="28" x2="145" y2="132" stroke="var(--hairline-border)" stroke-width="1.2" />
          <!-- Scroll Wheel in Plan View -->
          <rect x="160" y="72" width="24" height="16" rx="3" fill="var(--deep-surface)" stroke="var(--signal-accent)" stroke-width="1.5" />
          <!-- Center Sensor Crosshair Projection -->
          <circle cx="115" cy="80" r="12" stroke="var(--signal-accent)" stroke-width="1" stroke-dasharray="2 2" />
          <circle cx="115" cy="80" r="2.5" fill="var(--signal-accent)" />
          <!-- Dimensions Annotations -->
          <line x1="65" y1="145" x2="215" y2="145" stroke="var(--muted-text)" stroke-width="0.75" />
          <text x="110" y="154" fill="var(--muted-text)" font-family="monospace" font-size="7.5">LENGTH: 122 MM</text>
          <text x="30" y="32" fill="var(--muted-text)" font-family="monospace" font-size="8">VIEW // TOP PLAN</text>
        </svg>
      `,
      detail: `
        <svg class="product-svg-icon" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Arc M1 Mouse Scroll Wheel Macro Detail">
          <!-- Macro Zoom of Wheel Assembly -->
          <rect x="20" y="15" width="220" height="130" rx="3" fill="var(--deep-surface)" stroke="var(--hairline-border)" stroke-width="1" />
          <!-- Wheel Well Cutout -->
          <rect x="80" y="25" width="100" height="110" rx="6" fill="var(--card-surface)" stroke="var(--hairline-border)" stroke-width="1.5" />
          <!-- Knurled Wheel Texture Close-up -->
          <rect x="105" y="30" width="50" height="100" rx="8" fill="var(--deep-surface)" stroke="var(--signal-accent)" stroke-width="2" />
          <line x1="108" y1="45" x2="152" y2="45" stroke="var(--signal-accent)" stroke-width="2" />
          <line x1="108" y1="60" x2="152" y2="60" stroke="var(--signal-accent)" stroke-width="2" />
          <line x1="108" y1="75" x2="152" y2="75" stroke="var(--signal-accent)" stroke-width="2" />
          <line x1="108" y1="90" x2="152" y2="90" stroke="var(--signal-accent)" stroke-width="2" />
          <line x1="108" y1="105" x2="152" y2="105" stroke="var(--signal-accent)" stroke-width="2" />
          <line x1="108" y1="120" x2="152" y2="120" stroke="var(--signal-accent)" stroke-width="2" />
          <!-- Optical Encoder Axis Pin -->
          <circle cx="130" cy="80" r="6" fill="var(--hairline-border)" />
          <circle cx="130" cy="80" r="2" fill="var(--signal-accent)" />
          <text x="28" y="32" fill="var(--muted-text)" font-family="monospace" font-size="8">VIEW // MACRO WHEEL DETAIL</text>
          <text x="28" y="135" fill="var(--signal-accent)" font-family="monospace" font-size="7.5">24-STEP OPTICAL TACTILE ENCODER</text>
        </svg>
      `
    }
  },
  {
    id: 'forge-tkl-keyboard',
    code: 'GG-KB-TKL',
    name: 'Forge TKL Mechanical Keyboard',
    category: 'Mechanical Keyboard',
    description: 'Compact tenkeyless mechanical keyboard designed for gaming. Features pre-lubed tactile switches, hot-swappable PCB, acoustic silicone dampening, and CNC anodized aluminum top plate.',
    price: 3499, // Integer rupee value (no floats)
    specs: [
      { label: 'Form Factor', val: 'Tenkeyless (87 Keys / 80%)' },
      { label: 'Mechanical Switch', val: 'Custom Forge Tactile (55cN / 2.0mm)' },
      { label: 'Acoustic Structure', val: 'Dual-Layer Sound-Absorbing Silicone' },
      { label: 'Keycap Craft', val: 'Seamless Doubleshot PBT (1.5mm wall)' },
      { label: 'PCB Compatibility', val: '5-Pin Hot-Swappable North-Facing' },
      { label: 'Frame Material', val: 'CNC Machined Anodized 6063 Aluminum' },
      { label: 'Polling Frequency', val: '1,000 Hz Hardware Polling' }
    ],
    views: {
      three_quarter: `
        <svg class="product-svg-icon" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Forge TKL Keyboard 3/4 Perspective View">
          <defs>
            <linearGradient id="kb_3q_grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--card-surface)" />
              <stop offset="100%" stop-color="var(--deep-surface)" />
            </linearGradient>
          </defs>
          <!-- Aluminum Top Plate Bezel -->
          <rect x="15" y="25" width="230" height="110" rx="4" fill="url(#kb_3q_grad)" stroke="var(--hairline-border)" stroke-width="1.8" />
          <rect x="22" y="32" width="216" height="96" rx="2" fill="var(--deep-surface)" stroke="var(--hairline-border)" stroke-width="0.8" />
          
          <!-- Keycap clusters schematic -->
          <g fill="var(--card-surface)" stroke="var(--hairline-border)" stroke-width="0.7">
            <!-- Row 1 -->
            <rect x="28" y="38" width="14" height="11" rx="1" />
            <rect x="46" y="38" width="12" height="11" rx="1" />
            <rect x="61" y="38" width="12" height="11" rx="1" />
            <rect x="76" y="38" width="12" height="11" rx="1" />
            <rect x="91" y="38" width="12" height="11" rx="1" />
            <rect x="110" y="38" width="12" height="11" rx="1" />
            <rect x="125" y="38" width="12" height="11" rx="1" />
            <rect x="140" y="38" width="12" height="11" rx="1" />
            <rect x="155" y="38" width="12" height="11" rx="1" />
            <!-- Nav cluster -->
            <rect x="175" y="38" width="12" height="11" rx="1" />
            <rect x="190" y="38" width="12" height="11" rx="1" />
            <rect x="205" y="38" width="12" height="11" rx="1" fill="var(--signal-accent)" fill-opacity="0.3" stroke="var(--signal-accent)" />

            <!-- Row 2 -->
            <rect x="28" y="52" width="18" height="12" rx="1" />
            <rect x="49" y="52" width="12" height="12" rx="1" />
            <rect x="64" y="52" width="12" height="12" rx="1" />
            <rect x="79" y="52" width="12" height="12" rx="1" />
            <rect x="94" y="52" width="12" height="12" rx="1" />
            <rect x="109" y="52" width="12" height="12" rx="1" />
            <rect x="124" y="52" width="12" height="12" rx="1" />
            <rect x="139" y="52" width="12" height="12" rx="1" />
            <rect x="154" y="52" width="15" height="12" rx="1" />
            <rect x="175" y="52" width="12" height="12" rx="1" />
            <rect x="190" y="52" width="12" height="12" rx="1" />
            <rect x="205" y="52" width="12" height="12" rx="1" />

            <!-- Row 3 -->
            <rect x="28" y="67" width="20" height="12" rx="1" />
            <rect x="51" y="67" width="12" height="12" rx="1" />
            <rect x="66" y="67" width="12" height="12" rx="1" />
            <rect x="81" y="67" width="12" height="12" rx="1" />
            <rect x="96" y="67" width="12" height="12" rx="1" />
            <rect x="111" y="67" width="12" height="12" rx="1" />
            <rect x="126" y="67" width="12" height="12" rx="1" />
            <rect x="141" y="67" width="12" height="12" rx="1" />
            <rect x="156" y="67" width="14" height="12" rx="1" />

            <!-- Spacebar row -->
            <rect x="28" y="82" width="18" height="14" rx="1" />
            <rect x="49" y="82" width="14" height="14" rx="1" />
            <rect x="66" y="82" width="80" height="14" rx="1.5" fill="var(--signal-accent)" fill-opacity="0.3" stroke="var(--signal-accent)" stroke-width="1.2" />
            <rect x="149" y="82" width="14" height="14" rx="1" />
            <!-- Inverted T Arrows -->
            <rect x="190" y="82" width="12" height="12" rx="1" />
            <rect x="175" y="97" width="12" height="12" rx="1" />
            <rect x="190" y="97" width="12" height="12" rx="1" />
            <rect x="205" y="97" width="12" height="12" rx="1" />
          </g>
          <!-- Status Indicators -->
          <circle cx="178" cy="28" r="1.5" fill="var(--signal-accent)" />
          <circle cx="184" cy="28" r="1.5" fill="var(--hairline-border)" />
          <text x="28" y="148" fill="var(--muted-text)" font-family="monospace" font-size="8">VIEW // 3/4 PERSPECTIVE</text>
        </svg>
      `,
      top: `
        <svg class="product-svg-icon" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Forge TKL Keyboard Top Plan View">
          <!-- Precise Technical Plan View -->
          <rect x="15" y="22" width="230" height="116" stroke="var(--hairline-border)" stroke-width="1" />
          <!-- Inner Plate -->
          <rect x="20" y="27" width="220" height="106" fill="var(--deep-surface)" stroke="var(--hairline-border)" stroke-width="0.8" />
          <!-- Keycap Grid Matrix in True Orthogonal Plan -->
          <g fill="var(--card-surface)" stroke="var(--hairline-border)" stroke-width="0.6">
            <!-- Esc & F-Keys -->
            <rect x="25" y="32" width="14" height="12" rx="1" />
            <rect x="44" y="32" width="46" height="12" rx="1" />
            <rect x="94" y="32" width="46" height="12" rx="1" />
            <rect x="144" y="32" width="46" height="12" rx="1" />
            <rect x="195" y="32" width="40" height="12" rx="1" fill="var(--signal-accent)" fill-opacity="0.25" stroke="var(--signal-accent)" />

            <!-- Alphanumeric block boundary -->
            <rect x="25" y="48" width="165" height="50" rx="1" stroke="var(--hairline-border)" stroke-dasharray="3 3" />
            <rect x="195" y="48" width="40" height="50" rx="1" stroke="var(--hairline-border)" stroke-dasharray="3 3" />

            <!-- Spacebar Highlight -->
            <rect x="68" y="103" width="82" height="16" rx="2" fill="var(--signal-accent)" fill-opacity="0.3" stroke="var(--signal-accent)" stroke-width="1.2" />
          </g>
          <text x="25" y="148" fill="var(--muted-text)" font-family="monospace" font-size="7.5">WIDTH: 356 MM // DEPTH: 132 MM // TKL 87-KEY</text>
          <text x="25" y="18" fill="var(--muted-text)" font-family="monospace" font-size="8">VIEW // TOP PLAN BLUEPRINT</text>
        </svg>
      `,
      detail: `
        <svg class="product-svg-icon" viewBox="0 0 260 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Forge TKL Keyboard Switch & Keycap Macro Detail">
          <!-- Switch & Stem Exploded Macro Detail -->
          <rect x="20" y="15" width="220" height="130" rx="3" fill="var(--deep-surface)" stroke="var(--hairline-border)" stroke-width="1" />
          
          <!-- Keycap Cross Section -->
          <path d="M 60 40 L 80 25 L 180 25 L 200 40 L 195 55 L 65 55 Z" fill="var(--card-surface)" stroke="var(--hairline-border)" stroke-width="1.5" />
          <text x="95" y="45" fill="var(--muted-text)" font-family="monospace" font-size="7.5">DOUBLESHOT PBT CAP</text>

          <!-- Tactile Switch Housing -->
          <rect x="90" y="65" width="80" height="60" rx="4" fill="var(--card-surface)" stroke="var(--hairline-border)" stroke-width="1.5" />
          
          <!-- Tactile Orange Stem -->
          <rect x="120" y="52" width="20" height="26" rx="2" fill="var(--signal-accent)" stroke="var(--signal-accent)" stroke-width="1" />
          <rect x="115" y="56" width="30" height="6" rx="1" fill="var(--signal-accent)" />
          
          <!-- Gold Cross-Point Leaf & Spring -->
          <line x1="105" y1="80" x2="115" y2="105" stroke="var(--signal-accent)" stroke-width="1.8" />
          <line x1="125" y1="85" x2="135" y2="85" stroke="var(--hairline-border)" stroke-width="1.5" />
          <line x1="125" y1="95" x2="135" y2="95" stroke="var(--hairline-border)" stroke-width="1.5" />
          <line x1="125" y1="105" x2="135" y2="105" stroke="var(--hairline-border)" stroke-width="1.5" />

          <text x="28" y="30" fill="var(--muted-text)" font-family="monospace" font-size="8">VIEW // SWITCH MACRO ARCHITECTURE</text>
          <text x="28" y="136" fill="var(--signal-accent)" font-family="monospace" font-size="7.5">HOT-SWAP 5-PIN SOCKET &amp; 55cN TACTILE LEAF</text>
        </svg>
      `
    }
  }
];

// Centralized Application State
let cart = []; // Array of { productId: string, quantity: number }
let isOrderProcessing = false;
let isOrderCompleted = false;
let activeModalProduct = null;
let activeModalView = 'three_quarter';
let lastFocusedElement = null;

// DOM Cache
const productGridEl = document.getElementById('product-grid');
const cartContainerEl = document.getElementById('cart-container');
const cartItemCountBadgeEl = document.getElementById('cart-item-count-badge');
const cartItemCountBadgeSubEl = document.getElementById('cart-item-count-badge-sub');
const summaryBreakdownEl = document.getElementById('summary-breakdown');
const orderTotalEl = document.getElementById('order-total');
const orderTotalQtyEl = document.getElementById('order-total-qty');
const checkoutFormEl = document.getElementById('checkout-form');
const customerNameInputEl = document.getElementById('customer-name');
const validationMessageAreaEl = document.getElementById('validation-message-area');
const placeOrderBtnEl = document.getElementById('place-order-btn');
const confirmationSectionEl = document.getElementById('confirmation-section');
const srAnnouncerEl = document.getElementById('sr-announcer');
const toastContainerEl = document.getElementById('toast-container');
const themeToggleBtnEl = document.getElementById('theme-toggle');
const mobileMenuBtnEl = document.getElementById('mobile-menu-btn');
const mobileNavDrawerEl = document.getElementById('mobile-nav-drawer');

// Cart Drawer Elements
const cartDrawerEl = document.getElementById('cart-drawer');
const cartDrawerBackdropEl = document.getElementById('cart-drawer-backdrop');
const navCartBtnEl = document.getElementById('nav-cart-btn');
const cartDrawerCloseBtnEl = document.getElementById('cart-drawer-close');
const drawerCartContentEl = document.getElementById('drawer-cart-content');
const drawerOrderTotalEl = document.getElementById('drawer-order-total');
const drawerProceedBtnEl = document.getElementById('drawer-proceed-btn');

// Product Modal Elements
const productModalEl = document.getElementById('product-modal');
const productModalBackdropEl = document.getElementById('product-modal-backdrop');
const modalCloseBtnEl = document.getElementById('modal-close-btn');
const modalImageDisplayEl = document.getElementById('modal-image-display');
const modalProductCodeEl = document.getElementById('modal-product-code');
const modalProductTitleEl = document.getElementById('modal-product-title');
const modalProductPriceEl = document.getElementById('modal-product-price');
const modalProductDescEl = document.getElementById('modal-product-desc');
const modalSpecsListEl = document.getElementById('modal-specs-list');
const modalAddCartBtnEl = document.getElementById('modal-add-cart-btn');
const modalViewCaptionEl = document.getElementById('modal-view-caption');

/**
 * Currency Formatter
 * Pure integer arithmetic guarantees exact rupee sums without floating point error.
 */
function formatCurrency(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Screen Reader Live Announcer
 */
function announceToScreenReader(message) {
  if (srAnnouncerEl) {
    srAnnouncerEl.textContent = message;
  }
}

/**
 * Toast Notification System
 */
function showToast(message) {
  if (!toastContainerEl) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast-dot" aria-hidden="true"></span>
    <span>${message}</span>
  `;

  toastContainerEl.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 220);
  }, 3000);
}

/**
 * Cryptographically Secure Order Reference Generator
 * Format: GG-XXXXXXXX (8 uppercase hexadecimal characters)
 */
function generateOrderReference() {
  if (window.crypto && window.crypto.getRandomValues) {
    const array = new Uint8Array(4);
    window.crypto.getRandomValues(array);
    const hex = Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();
    return `GG-${hex}`;
  }
  const randomPart = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0').toUpperCase();
  return `GG-${randomPart}`;
}

/**
 * Calculation Engine
 * Pure integer rupee arithmetic.
 */
function calculateTotals() {
  let totalQuantity = 0;
  let orderTotal = 0;
  const lineDetails = [];

  for (const item of cart) {
    const product = PRODUCTS.find(p => p.id === item.productId);
    if (!product) continue;
    const lineTotal = product.price * item.quantity;
    totalQuantity += item.quantity;
    orderTotal += lineTotal;
    lineDetails.push({
      product,
      quantity: item.quantity,
      lineTotal
    });
  }

  return { totalQuantity, orderTotal, lineDetails };
}

/**
 * Render Product Catalogue with Card View Switchers & Modal Inspection Action
 */
function renderCatalogue() {
  if (!productGridEl) return;
  productGridEl.innerHTML = '';

  PRODUCTS.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('aria-labelledby', `product-title-${product.id}`);

    card.innerHTML = `
      <div class="card-top-meta">
        <span class="product-code">${product.code}</span>
        <span>STUDIO HARDWARE</span>
      </div>

      <div class="product-visual-wrapper" id="visual-wrapper-${product.id}" title="Click to inspect ${product.name}">
        ${product.views.three_quarter}
      </div>

      <!-- Multiple View Switcher on Card -->
      <div class="card-view-pills" role="tablist" aria-label="Views for ${product.name}">
        <button type="button" class="card-view-pill active" data-view="three_quarter" aria-label="${product.name} 3/4 perspective">3/4 View</button>
        <button type="button" class="card-view-pill" data-view="top" aria-label="${product.name} top plan view">Top View</button>
        <button type="button" class="card-view-pill" data-view="detail" aria-label="${product.name} macro detail view">Detail</button>
      </div>

      <div class="product-category">${product.category}</div>
      <h3 id="product-title-${product.id}" class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>

      <div class="product-card-actions">
        <div class="product-price-row">
          <span class="price-descriptor">Fixed Price</span>
          <span class="product-price" aria-label="Price: ${formatCurrency(product.price)}">${formatCurrency(product.price)}</span>
        </div>

        <div class="product-btn-group">
          <button 
            type="button" 
            class="btn btn-outline btn-sm explore-details-btn" 
            data-product-id="${product.id}"
            aria-label="Explore details for ${product.name}"
          >
            Explore Details
          </button>
          <button 
            type="button" 
            class="btn btn-signal btn-sm add-to-cart-btn" 
            data-product-id="${product.id}"
            aria-label="Add ${product.name}"
          >
            Add to Cart
          </button>
        </div>
      </div>
    `;

    // View Pills Listener
    const pills = card.querySelectorAll('.card-view-pill');
    const visualWrapper = card.querySelector(`#visual-wrapper-${product.id}`);
    pills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.stopPropagation();
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const viewKey = pill.getAttribute('data-view');
        if (product.views[viewKey]) {
          visualWrapper.innerHTML = product.views[viewKey];
        }
      });
    });

    // Visual click & Explore Details click opens inspection modal
    visualWrapper.addEventListener('click', () => openProductModal(product));
    const exploreBtn = card.querySelector('.explore-details-btn');
    exploreBtn.addEventListener('click', () => openProductModal(product));

    // Add to cart button
    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', () => addToCart(product.id));

    productGridEl.appendChild(card);
  });
}

/**
 * Render Shopping Cart (Both On-Page Register and Cart Drawer)
 */
function renderCart() {
  const { totalQuantity, orderTotal, lineDetails } = calculateTotals();
  const badgeLabel = `${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`;
  
  if (cartItemCountBadgeEl) cartItemCountBadgeEl.textContent = badgeLabel;
  if (cartItemCountBadgeSubEl) cartItemCountBadgeSubEl.textContent = `${totalQuantity} Selected`;
  if (drawerOrderTotalEl) drawerOrderTotalEl.textContent = formatCurrency(orderTotal);

  // Render on-page cart
  if (cartContainerEl) {
    if (cart.length === 0) {
      cartContainerEl.innerHTML = `
        <div class="empty-cart-state" id="cart-empty-state">
          <svg class="empty-cart-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="2" y="3" width="20" height="18" rx="2" />
            <line x1="2" y1="8" x2="22" y2="8" />
            <line x1="9" y1="13" x2="15" y2="13" />
          </svg>
          <p class="empty-cart-text">Your cart is currently empty</p>
          <p class="empty-cart-subtext">SELECT HARDWARE FROM THE CATALOGUE TO INITIATE AN ORDER RECORD</p>
        </div>
      `;
    } else {
      const list = document.createElement('ul');
      list.className = 'cart-items-list';
      list.setAttribute('role', 'list');

      lineDetails.forEach(({ product, quantity, lineTotal }) => {
        const li = document.createElement('li');
        li.className = 'cart-item';
        li.setAttribute('data-product-id', product.id);

        li.innerHTML = `
          <div class="cart-item-info">
            <span class="cart-item-code">${product.code}</span>
            <span class="cart-item-name">${product.name}</span>
            <span class="cart-item-unit-price">${formatCurrency(product.price)} each</span>
          </div>
          <div class="cart-qty-controls">
            <button 
              type="button" 
              class="cart-qty-btn qty-decrease-btn" 
              data-product-id="${product.id}"
              aria-label="Decrease quantity for ${product.name}"
              ${quantity <= 1 ? 'disabled' : ''}
            >
              -
            </button>
            <span class="cart-qty-value" aria-label="Quantity for ${product.name}: ${quantity}">${quantity}</span>
            <button 
              type="button" 
              class="cart-qty-btn qty-increase-btn" 
              data-product-id="${product.id}"
              aria-label="Increase quantity for ${product.name}"
            >
              +
            </button>
          </div>
          <div class="cart-item-line-total" aria-label="Line total for ${product.name}: ${formatCurrency(lineTotal)}">
            ${formatCurrency(lineTotal)}
          </div>
          <button 
            type="button" 
            class="cart-item-remove-btn" 
            data-product-id="${product.id}"
            aria-label="Remove ${product.name}"
          >
            Remove
          </button>
        `;

        li.querySelector('.qty-decrease-btn').addEventListener('click', () => updateQuantity(product.id, -1));
        li.querySelector('.qty-increase-btn').addEventListener('click', () => updateQuantity(product.id, 1));
        li.querySelector('.cart-item-remove-btn').addEventListener('click', () => removeFromCart(product.id));

        list.appendChild(li);
      });

      cartContainerEl.innerHTML = '';
      cartContainerEl.appendChild(list);
    }
  }

  // Render drawer cart clone
  if (drawerCartContentEl) {
    if (cart.length === 0) {
      drawerCartContentEl.innerHTML = `
        <div class="empty-cart-state">
          <p class="empty-cart-text">No items in cart</p>
          <p class="empty-cart-subtext">Add Arc M1 Mouse or Forge TKL Keyboard from the catalogue.</p>
        </div>
      `;
    } else {
      const drawerList = document.createElement('ul');
      drawerList.className = 'drawer-cart-items-list';
      lineDetails.forEach(({ product, quantity, lineTotal }) => {
        const itemLi = document.createElement('li');
        itemLi.className = 'drawer-cart-item';
        itemLi.innerHTML = `
          <div class="drawer-item-info">
            <span class="drawer-item-code">${product.code}</span>
            <span class="drawer-item-name">${product.name}</span>
            <span class="drawer-item-unit-price">${formatCurrency(product.price)} &times; ${quantity}</span>
          </div>
          <div class="drawer-item-line-total">${formatCurrency(lineTotal)}</div>
        `;
        drawerList.appendChild(itemLi);
      });
      drawerCartContentEl.innerHTML = '';
      drawerCartContentEl.appendChild(drawerList);
    }
  }
}

/**
 * Render Order Summary Breakdown
 */
function renderOrderSummary() {
  const { totalQuantity, orderTotal, lineDetails } = calculateTotals();

  if (orderTotalEl) orderTotalEl.textContent = formatCurrency(orderTotal);
  if (orderTotalQtyEl) orderTotalQtyEl.textContent = totalQuantity.toString();

  if (!summaryBreakdownEl) return;

  if (cart.length === 0) {
    summaryBreakdownEl.innerHTML = '<div class="summary-empty-msg" id="summary-empty-msg">No items in cart</div>';
    return;
  }

  summaryBreakdownEl.innerHTML = '';
  lineDetails.forEach(({ product, quantity, lineTotal }) => {
    const row = document.createElement('div');
    row.className = 'summary-line-item';
    row.innerHTML = `
      <span>${product.name} &times; ${quantity}</span>
      <span>${formatCurrency(lineTotal)}</span>
    `;
    summaryBreakdownEl.appendChild(row);
  });
}

/**
 * Add Product to Cart
 */
function addToCart(productId) {
  if (isOrderCompleted) return;

  const existingItem = cart.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  const product = PRODUCTS.find(p => p.id === productId);
  const name = product ? product.name : 'Hardware peripheral';

  showToast(`ADDED // ${name}`);
  announceToScreenReader(`Added ${name} to cart.`);

  clearValidationMessageIfResolved();
  renderCart();
  renderOrderSummary();
}

/**
 * Update Item Quantity
 * Boundary check guarantees quantity never drops below 1.
 */
function updateQuantity(productId, delta) {
  if (isOrderCompleted) return;

  const item = cart.find(i => i.productId === productId);
  if (!item) return;

  const nextQty = item.quantity + delta;
  if (nextQty < 1) {
    return;
  }

  item.quantity = nextQty;
  renderCart();
  renderOrderSummary();

  const product = PRODUCTS.find(p => p.id === productId);
  announceToScreenReader(`Updated quantity to ${item.quantity}.`);
}

/**
 * Remove Item from Cart
 */
function removeFromCart(productId) {
  if (isOrderCompleted) return;

  const product = PRODUCTS.find(p => p.id === productId);
  cart = cart.filter(item => item.productId !== productId);

  renderCart();
  renderOrderSummary();

  if (product) {
    showToast(`REMOVED // ${product.name}`);
    announceToScreenReader(`Removed ${product.name} from cart.`);
  }
}

/**
 * Display Validation Message
 */
function displayValidationError(message) {
  if (!validationMessageAreaEl) return;

  validationMessageAreaEl.innerHTML = `
    <div class="validation-error" id="validation-error-alert" role="alert">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <span>${message}</span>
    </div>
  `;
  announceToScreenReader(`Validation error: ${message}`);
}

/**
 * Clear Validation Messages
 */
function clearValidationError() {
  if (validationMessageAreaEl) {
    validationMessageAreaEl.innerHTML = '';
  }
  if (customerNameInputEl) {
    customerNameInputEl.classList.remove('input-error');
  }
}

function clearValidationMessageIfResolved() {
  if (!validationMessageAreaEl) return;
  const currentError = validationMessageAreaEl.querySelector('.validation-error');
  if (currentError && currentError.textContent.includes('cart is empty') && cart.length > 0) {
    clearValidationError();
  }
}

/**
 * Validate Checkout Form & Cart
 */
function validateCheckout() {
  const rawName = customerNameInputEl ? customerNameInputEl.value : '';
  const trimmedName = rawName.trim();

  // Validate cart has at least 1 item
  if (cart.length === 0) {
    if (customerNameInputEl) customerNameInputEl.classList.remove('input-error');
    return {
      isValid: false,
      message: 'Your cart is empty. Please add at least one product before placing an order.'
    };
  }

  // Validate required customer name
  if (!trimmedName) {
    if (customerNameInputEl) {
      customerNameInputEl.classList.add('input-error');
      customerNameInputEl.focus();
    }
    return {
      isValid: false,
      message: 'Please enter your name. Customer name is required to complete checkout.'
    };
  }

  if (customerNameInputEl) customerNameInputEl.classList.remove('input-error');
  return {
    isValid: true,
    customerName: trimmedName
  };
}

/**
 * Synchronous Checkout Submission Handler
 * Features robust duplicate submission protection.
 */
function handleCheckout(event) {
  if (event) {
    event.preventDefault();
  }

  // Synchronous Guard: Block if already processing or completed
  if (isOrderProcessing || isOrderCompleted) {
    return;
  }

  clearValidationError();

  const validation = validateCheckout();
  if (!validation.isValid) {
    displayValidationError(validation.message);
    // Non-destructive: form input and cart contents remain completely preserved
    return;
  }

  // Lock submission synchronously
  isOrderProcessing = true;

  try {
    const { totalQuantity, orderTotal, lineDetails } = calculateTotals();
    const orderReference = generateOrderReference();

    isOrderCompleted = true;

    // Render Order Confirmation Receipt
    displayOrderConfirmation({
      customerName: validation.customerName,
      orderReference,
      totalQuantity,
      orderTotal,
      lineDetails
    });

    if (checkoutFormEl) checkoutFormEl.style.display = 'none';
    if (placeOrderBtnEl) placeOrderBtnEl.disabled = true;

    showToast(`ORDER REGISTERED // REF: ${orderReference}`);
    announceToScreenReader(`Order placed successfully. Order reference is ${orderReference}.`);
  } finally {
    isOrderProcessing = false;
  }
}

/**
 * Display Order Confirmation Receipt (Digital Receipt)
 */
function displayOrderConfirmation({ customerName, orderReference, totalQuantity, orderTotal, lineDetails }) {
  if (!confirmationSectionEl) return;

  const timestamp = new Date().toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  const itemsHtml = lineDetails.map(({ product, quantity, lineTotal }) => `
    <div class="receipt-item-line">
      <span>${escapeHtml(product.name)} (${product.code}) &times; ${quantity}</span>
      <span>${formatCurrency(lineTotal)}</span>
    </div>
  `).join('');

  confirmationSectionEl.innerHTML = `
    <div class="receipt-header">
      <span class="receipt-badge">RECORD GENERATED // ORDER VERIFIED</span>
      <h3 class="confirmation-heading" id="confirmation-title">Order Confirmed!</h3>
      <p class="receipt-sub">Thank you, <strong>${escapeHtml(customerName)}</strong>. Your hardware record has been logged in the studio ledger.</p>
    </div>

    <div class="receipt-table">
      <div class="receipt-row">
        <span class="receipt-label">Order Reference:</span>
        <span class="receipt-val confirmation-ref" id="confirmed-order-ref">${orderReference}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Customer Name:</span>
        <span class="receipt-val" id="confirmed-customer-name">${escapeHtml(customerName)}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Timestamp:</span>
        <span class="receipt-val">${timestamp}</span>
      </div>
      <div class="receipt-row">
        <span class="receipt-label">Total Units:</span>
        <span class="receipt-val">${totalQuantity} units</span>
      </div>
    </div>

    <div class="receipt-items-block">
      <span class="specs-heading">ALLOCATED EQUIPMENT</span>
      ${itemsHtml}
    </div>

    <div class="receipt-row" style="font-size: 1.15rem; font-weight: 800; border-top: 1px solid var(--hairline-border); padding-top: 0.75rem; margin-bottom: 1.25rem;">
      <span>Total Paid:</span>
      <span style="font-family: var(--font-mono); color: var(--signal-accent);">${formatCurrency(orderTotal)}</span>
    </div>

    <div class="receipt-actions">
      <button type="button" id="print-receipt-btn" class="btn btn-outline btn-block btn-sm">
        Print Receipt
      </button>
      <button type="button" id="start-new-order-btn" class="btn btn-signal btn-block btn-sm">
        Start New Order
      </button>
    </div>
  `;

  confirmationSectionEl.style.display = 'block';

  // Attach print and start new order handlers
  const printBtn = document.getElementById('print-receipt-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => window.print());
  }

  const resetBtn = document.getElementById('start-new-order-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetApplication);
  }
}

/**
 * Reset Application to Clean Initial State
 */
function resetApplication() {
  cart = [];
  isOrderProcessing = false;
  isOrderCompleted = false;

  if (customerNameInputEl) customerNameInputEl.value = '';
  clearValidationError();

  if (confirmationSectionEl) {
    confirmationSectionEl.innerHTML = '';
    confirmationSectionEl.style.display = 'none';
  }

  if (checkoutFormEl) checkoutFormEl.style.display = 'block';
  if (placeOrderBtnEl) placeOrderBtnEl.disabled = false;

  renderCart();
  renderOrderSummary();

  showToast('STUDIO RESET // Initial Clean State');
  announceToScreenReader('Application reset to initial state.');
}

/**
 * Product Inspection Modal Manager
 */
function openProductModal(product) {
  if (!productModalEl || !productModalBackdropEl) return;
  lastFocusedElement = document.activeElement;
  activeModalProduct = product;
  activeModalView = 'three_quarter';

  modalProductCodeEl.textContent = `${product.code} //`;
  modalProductTitleEl.textContent = product.name;
  modalProductPriceEl.textContent = formatCurrency(product.price);
  modalProductDescEl.textContent = product.description;

  // Populate Specs
  modalSpecsListEl.innerHTML = product.specs.map(s => `
    <li>
      <span class="spec-k">${s.label}</span>
      <span class="spec-v">${s.val}</span>
    </li>
  `).join('');

  // Setup View Tabs
  const tabs = productModalEl.querySelectorAll('.view-tab');
  tabs.forEach(tab => {
    tab.classList.toggle('active', tab.getAttribute('data-view') === 'three_quarter');
    tab.setAttribute('aria-selected', tab.getAttribute('data-view') === 'three_quarter' ? 'true' : 'false');
  });

  updateModalImage();

  productModalEl.hidden = false;
  productModalBackdropEl.hidden = false;
  modalCloseBtnEl.focus();

  announceToScreenReader(`Opened technical inspection for ${product.name}.`);
}

function closeProductModal() {
  if (!productModalEl || !productModalBackdropEl) return;
  productModalEl.hidden = true;
  productModalBackdropEl.hidden = true;
  activeModalProduct = null;
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function updateModalImage() {
  if (!activeModalProduct || !modalImageDisplayEl) return;
  const svgContent = activeModalProduct.views[activeModalView] || activeModalProduct.views.three_quarter;
  modalImageDisplayEl.innerHTML = svgContent;
  
  const captions = {
    three_quarter: 'PERSPECTIVE: 3/4 ISOMETRIC STUDIO VIEW',
    top: 'ORTHOGONAL: TRUE TOP-DOWN BLUEPRINT PLAN',
    detail: 'MACRO: COMPONENT ARCHITECTURE & SWITCH LEAF'
  };
  if (modalViewCaptionEl) {
    modalViewCaptionEl.textContent = captions[activeModalView] || captions.three_quarter;
  }
}

function initProductModal() {
  if (!productModalEl) return;

  if (modalCloseBtnEl) modalCloseBtnEl.addEventListener('click', closeProductModal);
  if (productModalBackdropEl) productModalBackdropEl.addEventListener('click', closeProductModal);

  const tabs = productModalEl.querySelectorAll('.view-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      activeModalView = tab.getAttribute('data-view');
      updateModalImage();
    });
  });

  if (modalAddCartBtnEl) {
    modalAddCartBtnEl.addEventListener('click', () => {
      if (activeModalProduct) {
        addToCart(activeModalProduct.id);
        closeProductModal();
      }
    });
  }
}

/**
 * Slide-Over Cart Drawer Manager
 */
function openCartDrawer() {
  if (!cartDrawerEl || !cartDrawerBackdropEl) return;
  lastFocusedElement = document.activeElement;
  cartDrawerEl.hidden = false;
  cartDrawerBackdropEl.hidden = false;
  if (navCartBtnEl) navCartBtnEl.setAttribute('aria-expanded', 'true');
  if (cartDrawerCloseBtnEl) cartDrawerCloseBtnEl.focus();
}

function closeCartDrawer() {
  if (!cartDrawerEl || !cartDrawerBackdropEl) return;
  cartDrawerEl.hidden = true;
  cartDrawerBackdropEl.hidden = true;
  if (navCartBtnEl) navCartBtnEl.setAttribute('aria-expanded', 'false');
  if (lastFocusedElement) lastFocusedElement.focus();
}

function initCartDrawer() {
  if (navCartBtnEl) navCartBtnEl.addEventListener('click', openCartDrawer);
  if (cartDrawerCloseBtnEl) cartDrawerCloseBtnEl.addEventListener('click', closeCartDrawer);
  if (cartDrawerBackdropEl) cartDrawerBackdropEl.addEventListener('click', closeCartDrawer);
  if (drawerProceedBtnEl) drawerProceedBtnEl.addEventListener('click', closeCartDrawer);
}

/**
 * Global Keyboard & Modal Management (Escape Key)
 */
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (productModalEl && !productModalEl.hidden) {
        closeProductModal();
      } else if (cartDrawerEl && !cartDrawerEl.hidden) {
        closeCartDrawer();
      }
    }
  });
}

/**
 * Theme Manager
 */
function initTheme() {
  const storedTheme = localStorage.getItem('gamegear-theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  if (themeToggleBtnEl) {
    themeToggleBtnEl.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      showToast(`THEME SWITCH // ${newTheme.toUpperCase()}`);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('gamegear-theme', theme);
  } catch (e) {}
}

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  if (!mobileMenuBtnEl || !mobileNavDrawerEl) return;

  mobileMenuBtnEl.addEventListener('click', () => {
    const isExpanded = mobileMenuBtnEl.getAttribute('aria-expanded') === 'true';
    mobileMenuBtnEl.setAttribute('aria-expanded', String(!isExpanded));
    mobileNavDrawerEl.hidden = isExpanded;
  });

  const mobileLinks = mobileNavDrawerEl.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtnEl.setAttribute('aria-expanded', 'false');
      mobileNavDrawerEl.hidden = true;
    });
  });
}

/**
 * Helper to escape HTML characters
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Bootstrap Application
 */
function initApp() {
  initTheme();
  initMobileNav();
  initCartDrawer();
  initProductModal();
  initKeyboardShortcuts();

  renderCatalogue();
  renderCart();
  renderOrderSummary();

  if (checkoutFormEl) {
    checkoutFormEl.addEventListener('submit', handleCheckout);
  }

  if (customerNameInputEl) {
    customerNameInputEl.addEventListener('input', () => {
      if (customerNameInputEl.classList.contains('input-error') && customerNameInputEl.value.trim()) {
        clearValidationError();
      }
    });
  }
}

// Bootstrap
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

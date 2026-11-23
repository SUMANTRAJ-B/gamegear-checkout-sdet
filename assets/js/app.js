/**
 * GameGear 2.0 — Premium Gaming Accessories Storefront
 * Core Storefront, Cart, Theme & Interaction Engine
 * 
 * Features:
 * - Pure integer arithmetic in rupees (₹)
 * - Strict form validation with non-destructive state preservation
 * - Synchronous duplicate submission prevention
 * - Accessible Light/Dark theme manager with persistence
 * - Interactive technical specifications disclosure
 * - Toast notification feedback system
 * - Responsive mobile navigation drawer
 */

'use strict';

// Fixed Synthetic Product Catalogue with Technical Specifications
const PRODUCTS = [
  {
    id: 'arc-m1-mouse',
    name: 'Arc M1 Gaming Mouse',
    category: 'Gaming Mouse',
    description: 'Precision wireless gaming mouse with ergonomic contours, optical microswitches, and zero-latency wireless connectivity.',
    price: 1499, // Integer rupee representation
    specs: [
      { label: 'Sensor', val: 'PixArt 3395 Optical (26,000 DPI)' },
      { label: 'Weight', val: '54g Ultralight Honeycomb-Free' },
      { label: 'Switches', val: '100M Optical Microswitches' },
      { label: 'Polling Rate', val: '1,000 Hz / 1ms Latency' },
      { label: 'Battery', val: '80 Hours Continuous Play' }
    ],
    svg: `
      <svg class="product-svg-icon" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="mouseBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--bg-card)" />
            <stop offset="100%" stop-color="var(--bg-subtle)" />
          </linearGradient>
        </defs>
        <!-- Main Chassis Silhouette -->
        <path d="M 60 70 C 60 30, 95 18, 140 18 C 185 18, 205 45, 205 70 C 205 95, 185 122, 140 122 C 95 122, 60 110, 60 70 Z" 
              fill="url(#mouseBodyGrad)" stroke="var(--border-subtle)" stroke-width="2" />
        <!-- Ergonomic Palm Arc -->
        <path d="M 85 70 C 85 45, 115 32, 145 32 C 175 32, 190 52, 190 70 C 190 88, 175 108, 145 108 C 115 108, 85 95, 85 70 Z" 
              fill="none" stroke="var(--border-color)" stroke-width="1.2" stroke-dasharray="2 2" />
        <!-- Primary Left / Right Button Split Line -->
        <line x1="140" y1="18" x2="140" y2="60" stroke="var(--border-color)" stroke-width="1.8" />
        <!-- Tactile Textured Scroll Wheel -->
        <rect x="133" y="28" width="14" height="24" rx="4" fill="var(--bg-card-elevate)" stroke="var(--accent-lime)" stroke-width="1.5" />
        <line x1="135" y1="34" x2="145" y2="34" stroke="var(--accent-lime)" stroke-width="1.2" />
        <line x1="135" y1="40" x2="145" y2="40" stroke="var(--accent-lime)" stroke-width="1.2" />
        <line x1="135" y1="46" x2="145" y2="46" stroke="var(--accent-lime)" stroke-width="1.2" />
        <!-- DPI Cycle Button -->
        <rect x="136" y="58" width="8" height="6" rx="2" fill="var(--border-subtle)" />
        <!-- Side Thumb Buttons -->
        <rect x="75" y="44" width="6" height="14" rx="2" fill="var(--accent-lime)" />
        <rect x="75" y="62" width="6" height="14" rx="2" fill="var(--border-subtle)" />
        <!-- Pure PTFE Skates Indicators -->
        <path d="M 180 35 C 195 48, 195 92, 180 105" stroke="var(--border-color)" stroke-width="3" stroke-linecap="round" fill="none" />
        <!-- Technical Accent Glow Point -->
        <circle cx="160" cy="70" r="3" fill="var(--accent-lime)" />
      </svg>
    `
  },
  {
    id: 'forge-tkl-keyboard',
    name: 'Forge TKL Mechanical Keyboard',
    category: 'Mechanical Keyboard',
    description: 'Compact tenkeyless mechanical keyboard featuring pre-lubed tactile switches, hot-swappable PCB, and sound-dampening acoustic layers.',
    price: 3499, // Integer rupee representation
    specs: [
      { label: 'Layout', val: 'Tenkeyless (87 Keys / 80%)' },
      { label: 'Switches', val: 'Tactile Orange (Pre-lubed 55g)' },
      { label: 'Keycaps', val: 'Seamless Doubleshot PBT' },
      { label: 'PCB', val: 'Hot-Swappable 5-pin Sockets' },
      { label: 'Chassis', val: 'CNC Machined Anodized Aluminum' }
    ],
    svg: `
      <svg class="product-svg-icon" viewBox="0 0 240 140" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="kbBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="var(--bg-card)" />
            <stop offset="100%" stop-color="var(--bg-subtle)" />
          </linearGradient>
        </defs>
        <!-- Keyboard Outer Bezel -->
        <rect x="15" y="20" width="210" height="100" rx="8" fill="url(#kbBodyGrad)" stroke="var(--border-subtle)" stroke-width="2" />
        <rect x="22" y="26" width="196" height="88" rx="4" fill="var(--bg-card-elevate)" stroke="var(--border-color)" stroke-width="1" />
        
        <!-- Function Row Keycaps -->
        <g fill="var(--bg-card)" stroke="var(--border-color)" stroke-width="0.8">
          <rect x="28" y="32" width="14" height="10" rx="1.5" />
          <rect x="46" y="32" width="11" height="10" rx="1.5" />
          <rect x="60" y="32" width="11" height="10" rx="1.5" />
          <rect x="74" y="32" width="11" height="10" rx="1.5" />
          <rect x="88" y="32" width="11" height="10" rx="1.5" />
          <rect x="106" y="32" width="11" height="10" rx="1.5" />
          <rect x="120" y="32" width="11" height="10" rx="1.5" />
          <rect x="134" y="32" width="11" height="10" rx="1.5" />
          <rect x="148" y="32" width="11" height="10" rx="1.5" />
          <!-- TKL cluster top -->
          <rect x="168" y="32" width="11" height="10" rx="1.5" />
          <rect x="182" y="32" width="11" height="10" rx="1.5" />
          <rect x="196" y="32" width="11" height="10" rx="1.5" fill="var(--accent-lime)" fill-opacity="0.25" stroke="var(--accent-lime)" />

          <!-- Alpha Rows -->
          <rect x="28" y="46" width="16" height="11" rx="1.5" />
          <rect x="47" y="46" width="11" height="11" rx="1.5" />
          <rect x="61" y="46" width="11" height="11" rx="1.5" />
          <rect x="75" y="46" width="11" height="11" rx="1.5" />
          <rect x="89" y="46" width="11" height="11" rx="1.5" />
          <rect x="103" y="46" width="11" height="11" rx="1.5" />
          <rect x="117" y="46" width="11" height="11" rx="1.5" />
          <rect x="131" y="46" width="11" height="11" rx="1.5" />
          <rect x="145" y="46" width="14" height="11" rx="1.5" />
          <rect x="168" y="46" width="11" height="11" rx="1.5" />
          <rect x="182" y="46" width="11" height="11" rx="1.5" />
          <rect x="196" y="46" width="11" height="11" rx="1.5" />

          <!-- Home Row -->
          <rect x="28" y="61" width="18" height="11" rx="1.5" />
          <rect x="49" y="61" width="11" height="11" rx="1.5" />
          <rect x="63" y="61" width="11" height="11" rx="1.5" />
          <rect x="77" y="61" width="11" height="11" rx="1.5" />
          <rect x="91" y="61" width="11" height="11" rx="1.5" />
          <rect x="105" y="61" width="11" height="11" rx="1.5" />
          <rect x="119" y="61" width="11" height="11" rx="1.5" />
          <rect x="133" y="61" width="11" height="11" rx="1.5" />
          <rect x="147" y="61" width="12" height="11" rx="1.5" />
          <rect x="168" y="61" width="11" height="11" rx="1.5" />
          <rect x="182" y="61" width="11" height="11" rx="1.5" />
          <rect x="196" y="61" width="11" height="11" rx="1.5" />

          <!-- Bottom Row with Spacebar -->
          <rect x="28" y="76" width="18" height="12" rx="1.5" />
          <rect x="49" y="76" width="14" height="12" rx="1.5" />
          <rect x="66" y="76" width="70" height="12" rx="1.5" fill="var(--accent-lime)" fill-opacity="0.3" stroke="var(--accent-lime)" stroke-width="1.2" />
          <rect x="139" y="76" width="12" height="12" rx="1.5" />
          <rect x="154" y="76" width="12" height="12" rx="1.5" />
          <!-- Arrow Key cluster -->
          <rect x="182" y="76" width="11" height="11" rx="1.5" />
          <rect x="168" y="89" width="11" height="11" rx="1.5" />
          <rect x="182" y="89" width="11" height="11" rx="1.5" />
          <rect x="196" y="89" width="11" height="11" rx="1.5" />
        </g>
        
        <!-- Status Indicator LEDs -->
        <circle cx="160" cy="23" r="1.5" fill="var(--accent-lime)" />
        <circle cx="166" cy="23" r="1.5" fill="var(--border-subtle)" />
        <circle cx="172" cy="23" r="1.5" fill="var(--border-subtle)" />
      </svg>
    `
  }
];

// Centralized Application State
let cart = []; // Array of { productId: string, quantity: number }
let isOrderProcessing = false;
let isOrderCompleted = false;

// DOM Elements Cache
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

/**
 * Currency Formatter
 * Generates exact rupee representation formatted cleanly without decimals.
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
function showToast(message, type = 'info') {
  if (!toastContainerEl) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');

  const iconSvg = type === 'success' || type === 'info'
    ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>`
    : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `
    ${iconSvg}
    <span>${message}</span>
  `;

  toastContainerEl.appendChild(toast);

  // Auto remove after 3.2 seconds
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 250);
  }, 3200);
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
 * Pure integer arithmetic guarantees zero floating point inaccuracies.
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
 * Render Product Catalogue with Interactive Technical Disclosures
 */
function renderCatalogue() {
  if (!productGridEl) return;
  productGridEl.innerHTML = '';

  PRODUCTS.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('aria-labelledby', `product-title-${product.id}`);

    const specsHtml = product.specs.map(s => `
      <li>
        <span class="spec-label">${s.label}</span>
        <span class="spec-val">${s.val}</span>
      </li>
    `).join('');

    card.innerHTML = `
      <div class="product-visual-wrapper">
        ${product.svg}
      </div>
      <div class="product-category">${product.category}</div>
      <h3 id="product-title-${product.id}" class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      
      <!-- Interactive Technical Specifications Disclosure -->
      <details class="product-details-disclosure">
        <summary class="disclosure-summary">
          <svg class="disclosure-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <span>Technical Specifications</span>
        </summary>
        <ul class="spec-list">
          ${specsHtml}
        </ul>
      </details>

      <div class="product-footer">
        <div class="product-price-block">
          <span class="price-subtext">Fixed Unit Price</span>
          <span class="product-price" aria-label="Price: ${formatCurrency(product.price)}">${formatCurrency(product.price)}</span>
        </div>
        <button 
          type="button" 
          class="btn btn-primary btn-sm add-to-cart-btn" 
          data-product-id="${product.id}"
          aria-label="Add ${product.name}"
        >
          Add to Cart
        </button>
      </div>
    `;

    const addBtn = card.querySelector('.add-to-cart-btn');
    addBtn.addEventListener('click', () => {
      addToCart(product.id);
    });

    productGridEl.appendChild(card);
  });
}

/**
 * Render Shopping Cart
 */
function renderCart() {
  if (!cartContainerEl) return;

  const { totalQuantity, lineDetails } = calculateTotals();
  const badgeLabel = `${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`;
  if (cartItemCountBadgeEl) cartItemCountBadgeEl.textContent = badgeLabel;
  if (cartItemCountBadgeSubEl) cartItemCountBadgeSubEl.textContent = `${totalQuantity} in Cart`;

  if (cart.length === 0) {
    cartContainerEl.innerHTML = `
      <div class="empty-cart-state" id="cart-empty-state">
        <svg class="empty-cart-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p class="empty-cart-text">Your cart is currently empty</p>
        <p class="empty-cart-subtext">Add hardware from the lineup above to configure your order.</p>
      </div>
    `;
    return;
  }

  const list = document.createElement('ul');
  list.className = 'cart-items-list';
  list.setAttribute('role', 'list');

  lineDetails.forEach(({ product, quantity, lineTotal }) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.setAttribute('data-product-id', product.id);

    li.innerHTML = `
      <div class="cart-item-info">
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

    // Cart controls listeners
    const decBtn = li.querySelector('.qty-decrease-btn');
    decBtn.addEventListener('click', () => updateQuantity(product.id, -1));

    const incBtn = li.querySelector('.qty-increase-btn');
    incBtn.addEventListener('click', () => updateQuantity(product.id, 1));

    const removeBtn = li.querySelector('.cart-item-remove-btn');
    removeBtn.addEventListener('click', () => removeFromCart(product.id));

    list.appendChild(li);
  });

  cartContainerEl.innerHTML = '';
  cartContainerEl.appendChild(list);
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
  const name = product ? product.name : 'Hardware item';

  showToast(`${name} added to cart`);
  announceToScreenReader(`Added ${name} to cart.`);

  clearValidationMessageIfResolved();
  renderCart();
  renderOrderSummary();
}

/**
 * Update Item Quantity
 * Hard boundary ensures quantity never decreases below 1.
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
    showToast(`${product.name} removed from cart`);
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

/**
 * Automatically clear empty-cart error when products are added
 */
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

  // Validate cart is not empty
  if (cart.length === 0) {
    if (customerNameInputEl) customerNameInputEl.classList.remove('input-error');
    return {
      isValid: false,
      message: 'Your cart is empty. Please add at least one product before placing an order.'
    };
  }

  // Validate customer name
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
 * Synchronous guard immediately prevents race conditions or duplicate submissions.
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

    // Render Order Confirmation
    displayOrderConfirmation({
      customerName: validation.customerName,
      orderReference,
      totalQuantity,
      orderTotal,
      lineDetails
    });

    if (checkoutFormEl) checkoutFormEl.style.display = 'none';
    if (placeOrderBtnEl) placeOrderBtnEl.disabled = true;

    showToast(`Order confirmed! Ref: ${orderReference}`, 'success');
    announceToScreenReader(`Order placed successfully. Order reference is ${orderReference}.`);
  } finally {
    isOrderProcessing = false;
  }
}

/**
 * Display Order Confirmation
 */
function displayOrderConfirmation({ customerName, orderReference, totalQuantity, orderTotal, lineDetails }) {
  if (!confirmationSectionEl) return;

  const itemsBreakdownHtml = lineDetails.map(({ product, quantity, lineTotal }) => `
    <div class="confirmation-detail-row">
      <span class="confirmation-detail-label">${escapeHtml(product.name)} &times; ${quantity}</span>
      <span class="confirmation-detail-value">${formatCurrency(lineTotal)}</span>
    </div>
  `).join('');

  confirmationSectionEl.innerHTML = `
    <div class="confirmation-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <h3 class="confirmation-heading" id="confirmation-title">Order Confirmed!</h3>
    <p class="confirmation-msg">Thank you for your order, <strong>${escapeHtml(customerName)}</strong>. Your equipment is queued for packing.</p>
    
    <div class="confirmation-card">
      <div class="confirmation-detail-row">
        <span class="confirmation-detail-label">Order Reference:</span>
        <span class="confirmation-detail-value confirmation-ref" id="confirmed-order-ref">${orderReference}</span>
      </div>
      <div class="confirmation-detail-row">
        <span class="confirmation-detail-label">Customer Name:</span>
        <span class="confirmation-detail-value" id="confirmed-customer-name">${escapeHtml(customerName)}</span>
      </div>
      <div class="confirmation-detail-row">
        <span class="confirmation-detail-label">Total Units:</span>
        <span class="confirmation-detail-value">${totalQuantity} units</span>
      </div>
      ${itemsBreakdownHtml}
      <div class="confirmation-detail-row" style="font-weight: 700; color: var(--accent-lime);">
        <span class="confirmation-detail-label" style="color: var(--text-primary);">Total Paid:</span>
        <span class="confirmation-detail-value" style="font-family: var(--font-mono); color: var(--accent-lime);">${formatCurrency(orderTotal)}</span>
      </div>
    </div>

    <button type="button" id="start-new-order-btn" class="btn btn-secondary btn-block">
      Start New Order
    </button>
  `;

  confirmationSectionEl.style.display = 'block';

  const resetBtn = document.getElementById('start-new-order-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetApplication);
  }
}

/**
 * Reset Application to Clean State
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

  showToast('Storefront reset to initial state');
  announceToScreenReader('Application reset to initial state.');
}

/**
 * Theme Management
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
      showToast(`Switched to ${newTheme} theme`);
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('gamegear-theme', theme);
  } catch (e) {
    // Graceful fallback if storage disabled
  }
}

/**
 * Mobile Navigation Drawer Toggle
 */
function initMobileNav() {
  if (!mobileMenuBtnEl || !mobileNavDrawerEl) return;

  mobileMenuBtnEl.addEventListener('click', () => {
    const isExpanded = mobileMenuBtnEl.getAttribute('aria-expanded') === 'true';
    mobileMenuBtnEl.setAttribute('aria-expanded', String(!isExpanded));
    mobileNavDrawerEl.hidden = isExpanded;
  });

  // Close drawer on link click
  const mobileLinks = mobileNavDrawerEl.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtnEl.setAttribute('aria-expanded', 'false');
      mobileNavDrawerEl.hidden = true;
    });
  });
}

/**
 * Helper to escape HTML characters in user input
 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Application Bootstrap
 */
function initApp() {
  initTheme();
  initMobileNav();
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

// Bootstrap once DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

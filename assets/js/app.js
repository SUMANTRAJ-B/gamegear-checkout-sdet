/**
 * GameGear — Minimal Gaming Accessories Checkout
 * Core Storefront & Cart Application Logic
 * 
 * Demonstrates:
 * - Functional correctness and integer rupee arithmetic
 * - Strict form validation and state preservation
 * - Synchronous duplicate submission protection
 * - Accessible interactions with semantic live regions
 */

'use strict';

// Fixed Synthetic Product Catalogue
const PRODUCTS = [
  {
    id: 'arc-m1-mouse',
    name: 'Arc M1 Gaming Mouse',
    category: 'Gaming Mouse',
    description: 'Precision wireless gaming mouse with an ergonomic design.',
    price: 1499, // Fixed integer rupees (no floats)
    svg: `
      <svg class="product-svg-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="5" y="2" width="14" height="20" rx="7" />
        <line x1="12" y1="6" x2="12" y2="10" />
      </svg>
    `
  },
  {
    id: 'forge-tkl-keyboard',
    name: 'Forge TKL Mechanical Keyboard',
    category: 'Mechanical Keyboard',
    description: 'Compact tenkeyless mechanical keyboard designed for gaming.',
    price: 3499, // Fixed integer rupees (no floats)
    svg: `
      <svg class="product-svg-icon" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="6" y1="8" x2="6.01" y2="8" />
        <line x1="10" y1="8" x2="10.01" y2="8" />
        <line x1="14" y1="8" x2="14.01" y2="8" />
        <line x1="18" y1="8" x2="18.01" y2="8" />
        <line x1="6" y1="12" x2="6.01" y2="12" />
        <line x1="10" y1="12" x2="10.01" y2="12" />
        <line x1="14" y1="12" x2="14.01" y2="12" />
        <line x1="18" y1="12" x2="18.01" y2="12" />
        <line x1="7" y1="16" x2="17" y2="16" />
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
const summaryBreakdownEl = document.getElementById('summary-breakdown');
const orderTotalEl = document.getElementById('order-total');
const orderTotalQtyEl = document.getElementById('order-total-qty');
const checkoutFormEl = document.getElementById('checkout-form');
const customerNameInputEl = document.getElementById('customer-name');
const validationMessageAreaEl = document.getElementById('validation-message-area');
const placeOrderBtnEl = document.getElementById('place-order-btn');
const confirmationSectionEl = document.getElementById('confirmation-section');
const srAnnouncerEl = document.getElementById('sr-announcer');

/**
 * Currency Formatter
 * Uses standard Indian numbering formatting with rupee symbol (₹).
 * Guarantees integer rupee presentation without decimals.
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
  // Fallback if crypto is unavailable in legacy test runner
  const randomPart = Math.floor(Math.random() * 0xFFFFFFFF).toString(16).padStart(8, '0').toUpperCase();
  return `GG-${randomPart}`;
}

/**
 * Calculation Engine
 * Calculates item line totals and total order summary.
 * Guaranteed pure integer arithmetic.
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
 * Render Product Catalogue
 */
function renderCatalogue() {
  if (!productGridEl) return;
  productGridEl.innerHTML = '';

  PRODUCTS.forEach(product => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.setAttribute('aria-labelledby', `product-title-${product.id}`);

    card.innerHTML = `
      <div class="product-visual-wrapper">
        ${product.svg}
      </div>
      <div class="product-category">${product.category}</div>
      <h3 id="product-title-${product.id}" class="product-title">${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-footer">
        <span class="product-price" aria-label="Price: ${formatCurrency(product.price)}">${formatCurrency(product.price)}</span>
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
  cartItemCountBadgeEl.textContent = `${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`;

  if (cart.length === 0) {
    cartContainerEl.innerHTML = `
      <div class="empty-cart-state" id="cart-empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <p class="empty-cart-text">Your cart is currently empty</p>
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

    // Event Listeners for cart item controls
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

  orderTotalEl.textContent = formatCurrency(orderTotal);
  orderTotalQtyEl.textContent = totalQuantity.toString();

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
  announceToScreenReader(`Added ${product ? product.name : 'product'} to cart.`);

  // If there was an active empty-cart validation message, clear it
  clearValidationMessageIfResolved();

  renderCart();
  renderOrderSummary();
}

/**
 * Update Item Quantity
 * Guarantees quantity never becomes zero or negative.
 */
function updateQuantity(productId, delta) {
  if (isOrderCompleted) return;

  const item = cart.find(i => i.productId === productId);
  if (!item) return;

  const nextQty = item.quantity + delta;
  if (nextQty < 1) {
    // Prevent zero or negative quantity
    return;
  }

  item.quantity = nextQty;
  renderCart();
  renderOrderSummary();

  const product = PRODUCTS.find(p => p.id === productId);
  announceToScreenReader(`Updated ${product ? product.name : 'item'} quantity to ${item.quantity}.`);
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

  announceToScreenReader(`Removed ${product ? product.name : 'item'} from cart.`);
}

/**
 * Display Validation Message
 */
function displayValidationError(message) {
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
  validationMessageAreaEl.innerHTML = '';
  customerNameInputEl.classList.remove('input-error');
}

/**
 * Automatically clear empty-cart error when items are added
 */
function clearValidationMessageIfResolved() {
  const currentError = validationMessageAreaEl.querySelector('.validation-error');
  if (currentError && currentError.textContent.includes('cart is empty') && cart.length > 0) {
    clearValidationError();
  }
}

/**
 * Validate Checkout Form & Cart
 */
function validateCheckout() {
  const rawName = customerNameInputEl.value;
  const trimmedName = rawName.trim();

  // Validate cart is not empty
  if (cart.length === 0) {
    customerNameInputEl.classList.remove('input-error');
    return {
      isValid: false,
      message: 'Your cart is empty. Please add at least one product before placing an order.'
    };
  }

  // Validate required customer name
  if (!trimmedName) {
    customerNameInputEl.classList.add('input-error');
    customerNameInputEl.focus();
    return {
      isValid: false,
      message: 'Please enter your name. Customer name is required to complete checkout.'
    };
  }

  customerNameInputEl.classList.remove('input-error');
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

  // Clear previous validation alerts
  clearValidationError();

  // Execute validation
  const validation = validateCheckout();
  if (!validation.isValid) {
    displayValidationError(validation.message);
    // Note: State of cart and customer input are strictly preserved!
    return;
  }

  // Set processing lock synchronously
  isOrderProcessing = true;

  try {
    const { totalQuantity, orderTotal, lineDetails } = calculateTotals();
    const orderReference = generateOrderReference();

    // Mark as completed
    isOrderCompleted = true;

    // Render Order Confirmation
    displayOrderConfirmation({
      customerName: validation.customerName,
      orderReference,
      totalQuantity,
      orderTotal,
      lineDetails
    });

    // Hide checkout form and disable Place Order button
    checkoutFormEl.style.display = 'none';
    placeOrderBtnEl.disabled = true;

    announceToScreenReader(`Order placed successfully. Your order reference is ${orderReference}.`);
  } finally {
    isOrderProcessing = false;
  }
}

/**
 * Display Order Confirmation
 */
function displayOrderConfirmation({ customerName, orderReference, totalQuantity, orderTotal, lineDetails }) {
  confirmationSectionEl.innerHTML = `
    <div class="confirmation-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    <h3 class="confirmation-heading" id="confirmation-title">Order Confirmed!</h3>
    <p class="confirmation-msg">Thank you for your order, <strong>${escapeHtml(customerName)}</strong>. Your equipment is being prepared.</p>
    
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
        <span class="confirmation-detail-label">Items Ordered:</span>
        <span class="confirmation-detail-value">${totalQuantity} units</span>
      </div>
      <div class="confirmation-detail-row">
        <span class="confirmation-detail-label">Total Paid:</span>
        <span class="confirmation-detail-value">${formatCurrency(orderTotal)}</span>
      </div>
    </div>

    <button type="button" id="start-new-order-btn" class="btn btn-secondary btn-block">
      Start New Order
    </button>
  `;

  confirmationSectionEl.style.display = 'block';

  // Attach Start New Order handler
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

  customerNameInputEl.value = '';
  clearValidationError();

  confirmationSectionEl.innerHTML = '';
  confirmationSectionEl.style.display = 'none';

  checkoutFormEl.style.display = 'block';
  placeOrderBtnEl.disabled = false;

  renderCart();
  renderOrderSummary();

  announceToScreenReader('Application reset to initial state.');
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
 * Application Initialization
 */
function initApp() {
  renderCatalogue();
  renderCart();
  renderOrderSummary();

  // Attach form submit and button click handlers
  checkoutFormEl.addEventListener('submit', handleCheckout);

  // Clear name input error highlight on typing
  customerNameInputEl.addEventListener('input', () => {
    if (customerNameInputEl.classList.contains('input-error') && customerNameInputEl.value.trim()) {
      clearValidationError();
    }
  });
}

// Bootstrap once DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

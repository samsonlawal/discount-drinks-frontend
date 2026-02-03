'use strict';

const CartPageManager = (() => {
  
  // Cache DOM elements
  let elements = {};

  /**
   * Initialize DOM element cache
   * @private
   */
  const cacheDOMElements = () => {
    elements = {
      emptyCart: document.querySelector('[data-empty-cart]'),
      cartItemsWrapper: document.querySelector('[data-cart-items-wrapper]'),
      cartItemsList: document.querySelector('[data-cart-items-list]'),
      cartSummary: document.querySelector('[data-cart-summary]'),
      totalItems: document.querySelector('[data-total-items]'),
      subtotal: document.querySelector('[data-subtotal]'),
      tax: document.querySelector('[data-tax]'),
      total: document.querySelector('[data-total]'),
      clearCartBtn: document.querySelector('[data-clear-cart]'),
      checkoutBtn: document.querySelector('[data-checkout]'),
      cartBadge: document.querySelector('[data-cart-count]')
    };
  };

  /**
   * Format price with currency symbol
   * @private
   */
  const formatPrice = (price) => {
    return `£${parseFloat(price).toFixed(2)}`;
  };

  /**
   * Sanitize HTML to prevent XSS
   * @private
   */
  const sanitizeHTML = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  /**
   * Create cart item HTML element
   * @private
   */
  const createCartItemElement = (item) => {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.dataset.productId = item.id;

    // Create elements using DOM methods (no innerHTML for security)
    const article = document.createElement('article');
    article.className = 'cart-item-card';

    // Image section
    const figure = document.createElement('figure');
    figure.className = 'cart-item-image';
    
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = sanitizeHTML(item.name);
    img.loading = 'lazy';
    img.width = 120;
    img.height = 155;
    
    figure.appendChild(img);

    // Content section
    const content = document.createElement('div');
    content.className = 'cart-item-content';

    // Title
    const title = document.createElement('h3');
    title.className = 'cart-item-title';
    title.textContent = sanitizeHTML(item.name);

    // Price
    const priceEl = document.createElement('p');
    priceEl.className = 'cart-item-price';
    priceEl.textContent = formatPrice(item.price);

    // Quantity controls
    const quantityControls = document.createElement('div');
    quantityControls.className = 'quantity-controls';

    const decreaseBtn = document.createElement('button');
    decreaseBtn.className = 'quantity-btn quantity-btn--decrease';
    decreaseBtn.setAttribute('aria-label', `Decrease quantity of ${sanitizeHTML(item.name)}`);
    decreaseBtn.dataset.action = 'decrease';
    decreaseBtn.dataset.productId = item.id;
    decreaseBtn.innerHTML = '<ion-icon name="remove-outline"></ion-icon>';

    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.className = 'quantity-input';
    quantityInput.value = item.quantity;
    quantityInput.min = '1';
    quantityInput.max = '99';
    quantityInput.setAttribute('aria-label', `Quantity of ${sanitizeHTML(item.name)}`);
    quantityInput.dataset.productId = item.id;

    const increaseBtn = document.createElement('button');
    increaseBtn.className = 'quantity-btn quantity-btn--increase';
    increaseBtn.setAttribute('aria-label', `Increase quantity of ${sanitizeHTML(item.name)}`);
    increaseBtn.dataset.action = 'increase';
    increaseBtn.dataset.productId = item.id;
    increaseBtn.innerHTML = '<ion-icon name="add-outline"></ion-icon>';

    quantityControls.appendChild(decreaseBtn);
    quantityControls.appendChild(quantityInput);
    quantityControls.appendChild(increaseBtn);

    // Actions section
    const actions = document.createElement('div');
    actions.className = 'cart-item-actions';

    // Item total
    const itemTotal = document.createElement('p');
    itemTotal.className = 'cart-item-total';
    itemTotal.textContent = formatPrice(item.price * item.quantity);
    itemTotal.dataset.itemTotal = '';
    itemTotal.dataset.productId = item.id;

    // Remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'btn-remove';
    removeBtn.setAttribute('aria-label', `Remove ${sanitizeHTML(item.name)} from cart`);
    removeBtn.dataset.remove = '';
    removeBtn.dataset.productId = item.id;
    removeBtn.innerHTML = '<ion-icon name="trash-outline"></ion-icon><span>Remove</span>';

    actions.appendChild(itemTotal);
    actions.appendChild(removeBtn);

    // Assemble content
    content.appendChild(title);
    content.appendChild(priceEl);
    content.appendChild(quantityControls);

    // Assemble article
    article.appendChild(figure);
    article.appendChild(content);
    article.appendChild(actions);

    li.appendChild(article);

    return li;
  };

  /**
   * Render cart items
   * @private
   */
  const renderCartItems = () => {
    const cart = window.CartManager.getCart();

    if (cart.length === 0) {
      showEmptyCart();
      return;
    }

    showCartContent();

    // Clear existing items
    elements.cartItemsList.textContent = '';

    // Create and append cart items
    const fragment = document.createDocumentFragment();
    cart.forEach(item => {
      const itemElement = createCartItemElement(item);
      fragment.appendChild(itemElement);
    });

    elements.cartItemsList.appendChild(fragment);
  };

  /**
   * Update cart summary
   * @private
   */
  const updateCartSummary = () => {
    const totals = window.CartManager.getCartTotals();

    elements.subtotal.textContent = formatPrice(totals.subtotal);
    elements.tax.textContent = formatPrice(totals.tax);
    elements.total.textContent = formatPrice(totals.total);
    elements.totalItems.textContent = totals.itemCount;

    if (elements.cartBadge) {
      elements.cartBadge.textContent = totals.itemCount;
    }
  };

  /**
   * Update single item total
   * @private
   */
  const updateItemTotal = (productId) => {
    const cart = window.CartManager.getCart();
    const item = cart.find(i => i.id === productId);
    
    if (!item) return;

    const itemTotalEl = document.querySelector(`[data-item-total][data-product-id="${productId}"]`);
    if (itemTotalEl) {
      itemTotalEl.textContent = formatPrice(item.price * item.quantity);
    }
  };

  /**
   * Show empty cart state
   * @private
   */
  const showEmptyCart = () => {
    elements.emptyCart.style.display = 'flex';
    elements.cartItemsWrapper.style.display = 'none';
    elements.cartSummary.style.display = 'none';
  };

  /**
   * Show cart content
   * @private
   */
  const showCartContent = () => {
    elements.emptyCart.style.display = 'none';
    elements.cartItemsWrapper.style.display = 'block';
    elements.cartSummary.style.display = 'block';
  };

  /**
   * Handle quantity button clicks
   * @private
   */
  const handleQuantityButton = (event) => {
    const btn = event.target.closest('.quantity-btn');
    if (!btn) return;

    const productId = btn.dataset.productId;
    const action = btn.dataset.action;
    const input = document.querySelector(`.quantity-input[data-product-id="${productId}"]`);
    
    if (!input) return;

    let newQuantity = parseInt(input.value, 10);

    if (action === 'increase') {
      newQuantity += 1;
    } else if (action === 'decrease') {
      newQuantity -= 1;
    }

    // Validate and update
    if (newQuantity >= 1 && newQuantity <= 99) {
      input.value = newQuantity;
      const result = window.CartManager.updateQuantity(productId, newQuantity);
      
      if (result.success) {
        updateItemTotal(productId);
        updateCartSummary();
      } else {
        window.UIController.showNotification(result.error, 'error');
        // Revert input value
        const cart = window.CartManager.getCart();
        const item = cart.find(i => i.id === productId);
        if (item) input.value = item.quantity;
      }
    }
  };

  /**
   * Handle quantity input change
   * @private
   */
  const handleQuantityInput = (event) => {
    const input = event.target.closest('.quantity-input');
    if (!input) return;

    const productId = input.dataset.productId;
    const newQuantity = parseInt(input.value, 10);

    // Debounce to avoid excessive updates
    clearTimeout(input.debounceTimer);
    input.debounceTimer = setTimeout(() => {
      const result = window.CartManager.updateQuantity(productId, newQuantity);
      
      if (result.success) {
        updateItemTotal(productId);
        updateCartSummary();
      } else {
        window.UIController.showNotification(result.error, 'error');
        // Revert to valid value
        const cart = window.CartManager.getCart();
        const item = cart.find(i => i.id === productId);
        if (item) input.value = item.quantity;
      }
    }, 500);
  };

  /**
   * Handle remove item
   * @private
   */
  const handleRemoveItem = (event) => {
    const btn = event.target.closest('[data-remove]');
    if (!btn) return;

    const productId = btn.dataset.productId;
    
    // Confirm removal
    if (confirm('Are you sure you want to remove this item?')) {
      const result = window.CartManager.removeFromCart(productId);
      
      if (result.success) {
        // Animate out
        const item = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
        if (item) {
          item.classList.add('cart-item--removing');
          setTimeout(() => {
            renderCartItems();
            updateCartSummary();
          }, 300);
        }
        
        window.UIController.showNotification('Item removed from cart', 'success');
      } else {
        window.UIController.showNotification(result.error, 'error');
      }
    }
  };

  /**
   * Handle clear cart
   * @private
   */
  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your entire cart?')) {
      const result = window.CartManager.clearCart();
      
      if (result.success) {
        renderCartItems();
        updateCartSummary();
        window.UIController.showNotification('Cart cleared', 'success');
      } else {
        window.UIController.showNotification(result.error, 'error');
      }
    }
  };

  /**
   * Handle checkout
   * @private
   */
  const handleCheckout = () => {
    const cart = window.CartManager.getCart();
    
    if (cart.length === 0) {
      window.UIController.showNotification('Your cart is empty', 'error');
      return;
    }

    // In production, this would redirect to checkout page
    window.UIController.showNotification('Proceeding to checkout...', 'success');
    
    // Simulate checkout redirect
    setTimeout(() => {
      alert('Checkout functionality would be implemented here.\n\nThis is a demo cart system.');
    }, 1000);
  };

  /**
   * Handle cart updates from other pages
   * @private
   */
  const handleCartUpdate = () => {
    renderCartItems();
    updateCartSummary();
  };

  /**
   * Initialize event listeners
   * @private
   */
  const initEventListeners = () => {
    // Quantity buttons
    document.addEventListener('click', handleQuantityButton);

    // Quantity input
    document.addEventListener('input', handleQuantityInput);

    // Remove item
    document.addEventListener('click', handleRemoveItem);

    // Clear cart
    if (elements.clearCartBtn) {
      elements.clearCartBtn.addEventListener('click', handleClearCart);
    }

    // Checkout
    if (elements.checkoutBtn) {
      elements.checkoutBtn.addEventListener('click', handleCheckout);
    }

    // Listen for cart updates
    window.addEventListener('cartUpdated', handleCartUpdate);
  };

  /**
   * Initialize cart page
   * @public
   */
  const init = () => {
    // Ensure CartManager is available
    if (!window.CartManager) {
      console.error('CartManager not found. Make sure main.js is loaded first.');
      return;
    }

    cacheDOMElements();
    renderCartItems();
    updateCartSummary();
    initEventListeners();
  };

  return { init };
})();

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', CartPageManager.init);
} else {
  CartPageManager.init();
}
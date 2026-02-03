'use strict';

/**
 * ECOMMERCE CART SYSTEM
 * Production-ready cart management with security & validation
 * Version: 1.0.0
 */

// ============================================
// CONSTANTS & CONFIGURATION
// ============================================

const CART_CONFIG = {
  STORAGE_KEY: 'discount_drinks_cart_v1',
  MAX_QUANTITY: 99,
  MIN_QUANTITY: 1,
  DEBOUNCE_DELAY: 300,
  TAX_RATE: 0.20 // 20% VAT
};

// ============================================
// CART MANAGER - Core Business Logic
// ============================================

const CartManager = (() => {
  
  /**
   * Validates product data structure
   * @private
   */
  const validateProduct = (product) => {
    if (!product || typeof product !== 'object') {
      throw new Error('Invalid product data');
    }

    const { id, name, price, image } = product;
    
    if (!id || typeof id !== 'string' || id.trim() === '') {
      throw new Error('Invalid product ID');
    }
    
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('Invalid product name');
    }
    
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      throw new Error('Invalid product price');
    }
    
    if (!image || typeof image !== 'string') {
      throw new Error('Invalid product image');
    }

    return {
      id: sanitizeString(id.trim()),
      name: sanitizeString(name.trim()),
      price: parsedPrice,
      image: sanitizeString(image.trim())
    };
  };

  /**
   * Sanitize string input to prevent XSS
   * @private
   */
  const sanitizeString = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  /**
   * Get cart from localStorage with validation
   * @private
   */
  const getCart = () => {
    try {
      const cartData = localStorage.getItem(CART_CONFIG.STORAGE_KEY);
      if (!cartData) return [];

      const cart = JSON.parse(cartData);
      
      // Validate cart structure
      if (!Array.isArray(cart)) {
        console.warn('Corrupted cart data detected. Resetting cart.');
        return [];
      }

      // Validate each item
      return cart.filter(item => {
        try {
          validateProduct(item);
          return typeof item.quantity === 'number' && 
                 item.quantity >= CART_CONFIG.MIN_QUANTITY;
        } catch {
          return false;
        }
      });
    } catch (error) {
      console.error('Error reading cart:', error);
      return [];
    }
  };

  /**
   * Save cart to localStorage
   * @private
   */
  const saveCart = (cart) => {
    try {
      localStorage.setItem(CART_CONFIG.STORAGE_KEY, JSON.stringify(cart));
      return true;
    } catch (error) {
      console.error('Error saving cart:', error);
      return false;
    }
  };

  /**
   * Add product to cart or increment quantity
   * @public
   */
  const addToCart = (productData) => {
    try {
      const validatedProduct = validateProduct(productData);
      const cart = getCart();
      
      // Check if product already exists
      const existingItemIndex = cart.findIndex(item => item.id === validatedProduct.id);
      
      if (existingItemIndex > -1) {
        // Increment quantity
        const newQuantity = cart[existingItemIndex].quantity + 1;
        
        if (newQuantity > CART_CONFIG.MAX_QUANTITY) {
          throw new Error(`Maximum quantity (${CART_CONFIG.MAX_QUANTITY}) reached`);
        }
        
        cart[existingItemIndex].quantity = newQuantity;
      } else {
        // Add new item
        cart.push({
          ...validatedProduct,
          quantity: 1,
          addedAt: Date.now()
        });
      }

      if (saveCart(cart)) {
        triggerCartUpdate();
        return { success: true, cart };
      }
      
      throw new Error('Failed to save cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Update item quantity in cart
   * @public
   */
  const updateQuantity = (productId, newQuantity) => {
    try {
      const quantity = parseInt(newQuantity, 10);
      
      if (isNaN(quantity) || quantity < CART_CONFIG.MIN_QUANTITY) {
        throw new Error('Invalid quantity');
      }
      
      if (quantity > CART_CONFIG.MAX_QUANTITY) {
        throw new Error(`Maximum quantity is ${CART_CONFIG.MAX_QUANTITY}`);
      }

      const cart = getCart();
      const itemIndex = cart.findIndex(item => item.id === productId);
      
      if (itemIndex === -1) {
        throw new Error('Product not found in cart');
      }

      cart[itemIndex].quantity = quantity;

      if (saveCart(cart)) {
        triggerCartUpdate();
        return { success: true, cart };
      }
      
      throw new Error('Failed to update cart');
    } catch (error) {
      console.error('Error updating quantity:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Remove item from cart
   * @public
   */
  const removeFromCart = (productId) => {
    try {
      const cart = getCart();
      const filteredCart = cart.filter(item => item.id !== productId);

      if (saveCart(filteredCart)) {
        triggerCartUpdate();
        return { success: true, cart: filteredCart };
      }
      
      throw new Error('Failed to remove item');
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Clear entire cart
   * @public
   */
  const clearCart = () => {
    try {
      if (saveCart([])) {
        triggerCartUpdate();
        return { success: true };
      }
      throw new Error('Failed to clear cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false, error: error.message };
    }
  };

  /**
   * Get cart totals
   * @public
   */
  const getCartTotals = () => {
    const cart = getCart();
    
    const subtotal = cart.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);

    const tax = subtotal * CART_CONFIG.TAX_RATE;
    const total = subtotal + tax;

    return {
      subtotal: parseFloat(subtotal.toFixed(2)),
      tax: parseFloat(tax.toFixed(2)),
      total: parseFloat(total.toFixed(2)),
      itemCount: cart.reduce((count, item) => count + item.quantity, 0)
    };
  };

  /**
   * Dispatch custom event for cart updates
   * @private
   */
  const triggerCartUpdate = () => {
    const event = new CustomEvent('cartUpdated', {
      detail: {
        cart: getCart(),
        totals: getCartTotals()
      }
    });
    window.dispatchEvent(event);
  };

  // Public API
  return {
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCart,
    getCartTotals
  };
})();

// ============================================
// UI CONTROLLER - DOM Manipulation
// ============================================

const UIController = (() => {
  
  /**
   * Update cart badge count
   * @public
   */
  const updateCartBadge = () => {
    const badge = document.querySelector('[data-cart-count]');
    if (!badge) return;

    const { itemCount } = CartManager.getCartTotals();
    badge.textContent = itemCount;
    
    // Add visual feedback
    badge.classList.add('pulse');
    setTimeout(() => badge.classList.remove('pulse'), 300);
  };

  /**
   * Show toast notification
   * @public
   */
  const showNotification = (message, type = 'success') => {
    // Remove existing notifications
    const existing = document.querySelector('.cart-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `cart-notification cart-notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.classList.add('cart-notification--visible');
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.classList.remove('cart-notification--visible');
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  };

  /**
   * Disable button temporarily (prevent double-click)
   * @public
   */
  const disableButton = (button, duration = 1000) => {
    if (!button) return;
    
    button.disabled = true;
    button.classList.add('btn-loading');
    
    setTimeout(() => {
      button.disabled = false;
      button.classList.remove('btn-loading');
    }, duration);
  };

  // Public API
  return {
    updateCartBadge,
    showNotification,
    disableButton
  };
})();

// ============================================
// EVENT HANDLERS
// ============================================

const EventHandlers = (() => {
  
  /**
   * Handle add to cart button click
   * @private
   */
  const handleAddToCart = (event) => {
    const button = event.target.closest('[data-add-to-cart]');
    if (!button) return;

    event.preventDefault();
    
    // Get product card
    const productCard = button.closest('.product-card');
    if (!productCard) {
      console.error('Product card not found');
      return;
    }

    // Extract product data from data attributes
    const productData = {
      id: productCard.dataset.productId,
      name: productCard.dataset.productName,
      price: productCard.dataset.productPrice,
      image: productCard.dataset.productImage
    };

    // Disable button to prevent double-click
    UIController.disableButton(button);

    // Add to cart
    const result = CartManager.addToCart(productData);

    if (result.success) {
      UIController.showNotification(`${productData.name} added to cart`, 'success');
    } else {
      UIController.showNotification(result.error || 'Failed to add to cart', 'error');
    }
  };

  /**
   * Initialize all event listeners
   * @public
   */
  const init = () => {
    // Use event delegation for add to cart buttons
    document.addEventListener('click', handleAddToCart);

    // Listen for cart updates
    window.addEventListener('cartUpdated', () => {
      UIController.updateCartBadge();
    });

    // Initialize badge on page load
    UIController.updateCartBadge();
  };

  return { init };
})();

// ============================================
// INITIALIZATION
// ============================================

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', EventHandlers.init);
} else {
  EventHandlers.init();
}

// Expose CartManager to global scope for use in cart.js
window.CartManager = CartManager;
window.UIController = UIController;

// ============================================
// HEADER AUTH UI MANAGER
// ============================================

const HeaderAuthUI = (() => {
  
  /**
   * Get auth button element
   * @private
   */
  const getAuthButton = () => {
    return document.querySelector('[data-auth-btn]');
  };

  /**
   * Update header to show logged-in state
   * @private
   */
  const updateAuthUI = () => {
    // Wait for AuthService to be available
    if (typeof window.AuthService === 'undefined') {
      setTimeout(updateAuthUI, 100);
      return;
    }
    
    const signInBtn = getAuthButton();
    if (!signInBtn) return;

    const user = window.AuthService.getCurrentUser();
    
    if (user) {
      // User is logged in - show user menu
      const icon = signInBtn.querySelector('ion-icon');
      const label = signInBtn.querySelector('.header-action-label');
      
      if (icon && label) {
        // Change icon to filled person
        icon.setAttribute('name', 'person');
        
        // Create user name display (first name or email prefix)
        const displayName = user.name 
          ? user.name.split(' ')[0] 
          : user.email.split('@')[0];
        
        label.textContent = displayName.length > 10 
          ? displayName.substring(0, 10) + '...' 
          : displayName;
        
        // Add user-authenticated class
        signInBtn.classList.add('header-action-btn--authenticated');
        
        // Remove any existing click handlers
        signInBtn.replaceWith(signInBtn.cloneNode(true));
        
        // Get fresh reference after replacing
        const newBtn = getAuthButton();
        if (newBtn) {
          newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleUserMenu();
          });
        }
      }
    } else {
      // User is not logged in - link to sign-in page
      const icon = signInBtn.querySelector('ion-icon');
      const label = signInBtn.querySelector('.header-action-label');
      
      if (icon && label) {
        icon.setAttribute('name', 'person-outline');
        label.textContent = 'Sign in';
        
        // Remove authenticated class
        signInBtn.classList.remove('header-action-btn--authenticated');
        
        // Remove any existing click handlers
        signInBtn.replaceWith(signInBtn.cloneNode(true));
        
        // Get fresh reference after replacing
        const newBtn = getAuthButton();
        if (newBtn) {
          newBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'signin.html';
          });
        }
      }
    }
  };

  /**
   * Create and toggle user dropdown menu
   * @private
   */
  const toggleUserMenu = () => {
    let menu = document.querySelector('.user-dropdown-menu');
    
    if (menu) {
      menu.remove();
      return;
    }

    // Create menu
    menu = document.createElement('div');
    menu.className = 'user-dropdown-menu';
    
    const user = window.AuthService.getCurrentUser();
    
    // Create menu structure using DOM methods
    const menuHeader = document.createElement('div');
    menuHeader.className = 'user-menu-header';
    
    const emailPara = document.createElement('p');
    emailPara.className = 'user-menu-email';
    emailPara.textContent = user.email;
    menuHeader.appendChild(emailPara);
    
    const menuList = document.createElement('ul');
    menuList.className = 'user-menu-list';
    
    // Menu items
    const menuItems = [
      { icon: 'person-outline', text: 'My Account', href: '#' },
      { icon: 'receipt-outline', text: 'Orders', href: '#' },
      { icon: 'heart-outline', text: 'Wishlist', href: '#' },
      { icon: 'settings-outline', text: 'Settings', href: '#' },
      { divider: true },
      { icon: 'log-out-outline', text: 'Sign Out', logout: true }
    ];
    
    menuItems.forEach(item => {
      const li = document.createElement('li');
      
      if (item.divider) {
        li.className = 'user-menu-divider';
      } else {
        const link = document.createElement(item.logout ? 'button' : 'a');
        link.className = 'user-menu-link';
        if (item.logout) {
          link.className += ' user-menu-logout';
          link.setAttribute('data-logout-btn', '');
          link.type = 'button';
        } else {
          link.href = item.href;
        }
        
        const icon = document.createElement('ion-icon');
        icon.setAttribute('name', item.icon);
        
        const text = document.createTextNode(item.text);
        
        link.appendChild(icon);
        link.appendChild(text);
        li.appendChild(link);
      }
      
      menuList.appendChild(li);
    });
    
    menu.appendChild(menuHeader);
    menu.appendChild(menuList);
    document.body.appendChild(menu);
    
    // Position menu
    requestAnimationFrame(() => {
      menu.classList.add('user-dropdown-menu--visible');
    });
    
    // Add logout handler
    const logoutBtn = menu.querySelector('[data-logout-btn]');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', closeMenuOnOutsideClick);
    }, 0);
  };

  /**
   * Close menu on outside click
   * @private
   */
  const closeMenuOnOutsideClick = (e) => {
    const menu = document.querySelector('.user-dropdown-menu');
    const authBtn = getAuthButton();
    
    if (menu && !menu.contains(e.target) && !authBtn.contains(e.target)) {
      menu.remove();
      document.removeEventListener('click', closeMenuOnOutsideClick);
    }
  };

  /**
   * Handle logout
   * @private
   */
  const handleLogout = () => {
    if (typeof window.AuthService === 'undefined') return;
    
    if (confirm('Are you sure you want to sign out?')) {
      window.AuthService.signOut();
      
      // Close menu
      const menu = document.querySelector('.user-dropdown-menu');
      if (menu) menu.remove();
      
      // Redirect to signin
      window.location.href = 'signin.html?reason=logout';
    }
  };

  /**
   * Initialize auth UI
   * @public
   */
  const init = () => {
    // Initial update
    updateAuthUI();
    
    // Listen for auth changes from other tabs
    window.addEventListener('storage', (e) => {
      if (e.key === 'auth_event') {
        updateAuthUI();
      }
    });
    
    // Listen for cartUpdated events (in case auth state changes)
    window.addEventListener('cartUpdated', () => {
      // Just verify auth UI is still correct
      if (typeof window.AuthService !== 'undefined') {
        updateAuthUI();
      }
    });
  };

  return { init, updateAuthUI };
})();

// Initialize header auth UI when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', HeaderAuthUI.init);
} else {
  HeaderAuthUI.init();
}
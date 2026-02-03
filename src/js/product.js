'use strict';

/**
 * PRODUCT DETAIL PAGE CONTROLLER
 * Handles product display, interactions, and security
 * Version: 1.0.0
 */

const ProductPageManager = (() => {
  
  let currentProduct = null;
  let currentQuantity = 1;
  let elements = {};

  /**
   * Cache DOM elements
   * @private
   */
  const cacheDOMElements = () => {
    elements = {
      loading: document.querySelector('[data-product-loading]'),
      error: document.querySelector('[data-product-error]'),
      detail: document.querySelector('[data-product-detail]'),
      breadcrumb: document.querySelector('[data-breadcrumb]'),
      categoryLink: document.querySelector('[data-category-link]'),
      productName: document.querySelector('[data-product-name]'),
      mainImage: document.querySelector('[data-main-image]'),
      thumbnails: document.querySelector('[data-thumbnails]'),
      badges: document.querySelector('[data-badges]'),
      title: document.querySelector('[data-title]'),
      ratingContainer: document.querySelector('[data-rating-container]'),
      sku: document.querySelector('[data-sku]'),
      priceSection: document.querySelector('[data-price-section]'),
      stockStatus: document.querySelector('[data-stock-status]'),
      description: document.querySelector('[data-description]'),
      features: document.querySelector('[data-features]'),
      qtyInput: document.querySelector('[data-qty-input]'),
      qtyDecrease: document.querySelector('[data-qty-decrease]'),
      qtyIncrease: document.querySelector('[data-qty-increase]'),
      addCartBtn: document.querySelector('[data-add-cart]'),
      addWishlistBtn: document.querySelector('[data-add-wishlist]'),
      zoomBtn: document.querySelector('[data-zoom-btn]'),
      zoomModal: document.querySelector('[data-zoom-modal]'),
      zoomImage: document.querySelector('[data-zoom-image]'),
      zoomClose: document.querySelector('[data-zoom-close]'),
      tabsSection: document.querySelector('[data-tabs-section]'),
      longDescription: document.querySelector('[data-long-description]'),
      specsTable: document.querySelector('[data-specs-table]'),
      reviewsSummary: document.querySelector('[data-reviews-summary]'),
      reviewsList: document.querySelector('[data-reviews-list]'),
      relatedSection: document.querySelector('[data-related-section]'),
      relatedGrid: document.querySelector('[data-related-grid]'),
      pageTitle: document.querySelector('[data-page-title]')
    };
  };

  /**
   * Get product ID from URL
   * @private
   */
  const getProductIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || params.get('slug');
  };

  /**
   * Sanitize string to prevent XSS
   * @private
   */
  const sanitize = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  /**
   * Format price
   * @private
   */
  const formatPrice = (price) => {
    return `£${parseFloat(price).toFixed(2)}`;
  };

  /**
   * Load product data
   * @private
   */
  const loadProduct = () => {
    const productId = getProductIdFromURL();
    
    if (!productId) {
      showError();
      return;
    }

    // Try to get product by ID or slug
    let product = window.ProductDatabase.getProductById(productId);
    if (!product) {
      product = window.ProductDatabase.getProductBySlug(productId);
    }

    if (!product) {
      showError();
      return;
    }

    currentProduct = product;
    renderProduct(product);
  };

  /**
   * Show loading state
   * @private
   */
  const showLoading = () => {
    elements.loading.style.display = 'flex';
    elements.error.style.display = 'none';
    elements.detail.style.display = 'none';
  };

  /**
   * Show error state
   * @private
   */
  const showError = () => {
    elements.loading.style.display = 'none';
    elements.error.style.display = 'flex';
    elements.detail.style.display = 'none';
  };

  /**
   * Render product
   * @private
   */
  const renderProduct = (product) => {
    // Hide loading, show content
    elements.loading.style.display = 'none';
    elements.detail.style.display = 'grid';
    elements.tabsSection.style.display = 'block';
    elements.relatedSection.style.display = 'block';

    // Update page title
    elements.pageTitle.textContent = `${sanitize(product.name)} - Discount Drinks`;

    // Render components
    renderBreadcrumb(product);
    renderImageGallery(product);
    renderProductInfo(product);
    renderTabs(product);
    renderRelatedProducts(product);
  };

  /**
   * Render breadcrumb
   * @private
   */
  const renderBreadcrumb = (product) => {
    if (elements.categoryLink) {
      elements.categoryLink.textContent = sanitize(product.category);
    }
    if (elements.productName) {
      elements.productName.textContent = sanitize(product.name);
    }
  };

  /**
   * Render image gallery
   * @private
   */
  const renderImageGallery = (product) => {
    // Main image
    elements.mainImage.src = product.images[0];
    elements.mainImage.alt = sanitize(product.name);

    // Badges
    renderBadges(product);

    // Thumbnails
    elements.thumbnails.innerHTML = '';
    product.images.forEach((img, index) => {
      const thumb = document.createElement('button');
      thumb.className = 'thumbnail-btn' + (index === 0 ? ' active' : '');
      thumb.setAttribute('aria-label', `View image ${index + 1}`);
      
      const thumbImg = document.createElement('img');
      thumbImg.src = img;
      thumbImg.alt = `${sanitize(product.name)} view ${index + 1}`;
      thumbImg.loading = 'lazy';
      
      thumb.appendChild(thumbImg);
      
      thumb.addEventListener('click', () => {
        elements.mainImage.src = img;
        document.querySelectorAll('.thumbnail-btn').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
      
      elements.thumbnails.appendChild(thumb);
    });
  };

  /**
   * Render badges
   * @private
   */
  const renderBadges = (product) => {
    elements.badges.innerHTML = '';

    if (product.discount > 0) {
      const badge = document.createElement('span');
      badge.className = 'product-badge badge-discount';
      badge.textContent = `-${product.discount}%`;
      elements.badges.appendChild(badge);
    }

    if (!product.inStock) {
      const badge = document.createElement('span');
      badge.className = 'product-badge badge-out-stock';
      badge.textContent = 'Out of Stock';
      elements.badges.appendChild(badge);
    } else if (window.ProductDatabase.hasLowStock(product.id)) {
      const badge = document.createElement('span');
      badge.className = 'product-badge badge-low-stock';
      badge.textContent = 'Low Stock';
      elements.badges.appendChild(badge);
    }

    if (product.tags.includes('new')) {
      const badge = document.createElement('span');
      badge.className = 'product-badge badge-new';
      badge.textContent = 'New';
      elements.badges.appendChild(badge);
    }
  };

  /**
   * Render product info
   * @private
   */
  const renderProductInfo = (product) => {
    // Title
    elements.title.textContent = sanitize(product.name);

    // Rating
    renderRating(product);

    // SKU
    elements.sku.textContent = `SKU: ${sanitize(product.sku)}`;

    // Price
    renderPrice(product);

    // Stock status
    renderStockStatus(product);

    // Description
    elements.description.textContent = sanitize(product.description);

    // Features
    renderFeatures(product);

    // Set quantity limits
    elements.qtyInput.max = product.inStock ? product.stockQuantity : 0;
    elements.qtyInput.disabled = !product.inStock;
    elements.addCartBtn.disabled = !product.inStock;
  };

  /**
   * Render rating stars
   * @private
   */
  const renderRating = (product) => {
    elements.ratingContainer.innerHTML = '';

    const ratingWrapper = document.createElement('div');
    ratingWrapper.className = 'rating-stars';
    ratingWrapper.setAttribute('aria-label', `Rated ${product.rating} out of 5 stars`);

    for (let i = 1; i <= 5; i++) {
      const star = document.createElement('ion-icon');
      if (i <= Math.floor(product.rating)) {
        star.setAttribute('name', 'star');
      } else if (i === Math.ceil(product.rating) && product.rating % 1 !== 0) {
        star.setAttribute('name', 'star-half');
      } else {
        star.setAttribute('name', 'star-outline');
      }
      ratingWrapper.appendChild(star);
    }

    elements.ratingContainer.appendChild(ratingWrapper);

    const reviewCount = document.createElement('span');
    reviewCount.className = 'review-count';
    reviewCount.textContent = `(${product.reviewCount} reviews)`;
    elements.ratingContainer.appendChild(reviewCount);
  };

  /**
   * Render price section
   * @private
   */
  const renderPrice = (product) => {
    elements.priceSection.innerHTML = '';

    const priceWrapper = document.createElement('div');
    priceWrapper.className = 'price-wrapper';

    const currentPrice = document.createElement('span');
    currentPrice.className = 'current-price';
    currentPrice.textContent = formatPrice(product.price);
    priceWrapper.appendChild(currentPrice);

    if (product.originalPrice) {
      const originalPrice = document.createElement('span');
      originalPrice.className = 'original-price';
      originalPrice.textContent = formatPrice(product.originalPrice);
      priceWrapper.appendChild(originalPrice);

      const savings = document.createElement('span');
      savings.className = 'price-savings';
      const savingsAmount = product.originalPrice - product.price;
      savings.textContent = `Save ${formatPrice(savingsAmount)}`;
      priceWrapper.appendChild(savings);
    }

    elements.priceSection.appendChild(priceWrapper);
  };

  /**
   * Render stock status
   * @private
   */
  const renderStockStatus = (product) => {
    elements.stockStatus.innerHTML = '';

    const statusDiv = document.createElement('div');
    statusDiv.className = 'stock-indicator';

    const icon = document.createElement('ion-icon');
    const text = document.createElement('span');

    if (!product.inStock) {
      statusDiv.classList.add('out-of-stock');
      icon.setAttribute('name', 'close-circle-outline');
      text.textContent = 'Out of Stock';
    } else if (window.ProductDatabase.hasLowStock(product.id)) {
      statusDiv.classList.add('low-stock');
      icon.setAttribute('name', 'alert-circle-outline');
      text.textContent = `Only ${product.stockQuantity} left in stock`;
    } else {
      statusDiv.classList.add('in-stock');
      icon.setAttribute('name', 'checkmark-circle-outline');
      text.textContent = 'In Stock';
    }

    statusDiv.appendChild(icon);
    statusDiv.appendChild(text);
    elements.stockStatus.appendChild(statusDiv);
  };

  /**
   * Render features list
   * @private
   */
  const renderFeatures = (product) => {
    if (!product.features || product.features.length === 0) {
      elements.features.style.display = 'none';
      return;
    }

    elements.features.innerHTML = '';
    const title = document.createElement('h3');
    title.className = 'features-title';
    title.textContent = 'Key Features';
    elements.features.appendChild(title);

    const list = document.createElement('ul');
    list.className = 'features-list';

    product.features.forEach(feature => {
      const li = document.createElement('li');
      const icon = document.createElement('ion-icon');
      icon.setAttribute('name', 'checkmark-circle');
      const text = document.createTextNode(sanitize(feature));
      
      li.appendChild(icon);
      li.appendChild(text);
      list.appendChild(li);
    });

    elements.features.appendChild(list);
  };

  /**
   * Render tabs content
   * @private
   */
  const renderTabs = (product) => {
    // Long description
    elements.longDescription.innerHTML = `<p>${sanitize(product.longDescription)}</p>`;

    // Specifications
    renderSpecifications(product);

    // Reviews (placeholder)
    renderReviews(product);
  };

  /**
   * Render specifications table
   * @private
   */
  const renderSpecifications = (product) => {
    elements.specsTable.innerHTML = '';

    if (!product.specifications) return;

    Object.entries(product.specifications).forEach(([key, value]) => {
      const row = document.createElement('tr');
      
      const keyCell = document.createElement('td');
      keyCell.className = 'spec-key';
      keyCell.textContent = sanitize(key);
      
      const valueCell = document.createElement('td');
      valueCell.className = 'spec-value';
      valueCell.textContent = sanitize(value);
      
      row.appendChild(keyCell);
      row.appendChild(valueCell);
      elements.specsTable.appendChild(row);
    });
  };

  /**
   * Render reviews section
   * @private
   */
  const renderReviews = (product) => {
    // Summary
    elements.reviewsSummary.innerHTML = `
      <div class="reviews-summary-content">
        <div class="summary-rating">
          <span class="summary-score">${product.rating}</span>
          <span class="summary-total">out of 5</span>
        </div>
        <div class="summary-bars">
          <p class="summary-text">Based on ${product.reviewCount} reviews</p>
        </div>
      </div>
    `;
  };

  /**
   * Render related products
   * @private
   */
  const renderRelatedProducts = (product) => {
    const related = window.ProductDatabase.getRelatedProducts(product.id);
    
    if (related.length === 0) {
      elements.relatedSection.style.display = 'none';
      return;
    }

    elements.relatedGrid.innerHTML = '';

    related.forEach(p => {
      const card = createProductCard(p);
      elements.relatedGrid.appendChild(card);
    });
  };

  /**
   * Create product card
   * @private
   */
  const createProductCard = (product) => {
    const card = document.createElement('div');
    card.className = 'related-product-card';

    const link = document.createElement('a');
    link.href = `product.html?id=${product.id}`;
    link.className = 'related-product-link';

    const img = document.createElement('img');
    img.src = product.images[0];
    img.alt = sanitize(product.name);
    img.loading = 'lazy';

    const content = document.createElement('div');
    content.className = 'related-product-content';

    const title = document.createElement('h3');
    title.textContent = sanitize(product.name);

    const price = document.createElement('p');
    price.className = 'related-product-price';
    price.textContent = formatPrice(product.price);

    content.appendChild(title);
    content.appendChild(price);
    link.appendChild(img);
    link.appendChild(content);
    card.appendChild(link);

    return card;
  };

  /**
   * Handle quantity change
   * @private
   */
  const handleQuantityChange = (change) => {
    if (!currentProduct) return;

    const input = elements.qtyInput;
    let newQty = parseInt(input.value, 10) + change;

    newQty = Math.max(1, Math.min(newQty, currentProduct.stockQuantity));
    input.value = newQty;
    currentQuantity = newQty;
  };

  /**
   * Handle add to cart
   * @private
   */
  const handleAddToCart = () => {
    if (!currentProduct || !currentProduct.inStock) return;

    const quantity = parseInt(elements.qtyInput.value, 10);

    if (quantity < 1 || quantity > currentProduct.stockQuantity) {
      window.UIController.showNotification('Invalid quantity', 'error');
      return;
    }

    // Add to cart multiple times based on quantity
    for (let i = 0; i < quantity; i++) {
      window.CartManager.addToCart({
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.images[0]
      });
    }

    window.UIController.showNotification(`${currentProduct.name} added to cart`, 'success');
    
    // Disable button briefly
    window.UIController.disableButton(elements.addCartBtn, 1500);

    // Reset quantity
    elements.qtyInput.value = 1;
    currentQuantity = 1;
  };

  /**
   * Handle add to wishlist
   * @private
   */
  const handleAddToWishlist = () => {
    if (!currentProduct) return;

    // Placeholder - wishlist functionality
    window.UIController.showNotification('Added to wishlist', 'success');
    
    // Toggle icon
    const icon = elements.addWishlistBtn.querySelector('ion-icon');
    const isActive = icon.getAttribute('name') === 'heart';
    
    icon.setAttribute('name', isActive ? 'heart-outline' : 'heart');
    elements.addWishlistBtn.classList.toggle('active');
  };

  /**
   * Handle image zoom
   * @private
   */
  const handleImageZoom = () => {
    elements.zoomImage.src = elements.mainImage.src;
    elements.zoomModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  /**
   * Close zoom modal
   * @private
   */
  const closeZoomModal = () => {
    elements.zoomModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  /**
   * Handle tab switching
   * @private
   */
  const handleTabSwitch = (tabName) => {
    // Update buttons
    document.querySelectorAll('[data-tab-btn]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tabBtn === tabName);
    });

    // Update panels
    document.querySelectorAll('[data-tab-panel]').forEach(panel => {
      panel.classList.toggle('active', panel.dataset.tabPanel === tabName);
    });
  };

  /**
   * Handle social share
   * @private
   */
  const handleShare = (platform) => {
    if (!currentProduct) return;

    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(currentProduct.name);

    let shareUrl;

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${text}%20${url}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        window.UIController.showNotification('Link copied to clipboard', 'success');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  /**
   * Initialize event listeners
   * @private
   */
  const initEventListeners = () => {
    // Quantity controls
    if (elements.qtyDecrease) {
      elements.qtyDecrease.addEventListener('click', () => handleQuantityChange(-1));
    }
    if (elements.qtyIncrease) {
      elements.qtyIncrease.addEventListener('click', () => handleQuantityChange(1));
    }
    if (elements.qtyInput) {
      elements.qtyInput.addEventListener('input', (e) => {
        currentQuantity = parseInt(e.target.value, 10) || 1;
      });
    }

    // Add to cart
    if (elements.addCartBtn) {
      elements.addCartBtn.addEventListener('click', handleAddToCart);
    }

    // Add to wishlist
    if (elements.addWishlistBtn) {
      elements.addWishlistBtn.addEventListener('click', handleAddToWishlist);
    }

    // Image zoom
    if (elements.zoomBtn) {
      elements.zoomBtn.addEventListener('click', handleImageZoom);
    }
    if (elements.zoomClose) {
      elements.zoomClose.addEventListener('click', closeZoomModal);
    }
    if (elements.zoomModal) {
      elements.zoomModal.addEventListener('click', (e) => {
        if (e.target === elements.zoomModal) closeZoomModal();
      });
    }

    // Tabs
    document.querySelectorAll('[data-tab-btn]').forEach(btn => {
      btn.addEventListener('click', () => handleTabSwitch(btn.dataset.tabBtn));
    });

    // Share buttons
    document.querySelectorAll('[data-share]').forEach(btn => {
      btn.addEventListener('click', () => handleShare(btn.dataset.share));
    });

    // Close zoom on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && elements.zoomModal.classList.contains('active')) {
        closeZoomModal();
      }
    });
  };

  /**
   * Initialize product page
   * @public
   */
  const init = () => {
    // Check if required dependencies loaded
    if (!window.ProductDatabase || !window.CartManager) {
      console.error('Required dependencies not loaded');
      showError();
      return;
    }

    cacheDOMElements();
    showLoading();
    
    // Small delay to show loading state
    setTimeout(() => {
      loadProduct();
      initEventListeners();
    }, 300);
  };

  return { init };
})();

// Initialize when DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ProductPageManager.init);
} else {
  ProductPageManager.init();
}
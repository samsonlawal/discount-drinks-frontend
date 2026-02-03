'use strict';

/**
 * SIGN IN PAGE CONTROLLER
 * Handles sign-in form interactions and validation
 * Version: 1.0.0
 */

// ============================================
// SIGN IN PAGE MANAGER
// ============================================

const SignInPageManager = (() => {
  
  // Cache DOM elements
  let elements = {};

  /**
   * Initialize DOM element cache
   * @private
   */
  const cacheDOMElements = () => {
    elements = {
      form: document.querySelector('[data-signin-form]'),
      emailInput: document.querySelector('[data-email-input]'),
      passwordInput: document.querySelector('[data-password-input]'),
      passwordToggle: document.querySelector('[data-password-toggle]'),
      eyeIcon: document.querySelector('[data-eye-icon]'),
      eyeOffIcon: document.querySelector('[data-eye-off-icon]'),
      submitBtn: document.querySelector('[data-submit-btn]'),
      submitText: document.querySelector('[data-submit-text]'),
      submitLoader: document.querySelector('[data-submit-loader]'),
      emailError: document.querySelector('[data-email-error]'),
      passwordError: document.querySelector('[data-password-error]'),
      alert: document.querySelector('[data-auth-alert]'),
      alertMessage: document.querySelector('[data-alert-message]'),
      rememberCheckbox: document.querySelector('[data-remember-checkbox]')
    };
  };

  /**
   * Sanitize string input
   * @private
   */
  const sanitizeString = (str) => {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  };

  /**
   * Show field error
   * @private
   */
  const showFieldError = (field, message) => {
    const input = elements[`${field}Input`];
    const error = elements[`${field}Error`];
    
    if (input && error) {
      input.classList.add('input-error');
      input.setAttribute('aria-invalid', 'true');
      error.textContent = sanitizeString(message);
      error.style.display = 'block';
    }
  };

  /**
   * Clear field error
   * @private
   */
  const clearFieldError = (field) => {
    const input = elements[`${field}Input`];
    const error = elements[`${field}Error`];
    
    if (input && error) {
      input.classList.remove('input-error');
      input.setAttribute('aria-invalid', 'false');
      error.textContent = '';
      error.style.display = 'none';
    }
  };

  /**
   * Clear all field errors
   * @private
   */
  const clearAllErrors = () => {
    clearFieldError('email');
    clearFieldError('password');
    hideAlert();
  };

  /**
   * Show alert message
   * @private
   */
  const showAlert = (message, type = 'error') => {
    if (!elements.alert || !elements.alertMessage) return;
    
    elements.alert.className = `auth-alert auth-alert--${type}`;
    elements.alertMessage.textContent = sanitizeString(message);
    elements.alert.style.display = 'flex';
    
    // Scroll to alert
    elements.alert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  /**
   * Hide alert message
   * @private
   */
  const hideAlert = () => {
    if (elements.alert) {
      elements.alert.style.display = 'none';
    }
  };

  /**
   * Set loading state
   * @private
   */
  const setLoadingState = (loading) => {
    if (!elements.submitBtn) return;
    
    elements.submitBtn.disabled = loading;
    
    if (loading) {
      elements.submitBtn.classList.add('btn-loading');
      if (elements.submitText) elements.submitText.style.display = 'none';
      if (elements.submitLoader) elements.submitLoader.style.display = 'inline-flex';
    } else {
      elements.submitBtn.classList.remove('btn-loading');
      if (elements.submitText) elements.submitText.style.display = 'inline';
      if (elements.submitLoader) elements.submitLoader.style.display = 'none';
    }
  };

  /**
   * Validate email field
   * @private
   */
  const validateEmail = () => {
    const email = elements.emailInput.value.trim();
    
    if (!email) {
      showFieldError('email', 'Email is required');
      return false;
    }
    
    if (!window.AuthService.validateEmail(email)) {
      showFieldError('email', 'Please enter a valid email address');
      return false;
    }
    
    clearFieldError('email');
    return true;
  };

  /**
   * Validate password field
   * @private
   */
  const validatePassword = () => {
    const password = elements.passwordInput.value;
    
    if (!password) {
      showFieldError('password', 'Password is required');
      return false;
    }
    
    if (password.length < 6) {
      showFieldError('password', 'Password is too short');
      return false;
    }
    
    clearFieldError('password');
    return true;
  };

  /**
   * Handle password toggle
   * @private
   */
  const handlePasswordToggle = () => {
    if (!elements.passwordInput || !elements.eyeIcon || !elements.eyeOffIcon) return;
    
    const isPassword = elements.passwordInput.type === 'password';
    
    elements.passwordInput.type = isPassword ? 'text' : 'password';
    elements.eyeIcon.style.display = isPassword ? 'none' : 'block';
    elements.eyeOffIcon.style.display = isPassword ? 'block' : 'none';
    
    elements.passwordToggle.setAttribute(
      'aria-label',
      isPassword ? 'Hide password' : 'Show password'
    );
  };

  /**
   * Check for messages in URL params
   * @private
   */
  const checkURLParams = () => {
    const params = new URLSearchParams(window.location.search);
    const reason = params.get('reason');
    
    if (reason === 'inactivity') {
      showAlert('Your session expired due to inactivity. Please sign in again.', 'info');
    } else if (reason === 'required') {
      showAlert('Please sign in to continue', 'info');
    } else if (reason === 'logout') {
      showAlert('You have been signed out successfully', 'success');
    }
  };

  /**
   * Handle form submission
   * @private
   */
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    // Clear previous errors
    clearAllErrors();
    
    // Validate fields
    const emailValid = validateEmail();
    const passwordValid = validatePassword();
    
    if (!emailValid || !passwordValid) {
      return;
    }
    
    // Get form data
    const email = elements.emailInput.value.trim();
    const password = elements.passwordInput.value;
    
    // Set loading state
    setLoadingState(true);
    
    try {
      // Attempt sign in
      const result = await window.AuthService.signIn(email, password);
      
      if (result.success) {
        // Show success message
        showAlert('Sign in successful! Redirecting...', 'success');
        
        // Redirect after short delay
        setTimeout(() => {
          window.RedirectManager.redirectAfterLogin();
        }, 1000);
        
      } else {
        // Show error message
        if (result.locked) {
          showAlert(result.error, 'error');
          elements.submitBtn.disabled = true;
          
          // Re-enable after lockout message
          setTimeout(() => {
            elements.submitBtn.disabled = false;
          }, 3000);
        } else {
          showAlert(result.error || 'Invalid email or password', 'error');
        }
        
        setLoadingState(false);
      }
      
    } catch (error) {
      console.error('Sign in error:', error);
      showAlert('An unexpected error occurred. Please try again.', 'error');
      setLoadingState(false);
    }
  };

  /**
   * Handle input changes (clear errors on type)
   * @private
   */
  const handleInputChange = (event) => {
    const input = event.target;
    
    if (input === elements.emailInput) {
      clearFieldError('email');
    } else if (input === elements.passwordInput) {
      clearFieldError('password');
    }
    
    hideAlert();
  };

  /**
   * Initialize event listeners
   * @private
   */
  const initEventListeners = () => {
    // Form submission
    if (elements.form) {
      elements.form.addEventListener('submit', handleFormSubmit);
    }
    
    // Password toggle
    if (elements.passwordToggle) {
      elements.passwordToggle.addEventListener('click', handlePasswordToggle);
    }
    
    // Input changes
    if (elements.emailInput) {
      elements.emailInput.addEventListener('input', handleInputChange);
      elements.emailInput.addEventListener('blur', validateEmail);
    }
    
    if (elements.passwordInput) {
      elements.passwordInput.addEventListener('input', handleInputChange);
    }
    
    // Prevent form submission on Enter in password field (already handled by form)
    if (elements.passwordInput) {
      elements.passwordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          elements.form.requestSubmit();
        }
      });
    }
  };

  /**
   * Check if already logged in
   * @private
   */
  const checkExistingSession = () => {
    if (window.AuthService.isAuthenticated()) {
      // Already logged in, redirect
      window.RedirectManager.redirectAfterLogin();
    }
  };

  /**
   * Initialize sign in page
   * @public
   */
  const init = () => {
    // Check if auth system is loaded
    if (!window.AuthService || !window.RedirectManager) {
      console.error('Auth system not loaded');
      showAlert('Authentication system failed to load. Please refresh the page.', 'error');
      return;
    }
    
    // Check for existing session
    checkExistingSession();
    
    // Cache DOM elements
    cacheDOMElements();
    
    // Check URL params for messages
    checkURLParams();
    
    // Initialize event listeners
    initEventListeners();
    
    // Focus on email input
    if (elements.emailInput) {
      elements.emailInput.focus();
    }
  };

  return { init };
})();

// ============================================
// INITIALIZATION
// ============================================

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', SignInPageManager.init);
} else {
  SignInPageManager.init();
}
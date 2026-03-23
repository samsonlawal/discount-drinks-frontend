  const handlePlaceOrder = async () => {
    if (deliveryMethod === "home" && !selectedAddressId) {
      setActiveModal("missing_info");
      return;
    }

    setIsProcessing(true);
    try {
      // Step 1: Create order on backend first
      const items = cart.map(item => ({
        product: item.id || (item as any)._id,
        quantity: item.quantity,
        price: item.costPrice ?? item.price,
        name: item.name,
        image: typeof item.image === "string" ? item.image : ""
      }));
      
      const shippingCost = 0;

      let shippingAddressPayload = undefined;
      if (deliveryMethod === "home" && selectedAddressId) {
        const selectedAddress = addresses.find(a => (a._id || a.id) === selectedAddressId);
        if (selectedAddress) {
          shippingAddressPayload = {
            addressLine1: selectedAddress.addressLine1,
            addressLine2: selectedAddress.addressLine2 || "",
            street: selectedAddress.addressLine1,
            city: selectedAddress.city,
            state: selectedAddress.state,
            postCode: selectedAddress.postCode,
            country: "United Kingdom",
          };
        }
      }

      const payload: OrderPayload = {
        items,
        shippingAddress: shippingAddressPayload,
        paymentMethod: "stripe",
        totalAmount: totals.total + shippingCost,
        shippingCost: shippingCost,
        taxRate: totals.tax,
      };

      // Create order - backend should return orderId
      const orderResponse = await new Promise((resolve, reject) => {
        onCreateOrder({
          payload,
          successCallback: (data) => resolve(data),
          errorCallback: (error) => reject(error)
        });
      });

      const orderId = (orderResponse as any)?.orderId || (orderResponse as any)?._id;
      if (!orderId) {
        showErrorToast({
          message: "Failed to create order",
          description: "Could not get order ID from server"
        });
        setIsProcessing(false);
        return;
      }

      // Step 2: Get Stripe and create checkout session
      const stripe = await getStripe();
      if (!stripe) {
        showErrorToast({
          message: "Payment initialization failed",
          description: "Could not load Stripe"
        });
        setIsProcessing(false);
        return;
      }

      // Step 3: Create checkout session via our API
      const checkoutSession = await createCheckoutSession({
        orderId,
        totalAmount: totals.total + shippingCost,
        items: items.map(item => ({
          name: item.name,
          price: item.price * 100, // Stripe uses cents
          quantity: item.quantity
        })),
        customerEmail: user?.email,
        successUrl: `${window.location.origin}/checkout/success?orderId=${orderId}`,
        cancelUrl: `${window.location.origin}/checkout/cancel?orderId=${orderId}`
      });

      // Step 4: Redirect to Stripe Checkout
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.sessionId
      });

      if (result.error) {
        showErrorToast({
          message: "Payment failed",
          description: result.error.message
        });
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      showErrorToast({
        message: "Checkout failed",
        description: error?.message || "An error occurred during checkout"
      });
    } finally {
      setIsProcessing(false);
    }
  };
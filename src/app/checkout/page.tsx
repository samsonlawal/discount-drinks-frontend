"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCart } from "@/contexts/CartContext";
import { ShieldCheck, MapPin, Truck, Store, CreditCard, Wallet, ChevronRight, Check, AlertCircle } from "lucide-react";
import { AddressRequiredModal } from "@/components/modals/AddressRequiredModal";
import { OrderSuccessModal } from "@/components/modals/OrderSuccessModal";
import { BaseModal } from "@/components/modals/BaseModal";
import { OrderPayload } from "@/types";
import { useCreateOrder } from "@/hooks/api/orders";
// import { getStripe, createCheckoutSession } from "@/utils/stripe";
import { showErrorToast } from "@/utils/toaster";
  import { stripePromise } from "@/lib/stripe";


type DeliveryMethod = "collect" | "home";
type PaymentMethod = "card" | "paypal" | "apple_pay";

interface Address {
  id?: string;
  _id?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postCode: string;
  phone: string;
  isDefault: boolean;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotals, isLoading: cartLoading, clearCart } = useCart();
  const user = useSelector((state: RootState) => state.auth.user);
  const { onCreateOrder, loading: orderLoading } = useCreateOrder();

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("home");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const [activeModal, setActiveModal] = useState<"none" | "address_required" | "order_success" | "missing_info">("none");
  const [successMessage, setSuccessMessage] = useState("");

  const closeModal = () => setActiveModal("none");

  // Load user addresses
  useEffect(() => {
    if (user?.addresses && Array.isArray(user.addresses)) {
      setAddresses(user.addresses);
      // Auto-select default address
      const defaultAddress = user.addresses.find((a: Address) => a.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress._id || defaultAddress.id || "unknown");
      } else if (user.addresses.length > 0) {
        setSelectedAddressId(user.addresses[0]._id || user.addresses[0].id || "unknown");
      }
    }
    console.log(user)
  }, [user]);

  // 1. Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in?redirect=/checkout");
    }
  }, [user, router]);

  // 2. Redirect if age not verified
  useEffect(() => {
    const ageStatus = localStorage.getItem("age_verified");
    const isAgeVerified = ageStatus === "true" || ageStatus === "yes";
    if (!isAgeVerified) {
      router.push("/cart");
    }
  }, [router]);

  // 3. Redirect if cart is empty OR no address
  useEffect(() => {
    if (!cartLoading) {
      if (cart.length === 0) {
        router.push("/cart");
      } else if (!user?.addresses || user.addresses.length === 0) {
        router.push("/user/profile/addresses");
      }
    }
  }, [cart, cartLoading, user, router]);

  const totals = getCartTotals();

  const formatPrice = (price: number) => {
    return `£${parseFloat(price.toString()).toFixed(2)}`;
  };



  if (cartLoading || cart.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center pt-20"
        style={{ background: "var(--cultured)" }}
      >
        Loading...
      </div>
    );
  }




  // Handle Checkout
  
  const handleCheckout = async () => {
    if (deliveryMethod === "home" && !selectedAddressId) {
      setActiveModal("missing_info");
      return;
    }

    setIsProcessing(true);

    try {
      // Find the exact address object the user selected
      const selectedAddress = addresses.find(
        (a) => (a._id || a.id) === selectedAddressId
      );

      // The backend strictly requires street and country, so we must map your address object
      let shippingAddressPayload = undefined;
      if (deliveryMethod === "home" && selectedAddress) {
        shippingAddressPayload = {
          addressLine1: selectedAddress.addressLine1,
          addressLine2: selectedAddress.addressLine2 || "",
          street: selectedAddress.addressLine1 || selectedAddress.street, // Fallback mapping for backend
          city: selectedAddress.city,
          state: selectedAddress.state,
          postCode: selectedAddress.postCode || selectedAddress.zipCode,
          country: selectedAddress.country || "United Kingdom", // Backend requires country
        };
      }

      // Create a simplified payload exactly matching your old snippet
      const formattedItems = cart.map((item: any) => ({
        product: item._id || item.id,
        quantity: item.quantity,
        name: item.name,
        image: item.images && item.images.length > 0 ? item.images[0] : (item.image || ""),
        price: item.price
      }));

      const payload: any = {
        items: formattedItems,
        shippingAddress: shippingAddressPayload, // send the cleanly mapped address
        paymentMethod: "card", // Changed from "stripe" to "card" per snippet
        
        // Keeping these just in case the backend still wants them
        totalAmount: totals.total,
        shippingCost: 0,
        taxRate: totals.tax,
      };

      // Call our robust axios API hook
      onCreateOrder({
        payload,
        successCallback: async (response) => {
          // If the backend returns a direct URL (as per your snippet)
          if (response?.url || response?.data?.url) {
            window.location.href = response.url || response.data.url;
            return;
          }

          // If it returns a sessionId (our previous assumption)
          const sessionId = response?.sessionId || response?.data?.sessionId || response?.paymentSession?.id;

          if (sessionId) {
            const stripe = await stripePromise;
            if (!stripe) {
              console.error("Stripe failed to load");
              setIsProcessing(false);
              return;
            }
            await (stripe as any).redirectToCheckout({ sessionId });
            return;
          }

          // If neither exists
          showErrorToast({
            message: "Payment initialization failed",
            description: "Backend did not return a Stripe URL or session ID.",
          });
          setIsProcessing(false);
        },
        errorCallback: () => {
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Checkout error:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen pt-14 pb-12" style={{ background: "white" }}>
      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-1000 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm transition-opacity duration-300">
          <div className="p-8 rounded-2xl flex flex-col items-center shadow-2xl transform scale-100 animate-[scaleIn_0.3s_ease-out]">
            <div className="w-12 h-12 border-4 rounded-full border-t-[var(--ocean-green)] border-l-[var(--ocean-green)] border-r-transparent border-b-transparent animate-spin mb-4" />
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--eerie-black)" }}>
              Processing Order...
            </h2>
            <p className="text-sm" style={{ color: "var(--sonic-silver)" }}>
              Please do not close or refresh this window.
            </p>
          </div>
        </div>
      )}
      <AddressRequiredModal
        isOpen={activeModal === "address_required"}
        onClose={closeModal}
        onConfirm={() => {
          closeModal();
          router.push("/user/profile/addresses");
        }}
      />

      <OrderSuccessModal
        isOpen={activeModal === "order_success"}
        onClose={() => {
          closeModal();
          router.push("/user/profile/orders");
        }}
        message={successMessage}
      />

      <BaseModal isOpen={activeModal === "missing_info"} onClose={closeModal}>
        <div className="text-center py-4">
          <AlertCircle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Missing Information</h2>
          <p className="text-gray-500 mb-6">Please select a delivery address.</p>
          <button onClick={closeModal} className="btn btn-primary w-full">OK</button>
        </div>
      </BaseModal>

      <div className="container mx-auto px-4 max-w-6xl">
        <h1
          className="text-xl md:text-2xl font-bold mb-6"
          style={{ color: "var(--eerie-black)" }}
        >
          Checkout
        </h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Checkout Section */}
          <div className="flex-1 space-y-6">

            {/* 1. Delivery Method */}
            <section
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: "var(--cultured)" }}
            >
              <h2
                className="text-xl font-medium mb-4 flex items-center gap-2"
                style={{ color: "var(--eerie-black)" }}
              >
                <span
                  className="w-6 h-6 rounded-full inline-flex items-center justify-center text-sm bg-["
                  style={{ background: "var(--eerie-black)", color: "var(--white)" }}
                >
                  1
                </span>
                Delivery Method
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryMethod("home")}
                  className="p-4 rounded-xl border text-left flex items-start gap-4 transition-all"
                  style={
                    deliveryMethod === "home"
                      ? { borderColor: "var(--ocean-green)", background: "hsl(353,42%,32%,0.05)" }
                      : { borderColor: "var(--cultured)" }
                  }
                >
                  <div
                    className="mt-1"
                    style={{ color: deliveryMethod === "home" ? "var(--ocean-green)" : "var(--sonic-silver)" }}
                  >
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: "var(--eerie-black)" }}>
                      Home Delivery
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "var(--sonic-silver)" }}>
                      Delivered directly to your door.
                    </p>
                  </div>
                  {deliveryMethod === "home" && (
                    <div className="ml-auto mt-1" style={{ color: "var(--ocean-green)" }}>
                      <Check size={20} />
                    </div>
                  )}
                </button>

                {/* <button
                  onClick={() => setDeliveryMethod("collect")}
                  className="p-4 rounded-xl border text-left flex items-start gap-4 transition-all"
                  style={
                    deliveryMethod === "collect"
                      ? { borderColor: "var(--ocean-green)", background: "hsl(353,42%,32%,0.05)" }
                      : { borderColor: "var(--cultured)" }
                  }
                >
                  <div
                    className="mt-1"
                    style={{ color: deliveryMethod === "collect" ? "var(--ocean-green)" : "var(--sonic-silver)" }}
                  >
                    <Store size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium" style={{ color: "var(--eerie-black)" }}>
                      Collect
                    </h3>
                    <p className="text-sm mt-1" style={{ color: "var(--sonic-silver)" }}>
                      Pick up your order from our store.
                    </p>
                  </div>
                  {deliveryMethod === "collect" && (
                    <div className="ml-auto mt-1" style={{ color: "var(--ocean-green)" }}>
                      <Check size={20} />
                    </div>
                  )}
                </button> */}
              </div>
            </section>

            {/* 2. Shipping Address */}
            {deliveryMethod === "home" && (
              <section
                className="bg-white rounded-2xl p-6 border"
                style={{ borderColor: "var(--cultured)" }}
              >
                <h2
                  className="text-xl font-medium mb-4 flex items-center gap-2"
                  style={{ color: "var(--eerie-black)" }}
                >
                  <span
                    className="w-6 h-6 rounded-full inline-flex items-center justify-center text-sm"
                    style={{ background: "var(--eerie-black)", color: "var(--white)" }}
                  >
                    2
                  </span>
                  Shipping Address
                </h2>

                {addresses.length === 0 ? (
                  <div
                    className="text-center py-6 rounded-xl border border-dashed"
                    style={{ borderColor: "var(--sonic-silver)", background: "var(--cultured)" }}
                  >
                    <MapPin className="mx-auto mb-2" style={{ color: "var(--sonic-silver)" }} size={32} />
                    <p className="mb-4" style={{ color: "var(--sonic-silver)" }}>
                      You have no saved addresses.
                    </p>
                    <button
                      onClick={() => router.push("/user/profile/addresses")}
                      className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      style={{ background: "var(--eerie-black)", color: "var(--white)" }}
                    >
                      Add an Address
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {addresses.map((address) => {
                      const addressId = address._id || address.id || Math.random().toString();
                      return (
                      <div
                        key={addressId}
                        onClick={() => setSelectedAddressId(addressId)}
                        className="p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-4"
                        style={
                          selectedAddressId === addressId
                            ? { borderColor: "var(--ocean-green)", background: "hsl(353,42%,32%,0.05)" }
                            : { borderColor: "var(--cultured)" }
                        }
                      >
                        <div
                          className="mt-1 rounded-full w-5 h-5 border flex items-center justify-center"
                          style={{
                            borderColor: selectedAddressId === addressId ? "var(--ocean-green)" : "var(--sonic-silver)",
                          }}
                        >
                          {selectedAddressId === addressId && (
                            <div
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ background: "var(--ocean-green)" }}
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="" style={{ color: "var(--eerie-black)" }}>
                              {address.addressLine1}
                            </h3>
                            {address.isDefault && (
                              <span
                                className="text-xs px-2 py-0.5 rounded"
                                style={{ background: "var(--cultured)", color: "var(--sonic-silver)" }}
                              >
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm" style={{ color: "var(--sonic-silver)" }}>
                            {address.addressLine2 && <>{address.addressLine2}, </>}
                            {address.city}, {address.state} {address.postCode}
                          </p>
                          <p className="text-sm mt-1" style={{ color: "var(--sonic-silver)" }}>
                            Phone: {address.phone}
                          </p>
                        </div>
                      </div>
                    )})}
                  </div>
                )}
              </section>
            )}

            {/* 3. Payment Method */}
            <section
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: "var(--cultured)" }}
            >
              <h2
                className="text-xl font-medium mb-4 flex items-center gap-2"
                style={{ color: "var(--eerie-black)" }}
              >
                <span
                  className="w-6 h-6 rounded-full inline-flex items-center justify-center text-sm"
                  style={{ background: "var(--eerie-black)", color: "var(--white)" }}
                >
                  {deliveryMethod === "home" ? "3" : "2"}
                </span>
                Payment Method
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className="w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all"
                  style={
                    paymentMethod === "card"
                      ? { borderColor: "var(--ocean-green)", background: "hsl(353,42%,32%,0.05)" }
                      : { borderColor: "var(--cultured)" }
                  }
                >
                  <CreditCard
                    size={24}
                    style={{ color: paymentMethod === "card" ? "var(--ocean-green)" : "var(--sonic-silver)" }}
                  />
                  <span className="flex-1" style={{ color: "var(--eerie-black)" }}>
                    Credit or Debit Card
                  </span>
                  <div
                    className="rounded-full w-5 h-5 border flex items-center justify-center"
                    style={{
                      borderColor: paymentMethod === "card" ? "var(--ocean-green)" : "var(--sonic-silver)",
                    }}
                  >
                    {paymentMethod === "card" && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--ocean-green)" }} />
                    )}
                  </div>
                </button>

                {/* <button
                  onClick={() => setPaymentMethod("paypal")}
                  className="w-full p-4 rounded-xl border text-left flex items-center gap-4 transition-all"
                  style={
                    paymentMethod === "paypal"
                      ? { borderColor: "var(--ocean-green)", background: "hsl(353,42%,32%,0.05)" }
                      : { borderColor: "var(--cultured)" }
                  }
                >
                  <Wallet
                    size={24}
                    style={{ color: paymentMethod === "paypal" ? "var(--ocean-green)" : "var(--sonic-silver)" }}
                  />
                  <span className="flex-1" style={{ color: "var(--eerie-black)" }}>
                    PayPal
                  </span>
                  <div
                    className="rounded-full w-5 h-5 border flex items-center justify-center"
                    style={{
                      borderColor: paymentMethod === "paypal" ? "var(--ocean-green)" : "var(--sonic-silver)",
                    }}
                  >
                    {paymentMethod === "paypal" && (
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--ocean-green)" }} />
                    )}
                  </div>
                </button> */}
              </div>
            </section>

          </div>

          {/* Sidebar / Order Summary */}
          <div className="lg:w-1/3">
            <div
              className="bg-(--cultured) rounded-2xl border p-6 sticky top-24"
              style={{ borderColor: "var(--cultured)" }}
            >
              <h2
                className="text-xl font-medium mb-4"
                style={{ color: "var(--eerie-black)" }}
              >
                Order Summary
              </h2>

              <div className="max-h-60 overflow-y-auto pr-2 mb-4 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    {/* <div
                      className="w-16 h-16 rounded-lg flex-shrink-0 relative overflow-hidden"
                      style={{ background: "var(--cultured)" }}
                    >
                      <Image
                        src={item.image || "/images/product-1.jpg"}
                        alt={item.name || "Product"}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div> */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate" style={{ color: "var(--eerie-black)" }}>
                        {item.name}
                      </h4>
                      <p className="text-sm" style={{ color: "var(--sonic-silver)" }}>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium" style={{ color: "var(--eerie-black)" }}>
                      {formatPrice((item.costPrice ?? item.price) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="border-t pt-4 space-y-3"
                style={{ borderColor: "var(--cultured)" }}
              >
                <div className="flex justify-between" style={{ color: "var(--sonic-silver)" }}>
                  <span>Subtotal</span>
                  <span>{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between" style={{ color: "var(--sonic-silver)" }}>
                  <span>Shipping</span>
                  <span style={{ color: "var(--ocean-green)", fontWeight: 600 }}>Free</span>
                </div>

                <div className="border-t pt-3 mt-3" style={{ borderColor: "var(--cultured)" }}>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium" style={{ color: "var(--ocean-green)" }}>
                      Total
                    </span>
                    <span className="text-xl font-medium" style={{ color: "var(--ocean-green)" }}>
                      {formatPrice(totals.total)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={orderLoading || isProcessing}
                className="btn-dark w-full rounded-xl py-4 mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {orderLoading || isProcessing ? "Processing..." : "Proceed to Payment"}
                {!orderLoading && !isProcessing && <ChevronRight size={20} />}
              </button>
{/* 
              <div className="mt-6">
                <div
                  className="flex items-center justify-center gap-2 text-sm p-3 rounded-lg"
                  style={{ background: "hsl(353,42%,32%,0.08)", color: "var(--ocean-green)" }}
                >
                  <ShieldCheck size={20} />
                  <span>Secure, encrypted checkout.</span>
                </div>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

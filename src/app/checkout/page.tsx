"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useCart } from "@/contexts/CartContext";
import { ShieldCheck, MapPin, Truck, Store, CreditCard, Wallet, ChevronRight, Check } from "lucide-react";
import { Modal, ModalType } from "@/components/ui/Modal";
import { OrderPayload } from "@/types";
import { useCreateOrder } from "@/hooks/api/orders";

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

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: ModalType;
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
  }>({
    isOpen: false,
    type: "alert",
    title: "",
    message: "",
  });

  const closeModal = () => setModalConfig((prev) => ({ ...prev, isOpen: false }));

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

  // Redirect if cart is empty
  useEffect(() => {
    if (!cartLoading && cart.length === 0) {
      router.push("/cart");
    }
  }, [cart, cartLoading, router]);

  const totals = getCartTotals();

  const formatPrice = (price: number) => {
    return `£${parseFloat(price.toString()).toFixed(2)}`;
  };

  const handlePlaceOrder = () => {
    if (deliveryMethod === "home" && !selectedAddressId) {
      setModalConfig({
        isOpen: true,
        type: "alert",
        title: "Missing Information",
        message: "Please select a delivery address.",
      });
      return;
    }

    // Construct the payload
    const items = cart.map(item => ({
      product: item.id || (item as any)._id,
      quantity: item.quantity,
      price: item.costPrice ?? item.price,
      name: item.name,
      image: typeof item.image === "string" ? item.image : ""
    }));
    
    // In actual implementation shipping cost might be calculated, setting to 0 for now as per previous mock (or 0 for collect)
    const shippingCost = deliveryMethod === "collect" ? 0 : 0; 

    let shippingAddressPayload = undefined;
    if (deliveryMethod === "home" && selectedAddressId) {
      const selectedAddress = addresses.find(a => (a._id || a.id) === selectedAddressId);
      if (selectedAddress) {
        shippingAddressPayload = {
          addressLine1: selectedAddress.addressLine1,
          addressLine2: selectedAddress.addressLine2 || "",
          street: selectedAddress.addressLine1, // Using addressLine1 as fallback for street
          city: selectedAddress.city,
          state: selectedAddress.state,
          postCode: selectedAddress.postCode,
          country: "United Kingdom", // Default/fallback for country
        };
      }
    }

    let mappedPaymentMethod = paymentMethod;
    if (paymentMethod === "paypal" || paymentMethod === "apple_pay") {
      mappedPaymentMethod = "card"; // Fallback to valid enum if necessary, or we handle it on backend
    }

    const payload: OrderPayload = {
      items,
      shippingAddress: shippingAddressPayload,
      paymentMethod: mappedPaymentMethod,
      totalAmount: totals.total + shippingCost,
      shippingCost: shippingCost,
      taxRate: totals.tax,
      // coupon: 0,
      // discount: 0,
    };

    onCreateOrder({
      payload,
      successCallback: (data) => {
        clearCart();
        setModalConfig({
          isOpen: true,
          type: "alert",
          title: "Order Placed",
          message: data?.message || "Your order has been placed successfully!",
          onConfirm: () => {
            closeModal();
            router.push("/user/profile/orders"); // Or wherever the user should go
          }
        });
      }
    });
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

  return (
    <div className="min-h-screen pt-14 pb-12" style={{ background: "white" }}>
      <Modal {...modalConfig} onClose={closeModal} />

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

                <button
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
                </button>
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

                <button
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
                </button>
              </div>
            </section>

          </div>

          {/* Sidebar / Order Summary */}
          <div className="lg:w-1/3">
            <div
              className="bg-white rounded-2xl border p-6 sticky top-24"
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
                  <span>{deliveryMethod === "collect" ? "Free" : "Calculated at next step"}</span>
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
                onClick={handlePlaceOrder}
                disabled={orderLoading}
                className="w-full rounded-xl py-4 mt-6 flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "var(--eerie-black)", color: "var(--white)" }}
                onMouseEnter={(e) => { if (!orderLoading) e.currentTarget.style.opacity = "0.9" }}
                onMouseLeave={(e) => { if (!orderLoading) e.currentTarget.style.opacity = "1" }}
              >
                {orderLoading ? "Processing..." : "Place Order"}
                {!orderLoading && <ChevronRight size={20} />}
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

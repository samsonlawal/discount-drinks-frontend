"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
// import NextTopLoader from "nextjs-toploader";
// import Navbar from '@/components/layout/main/navbar';
// import Footer from '@/components/layout/main/footer';
import { Toaster } from "@/components/ui/sonner";
// import { AppThemeProvider } from "@/providers/theme-provider";
// import { AuthContextWrapper } from '@/context/AuthContext';
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
// import AuthPersistenceWrapper from "@/lib/authPersistenceWrapper";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

function Initializers({ children }: { children: ReactNode }) {
  const isAuthPage = (usePathname() || "")?.startsWith("/auth/");

  const hideNavbar = isAuthPage ? true : false;
  const hideFooter = isAuthPage ? true : false;

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <AppThemeProvider> */}
            {/* <AuthContextWrapper> */}
            {/* <NextTopLoader color="#000000" height={3} /> */}
            {/* {hideNavbar ? null : <Navbar />} */}
            <CartProvider>
              <WishlistProvider>
                <Header />
                {children}
                <Footer />
                {/* {hideFooter ? null : <Footer />} */}
                <Toaster richColors />
              </WishlistProvider>
            </CartProvider>
            {/* </AuthContextWrapper> */}
          {/* </AppThemeProvider> */}
          {/* <AuthPersistenceWrapper /> */}
        </PersistGate>
      </Provider>
    </>
  );
}

export default Initializers;

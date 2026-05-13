"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
// import NextTopLoader from "nextjs-toploader";
// import Navbar from '@/components/layout/main/navbar';
// import Footer from '@/components/layout/main/footer';
import { Toaster } from "@/components/ui/sonner";
// import { AppThemeProvider } from "@/providers/theme-provider";
// import { AuthContextWrapper } from '@/context/AuthContext';
import { Provider, useSelector } from "react-redux";
import { store, persistor, RootState } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
// import AuthPersistenceWrapper from "@/lib/authPersistenceWrapper";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import useAxiosDefaults from "@/hooks/initializers/useAxiosDefaults";
import useScrollToTop from "@/hooks/initializers/useScrollToTop";

// Inner component so it has access to Redux store (must be inside <Provider>)
function AxiosInitializer() {
  const { accessToken, refreshToken, user } = useSelector((state: RootState) => state.auth);
  useAxiosDefaults({ accessToken, refreshToken, user });
  useScrollToTop();
  return null;
}

// Inner component that reads userId from Redux and passes it to context providers
function AppProviders({ children, hideNavbar, hideFooter }: { children: ReactNode; hideNavbar: boolean; hideFooter: boolean }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?.id || (user as any)?._id || (user as any)?.userId;

  return (
    <CartProvider userId={userId}>
      <WishlistProvider>
        {hideNavbar ? null : <Header />}
        {children}
        {hideFooter ? null : <Footer />}
        <Toaster richColors />
      </WishlistProvider>
    </CartProvider>
  );
}

function Initializers({ children }: { children: ReactNode }) {
  const isAuthPage = (usePathname() || "")?.startsWith("/auth/");

  const hideNavbar = isAuthPage ? true : false;
  const hideFooter = isAuthPage ? true : false;

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* Wires up the global Axios interceptor with the current Bearer token */}
          <AxiosInitializer />
          {/* <AppThemeProvider> */}
            {/* <AuthContextWrapper> */}
            {/* <NextTopLoader color="#000000" height={3} /> */}
            {/* {hideNavbar ? null : <Navbar />} */}
            <AppProviders hideNavbar={hideNavbar} hideFooter={hideFooter}>
              {children}
            </AppProviders>
            {/* </AuthContextWrapper> */}
          {/* </AppThemeProvider> */}
          {/* <AuthPersistenceWrapper /> */}
        </PersistGate>
      </Provider>
    </>
  );
}

export default Initializers;

import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import "./style.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";

const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Discount Drinks - No 1 in UK",
  description: "UK's No.1 Bulk Discount Shop for Spirits, Wine and Lager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jost.variable}>
      <body className="font-jost">
        <CartProvider>
          <WishlistProvider>
            <Header />
            {children}
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

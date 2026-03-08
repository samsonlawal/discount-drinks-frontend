import type { Metadata } from "next";
import "./globals.css";
import "./style.css";
import Initializers from "./Initializers";
import { Analytics } from "@vercel/analytics/react";

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
    <html lang="en">
      <body className="font-jost">
        <Initializers>{children}</Initializers>
        <Analytics />
      </body>
    </html>
  );
}

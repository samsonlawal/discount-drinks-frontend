import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import "./style.css";
import Initializers from "./Initializers";

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
        <Initializers>{children}</Initializers>
      </body>
    </html>
  );
}

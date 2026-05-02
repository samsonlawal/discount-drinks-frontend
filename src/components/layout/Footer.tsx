import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-(--cultured) pt-16 pb-8">
      <div className="container mx-auto max-w-[1350px]">
        {/* Footer Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 lg:mb-16">
          
          <div className="lg:col-span-2 flex flex-col gap-1">
            <Link href="/" className="inline-block">
              <img src="/images/logo.svg" alt="Discount Drinks logo" className="h-10" />
            </Link>

            <p className="text-(--sonic-silver) text-[16px] leading-relaxed mb-6 max-w-[470px]">
              We are your one-stop destination for every kind of drink and wine
              from everyday favorites to premium selections sourced from around
              the world. Whether you are stocking up for personal enjoyment,
              events, or business needs, we offer unbeatable bulk deals that
              make buying more rewarding
            </p>

            <ul className="flex justify-start items-center gap-3">
              <li>
                <a href="#" className="flex items-center justify-center bg-(--eerie-black) text-white w-[35px] h-[35px] rounded-full transition-all duration-200 hover:bg-(--ocean-green)" aria-label="Facebook">
                  <svg className="w-[18px] h-[18px] fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="#" className="flex items-center justify-center bg-(--eerie-black) text-white w-[35px] h-[35px] rounded-full transition-all duration-200 hover:bg-(--ocean-green)" aria-label="X / Twitter">
                  <svg className="w-[16px] h-[16px] fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </li>

  
            </ul>
          </div>

          <div className="w-full pl-0 lg:pl-6">
            <p className="text-(--eerie-black) text-[22px] font-semibold mb-2">Information</p>
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="/about" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-and-conditions" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <p className="text-(--eerie-black) text-[22px] font-semibold mb-2">Category</p>
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="/products?category=Rum" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Rum
                </Link>
              </li>
              <li>
                <Link href="/products?category=Whiskey" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Whiskey
                </Link>
              </li>
              <li>
                <Link href="/products?category=Vodka" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Vodka
                </Link>
              </li>
              <li>
                <Link href="/products?category=Spirit" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Spirit
                </Link>
              </li>
              <li>
                <Link href="/products?category=Beer" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Beer
                </Link>
              </li>
              <li>
                <Link href="/products?category=Tequila" className="relative !text-(--sonic-silver) py-[5px] hover:text-(--eerie-black) hover:translate-x-[15px] transition-all duration-250 inline-block group">
                  <span className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-[10px] h-[2px] bg-(--sonic-silver) scale-x-0 origin-right transition-transform duration-250 group-hover:scale-x-100"></span>
                  Tequila
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row justify-center lg:justify-between items-center gap-6 sm:gap-12 pt-6">
          <p className="text-center text-(--sonic-silver)">
            &copy; 2026 <Link href="/" className="inline-block !text-(--sonic-silver) font-semibold hover:text-(--eerie-black) transition-colors">DiscountDrinks</Link>. All Rights Reserved
          </p>

          <div className="flex items-center gap-4 flex-wrap justify-center">
            <p className="text-[15px]">We Support</p>
            <div className="flex items-center gap-3">
              <img src="/images/mastercard.svg" alt="Mastercard" className="w-[45px] bg-white rounded-sm opacity-90" />
              <img src="/images/visa.svg" alt="Visa" className="w-[45px] opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

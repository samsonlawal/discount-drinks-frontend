import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-brand">
            <a href="#" className="logo">
              <img src="/images/logo.svg" alt="Casmart logo" />
            </a>

            <p className="footer-text">
              We are your one-stop destination for every kind of drink and wine
              from everyday favorites to premium selections sourced from around
              the world. Whether you are stocking up for personal enjoyment,
              events, or business needs, we offer unbeatable bulk deals that
              make buying more rewarding
            </p>

            <ul className="social-list">
              <li>
                <a href="#" className="social-link" aria-label="Facebook">
                  {/* Facebook */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="#" className="social-link" aria-label="X / Twitter">
                  {/* X (Twitter) */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="#" className="social-link" aria-label="Instagram">
                  {/* Instagram */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </a>
              </li>

              <li>
                <a href="#" className="social-link" aria-label="TikTok">
                  {/* TikTok */}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Information</p>
            </li>

            <li>
              <a href="#" className="footer-link">
                About Us
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Terms & Conditions
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                FAQ
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Shipping & Delivery
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Contact Us
              </a>
            </li>
          </ul>

          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Category</p>
            </li>

            <li>
              <a href="#" className="footer-link">
                Rum
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Whiskey
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Vodka
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Spirit
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Beer
              </a>
            </li>

            <li>
              <a href="#" className="footer-link">
                Tequila
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            &copy; 2025 <a href="#">DiscountDrinks</a>. All Rights Reserved
          </p>

          <ul className="footer-bottom-list">
            <li>
              <a href="#" className="footer-bottom-link">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" className="footer-bottom-link">
                Terms & Conditions
              </a>
            </li>

            <li>
              <a href="#" className="footer-bottom-link">
                Sitemap
              </a>
            </li>
          </ul>

          <div className="payment">
            <p className="payment-title">We Support</p>

            <img
              src="/images/payment-img.png"
              alt="Online payment logos"
              className="payment-img"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

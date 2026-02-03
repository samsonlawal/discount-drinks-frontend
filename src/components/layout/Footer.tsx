import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Share2 } from "lucide-react";

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
                <a href="#" className="social-link">
                  <Facebook size={20} />
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <Twitter size={20} />
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <Instagram size={20} />
                </a>
              </li>

              <li>
                <a href="#" className="social-link">
                  <Share2 size={20} />
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

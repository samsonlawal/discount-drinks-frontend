"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { User, Search, ShoppingBag, Heart, X } from "lucide-react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount, isLoading } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "active" : ""}`} data-header>
      <div className="container">
        <div
          className={`overlay ${isNavOpen ? "active" : ""}`}
          data-overlay
          onClick={closeNav}
        ></div>

        <div className="header-search">
          <input
            type="search"
            name="search"
            placeholder="Search Product..."
            className="input-field"
          />

          <button className="search-btn" aria-label="Search">
            <Search />
          </button>
        </div>

        <a href="index.html" className="logo">
          <img
            src="/images/logo.svg"
            alt="DiscountDrinks logo"
            width={130}
            height={31}
          />
        </a>

        <div className="header-actions">
          <a href="/auth/signin" className="header-action-btn" data-auth-btn>
            <User aria-hidden="true" className="icon" />
            <p className="header-action-label">Sign in</p>
          </a>

          <button className="header-action-btn">
            <Search aria-hidden="true" className="icon" />
            <p className="header-action-label">Search</p>
          </button>

          <a href="/cart" className="header-action-btn">
            <ShoppingBag aria-hidden="true" className="icon h-3 w-3" />
            <p className="header-action-label">Cart</p>
            {!isLoading && (
              <div
                className="btn-badge green"
                aria-hidden="true"
                data-cart-count
              >
                {getCartCount()}
              </div>
            )}
          </a>

          <a href="/wishlist" className="header-action-btn">
            <Heart aria-hidden="true" className="icon" />
            <p className="header-action-label">Wishlist</p>
            <div className="btn-badge" aria-hidden="true">
              2
            </div>
          </a>
        </div>

        <button
          className="nav-open-btn"
          data-nav-open-btn
          aria-label="Open Menu"
          onClick={toggleNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar ${isNavOpen ? "active" : ""}`} data-navbar>
          <div className="navbar-top">
            <a href="index.html" className="logo">
              <img
                src="/images/logo.svg"
                alt="DiscountDrinks logo"
                width={130}
                height={31}
              />
            </a>

            <button
              className="nav-close-btn"
              data-nav-close-btn
              aria-label="Close Menu"
              onClick={closeNav}
            >
              <X className="icon" />
            </button>
          </div>

          <ul className="navbar-list">
            <li>
              <a href="/" className="navbar-link" onClick={closeNav}>
                Home
              </a>
            </li>

            <li>
              <a href="/products" className="navbar-link" onClick={closeNav}>
                Shop
              </a>
            </li>

            <li>
              <a href="/about" className="navbar-link" onClick={closeNav}>
                About
              </a>
            </li>

            <li>
              <a href="#blog" className="navbar-link" onClick={closeNav}>
                Blog
              </a>
            </li>

            <li>
              <a href="#" className="navbar-link" onClick={closeNav}>
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

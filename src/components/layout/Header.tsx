"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  CircleUser,
  User,
  Search,
  ShoppingCart,
  Heart,
  X,
  Menu,
  Home,
  Store,
  Info,
  BookOpen,
  Mail,
  BadgeCheck,
  Check
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount, isLoading } = useCart();
  const { getWishlistCount, isLoading: isWishlistLoading } = useWishlist();

  useEffect(() => {
    const handleScroll = (e: any) => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleNav = () => setIsNavOpen(!isNavOpen);
  const closeNav = () => setIsNavOpen(false);

  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <header className={`header ${isScrolled ? "active" : ""}`} data-header>
      <div className="container">
        <div
          className={`overlay ${isNavOpen ? "active" : ""}`}
          data-overlay
          onClick={closeNav}
        />

        {/*
          MOBILE: single row → [hamburger] [logo] [user] [search] [cart]
          DESKTOP: single row → [search-bar] [logo] [nav] [user] [cart] [wishlist]
        */}

        {/* Hamburger — mobile only */}
        <button
          className="nav-open-btn"
          aria-label="Open Menu"
          onClick={toggleNav}
        >
          <Menu size={22} />
        </button>

        {/* Desktop search bar */}
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

        {/* Logo */}
        <a href="/" className="logo">
          <img
            src="/images/logo.svg"
            alt="DiscountDrinks logo"
            width={130}
            height={31}
          />
        </a>

        {/* Action icons */}
        <div className="header-actions">
          {/* User */}
          {user ? 
          
(            <a href="/user/profile" className="header-action-btn" data-auth-btn>
            <CircleUser aria-hidden="true" className="icon" />
  
          <p className="text-[14px] text-black hidden md:flex">{user?.username}</p>
              <div
                className="absolute bg-black text-white rounded-full flex items-center justify-center md:hidden"
                style={{ width: '14px', height: '14px', top: '6px', right: '0px' }}
                aria-hidden="true"
              >
                <Check size={10} strokeWidth={4} />
              </div>
          </a>  )
          :
(          <a href="/auth/sign-in" className="header-action-btn" data-auth-btn>
            <User aria-hidden="true" className="icon" />
          <p className="header-action-label">Sign in</p>
          </a>)
        }


          {/* Search — mobile only */}
          {/* <button className="header-action-btn header-search-btn-mobile">
            <Search aria-hidden="true" className="icon" />
          </button> */}

          {/* Cart */}
          <a href="/cart" className="header-action-btn">
            <ShoppingCart aria-hidden="true" className="icon" />
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

          {/* Wishlist — desktop only */}
          <a
            href="/wishlist"
            className="header-action-btn header-wishlist-desktop"
          >
            <Heart aria-hidden="true" className="icon" />
            <p className="header-action-label">Wishlist</p>
            {!isWishlistLoading && (
              <div className="btn-badge" aria-hidden="true">
                {getWishlistCount()}
              </div>
            )}
          </a>
        </div>

        {/* Side nav drawer */}
        <nav className={`navbar ${isNavOpen ? "active" : ""}`} data-navbar>
          <div className="navbar-top">
            <a href="/" className="logo">
              <img
                src="/images/logo.svg"
                alt="DiscountDrinks logo"
                width={130}
                height={31}
              />
            </a>
            <button
              className="nav-close-btn"
              aria-label="Close Menu"
              onClick={closeNav}
            >
              <X className="icon" />
            </button>
          </div>

          <ul className="navbar-list">
            <li>
              <a href="/" className="navbar-link" onClick={closeNav}>
                <Home size={16} className="navbar-link-icon" /> Home
              </a>
            </li>
            <li>
              <a href="/products" className="navbar-link" onClick={closeNav}>
                <Store size={16} className="navbar-link-icon" /> Shop
              </a>
            </li>
            {/* Wishlist — in side drawer on mobile only */}
            <li className="navbar-wishlist">
              <a href="/wishlist" className="navbar-link" onClick={closeNav}>
                <Heart size={16} className="navbar-link-icon" />
                Wishlist
                {!isWishlistLoading && getWishlistCount() > 0 && (
                  <span className="navbar-wishlist-badge">
                    {getWishlistCount()}
                  </span>
                )}
              </a>
            </li>
            <li style={{ cursor: "not-allowed" }}>
              <Link
                href="#"
                className="navbar-link"
                style={{ pointerEvents: "none", opacity: 0.5, color: "gray" }}
                aria-disabled="true"
                tabIndex={-1}
              >
                <Info size={16} className="navbar-link-icon" /> About
              </Link>
            </li>
            <li style={{ cursor: "not-allowed" }}>
              <Link
                href="#"
                className="navbar-link"
                style={{ pointerEvents: "none", opacity: 0.5, color: "gray" }}
                aria-disabled="true"
                tabIndex={-1}
              >
                <BookOpen size={16} className="navbar-link-icon" /> Blog
              </Link>
            </li>
            <li style={{ cursor: "not-allowed" }}>
              <Link
                href="#"
                className="navbar-link"
                style={{ pointerEvents: "none", opacity: 0.5, color: "gray" }}
                aria-disabled="true"
                tabIndex={-1}
              >
                <Mail size={16} className="navbar-link-icon" /> Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

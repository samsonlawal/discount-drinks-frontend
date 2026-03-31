"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import {
  CircleUser,
  Search,
  ShoppingCart,
  Heart,
  X,
  Menu,
  Home,
  Store,
  Info,
  Mail,
  Check,
  HelpCircle
} from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLogout } from "@/hooks/api/auth";
import ProfileDropdown from "./ProfileDropdown";
import { useGetProducts } from "@/hooks/api/products";
import { Product } from "@/types";


export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartCount, isLoading } = useCart();
  const { getWishlistCount, isLoading: isWishlistLoading } = useWishlist();

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const allProductsRef = useRef<Product[]>([]);
  const hasFetchedRef = useRef(false);
  const searchWrapperRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { fetchProducts } = useGetProducts();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    
    // Prefetch products for search
    const prefetch = async () => {
      const data = await fetchProducts();
      if (data) {
        allProductsRef.current = data;
        hasFetchedRef.current = true;
      }
    };
    prefetch();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close search dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check desktop search
      const outsideDesktop = searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node);
      // Check mobile search
      const outsideMobile = mobileSearchRef.current && !mobileSearchRef.current.contains(e.target as Node);
      
      if (outsideDesktop && outsideMobile) {
        setShowDropdown(false);
        if (isMobileSearchOpen) setIsMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileSearchOpen]);

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const performSearch = async (q: string) => {
    if (!q.trim()) {
      setSearchResults([]);
      setShowDropdown(false);
      setActiveIndex(-1);
      return;
    }

    setIsSearching(true);
    setShowDropdown(true);

    // Data is now prefetched on mount, but we add a fallback just in case
    if (!hasFetchedRef.current) {
      const data = await fetchProducts();
      if (data) {
        allProductsRef.current = data;
        hasFetchedRef.current = true;
      }
    }

    const lower = q.toLowerCase();
    const filtered = allProductsRef.current.filter((p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description?.toLowerCase().includes(lower) ||
      (p as any).category?.name?.toLowerCase().includes(lower)
    );
    
    setSearchResults(filtered.slice(0, 8));
    setIsSearching(false);
    setActiveIndex(-1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = (id: string) => {
    setShowDropdown(false);
    setSearchQuery("");
    router.push(`/product/${id}`);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && searchResults[activeIndex]) {
        const product = searchResults[activeIndex];
        handleResultClick(product.id || (product as any)._id);
      } else if (searchQuery.trim()) {
        setShowDropdown(false);
        router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      }
    } else if (e.key === "Escape") {
      setShowDropdown(false);
    }
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
  };
  
  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (isNavOpen) setIsNavOpen(false);
  };

  const closeNav = () => setIsNavOpen(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const { onLogout } = useLogout();

  return (
    <header className={`header ${isScrolled ? "active" : ""}`} data-header>
      <div className="container">
        <div
          className={`overlay ${isNavOpen ? "active" : ""}`}
          data-overlay
          onClick={closeNav}
        />

        {/* Hamburger — mobile only */}
        <button
          className="pr-1 text-(--eerie-black) md:hidden"
          aria-label="Open Menu"
          onClick={toggleNav}
        >
          <Menu size={22} />
        </button>

        {/* Desktop search bar */}
        <div className="relative hidden lg:block w-max" ref={searchWrapperRef}>
          <input
            type="search"
            name="search"
            placeholder="Search products..."
            className="bg-white h-10.5 w-70 pl-3.75 pr-11.25 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-all"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            autoComplete="off"
          />
          <button 
            className="absolute top-1/2 right-3.75 -translate-y-1/2 text-black hover:text-emerald-600 transition-colors" 
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {/* Search Dropdown - Desktop */}
          {showDropdown && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-98 bg-white border border-black/10 rounded-md p-2 shadow-2xl z-[1500] min-h-60 max-h-100 overflow-y-auto overflow-x-hidden hidden lg:block">
              <SearchResultsList 
                results={searchResults} 
                isSearching={isSearching} 
                hasFetched={hasFetchedRef.current}
                activeIndex={activeIndex}
                handleResultClick={handleResultClick}
                setActiveIndex={setActiveIndex}
              />
            </div>
          )}
        </div>

        {/* Mobile Search Bar — Expandable */}
        <div 
          ref={mobileSearchRef}
          className={`mobile-search-bar ${isMobileSearchOpen ? "active" : ""} lg:hidden`}
        >
          <div className="search-input-wrapper">
            <input
              type="search"
              placeholder="Search products..."
              className="mobile-search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              autoFocus={isMobileSearchOpen}
              autoComplete="off"
            />
            <button 
              className="search-close-btn"
              onClick={() => setIsMobileSearchOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Search Dropdown - Mobile */}
          {showDropdown && (
            <div className="mobile-search-results bg-white mt-3 border border-black/10 rounded-md p-2 shadow-xl max-h-80 overflow-y-auto">
              <SearchResultsList 
                results={searchResults} 
                isSearching={isSearching} 
                hasFetched={hasFetchedRef.current}
                activeIndex={activeIndex}
                handleResultClick={handleResultClick}
                setActiveIndex={setActiveIndex}
              />
            </div>
          )}
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
          {/* Search Toggle — mobile only */}
          <button 
            className={`header-action-btn md:hidden ${isMobileSearchOpen ? "active" : ""}`}
            onClick={toggleMobileSearch}
            aria-label="Toggle Search"
          >
            <Search size={22} aria-hidden="true" className="icon" />
          </button>

          {/* User */}
          {user ? 
            <>
              {/* Mobile View */}
              <Link 
                href="/user/profile"
                className="header-action-btn relative md:!hidden flex!" 
                data-auth-btn
              >
                <CircleUser size={24} aria-hidden="true" className="icon" />
                <p className="header-action-label">Account</p>
                <div
                  className="absolute bg-black text-white rounded-full flex items-center justify-center md:hidden"
                  style={{ width: '14px', height: '14px', top: '6px', right: '0px' }}
                  aria-hidden="true"
                >
                  <Check size={10} strokeWidth={4} />
                </div>
              </Link>
              
              {/* Desktop View: Dropdown */}
              <ProfileDropdown user={user} onLogout={onLogout} />
            </>
          :
          (
            <a
  href="/auth/signin" // or previously /login
  className="btn-dark"
  data-auth-btn
  style={{ 
    padding: "6px 16px", 
    borderRadius: "4px", 
    fontSize: "14px", 
    fontWeight: 600, 
    textDecoration: "none" 
  }}
>
  Login
</a>

          )}

          {/* Cart */}
          <a href="/cart" className="header-action-btn">
            <ShoppingCart aria-hidden="true" className="icon" />
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
            <li>
              <Link
                href="/about"
                className="navbar-link"
                onClick={closeNav}
              >
                <Info size={16} className="navbar-link-icon" /> About
              </Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <Link
                href="/faq"
                className="navbar-link"
                onClick={closeNav}
              >
                <HelpCircle size={16} className="navbar-link-icon" /> FAQ
              </Link>
            </li>
            <li style={{ cursor: "pointer" }}>
              <Link
                href="/contact"
                className="navbar-link"
                onClick={closeNav}
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

function SearchResultsList({ 
  results, 
  isSearching, 
  hasFetched, 
  activeIndex, 
  handleResultClick, 
  setActiveIndex 
}: {
  results: Product[],
  isSearching: boolean,
  hasFetched: boolean,
  activeIndex: number,
  handleResultClick: (id: string) => void,
  setActiveIndex: (index: number) => void
}) {
  if (isSearching && hasFetched) {
    return <div className="p-4 text-center text-gray-500 text-sm italic">Filtering list...</div>;
  }
  
  if (isSearching) {
    return <div className="p-4 text-center text-gray-500 text-sm">Searching products...</div>;
  }
  
  if (results.length === 0) {
    return <div className="p-4 text-center text-gray-500 text-sm">No products found</div>;
  }

  return (
    <>
      {results.map((product, index) => {
        const productId = product.id || (product as any)._id;
        const imageUrl = product.image || (product as any).images?.[0] || "/images/placeholder.jpg";
        return (
          <button
            key={productId}
            className={`flex items-center gap-3 w-full p-2.5 text-left transition-all border-b rounded-md border-gray-50 last:border-b-0 hover:bg-gray-200 ${index === activeIndex ? "bg-gray-100" : ""}`}
            onClick={() => handleResultClick(productId)}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <div className="w-12 h-12 shrink-0 rounded-md bg-gray-50 overflow-hidden border border-gray-100">
              <img
                src={imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/400x400/f3f4f6/666666?text=No+Image";
                }}
              />
            </div>
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              <span className="text-sm font-semibold text-(--eerie-black) truncate leading-tight">{product.name}</span>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-(--ocean-green)">
                  £{(Number((product as any).costPrice ?? product.price) || 0).toFixed(2)}
                </span>
                {(product as any).category && (
                  <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase font-medium">
                    {(product as any).category?.name || (product as any).category}
                  </span>
                )}
              </div>
            </div>
          </button>
        );
      })}
    </>
  );
}


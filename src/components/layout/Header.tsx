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
    <header className={`w-full bg-white transition-all duration-200 z-50 ${isScrolled ? "fixed top-0 left-0 shadow-md lg:static lg:shadow-none lg:border-b lg:border-black/10" : "relative lg:py-2 lg:border-b lg:border-black/10 lg:mb-[50px]"}`}>
      <div className="container mx-auto px-4 sm:px-10 max-w-[1350px]">
        
        {/* Main Header Row */}
        <div className="flex justify-between items-center py-3 lg:py-0">
          
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black transition-opacity duration-250 z-[100] lg:hidden ${isNavOpen ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            onClick={closeNav}
          />

          {/* Left section: Hamburger & Search */}
          <div className="flex-1 flex items-center justify-start">
            {/* Hamburger — mobile only */}
            <button
              className="flex items-center justify-center p-2 pl-0 text-(--eerie-black) shrink-0 lg:hidden"
              aria-label="Open Menu"
              onClick={toggleNav}
            >
              <Menu size={24} />
            </button>

            {/* Desktop search bar */}
            <div className="relative hidden lg:block w-max" ref={searchWrapperRef}>
              <input
                type="search"
                name="search"
                placeholder="Search products..."
                className="bg-white h-9.5 w-70 pl-3.75 pr-11.25 border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black transition-all"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                autoComplete="off"
              />
              <button 
                className="absolute top-1/2 right-3.75 -translate-y-1/2 text-black hover:text-(--ocean-green) transition-colors" 
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
          </div>

          {/* Mobile Search Bar — Expandable */}
          <div 
            ref={mobileSearchRef}
            className={`absolute top-full left-0 w-full bg-white p-4 shadow-lg border-t border-gray-100 z-40 transition-all duration-300 lg:hidden ${isMobileSearchOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"}`}
          >
            <div className="relative flex items-center">
              <input
                type="search"
                placeholder="Search products..."
                className="flex-1 h-10 px-4 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-gray-400"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                autoComplete="off"
              />
            </div>

            {/* Search Dropdown - Mobile */}
            {showDropdown && (
              <div className="mt-3 bg-white border border-black/10 rounded-md p-2 shadow-xl max-h-80 overflow-y-auto">
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
          <Link href="/" className="flex-none">
            <img
              src="/images/logo.svg"
              alt="DiscountDrinks logo"
              width={130}
              height={31}
            />
          </Link>

          {/* Action icons */}
          <div className="flex-1 flex items-center gap-1 lg:gap-4 justify-end">
            {/* Search Toggle — mobile only */}
            <button 
              className={`relative flex items-center justify-center w-[36px] h-[36px] text-(--eerie-black) rounded-lg transition-colors lg:hidden ${isMobileSearchOpen ? "text-(--ocean-green)" : ""}`}
              onClick={toggleMobileSearch}
              aria-label="Toggle Search"
            >
              <Search size={22} aria-hidden="true" />
            </button>

            {/* User */}
            {user ? (
              <>
                {/* Mobile View */}
                <Link 
                  href="/user/profile"
                  className="relative flex items-center justify-center w-[36px] h-[36px] text-(--eerie-black) lg:hidden" 
                >
                  {user.profileImage ? (
                    <img src={user.profileImage} alt="Profile" className="w-[22px] h-[22px] rounded-full" />
                  ) : (
                    <CircleUser size={22} />
                  )}
                  <p className="hidden">Account</p>

                  {!user.profileImage && (
                    <div className="absolute top-[6px] right-0 w-[14px] h-[14px] bg-black text-white rounded-full flex items-center justify-center">
                      <Check size={10} strokeWidth={4} />
                    </div>
                  )}
                </Link>
                
                {/* Desktop View: Dropdown */}
                <ProfileDropdown user={user} onLogout={onLogout} />
              </>
            ) : (
              <Link
                href="/auth/sign-in"
                className="relative flex items-center justify-center w-[36px] h-[36px] text-(--eerie-black) rounded-lg transition-colors lg:w-auto lg:gap-1.5 lg:h-auto group hover:text-(--ocean-green)"
              >
                <CircleUser size={24} aria-hidden="true" />
                <span className="hidden lg:block text-(--sonic-silver) text-[14px] group-hover:text-(--ocean-green) font-medium">Account</span>
              </Link>
            )}

            {/* Cart */}
            <Link href="/cart" className="relative flex items-center justify-center w-[36px] h-[36px] text-(--eerie-black) rounded-lg transition-colors lg:w-auto lg:gap-1.5 lg:h-auto group hover:text-(--ocean-green)">
              <div className="relative flex justify-center items-center">
                <ShoppingCart size={24} aria-hidden="true" />
                {!isLoading && (
                  <div className="absolute -top-1.5 -right-2 flex items-center justify-center min-w-[18px] h-[18px] bg-(--ocean-green) text-white text-[10px] rounded-full px-1">
                    {getCartCount()}
                  </div>
                )}
              </div>
              <span className="hidden lg:block text-(--sonic-silver) text-[14px] group-hover:text-(--ocean-green) font-medium">Cart</span>
            </Link>
          </div>
        </div>

        {/* Side nav drawer / Desktop Navbar */}
        <nav className={`fixed top-0 left-0 w-full max-w-[300px] h-full bg-white px-6 py-8 z-[200] transition-transform duration-500 ease-in-out ${isNavOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:max-w-none lg:h-auto lg:p-0 ${isScrolled ? "lg:fixed lg:top-0 lg:left-0 lg:w-full lg:bg-white lg:shadow-md lg:z-[1000]" : "lg:absolute lg:top-full lg:bg-transparent lg:z-[150]"}`}>
          <div className="flex justify-between items-center mb-10 lg:hidden">
            <Link href="/">
              <img
                src="/images/logo.svg"
                alt="DiscountDrinks logo"
                width={130}
                height={31}
              />
            </Link>
            <button
              className="text-(--eerie-black) p-1"
              aria-label="Close Menu"
              onClick={closeNav}
            >
              <X size={24} />
            </button>
          </div>

          <ul className="flex flex-col w-full lg:flex-row lg:justify-center lg:items-center lg:gap-10 lg:px-10 lg:h-[50px] ">
            <li className="border-b border-(--cultured) lg:border-none">
              <Link href="/" className="flex items-center gap-3 py-3 text-(--eerie-black) text-[18px] lg:text-[15px] lg:font-medium lg:py-3 transition-colors hover:text-(--ocean-green)" onClick={closeNav}>
                <Home size={18} className="shrink-0 text-(--sonic-silver) lg:hidden" /> Home
              </Link>
            </li>
            <li className="border-b border-(--cultured) lg:border-none">
              <Link href="/products" className="flex items-center gap-3 py-3 text-(--eerie-black) text-[18px] lg:text-[15px] lg:font-medium lg:py-3 transition-colors hover:text-(--ocean-green)" onClick={closeNav}>
                <Store size={18} className="shrink-0 text-(--sonic-silver) lg:hidden" /> Shop
              </Link>
            </li>
            <li className="border-b border-(--cultured) lg:border-none">
              <Link href="/about" className="flex items-center gap-3 py-3 text-(--eerie-black) text-[18px] lg:text-[15px] lg:font-medium lg:py-3 transition-colors hover:text-(--ocean-green)" onClick={closeNav}>
                <Info size={18} className="shrink-0 text-(--sonic-silver) lg:hidden" /> About
              </Link>
            </li>
            <li className="border-b border-(--cultured) lg:border-none">
              <Link href="/faq" className="flex items-center gap-3 py-3 text-(--eerie-black) text-[18px] lg:text-[15px] lg:font-medium lg:py-3 transition-colors hover:text-(--ocean-green)" onClick={closeNav}>
                <HelpCircle size={18} className="shrink-0 text-(--sonic-silver) lg:hidden" /> FAQ
              </Link>
            </li>
            <li className="lg:border-none">
              <Link href="/contact" className="flex items-center gap-3 py-3 text-(--eerie-black) text-[18px] lg:text-[15px] lg:font-medium lg:py-3 transition-colors hover:text-(--ocean-green)" onClick={closeNav}>
                <Mail size={18} className="shrink-0 text-(--sonic-silver) lg:hidden" /> Contact
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


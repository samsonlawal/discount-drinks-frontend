"use client";

import React, { useState } from "react";
import { products } from "@/data";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import { SlidersHorizontal } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;
    const badgeMatch =
      selectedBadge === "All" || product.badge === selectedBadge.toLowerCase();
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && badgeMatch && priceMatch;
  });

  return (
    <main>
      <section className="section product">
        <div className="container">
          {/* Page header row: breadcrumbs + filter toggle */}
          <div className="products-page-header">
            {/* Breadcrumb */}
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol className="breadcrumb-list">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Products
                </li>
              </ol>
            </nav>

            {/* Icon-only filter toggle */}
            <button
              onClick={toggleSidebar}
              className={`filter-icon-btn${isSidebarOpen ? " filter-icon-btn--active" : ""}`}
              aria-label={isSidebarOpen ? "Close filters" : "Open filters"}
              title={isSidebarOpen ? "Close filters" : "Open filters"}
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* Sidebar + Products side-by-side */}
          <div className="products-layout">
            <FilterSidebar
              isOpen={isSidebarOpen}
              onToggle={toggleSidebar}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedBadge={selectedBadge}
              onBadgeChange={setSelectedBadge}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              filteredCount={filteredProducts.length}
              totalCount={products.length}
            />

            {/* Products Area */}
            <div className="products-main">
              <ul className="product-list">
                {filteredProducts.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>

              {filteredProducts.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 20px" }}>
                  <p
                    style={{
                      color: "var(--sonic-silver)",
                      fontSize: "var(--fs-6)",
                    }}
                  >
                    No products found matching your filters.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

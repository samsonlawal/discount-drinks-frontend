"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import { SlidersHorizontal } from "lucide-react";

import { useGetProducts } from "@/hooks/api/products";
import { useGetCategories } from "@/hooks/api/categories";
import { useGetTags } from "@/hooks/api/tags";
import { useGetBrands } from "@/hooks/api/brands";

export default function ProductsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch all necessary data
  const { loading: productsLoading, products: rawProducts, fetchProducts } = useGetProducts();
  const { categories, fetchCategories } = useGetCategories();
  const { tags, fetchTags } = useGetTags();
  const { brands, fetchBrands } = useGetBrands();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchTags();
    fetchBrands();
  }, []);

  const formattedProducts = (rawProducts || []).map((p: any, index: number) => {
    // Try to find the image in various common backend fields
    let img = p.image || p.imageUrl || p.thumbnail || p.photoUrl;
    if (!img && p.images && Array.isArray(p.images) && p.images.length > 0) {
      img = p.images[0];
    }
    if (!img) {
      img = `/images/product-${(index % 8) + 1}.jpg`;
    }

    return {
      ...p,
      id: p._id || p.id || String(index),
      image: img,
      price: typeof p.price === 'number' ? p.price : parseFloat(p.price) || 0,
      originalPrice: p.originalPrice ? (typeof p.originalPrice === 'number' ? p.originalPrice : parseFloat(p.originalPrice)) : undefined,
    };
  });

  const filteredProducts = formattedProducts.filter((product: any) => {
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory || 
      (product.tags && product.tags.includes(selectedCategory));
      
    const productBadge = product.badge || "";
    const badgeMatch =
      selectedBadge === "All" || productBadge.toLowerCase() === selectedBadge.toLowerCase();
      
    // Assuming brand exists on product as string, id, or object with a name
    const productBrand = product.brand?.name || product.brand || "";
    const brandMatch = 
      selectedBrand === "All" || productBrand.toLowerCase() === selectedBrand.toLowerCase();
      
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
      
    return categoryMatch && badgeMatch && brandMatch && priceMatch;
  });

  return (
    <main>
      <section className="section product">
        <div className="container">
          <div className="products-page-header">
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
            <button
              onClick={toggleSidebar}
              className={`filter-icon-btn${isSidebarOpen ? " filter-icon-btn--active" : ""}`}
              aria-label={isSidebarOpen ? "Close filters" : "Open filters"}
              title={isSidebarOpen ? "Close filters" : "Open filters"}
            >
              <SlidersHorizontal size={16} />
            </button>
          </div>

          <div className="products-layout">
            <FilterSidebar
              isOpen={isSidebarOpen}
              onToggle={toggleSidebar}
              categories={categories || []}
              badges={tags || []}
              brands={brands || []}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedBadge={selectedBadge}
              onBadgeChange={setSelectedBadge}
              selectedBrand={selectedBrand}
              onBrandChange={setSelectedBrand}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              filteredCount={filteredProducts.length}
              totalCount={formattedProducts.length}
            />

            <div className="products-main">
              {productsLoading ? (
                <div className="flex justify-center items-center py-20 w-full h-[70vh]">
                  <p className="text-xl md:text-2xl text-gray-600 animate-pulse">Loading products...</p>
                </div>
              ) : (
                <> 
                  <ul className="product-list">
                    {filteredProducts.map((product: any) => (
                      <li key={product.id}>
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>

                  {filteredProducts.length === 0 && (
                    <div style={{ textAlign: "center", padding: "20px 20px" }} className="flex justify-center items-center py-20 w-full h-[60vh]">
                      <p
                        style={{
                          color: "var(--sonic-silver)",
                          fontSize: "var(--fs-6)",
                        }}
                      >
                        No products found.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import FilterSidebar from "@/components/products/FilterSidebar";
import { SlidersHorizontal } from "lucide-react";

import { useGetProducts } from "@/hooks/api/products";
import { useGetCategories } from "@/hooks/api/categories";
import { useGetTags } from "@/hooks/api/tags";
import { useGetBrands } from "@/hooks/api/brands";
import Pagination from "@/components/common/Pagination";

function ProductsContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedBadge, setSelectedBadge] = useState("All");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(12);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("All");
    }
    setCurrentPage(1); // Reset to page 1 on category change from URL
  }, [categoryParam]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch all necessary data
  const { loading: productsLoading, products, pagination, fetchProducts } = useGetProducts();
  const { categories, fetchCategories } = useGetCategories();
  const { tags, fetchTags } = useGetTags();
  const { brands, fetchBrands } = useGetBrands();

  useEffect(() => {
    fetchCategories();
    fetchTags();
    fetchBrands();
  }, []);

  // Use all categories, tags, and brands regardless of status
  const activeCategories = (categories || []);
  const activeTags = (tags || []);
  const activeBrands = (brands || []);

  // Fetch products whenever filters or page changes
  useEffect(() => {
    const query: any = {
      page: currentPage,
      limit: limit,
    };

    if (selectedCategory !== "All") query.category = selectedCategory;
    if (selectedBadge !== "All") query.tags = selectedBadge; 
    if (selectedBrand !== "All") query.brand = selectedBrand;
    if (priceRange[0] > 0) query.minPrice = priceRange[0];
    if (priceRange[1] < 9999) query.maxPrice = priceRange[1];

    fetchProducts(query);
  }, [currentPage, selectedCategory, selectedBadge, selectedBrand, priceRange, limit]);

  // Reset to page 1 when any filter changes
  const handleFilterChange = (setter: any) => (value: any) => {
    setter(value);
    setCurrentPage(1);
  };

  const formattedProducts = (products || []).map((p: any, index: number) => {
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
              <SlidersHorizontal size={20} />
            </button>
          </div>

          <div className="products-layout">
            <FilterSidebar
              isOpen={isSidebarOpen}
              onToggle={toggleSidebar}
              categories={activeCategories}
              badges={activeTags}
              brands={activeBrands}
              selectedCategory={selectedCategory}
              onCategoryChange={handleFilterChange(setSelectedCategory)}
              selectedBadge={selectedBadge}
              onBadgeChange={handleFilterChange(setSelectedBadge)}
              selectedBrand={selectedBrand}
              onBrandChange={handleFilterChange(setSelectedBrand)}
              priceRange={priceRange}
              onPriceRangeChange={handleFilterChange(setPriceRange)}
              filteredCount={formattedProducts.length}
              totalCount={pagination?.total || formattedProducts.length}
            />

            <div className="products-main">
              {productsLoading ? (
                <ul className="product-list">
                  {Array.from({ length: limit }).map((_, index) => (
                    <li key={index}>
                      <ProductCardSkeleton />
                    </li>
                  ))}
                </ul>
              ) : (
                <> 
                  <ul className="product-list">
                    {formattedProducts.map((product: any) => (
                      <li key={product.id}>
                        <ProductCard product={product} />
                      </li>
                    ))}
                  </ul>

                  {formattedProducts.length === 0 && !productsLoading && (
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

                  <Pagination
                    currentPage={currentPage}
                    totalPages={pagination?.pages || 1}
                    onPageChange={setCurrentPage}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}

"use client";

import React, { useEffect } from "react";
import { useGetProducts } from "@/hooks/api/products";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Link from 'next/link'

interface ProductListProps {
  loading?: boolean;
}

export default function ProductList({ loading: manualLoading = false }: ProductListProps) {
  const { fetchProducts, loading: apiLoading, products: apiProducts } = useGetProducts();

  useEffect(() => {
    // Fetch a larger pool of products to filter from, bypassing the potentially empty "tags" filter on the server
    fetchProducts({ limit: 50 });
  }, []);

  const isLoading = manualLoading || apiLoading;

  return (
    <section className="section product">
      <div className="container">
        <h2 className="h2 section-title">Our Best Sellers</h2>

        <ul className="product-list flex flex-row flex-wrap !justify-center items-center">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <li key={index}>
                <ProductCardSkeleton />
              </li>
            ))
          ) : (
            apiProducts
              .filter((product: any) => 
                product.tags?.some((tag: any) => {
                  const name = typeof tag === "string" ? tag : tag?.name || "";
                  return name.toLowerCase().includes("best-seller");
                })
              )
              .map((product: any) => (
                <li key={product.id || (product as any)._id}>
                  <ProductCard product={product} />
                </li>
              ))
          )}
        </ul>

        <div className="flex justify-center mt-10">
          <Link 
            href="/products" 
            className="btn btn-primary !w-max !inline-flex items-center justify-center px-10"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}

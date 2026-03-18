"use client";

import { products } from "@/data";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Link from 'next/link'

interface ProductListProps {
  loading?: boolean;
}

export default function ProductList({ loading = false }: ProductListProps) {
  return (
    <section className="section product">
      <div className="container">
        <h2 className="h2 section-title">Best Sellers</h2>

        <ul className="product-list">
          {loading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <li key={index}>
                <ProductCardSkeleton />
              </li>
            ))
          ) : (
            products.map((product: any) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))
          )}
        </ul>

        <div className="flex justify-center">
          <Link href="/products" className="btn btn-primary w-max">View All Products</Link>
        </div>
      </div>
    </section>
  );
}

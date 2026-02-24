"use client";

import React, { useState } from "react";
import { products } from "@/data";
import ProductCard from "./ProductCard";
import Link from 'next/link'

const filters = ["Best Seller", "Hot Collection", "Trendy", "New Arrival"];

export default function ProductList() {
  const [activeFilter, setActiveFilter] = useState("Best Seller");

  return (
    <section className="section product">
      <div className="container">
        <h2 className="h2 section-title">Products of the week</h2>

        <ul className="filter-list">
          {filters.map((filter) => (
            <li key={filter}>
              <button
                className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            </li>
          ))}
        </ul>

        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <Link href="/products" className="btn btn-outline">View All Products</Link>
      </div>
    </section>
  );
}

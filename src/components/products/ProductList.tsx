"use client";

import React, { useState } from "react";
import { products } from "@/data";
import ProductCard from "./ProductCard";

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

        <button className="btn btn-outline">View All Products</button>
      </div>
    </section>
  );
}

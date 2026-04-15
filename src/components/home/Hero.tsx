import React from "react";
import Link from "next/link";
import { categories } from "@/data";

export default function Hero() {
  // Duplicate for seamless infinite loop
  const tickerItems = [...categories, ...categories];

  return (
    <section
      className="hero flex-col justify-between items-center lg:items-start"
      id="home"
      style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
    >
      {/* Mobile-only: infinite scrolling category text ticker at the top */}
      <div className="hero-mobile-ticker">
        <div className="hero-mobile-ticker-track">
          {tickerItems.map((category, i) => (
            <Link
              key={`${category.id}-${i}`}
              href={`/products?category=${category.slug}`}
              className="hero-mobile-ticker-item"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Text + button — padded via .container */}
      <div className="container flex w-full lg:w-fit items-center flex-1">
        <div className="hero-content flex flex-col items-center lg:items-start text-center lg:text-left">
          <p className="hero-subtitle">Spirits, Wine and Lager</p>

          <h2 className="h1 hero-title">UK's No.1 Bulk Discount Shop</h2>

          <Link href="/products" className="inline-block w-max">
            <button className="btn btn-primary">Shop Now</button>
          </Link>
        </div>
      </div>

      {/* Categories — desktop only, outside .container so it goes full-width */}
      <div className="hero-categories-container flex items-center justify-center">
        <div className="container flex flex-col items-center">
          <div className="hero-categories-list">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="hero-category-card"
              >
                <div className="hero-category-img-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    width="100"
                    height="100"
                    loading="lazy"
                  />
                  <span className="hero-category-name">{category.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}

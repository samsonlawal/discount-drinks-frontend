import React from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="hero"
      id="home"
      style={{ backgroundImage: "url('/images/hero-banner.jpg')" }}
    >
      <div className="container">
        <div className="hero-content">
          <p className="hero-subtitle">Spirits, Wine and Lager</p>

          <h2 className="h1 hero-title">UK's No.1 Bulk Discount Shop</h2>

          <Link href="/products">
            <button className="btn btn-primary">Shop Now</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

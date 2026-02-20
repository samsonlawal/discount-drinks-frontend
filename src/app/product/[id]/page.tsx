"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/products/ProductCard";
import { CheckCircle2, Heart } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const { addToCart, isInCart } = useCart();

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-fs-2 font-semibold text-eerie-black mb-4">
            Product Not Found
          </h1>
          <Link href="/" className="btn btn-primary inline-flex">
            Back to Home
          </Link>
        </div>
      </main>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== productId)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <main>
      {/* <article> */}
      <section className="section product">
        <div className="container">
          {/* Breadcrumb */}

          <div className="products-page-header">
            <nav className="breadcrumb">
              <ul className="breadcrumb-list">
                <li className="breadcrumb-item">
                  <Link href="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/products">Products</Link>
                </li>
                <li className="breadcrumb-item active">{product.name}</li>
              </ul>
            </nav>
          </div>

          {/* Product Details */}
          <section className="section product-detail">
            <div className="product-detail-grid">
              {/* Product Image */}
              <div className="product-showcase">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="product-img"
                  priority
                />
              </div>

              {/* Product Info */}
              <div className="product-info">
                {product.badge && (
                  <span
                    className={`product-badge ${
                      product.badge === "sale" ? "red" : "green"
                    }`}
                  >
                    {product.badgeText}
                  </span>
                )}

                <h1 className="h2 product-title">{product.name}</h1>

                <div className="price-wrapper">
                  <data className="price" value={product.price}>
                    £{product.price.toFixed(2)}
                  </data>
                  {product.originalPrice && (
                    <data className="price-old" value={product.originalPrice}>
                      £{product.originalPrice.toFixed(2)}
                    </data>
                  )}
                </div>

                {/* Tags */}
                {product.tags && product.tags.length > 0 && (
                  <div className="product-tags">
                    {product.tags.map((tag) => (
                      <span key={tag} className="product-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="product-description">
                  <p>
                    Premium quality drink sourced from the finest producers.
                    Perfect for any occasion, whether you&apos;re celebrating or
                    just enjoying a quiet evening. Our bulk discount prices
                    ensure you get the best value for your money.
                  </p>
                </div>

                {/* Specifications */}
                {product.specifications &&
                  Object.keys(product.specifications).length > 0 && (
                    <div className="product-specs">
                      <table className="specs-table">
                        <tbody>
                          {Object.entries(product.specifications).map(
                            ([key, value]) => (
                              <tr key={key} className="specs-row">
                                <th className="specs-key">{key}</th>
                                <td className="specs-value">{value}</td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                {/* <ul className="product-features">
                  <li className="feature-item">
                    <CheckCircle2 className="feature-icon" />
                    <span>In Stock</span>
                  </li>
                  <li className="feature-item">
                    <CheckCircle2 className="feature-icon" />
                    <span>Free Shipping on Orders Over £599</span>
                  </li>
                  <li className="feature-item">
                    <CheckCircle2 className="feature-icon" />
                    <span>30 Day Returns Policy</span>
                  </li>
                </ul> */}
              </div>
            </div>
          </section>

          {/* Related Products */}
          <section className="section">
            <h2 className="h2 section-title">Related Products</h2>
            <ul className="product-list">
              {relatedProducts.map((relatedProduct) => (
                <li key={relatedProduct.id}>
                  <ProductCard product={relatedProduct} />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </section>

      {/* </article> */}
    </main>
  );
}

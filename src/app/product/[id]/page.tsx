"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data";
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/products/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);
  const { addToCart } = useCart();

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
    <main className="py-20">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-sonic-silver">
            <li>
              <Link
                href="/"
                className="hover:text-eerie-black transition-colors"
              >
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/shop"
                className="hover:text-eerie-black transition-colors"
              >
                Shop
              </Link>
            </li>
            <li>/</li>
            <li className="text-eerie-black">{product.name}</li>
          </ol>
        </nav>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="bg-cultured rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={800}
              height={1034}
              className="w-full h-auto"
              priority
            />
          </div>

          {/* Product Info */}
          <div>
            {product.badge && (
              <span
                className={`inline-block text-white text-fs-9 font-medium px-3 py-1 rounded mb-4 ${
                  product.badge === "sale" ? "bg-candy-pink" : "bg-ocean-green"
                }`}
              >
                {product.badgeText}
              </span>
            )}

            <h1 className="text-fs-1 font-semibold text-eerie-black mb-4">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-fs-1 font-semibold text-eerie-black">
                £{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-fs-6 text-sonic-silver line-through">
                  £{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="border-t border-b border-cultured py-6 mb-6">
              <p className="text-sonic-silver leading-relaxed">
                Premium quality drink sourced from the finest producers. Perfect
                for any occasion, whether you&apos;re celebrating or just
                enjoying a quiet evening. Our bulk discount prices ensure you
                get the best value for your money.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-ocean-green"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sonic-silver">In Stock</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-ocean-green"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sonic-silver">
                  Free Shipping on Orders Over £599
                </span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-ocean-green"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sonic-silver">30 Day Returns Policy</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="btn btn-primary flex-grow"
              >
                Add to Cart
              </button>
              <button className="btn btn-outline w-14 px-0">
                <svg
                  className="w-6 h-6 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-fs-2 font-semibold text-eerie-black mb-8">
            Related Products
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <li key={relatedProduct.id}>
                <ProductCard product={relatedProduct} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

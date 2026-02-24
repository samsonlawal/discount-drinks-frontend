"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data"; // still used for related products fallback
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/products/ProductCard";
import { CheckCircle2, Heart } from "lucide-react";
import { useGetProductById } from "@/hooks/api/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { addToCart, isInCart } = useCart();
  
  const { product: apiProduct, loading, fetchProduct } = useGetProductById();

  // Try to find in mock if API fails/isn't set up yet, to avoid totally breaking
  const mockFallback = products.find((p) => p.id === productId || p._id === productId);
  const product = apiProduct || mockFallback;

  const [activeImage, setActiveImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);

  useEffect(() => {
    // Prevent fetching mock products (prod_xxx) from the database since MongoDB uses 24-char ObjectIds
    if (productId && !productId.startsWith("prod_") && productId.length === 24) {
      fetchProduct(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      const productImage = product.image || (product as any).imageUrl || (product as any).thumbnail || (product as any).images?.[0] || "/images/product-1.jpg";
      setActiveImage(productImage);
      
      const imagesList = (product as any).images && Array.isArray((product as any).images) && (product as any).images.length > 0 
        ? (product as any).images 
        : [productImage, "/images/product-1.jpg", "/images/product-2.jpg", "/images/product-4.jpg"];
      
      setGalleryImages(Array.from(new Set(imagesList as string[])));
    }
  }, [product]);

  if (loading && !product) {
    return (
      <main className="min-h-screen flex items-center justify-center py-20">
        <p>Loading Product...</p>
      </main>
    );
  }

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
                  src={activeImage || product.image || "/images/product-1.jpg"}
                  alt={product.name || "Product"}
                  width={400}
                  height={400}
                  className="product-img"
                  priority
                />
                
                {/* Thumbnails */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-4 mt-6 overflow-x-auto pb-2 w-full justify-start md:justify-center">
                    {galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`flex-shrink-0 rounded-lg overflow-hidden transition-all duration-200 border-2 ${
                          activeImage === img 
                            ? "border-black scale-105 shadow-md opacity-100" 
                            : "border-transparent hover:border-gray-300 opacity-60 hover:opacity-100"
                        }`}
                        style={{ width: '80px', height: '80px', flexBasis: '80px' }}
                      >
                        <Image
                          src={img || "/images/product-1.jpg"}
                          alt={`${product.name} thumbnail ${idx + 1}`}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full bg-gray-50"
                        />
                      </button>
                    ))}
                  </div>
                )}
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
                  <data className="price" value={(product.costPrice ?? product.price) || 0}>
                    £{Number((product.costPrice ?? product.price) || 0).toFixed(2)}
                  </data>
                  {product.originalPrice && (
                    <data className="price-old" value={product.originalPrice}>
                      £{Number(product.originalPrice).toFixed(2)}
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

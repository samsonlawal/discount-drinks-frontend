"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data"; // still used for related products fallback
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/products/ProductCard";
import { CheckCircle2, Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetProductById } from "@/hooks/api/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
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
      <main className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="text-center">
          <p className="text-xl md:text-2xl font-medium text-gray-600 animate-pulse">Loading product details...</p>
        </div>
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

  const isProductInCart = product ? isInCart(product.id || (product as any)._id) : false;
  const inWishlist = product ? isInWishlist(product.id || (product as any)._id) : false;

  const handleWishlistToggle = () => {
    if (!product) return;
    const pId = product.id || (product as any)._id;
    if (inWishlist) {
      removeFromWishlist(pId);
    } else {
      addToWishlist(product);
    }
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
              <div className="product-showcase gap-3 flex-col-reverse md:flex-row bg-[red]">
               
                
                {/* Thumbnails */}
                <div className="flex flex-row md:flex-col gap-2 md:gap-4 mt-8 h-fit w-fit justify-center py-4px-2">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const img = galleryImages[idx];
                    const hasImage = !!img && !(typeof img === 'string' && (img.trim() === '' || img === 'null' || img === 'undefined'));
                    const isActive = activeImage === img;

                    return (
                      <button
                        key={idx}
                        onClick={() => hasImage && setActiveImage(img)}
                        disabled={!hasImage}
                        className={`relative flex-shrink-0 rounded-md overflow-hidden transition-all duration-200 w-8 h-8 sm:w-12 sm:h-12 ${
                          isActive
                            ? "ring-2 ring-black ring-offset-1 opacity-100"
                            : hasImage
                            ? "ring-1 ring-gray-200 hover:ring-gray-300 cursor-pointer"
                            : "bg-gray-200 cursor-not-allowed"
                        }`}
                        aria-label={hasImage ? `${product.name} thumbnail ${idx + 1}` : "Empty image slot"}
                      >
                        {hasImage ? (
                          <img
                            src={typeof img === 'string' ? img : (img as any)?.src || img}
                            alt=""
                            className="w-full h-full object-cover bg-white block"
                          />
                        ) : null}
                      </button>
                    );
                  })}
                </div>

                 <Image
                  src={activeImage || product.image || (product as any).imageUrl || (product as any).thumbnail || (product as any).images?.[0] || "/images/product-1.jpg"}
                  alt={product.name || "Product"}
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
                    {product.badge}
                  </span>
                )}

                <h1 className="h2 product-title">{product.name}</h1>

                <div className="price-wrapper">
                  <data className="price" value={(product.costPrice ?? product.price) || 0}>
                    £{Number((product.costPrice ?? product.price) || 0).toFixed(2)}
                  </data>
                  {(product.originalPrice || product.basePrice) && (
                    <data className="price-old" value={product.originalPrice || product.basePrice}>
                      £{Number(product.originalPrice || product.basePrice).toFixed(2)}
                    </data>
                  )}
                </div>

                <div className="product-description">
                  {product.description ? (
                    <div 
                      className="w-full text-gray-700" 
                      dangerouslySetInnerHTML={{ __html: product.description }} 
                    />
                  ) : (
                    <p className="w-full text-gray-500 italic">
                      No description available for this product.
                    </p>
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

                <div className="product-actions mt-4">
                  <button 
                    className="btn btn-primary flex gap-2" 
                    onClick={handleAddToCart}
                    disabled={isProductInCart}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{isProductInCart ? "In Cart" : "Add to Cart"}</span>
                  </button>
                  <button 
                    className={`btn btn-outline flex gap-2 wishlist-detail-btn ${inWishlist ? "active" : ""}`}
                    onClick={handleWishlistToggle}
                    aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart className="w-5 h-5 shrink-0" fill={inWishlist ? "currentColor" : "none"} />
                    <span className="wishlist-text">{inWishlist ? "In Wishlist" : "Wishlist"}</span>
                  </button>
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
                                <th className="specs-key uppercase w-[50%] md:w-[30%]">{key}</th>
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

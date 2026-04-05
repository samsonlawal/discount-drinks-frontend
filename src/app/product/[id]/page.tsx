"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data"; // still used for related products fallback
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { CheckCircle2, Heart, ShoppingCart, Grape, Wine, ShieldCheck, RotateCcw, Truck, Headphones } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetProductById, useGetProducts } from "@/hooks/api/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const { product: apiProduct, loading, fetchProduct } = useGetProductById();
  const { products: apiRelatedProducts, loading: relatedLoading, fetchProducts: fetchRelatedProducts } = useGetProducts();
  
  const [loadingIconIndex, setLoadingIconIndex] = useState(0);

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
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingIconIndex((prev) => (prev + 1) % 3);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (product) {
      const productImage = product.image || (product as any).imageUrl || (product as any).thumbnail || (product as any).images?.[0] || "/images/product-1.jpg";
      setActiveImage(productImage);
      
      const imagesList = (product as any).images && Array.isArray((product as any).images) && (product as any).images.length > 0 
        ? (product as any).images 
        : [productImage, "/images/product-1.jpg", "/images/product-2.jpg", "/images/product-4.jpg"];
      
      setGalleryImages(Array.from(new Set(imagesList as string[])));

      // Fetch related products from the same category
      if ((product as any).category) {
        const categoryId = (product as any).category.id || (product as any).category._id || (product as any).category;
        if (categoryId) {
          fetchRelatedProducts({ category: categoryId });
        }
      }
    }
  }, [product]);

  if (loading && !product) {
    const icons = [
      <Grape key="grapes" size={48} />,
      <svg key="barrel" viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 10c0 1 0 3 0 4"/><path d="M19 10c0 1 0 3 0 4"/><path d="M2 7c0-1.7 4.5-3 10-3s10 1.3 10 3"/><path d="M22 17c0 1.7-4.5 3-10 3s-10-1.3-10-3"/><path d="M2 7v10"/><path d="M22 7v10"/><path d="M2 12h20"/><path d="M12 4v16"/></svg>,
      <Wine key="wine" size={48} />
    ];

    return (
      <main className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="text-(--ocean-green) transition-all duration-500 transform scale-125 animate-bounce">
            {icons[loadingIconIndex]}
          </div>
          <p className="text-sm font-medium text-gray-400 tracking-widest uppercase">Preparing your drink...</p>
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

  const currentProductId = product.id || (product as any)._id;
  const relatedProducts = apiRelatedProducts
    .filter((p) => (p.id || (p as any)._id) !== currentProductId)
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
              <div className="product-showcase gap-3 flex-col-reverse">
               
                
                {/* Thumbnails */}
                <div className="flex flex-row gap-2 md:gap-4 h-fit w-full items-center justify-center py-2 px-2">
                  {Array.from({ length: 5 }).map((_, idx) => {
                    const img = galleryImages[idx];
                    const hasImage = !!img && !(typeof img === 'string' && (img.trim() === '' || img === 'null' || img === 'undefined'));
                    const isActive = activeImage === img;

                    return (
                      <button
                        key={idx}
                        onClick={() => hasImage && setActiveImage(img)}
                        disabled={!hasImage}
                        className={`relative shrink-0 rounded-sm overflow-hidden transition-all duration-200 w-8 h-8 sm:w-12 sm:h-12 ${
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

                <h1 className="text-[22px] font-medium product-title leading-5">{product.name}</h1>

                <div className="flex flex-wrap items-center gap-2 mb-4 text-sm">
                  {product.brand && (
                    <span className="text-gray-500">
                      Brand: <span className="text-(--eerie-black) font-medium">{(product.brand as any).name || product.brand}</span>
                    </span>
                  )}
                  {product.brand && (product.category || (product as any).type) && <span className="text-gray-300">|</span>}
                  
                  {product.category && (
                    <span className="text-gray-500">
                      Category: <span className="text-(--eerie-black) font-medium">{(product.category as any).name || product.category}{(product as any).subCategory ? `, ${(product as any).subCategory.name || (product as any).subCategory}` : ""}</span>
                    </span>
                  )}

                  {(product.category || product.brand) && (product as any).type && <span className="text-gray-300">|</span>}

                  {(product as any).type && (
                    <span className="text-gray-500">
                      Type: <span className="text-(--eerie-black) font-medium">{(product as any).type.name || (product as any).type}</span>
                    </span>
                  )}
                </div>

                <div className="price-wrapper">
                  <data className="price font-medium text-[24px] md:text-[30px]" value={(product.costPrice ?? product.price) || 0}>
                    £{Number((product.costPrice ?? product.price) || 0).toFixed(2)}
                  </data>
                  {(product.originalPrice || product.basePrice) && (
                    <data className="price-old" value={product.originalPrice || product.basePrice}>
                      £{Number(product.originalPrice || product.basePrice).toFixed(2)}
                    </data>
                  )}
                </div>


                
                <div className="product-actions mb-3">
                  <button 
                    className="btn btn-primary flex gap-2 h-[60px]" 
                    onClick={handleAddToCart}
                    disabled={isProductInCart}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>{isProductInCart ? "In Cart" : "Add to Cart"}</span>
                  </button>
                  {/* <button 
                    className={`btn btn-outline flex gap-2 wishlist-detail-btn ${inWishlist ? "active" : ""}`}
                    onClick={handleWishlistToggle}
                    aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    <Heart className="w-5 h-5 shrink-0" fill={inWishlist ? "currentColor" : "none"} />
                    <span className="wishlist-text">{inWishlist ? "In Wishlist" : "Wishlist"}</span>
                  </button> */}
                </div>

                <div className="product-description">
                  <p className="text-(--eerie-black) font-medium whitespace-pre-wrap pt-[12px] pb-[6px]">
                    Product Details
                  </p>

                  {product.description ? (
                    <p className="w-full text-(--sonic-silver) whitespace-pre-wrap">
                      {product.description}
                    </p>
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
                          {(product as any).shippingWeight && (
                            <tr className="specs-row">
                              <th className="specs-key uppercase w-[50%] md:w-[30%]">Weight</th>
                              <td className="specs-value">{(product as any).shippingWeight}</td>
                            </tr>
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

              {/* Product Contact Card */}
              <div className="bg-(--cultured) border border-gray-100 rounded-xl p-[24px] transition-all duration-300 hover:border-gray-200 lg:sticky lg:top-[120px]">
                {/* <h3 className="text-lg font-semibold text-[#111827] mb-3">Ask a Question</h3> */}
                {/* <p className="text-sm text-gray-500 leading-relaxed mb-1">
                  If you have questions about this product, our wine experts are here to help.
                </p>
                <Link href="/contact" className="btn btn-outline w-full h-[54px] flex items-center justify-center gap-2 mt-4 hover:bg-black hover:text-white transition-all duration-300">
                  Contact Us
                </Link> */}

                <h3 className="text-lg font-medium text-[#111827] mb-5">What We Offer</h3>

                <ul className="flex flex-col gap-6 mt-2">
                  <li className="flex items-center gap-4 w-full">
                    <div className="w-8 shrink-0 text-(--ocean-green)">
                      <Truck className="w-6 h-6" />
                    </div>

                    <div>
                      <p className="font-medium text-sm text-(--eerie-black)">Free Shipping</p>
                      <p className="text-[12px] text-gray-500">On All Orders</p>
                    </div>
                  </li>

                  <li className="flex items-center gap-4 w-full">
                    <div className="w-8 shrink-0 text-(--ocean-green)">
                      <RotateCcw className="w-6 h-6" />
                    </div>

                    <div>
                      <p className="font-medium text-sm text-(--eerie-black)">Easy Returns</p>
                      <p className="text-[12px] text-gray-500">30 Day Returns Policy</p>
                    </div>
                  </li>

                  <li className="flex items-center gap-4 w-full">
                    <div className="w-8 shrink-0 text-(--ocean-green)">
                      <ShieldCheck className="w-6 h-6" />
                    </div>

                    <div>
                      <p className="font-medium text-sm text-(--eerie-black)">Secure Payment</p>
                      <p className="text-[12px] text-gray-500">100% Secure Gaurantee</p>
                    </div>
                  </li>

                  <li className="flex items-center gap-4 w-full">
                    <div className="w-8 shrink-0 text-(--ocean-green)">
                      <Headphones className="w-6 h-6" />
                    </div>

                    <div>
                      <p className="font-medium text-sm text-(--eerie-black)">Special Support</p>
                      <p className="text-[12px] text-gray-500">24/7 Dedicated Support</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Related Products */}
          {!relatedLoading && relatedProducts.length > 0 && (
            <section className="section">
              <h2 className="h2 section-title">Related Products</h2>
              <ul className="product-list flex flex-row flex-wrap !justify-center items-center">
                {relatedProducts.map((relatedProduct: any) => (
                    <li key={relatedProduct.id || relatedProduct._id}>
                      <ProductCard product={relatedProduct} />
                    </li>
                  ))}
              </ul>
            </section>
          )}

          {relatedLoading && (
            <section className="section">
              <h2 className="h2 section-title">Related Products</h2>
              <ul className="product-list flex flex-row flex-wrap !justify-center items-center">
                {Array.from({ length: 4 }).map((_, index) => (
                  <li key={index}>
                    <ProductCardSkeleton />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </section>

      {/* </article> */}
    </main>
  );
}

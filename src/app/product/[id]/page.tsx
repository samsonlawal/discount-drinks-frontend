"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data"; // still used for related products fallback
import { useCart } from "@/contexts/CartContext";
import ProductCard from "@/components/products/ProductCard";
import ProductCardSkeleton from "@/components/products/ProductCardSkeleton";
import { CheckCircle2, Heart, ShoppingCart, Beer, Wine, Martini, ShieldCheck, RotateCcw, Truck, Headphones, Ban, WineOff } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useGetProductById, useGetProducts } from "@/hooks/api/products";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id as string;
  const { cart, addToCart, removeFromCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const { product: apiProduct, loading, fetchProduct } = useGetProductById();
  const { products: apiRelatedProducts, loading: relatedLoading, fetchProducts: fetchRelatedProducts } = useGetProducts();
  
  const [loadingIconIndex, setLoadingIconIndex] = useState(0);

  // Try to find in mock if API fails/isn't set up yet, to avoid totally breaking
  const mockFallback = products.find((p) => p.id === productId || p._id === productId);
  const product = apiProduct || mockFallback;

  const [activeImage, setActiveImage] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

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
      <Beer key="beer" size={48} />,
      <Wine key="wine" size={48} />,
      <Martini key="martini" size={48} />
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
      <main className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center gap-6 max-w-md text-center">
          <div className="bg-gray-100 p-8 rounded-full mb-2">
            <WineOff size={64} className="text-gray-400" />
          </div>
          <div>
            <h1 className="text-fs-2 font-semibold text-eerie-black mb-2">
              Product Not Found
            </h1>
            <p className="text-gray-500 mb-8">
              The drink you're looking for might have been moved, renamed, or is currently out of stock.
            </p>
            <Link href="/" className="btn btn-primary inline-flex px-10">
              Browse All Drinks
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const currentProductId = product.id || (product as any)._id;
  const relatedProducts = apiRelatedProducts
    .filter((p) => (p.id || (p as any)._id) !== currentProductId)
    .slice(0, 4);

  const handleCartToggle = () => {
    if (isProductInCart) {
      removeFromCart(currentProductId);
    } else {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isProductInCart) {
      addToCart(product, quantity);
    }
    // Alternatively, if they change quantity, we could update it, but for now we just push.
    router.push("/checkout");
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

  const currentPrice = product ? Number((product.costPrice ?? product.price) || 0) : 0;
  const basePrice = product ? Number(product.originalPrice || product.basePrice || 0) : 0;
  const showBasePrice = basePrice > 0 && basePrice > currentPrice;
  const discountPercentage = showBasePrice ? Math.round(((basePrice - currentPrice) / basePrice) * 100) : 0;

  const displayQuantity = isProductInCart ? (cart.find((item: any) => (item.id || item._id) === currentProductId)?.quantity || quantity) : quantity;
  const widgetCurrentPrice = currentPrice * displayQuantity;
  const widgetBasePrice = basePrice * displayQuantity;

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
                        className={`relative shrink-0 overflow-hidden transition-all duration-200 w-8 h-8 sm:w-12 sm:h-12 ${
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

                <div className="price-wrapper flex items-center gap-3">
                  <data className="price font-medium text-[24px] md:text-[30px]" value={currentPrice}>
                    £{currentPrice.toFixed(2)}
                  </data>
                  {showBasePrice && (
                    <>
                      <data className="price-old text-gray-400 line-through text-[18px]" value={basePrice}>
                        £{basePrice.toFixed(2)}
                      </data>
                      <span className="text-white bg-(--ocean-green) px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
                        Save {discountPercentage}%
                      </span>
                    </>
                  )}
                </div>


                
                <div className="product-actions mb-3">
                  <button 
                    className={`btn btn-primary flex gap-2 h-[60px] ${((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? "opacity-80 cursor-not-allowed bg-red-50 text-red-600 border border-red-200 pointer-events-none hover:bg-red-50 hover:border-red-200" : ""}`} 
                    onClick={((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? undefined : handleCartToggle}
                    disabled={((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0)}
                  >
                    {((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? (
                      <Ban className="w-5 h-5" />
                    ) : (
                      <ShoppingCart className="w-5 h-5" />
                    )}
                    <span>{((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? "Out of Stock" : isProductInCart ? "Remove from Cart" : "Add to Cart"}</span>
                  </button>
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

              {/* Buy Box Widget */}
              <div className="bg-(--cultured) border border-gray-100 rounded-sm p-[24px] shadow-sm transition-all duration-300 hover:border-gray-200 lg:sticky lg:top-[120px]">
                <div className="mb-4">
                  <div className="flex items-end gap-2 text-(--eerie-black) mb-1.5 border-b border-gray-200 pb-3">
                    <data className="font-semibold text-[28px] leading-none" value={widgetCurrentPrice}>
                      £{widgetCurrentPrice.toFixed(2)}
                    </data>
                    {showBasePrice && (
                      <div className="flex flex-col items-start leading-[1.1] ml-1">
                        <span className="text-red-600 text-[11px] font-bold uppercase tracking-wider mb-0.5">
                          Save {discountPercentage}%
                        </span>
                        <data className="text-gray-400 line-through text-[13px] font-medium" value={widgetBasePrice}>
                          £{widgetBasePrice.toFixed(2)}
                        </data>
                      </div>
                    )}
                  </div>
                  
                  {((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? (
                     <p className="text-(--sonic-silver) font-medium text-sm mt-1 flex items-center gap-1.5"><Ban size={16} /> Currently out of stock.</p>
                  ) : (
                     <p className="text-(--ocean-green) font-medium text-sm mt-1 flex items-center gap-1.5"><CheckCircle2 size={16} /> In Stock & Ready to Ship</p>
                  )}
                </div>

                {/* Quantity Picker */}
                <div className="mb-5">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">Quantity:</label>
                  <div className="flex items-center gap-0 w-32 border border-gray-300 rounded-md overflow-hidden bg-white">
                    <button 
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1 || isProductInCart}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      id="quantity"
                      min="1"
                      className="w-12 h-10 text-center font-medium border-x border-gray-300 focus:outline-none focus:ring-0"
                      value={displayQuantity}
                      onChange={(e) => {
                        if (!isProductInCart) {
                          const val = parseInt(e.target.value);
                          setQuantity(isNaN(val) ? 1 : Math.max(1, val));
                        }
                      }}
                      disabled={isProductInCart}
                      readOnly={isProductInCart}
                    />
                    <button 
                      className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={isProductInCart}
                    >
                      +
                    </button>
                  </div>
                  {isProductInCart && <p className="text-xs text-gray-500 mt-2">Quantity managed in cart</p>}
                </div>

                <div className="flex flex-col gap-3">
                  <button 
                    className={`btn btn-primary flex justify-center items-center gap-2 w-full h-[48px] transition-all ${((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? "opacity-30 cursor-not-allowed pointer-events-none" : ""}`} 
                    onClick={((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0) ? undefined : handleBuyNow}
                    disabled={((product as any).inStock === false || (product as any).stockQuantity === 0 || (product as any).stock === 0 || (product as any).countInStock === 0)}
                  >
                    <span className="font-medium text-md">Buy Now</span>
                  </button>
                </div>
                
                <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-center gap-2 text-gray-500 text-xs">
                  <ShieldCheck size={16} className="text-(--ocean-green)" />
                  Payments are secure and encrypted.
                </div>
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

import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import ProductsService from "@/services/products";
import { Product } from "@/types";

// Hook for fetching products
export const useGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async (query?: Record<string, string | number>) => {
    setLoading(true);
    try {
      const res = await ProductsService.getProducts(query || {});
      console.log("res", res)
      setProducts(res?.data?.data);
      return res?.data?.data as Product[];
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch products",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, products, fetchProducts };
};

// Hook for fetching a single product by ID
export const useGetProductById = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await ProductsService.getProductById({ productId: id });
      setProduct(res?.data?.data || null);
      return res?.data?.data as Product;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch product",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, product, fetchProduct };
};


import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import ProductsService from "@/services/products";

// Hook for fetching products
export const useGetProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async (query?: any) => {
    setLoading(true);
    try {
      const res = await ProductsService.getProducts(query || {});
      console.log("res", res)
      // const transformedData = (res?.data?.data || []).map((product: any) => {
      //   // const isActive =
      //   //   product.isActive !== undefined
      //   //     ? product.isActive
      //   //     : product.status === "active" || product.status === "Active";

      //   return {
      //     ...product,
      //     // isActive,
      //     // status: isActive ? "Active" : "Inactive",
      //     createdDate: product.createdAt
      //       ? new Date(product.createdAt).toLocaleDateString()
      //       : "",
      //   };
      // });
      setProducts(res?.data?.data);
      return res?.data?.data;
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
  const [product, setProduct] = useState<any>(null);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const res = await ProductsService.getProductById({ productId: id });
      setProduct(res?.data?.data || null);
      return res?.data?.data;
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

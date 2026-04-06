import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
// import { IFetchCategoryQuery } from "@/types";
import CategoriesService from "@/services/categories";
import { Category } from "@/types";

// Hook for fetching categories
export const useGetCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await CategoriesService.fetchCategories();
      // Transform the data to match expected format
      const transformedData = (res?.data?.data || []).map((category: any) => ({
        ...category,
        // status: (category.status?.toLowerCase() === "active" || category.isActive) ? "Active" : "Inactive",
        createdDate: category.createdAt
          ? new Date(category.createdAt).toLocaleDateString()
          : "",
      })) as Category[];
      
      setCategories(transformedData);
      return transformedData;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch categories",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, categories, fetchCategories };
};

// Hook for fetching a single category by ID
export const useGetCategoryById = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

  const fetchCategory = async (id: string) => {
    setLoading(true);
    try {
      const res = await CategoriesService.getCategoryById({ categoryId: id });
      setCategory(res?.data?.data || null);
      return res?.data?.data as Category;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch category",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, category, fetchCategory };
};

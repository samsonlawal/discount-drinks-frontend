import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import BrandsService from "@/services/brands";
import { Brand } from "@/types";

// Hook for fetching brands
export const useGetBrands = () => {
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await BrandsService.fetchBrands();
      // Transform the data to match expected format
      const transformedData = (res?.data?.data || []).map((brand: any) => ({
        ...brand,
        status: brand.isActive ? "Active" : "Inactive",
        createdDate: brand.createdAt
          ? new Date(brand.createdAt).toLocaleDateString()
          : "",
      })) as Brand[];
      setBrands(transformedData);
      return transformedData;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch brands",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, brands, fetchBrands };
};

// Hook for fetching a single brand by ID
export const useGetBrandById = () => {
  const [loading, setLoading] = useState(false);
  const [brand, setBrand] = useState<Brand | null>(null);

  const fetchBrand = async (id: string) => {
    setLoading(true);
    try {
      const res = await BrandsService.getBrandById({ brandId: id });
      setBrand(res?.data?.data || null);
      return res?.data?.data as Brand;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch brand",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, brand, fetchBrand };
};

// Hook for creating a brand
export const useCreateBrand = () => {
  const [loading, setLoading] = useState(false);

  const createBrand = async ({
    data,
    successCallback,
  }: {
    data: {
      name: string;
      description?: string;
      status?: string;
    };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await BrandsService.createBrand(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Brand created successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data as Brand;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to create brand",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createBrand };
};

// Hook for updating a brand
export const useUpdateBrand = () => {
  const [loading, setLoading] = useState(false);

  const updateBrand = async ({
    data,
    successCallback,
  }: {
    data: {
      id: string;
      name: string; // Made name required
      description?: string;
      status?: string;
    };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await BrandsService.updateBrand(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Brand updated successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data as Brand;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to update brand",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateBrand };
};

// Hook for deleting a brand
export const useDeleteBrand = () => {
  const [loading, setLoading] = useState(false);

  const deleteBrand = async ({
    data,
    successCallback,
  }: {
    data: { id: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await BrandsService.deleteBrand(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Brand deleted successfully!",
        description: res?.data?.description || "",
      });
      return true;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to delete brand",
        description: error?.response?.data?.description || "",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteBrand };
};

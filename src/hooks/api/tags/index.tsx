import { useState } from "react";
import { showErrorToast, showSuccessToast } from "@/utils/toaster";
import { AxiosError } from "axios";
import TagsService from "@/services/tags";
import { Tag } from "@/types";

// Hook for fetching tags
export const useGetTags = () => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);

  //  const [meta, setMeta] = useState<{
  //    currentPage: number;
  //    nextPage: number;
  //    totalPages: number;
  //    totalRecords: number;
  //  }>();

  const fetchTags = async () => {
    setLoading(true);
    try {
      const res = await TagsService.fetchTags();
      const rawData = res?.data?.data || [];
      const mappedData = rawData.map((tag: any) => ({
        ...tag,
        status:
          tag.status?.toLowerCase() || (tag.isActive ? "active" : "inactive"),
      })) as Tag[];
      setTags(mappedData);
      //  setMeta({
      //    currentPage: res?.data?.data?.currentPage,
      //    nextPage: res?.data?.data?.nextPage,
      //    totalPages: res?.data?.data?.totalPages,
      //    totalRecords: res?.data?.data?.totalRecords,
      //  });
      console.log(res);
      return mappedData;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch tags",
        description: error?.response?.data?.description || "",
      });
      return [];
    } finally {
      setLoading(false);
    }
  };

  return { loading, tags, fetchTags };
};

// Hook for fetching a single tag by ID
export const useGetTagById = () => {
  const [loading, setLoading] = useState(false);
  const [tag, setTag] = useState<Tag | null>(null);

  const fetchTag = async (id: string) => {
    setLoading(true);
    try {
      const res = await TagsService.getTagById({ tagId: id });
      const rawData = res?.data?.data;
      const mappedData = rawData
        ? {
            ...rawData,
            status:
              rawData.status?.toLowerCase() ||
              (rawData.isActive ? "active" : "inactive"),
          } as Tag
        : null;
      setTag(mappedData);
      return mappedData;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to fetch tag",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, tag, fetchTag };
};

// Hook for creating a tag
export const useCreateTag = () => {
  const [loading, setLoading] = useState(false);

  const createTag = async ({
    data,
    successCallback,
  }: {
    data: { name: string; status?: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await TagsService.createTag(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Tag created successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data as Tag;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to create tag",
        description: error?.response?.data?.description || "",
      });
      console.log(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, createTag };
};

// Hook for updating a tag
export const useUpdateTag = () => {
  const [loading, setLoading] = useState(false);

  const updateTag = async ({
    data,
    successCallback,
  }: {
    data: { id: string; name: string; status?: string }; // Made name required
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await TagsService.updateTag(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Tag updated successfully!",
        description: res?.data?.description || "",
      });
      return res?.data?.data as Tag;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to update tag",
        description: error?.response?.data?.description || "",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, updateTag };
};

// Hook for deleting a tag
export const useDeleteTag = () => {
  const [loading, setLoading] = useState(false);

  const deleteTag = async ({
    data,
    successCallback,
  }: {
    data: { id: string };
    successCallback?: () => void;
  }) => {
    setLoading(true);
    try {
      const res = await TagsService.deleteTag(data);
      successCallback?.();
      showSuccessToast({
        message: res?.data?.message || "Tag deleted successfully!",
        description: res?.data?.description || "",
      });
      return true;
    } catch (error: Error | AxiosError | any) {
      showErrorToast({
        message: error?.response?.data?.message || "Failed to delete tag",
        description: error?.response?.data?.description || "",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, deleteTag };
};

import axios from "axios";
import env from "@/config/env";
// import { ICategory, IFetchCategoryQuery } from "@/types";

class Service {
  fetchCategories(query?: any) {
    const { name, search, page, limit } = query || {};
    return axios.get(env.api.categories, {
      params: {
        ...(name ? { name } : {}),
        ...(search ? { search } : {}),
        ...(page ? { page } : {}),
        ...(limit ? { limit } : {}),
      },
    });
  }

  getCategoryById({ categoryId }: { categoryId: string }) {
    return axios.get(`${env.api.categories}/${categoryId}`);
  }

  createCategory({ name, description, parent_category_id, status }: any) {
    return axios.post(env.api.categories, {
      name,
      description,
      parent_category_id,
      isActive: status === "Active",
    });
  }

  updateCategory({
    id,
    name,
    description,
    parent_category_id,
    status,
  }: any) {
    return axios.put(`${env.api.categories}/${id}`, {
      name,
      description,
      parent_category_id,
      isActive: status === "Active",
    });
  }

  deleteCategory({ id }: { id: string }) {
    return axios.delete(`${env.api.categories}/${id}`);
  }
}

const CategoriesService = new Service();
export default CategoriesService;

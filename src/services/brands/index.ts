import axios from "axios";
import env from "@/config/env";

interface ICreateBrandPayload {
  name: string;
  description?: string;
  status?: string;
}

interface IUpdateBrandPayload extends ICreateBrandPayload {
  id: string;
}

class Service {
  fetchBrands(query?: Record<string, string | number>) {
    const { name, search, page, limit } = query || {};
    return axios.get(env.api.brands, {
      params: {
        ...(name ? { name } : {}),
        ...(search ? { search } : {}),
        ...(page ? { page } : {}),
        ...(limit ? { limit } : {}),
      },
    });
  }

  getBrandById({ brandId }: { brandId: string }) {
    return axios.get(`${env.api.brands}/${brandId}`);
  }

  createBrand({ name, description, status }: ICreateBrandPayload) {
    return axios.post(env.api.brands, {
      name,
      description,
      isActive: status === "Active",
    });
  }

  updateBrand({
    id,
    name,
    description,
    status,
  }: IUpdateBrandPayload) {
    return axios.put(`${env.api.brands}/${id}`, {
      name,
      description,
      isActive: status === "Active",
    });
  }

  deleteBrand({ id }: { id: string }) {
    return axios.delete(`${env.api.brands}/${id}`);
  }
}

const BrandsService = new Service();
export default BrandsService;

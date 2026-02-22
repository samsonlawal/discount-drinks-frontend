import axios from "axios";
import env from "@/config/env";

class Service {
  getProducts(query?: Record<string, string | number>) {
    return axios.get(env.api.products, {
      params: query,
      withCredentials: true,
    });
  }

  getProductById({ productId }: { productId: string }) {
    return axios.get(`${env.api.products}/${productId}`, {
      // withCredentials: true,
    });
  }
}

const ProductsService = new Service();
export default ProductsService;

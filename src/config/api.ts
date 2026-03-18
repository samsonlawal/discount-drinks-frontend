const api = ({ inProduction }: { inProduction: boolean }) => {
  console.log(
    "DEBUG: NEXT_PUBLIC_API_BASE_URL =",
    process.env.NEXT_PUBLIC_API_BASE_URL,
  );

  const BASE_URL_LINK = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/user";

  return {
    auth: `${BASE_URL_LINK}/auth`,
    users: `${BASE_URL_LINK}/profile`,
    categories: `${BASE_URL_LINK}/categories`,
    tags: `${BASE_URL_LINK}/tags`,
    products: `${BASE_URL_LINK}/products`,
    brands: `${BASE_URL_LINK}/brands`,
    orders: `${BASE_URL_LINK}/orders`,
    contact: `${BASE_URL_LINK}/contact`,
  };
};

export default api;

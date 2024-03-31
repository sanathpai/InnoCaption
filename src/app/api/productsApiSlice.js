import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApiSlice = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/products`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
    searchProducts: builder.query({
      query: (args) => ({
        url: `/?q=${args.category}`,
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const { useLazyGetAllProductsQuery, useLazySearchProductsQuery } =
  productsApiSlice;

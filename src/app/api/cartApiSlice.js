import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApiSlice = createApi({
  reducerPath: "carts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_SERVER_URL}/carts`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["carts"],
  endpoints: (builder) => ({
    getCartData: builder.query({
      query: () => ({
        url: `/1`,
        method: "GET",
      }),
      providesTags: ["carts"],
    }),
    addToCart: builder.mutation({
      query: (args) => ({ 
        url: "/1",
        method: "PATCH",
        body: {
          merge: true,
          products: [args.product],
        },
      }),
      invalidatesTags: ["carts"],
    }),
    updateCart: builder.mutation({
      query: (args) => ({
        url: "/1",
        method: "PATCH",
        body:  {
          merge: true,
          products: [args.product],
        },
      }),
      invalidatesTags: ["carts"],
    }),
  }),
});

export const { useGetCartDataQuery, useAddToCartMutation } = cartApiSlice;

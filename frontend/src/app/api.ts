import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewProduct, ProductDTO } from "../types/product";
import { ReviewDTO, ReviewMutation } from "../types/review";

// Define our single API slice object
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["Products", "Reviews"],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductDTO[], void>({
      query: () => "/products",
      providesTags: (result = [], error, arg) => [
        "Products",
        ...result.map((product) => ({
          type: "Products" as const,
          id: product._id,
        })),
      ],
    }),
    getProduct: builder.query<ProductDTO, string>({
      query: (id: string) => `/products/${id}`,
      providesTags: (result, error, arg) => [
        { type: "Products" as const, id: arg },
      ],
    }),
    getReviews: builder.query<ReviewDTO[], string>({
      query: (id: string) => `/products/${id}/reviews`,
      providesTags: (result = [], error, arg) => [
        "Reviews",
        ...result.map((review) => ({
          type: "Reviews" as const,
          id: review._id,
        })),
      ],
    }),
    addNewProduct: builder.mutation<ProductDTO, NewProduct>({
      query: (initialProduct: NewProduct) => ({
        url: "/products",
        method: "POST",
        body: initialProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    addNewReview: builder.mutation<ReviewDTO, ReviewMutation>({
      query: ({ productId, ...review }) => ({
        url: `/products/${productId}/review`,
        method: "POST",
        body: review,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
});

// Export the auto-generated hooks
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetReviewsQuery,
  useAddNewProductMutation,
  useAddNewReviewMutation,
} = apiSlice;

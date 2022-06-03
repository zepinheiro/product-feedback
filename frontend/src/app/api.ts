import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewProduct, ProductDTO } from "../types/product";
import { ReviewDTO, ReviewMutation } from "../types/review";

/**
 * Define our single API slice object
 *
 * It has all the endpoints that the app will use and the caching strategy.
 * Each endpoints provide / invalidate TAGS which RTK then uses to manage internally what requests need to be fired
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["Products", "Product", "Reviews"],
  endpoints: (builder) => ({
    // Fetches all Products
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
    // Fetch a single product
    getProduct: builder.query<ProductDTO, string>({
      query: (id: string) => `/products/${id}`,
      providesTags: (result, error, arg) => [
        { type: "Product" as const, id: arg },
      ],
    }),
    // Fetches all reviews for a given product
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
    // Creates a new product
    addNewProduct: builder.mutation<ProductDTO, NewProduct>({
      query: (initialProduct: NewProduct) => ({
        url: "/products",
        method: "POST",
        body: initialProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    // Creates a new review for a given product
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

// Export the auto-generated hooks for Queries and Mutations
export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetReviewsQuery,
  useAddNewProductMutation,
  useAddNewReviewMutation,
} = apiSlice;

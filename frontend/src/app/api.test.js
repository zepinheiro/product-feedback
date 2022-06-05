import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

jest.mock("@reduxjs/toolkit/query/react", () => ({
  createApi: jest.fn(),
  fetchBaseQuery: jest.fn(),
}));

const mockBuilder = {
  query: jest.fn(),
  mutation: jest.fn(),
};

describe("Api Slice", () => {
  let endpointsMock;

  it("should build the default api state", () => {
    createApi.mockReturnValue({
      useGetProductsQuery: "",
      useGetProductQuery: "",
      useGetReviewsQuery: "",
      useAddNewProductMutation: "",
      useAddNewReviewMutation: "",
    });
    fetchBaseQuery.mockReturnValue("endpoint");

    require("./api");

    expect(createApi).toHaveBeenCalledWith({
      reducerPath: "api",
      baseQuery: "endpoint",
      tagTypes: ["Products", "Product", "Reviews"],
      endpoints: expect.any(Function),
    });

    endpointsMock = createApi.mock.calls[0][0].endpoints;

    expect(fetchBaseQuery).toHaveBeenCalledWith({ baseUrl: "/api" });
  });

  describe("endpoints", () => {
    it("getProducts", () => {
      endpointsMock(mockBuilder);

      const { query, providesTags } = mockBuilder.query.mock.calls[0][0];

      expect(query()).toEqual("/products");
      expect(providesTags([{ _id: "1" }, { _id: "2" }])).toEqual([
        "Products",
        { type: "Products", id: "1" },
        { type: "Products", id: "2" },
      ]);
    });

    it("getProduct", () => {
      endpointsMock(mockBuilder);

      const { query, providesTags } = mockBuilder.query.mock.calls[1][0];

      expect(query("id")).toEqual("/products/id");
      expect(providesTags([], null, "id")).toEqual([
        {
          type: "Product",
          id: "id",
        },
      ]);
    });

    it("getReviews", () => {
      endpointsMock(mockBuilder);

      const { query, providesTags } = mockBuilder.query.mock.calls[2][0];

      expect(query("id")).toEqual("/products/id/reviews");
      expect(providesTags([{ _id: "1" }, { _id: "2" }])).toEqual([
        "Reviews",
        { type: "Reviews", id: "1" },
        { type: "Reviews", id: "2" },
      ]);
    });

    it("addNewProduct", () => {
      endpointsMock(mockBuilder);

      const { query, invalidatesTags } = mockBuilder.mutation.mock.calls[0][0];

      expect(query("product")).toEqual({
        url: "/products",
        method: "POST",
        body: "product",
      });

      expect(invalidatesTags).toEqual(["Products"]);
    });

    it("addNewReview", () => {
      endpointsMock(mockBuilder);

      const { query, invalidatesTags } = mockBuilder.mutation.mock.calls[1][0];

      expect(query({ productId: "id", review: {} })).toEqual({
        url: "/products/id/review",
        method: "POST",
        body: {
          review: {},
        },
      });

      expect(invalidatesTags).toEqual(["Reviews"]);
    });
  });
});

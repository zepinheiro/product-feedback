import { render, screen } from "@testing-library/react";

import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../app/api";

import { AddReviewForm } from "../AddReviewForm/AddReviewForm";
import { ProductReviews } from "../ProductReviews/ProductReviews";
import { ReviewChart } from "../ReviewChart/ReviewChart";

import styles from "./ProductPage.module.css";

import { ProductPage } from "./ProductPage";

jest.mock("../../app/api");
jest.mock("react-router-dom");

jest.mock("../AddReviewForm/AddReviewForm", () => ({
  AddReviewForm: jest.fn(() => <mock-add-review-form />),
}));

jest.mock("../ProductReviews/ProductReviews", () => ({
  ProductReviews: jest.fn(() => <mock-add-product-reviews />),
}));

jest.mock("../ReviewChart/ReviewChart", () => ({
  ReviewChart: jest.fn(() => <mock-review-chart />),
}));

const renderProductPage = () => {
  return render(<ProductPage />);
};

describe("Product Page Component", () => {
  beforeEach(() => {
    useParams.mockReturnValue({ productId: "id" });
  });

  describe("when there is an error", () => {
    beforeEach(() => {
      useGetProductQuery.mockReturnValue({
        data: null,
        error: true,
        isLoading: false,
      });
    });

    it("should render the error component", () => {
      renderProductPage();

      const errorContainer = screen.queryByTestId("product-page-error");

      expect(errorContainer).toBeInTheDocument();
      expect(errorContainer).toHaveTextContent(
        "Oops! Looks like that product doesn't exist"
      );

      expect(useGetProductQuery).toHaveBeenCalledWith("id");
    });
  });

  describe("when the request is loading", () => {
    beforeEach(() => {
      useGetProductQuery.mockReturnValue({
        data: null,
        error: false,
        isLoading: true,
      });
    });

    it("should render the loading component", () => {
      renderProductPage();

      const loadingContainer = screen.queryByTestId("product-page-loading");

      expect(loadingContainer).toBeInTheDocument();
      expect(loadingContainer).toHaveTextContent("Loading ...");

      expect(useGetProductQuery).toHaveBeenCalledWith("id");
    });
  });

  describe("when the request is successfull", () => {
    beforeEach(() => {
      useGetProductQuery.mockReturnValue({
        data: { name: "product" },
        error: false,
      });
    });

    it("should render the product page container", () => {
      renderProductPage();

      const container = screen.queryByTestId("product-page-container");
      expect(container).toBeInTheDocument();
    });

    it("should render the product page title", () => {
      renderProductPage();

      const title = screen.queryByTestId("product-page-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("PRODUCT");
    });

    it("should render the AddReviewForm", () => {
      renderProductPage();

      const upperSectionContainer = screen.queryByTestId(
        "product-page-upper-section-container"
      );
      expect(upperSectionContainer).toBeInTheDocument();

      expect(AddReviewForm).toHaveBeenCalledWith({ productId: "id" }, {});
    });

    it("should render the ReviewChart", () => {
      renderProductPage();

      expect(ReviewChart).toHaveBeenCalledWith({ productId: "id" }, {});
    });

    it("should render the ProductReviews", () => {
      renderProductPage();

      expect(ProductReviews).toHaveBeenCalledWith({ productId: "id" }, {});
    });
  });
});

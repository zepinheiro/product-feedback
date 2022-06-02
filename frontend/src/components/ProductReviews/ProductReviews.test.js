import { render, screen } from "@testing-library/react";

import { useGetReviewsQuery } from "../../app/api";
import { ProductReview } from "../ProductReview/ProductReview";

import styles from "./ProductReviews.module.css";

import { ProductReviews } from "./ProductReviews";

jest.mock("../ProductReview/ProductReview", () => ({
  ProductReview: jest.fn(() => <mock-produc-review />),
}));

jest.mock("../../app/api");

const PRODUCTS_LIST = [
  {
    _id: "1",
    name: "name-1",
    email: "email-1",
    rating: "rating-1",
    content: "content-1",
  },
  {
    _id: "2",
    name: "name-2",
    email: "email-2",
    rating: "rating-2",
    content: "content-2",
  },
];

const DEFAULT_PROPS = {
  productId: "id",
};

const renderProductReviews = (props) => {
  return render(<ProductReviews {...props} />);
};

describe("Product Reviews Component", () => {
  describe("when there isnt any data", () => {
    beforeEach(() => {
      useGetReviewsQuery.mockReturnValue({ data: undefined });
    });
    it("should render the not review found", () => {
      renderProductReviews(DEFAULT_PROPS);

      const container = screen.queryByTestId("product-reviews-component");
      const reviewsContainer = screen.queryByTestId(
        "product-reviews-container"
      );

      expect(container).toBeInTheDocument();
      expect(reviewsContainer).not.toBeInTheDocument();
      expect(container).toHaveTextContent("No reviews found!");
    });
  });

  describe("where there is data availabe", () => {
    beforeEach(() => {
      useGetReviewsQuery.mockReturnValue({ data: PRODUCTS_LIST });
    });

    it("should render the reviewsContainer", () => {
      renderProductReviews(DEFAULT_PROPS);
      const reviewsContainer = screen.queryByTestId(
        "product-reviews-container"
      );

      expect(reviewsContainer).toBeInTheDocument();
      expect(reviewsContainer).toHaveClass(styles.reviewsContainer);
    });

    it("should render both ProductReviews", () => {
      renderProductReviews(DEFAULT_PROPS);

      expect(ProductReview).toHaveBeenCalledTimes(2);
      expect(ProductReview).toHaveBeenNthCalledWith(
        1,
        {
          name: "name-1",
          email: "email-1",
          rating: "rating-1",
          content: "content-1",
        },
        {}
      );
      expect(ProductReview).toHaveBeenNthCalledWith(
        2,
        {
          name: "name-2",
          email: "email-2",
          rating: "rating-2",
          content: "content-2",
        },
        {}
      );
    });
  });
});

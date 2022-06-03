import { render, screen } from "@testing-library/react";

import { StarRating } from "../StarRating/StarRating";
import styles from "./ProductReview.module.css";

import { ProductReview } from "./ProductReview";

jest.mock("../StarRating/StarRating", () => ({
  StarRating: jest.fn(() => <mock-start-rating />),
}));

const DEFAULT_PROPS = {
  name: "name",
  email: "email",
  rating: 5,
  content: "content",
};

const renderProductReview = (props) => {
  return render(<ProductReview {...props} />);
};

describe("Product Review Component", () => {
  it("should render the container", () => {
    renderProductReview(DEFAULT_PROPS);

    const container = screen.queryByTestId("product-review-container");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.container);
  });

  it("should render the name", () => {
    renderProductReview(DEFAULT_PROPS);

    const name = screen.queryByTestId("product-review-name");

    expect(name).toBeInTheDocument();
    expect(name).toHaveClass(styles.name);
    expect(name).toHaveTextContent("name");
  });

  it("should render the email", () => {
    renderProductReview(DEFAULT_PROPS);

    const metaContainer = screen.queryByTestId("product-review-meta-container");
    const email = screen.queryByTestId("product-review-meta-email");

    expect(metaContainer).toBeInTheDocument();
    expect(metaContainer).toHaveClass(styles.metaContainer);

    expect(email).toBeInTheDocument();

    expect(email).toHaveClass(styles.email);
    expect(email).toHaveTextContent("email");
  });

  it("should render the StarRating", () => {
    renderProductReview(DEFAULT_PROPS);

    expect(StarRating).toHaveBeenCalledWith(
      {
        rating: 5,
        disabled: true,
      },
      {}
    );
  });

  it("should render the content", () => {
    renderProductReview(DEFAULT_PROPS);

    const content = screen.queryByTestId("product-review-content");

    expect(content).toBeInTheDocument();
    expect(content).toHaveClass(styles.content);
    expect(content).toHaveTextContent("content");
  });
});

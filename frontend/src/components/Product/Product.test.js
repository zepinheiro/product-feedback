import { render, screen, fireEvent } from "@testing-library/react";

import { Product } from "./Product";

import styles from "./Product.module.css";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const DEFAULT_PROPS = {
  name: "name",
  _id: "id",
};

const renderProduct = (props) => {
  return render(<Product {...props} />);
};

describe("Product Component", () => {
  it("should render the product component", () => {
    renderProduct(DEFAULT_PROPS);

    const container = screen.queryByTestId("product-container");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.productContainer);
  });

  it("should render the product name", () => {
    renderProduct(DEFAULT_PROPS);

    const container = screen.queryByTestId("product-name");

    expect(container).toBeInTheDocument();
    expect(container).toHaveTextContent("name");
  });

  it("should call navigate when clicking the Product", () => {
    renderProduct(DEFAULT_PROPS);

    const container = screen.queryByTestId("product-container");

    fireEvent.click(container);

    expect(mockNavigate).toHaveBeenCalledWith("id");
  });
});

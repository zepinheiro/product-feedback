import { render, screen } from "@testing-library/react";

import { useGetProductsQuery } from "../../app/api";
import { Product } from "../Product/Product";

import styles from "./ProductList.module.css";

import { ProductList } from "./ProductList";

jest.mock("../../app/api");

jest.mock("../Product/Product", () => ({
  Product: jest.fn(() => <mock-product />),
}));

const PRODUCTS_LIST = [
  {
    _id: "1",
    name: "product-1",
  },
  {
    _id: "2",
    name: "product-2",
  },
];

const renderProductList = () => {
  return render(<ProductList />);
};

describe("Product List Container", () => {
  describe("when the request is loading", () => {
    beforeEach(() => {
      useGetProductsQuery.mockReturnValue({ data: [], isLoading: true });
    });

    it("should render the isLoading container", () => {
      renderProductList();

      const loadingContainer = screen.queryByTestId("product-list-loading");

      expect(loadingContainer).toBeInTheDocument();
      expect(loadingContainer).toHaveTextContent("Loading ...");
      expect(loadingContainer).toHaveClass(styles.information);
    });
  });

  describe("when there is no data available", () => {
    beforeEach(() => {
      useGetProductsQuery.mockReturnValue({ data: null, isLoading: false });
    });

    it("should render the Not Found Container", () => {
      renderProductList();

      const notFoundContainer = screen.queryByTestId("product-list-not-found");

      expect(notFoundContainer).toBeInTheDocument();
      expect(notFoundContainer).toHaveTextContent("No products found ...");
      expect(notFoundContainer).toHaveClass(styles.information);
    });
  });

  describe("when all the date is available", () => {
    beforeEach(() => {
      useGetProductsQuery.mockReturnValue({
        data: PRODUCTS_LIST,
        isLoading: false,
      });
    });

    it("should render the Product List Container", () => {
      renderProductList();

      const container = screen.queryByTestId("product-list-products");

      expect(container).toBeInTheDocument();
      expect(container).toHaveClass(styles.productList);
    });

    it("should render the both products", () => {
      renderProductList();

      const containers = screen.queryAllByTestId("product-list-product");

      expect(containers).toHaveLength(2);
      expect(containers[0]).toHaveClass(styles.productItem);

      expect(Product).toHaveBeenCalledTimes(2);
      expect(Product).toHaveBeenNthCalledWith(
        1,
        {
          name: "product-1",
          _id: "1",
        },
        {}
      );
      expect(Product).toHaveBeenNthCalledWith(
        2,
        {
          name: "product-2",
          _id: "2",
        },
        {}
      );
    });
  });
});

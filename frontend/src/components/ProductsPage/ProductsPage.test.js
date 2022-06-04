import { render } from "@testing-library/react";

import { AddProductForm } from "../AddProductForm/AddProductForm";
import { ProductList } from "../ProductList/ProductList";

import ProductsPage from "./ProductsPage";

jest.mock("../ProductList/ProductList", () => ({
  ProductList: jest.fn(() => <mocked-product-List />),
}));

jest.mock("../AddProductForm/AddProductForm", () => ({
  AddProductForm: jest.fn(() => <mocked-add-product-form />),
}));

const renderProductsPage = () => {
  return render(<ProductsPage />);
};

describe("Products Page Component", () => {
  it("should call the Page components", () => {
    renderProductsPage();

    expect(AddProductForm).toHaveBeenCalled();
    expect(ProductList).toHaveBeenCalled();
  });
});

/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent } from "@testing-library/react";

import { useAddNewProductMutation } from "../../app/api";
import { Button } from "../Button/Button";

import styles from "./AddProductForm.module.css";

import { AddProductForm } from "./AddProductForm";
import { act } from "react-dom/test-utils";

//Mocks
jest.mock("../../app/api");

jest.mock("../Button/Button", () => ({
  Button: jest.fn(() => <mock-button />),
}));

const renderAddProductForm = () => {
  return render(<AddProductForm />);
};

const mockAddNewProduct = jest.fn();

describe("Add Product Form Component", () => {
  beforeEach(() => {
    useAddNewProductMutation.mockReturnValue([
      mockAddNewProduct,
      {
        isLoading: false,
      },
    ]);
  });

  it("should render the container", () => {
    renderAddProductForm();

    const container = screen.getByTestId("add-product-form-container");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.formContainer);
  });

  it("should render the form title", () => {
    renderAddProductForm();

    const title = screen.getByTestId("add-product-form-title");

    expect(title).toBeInTheDocument();
    expect(title).toHaveClass(styles.formTitle);
    expect(title).toHaveTextContent("Add a new product");
  });

  it("should render the form content", () => {
    renderAddProductForm();

    const container = screen.getByTestId("add-product-form-content");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.formContent);
  });

  it("should render the Button", () => {
    renderAddProductForm();

    expect(Button).toHaveBeenCalled();
  });

  it("onSumbit", async () => {
    renderAddProductForm();

    const container = screen.getByTestId("add-product-form-content");
    const input = screen.getByTestId("input-form");

    await act(async () => {
      fireEvent.input(input, {
        target: {
          value: "name",
        },
      });

      fireEvent.submit(container);
    });

    expect(mockAddNewProduct).toHaveBeenCalledWith({ name: "name" });
  });
});

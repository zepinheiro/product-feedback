/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import { useAddNewReviewMutation } from "../../app/api";
import { Button } from "../Button/Button";
import { StarRating } from "../StarRating/StarRating";

import styles from "./AddReviewForm.module.css";

import { AddReviewForm } from "./AddReviewForm";

//Mocks
jest.mock("../../app/api");

jest.mock("../Button/Button", () => ({
  Button: jest.fn(() => <mock-button />),
}));

jest.mock("../StarRating/StarRating", () => ({
  StarRating: jest.fn(() => <mock-start-rating />),
}));

const renderAddReviewForm = () => {
  return render(<AddReviewForm productId="id" />);
};

const mockAddNewReview = jest.fn();

describe("Add Review Form Component", () => {
  beforeEach(() => {
    useAddNewReviewMutation.mockReturnValue([
      mockAddNewReview,
      {
        isLoading: false,
      },
    ]);
  });

  it("should render the container", () => {
    renderAddReviewForm();

    const container = screen.getByTestId("add-review-form-container");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.container);
  });

  it("should render the form content", () => {
    renderAddReviewForm();

    const container = screen.getByTestId("add-review-form-content");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.addReviewFormContainer);
  });

  it("should render the Button", () => {
    renderAddReviewForm();

    expect(Button).toHaveBeenCalled();
  });

  it("should render the StarRating", () => {
    renderAddReviewForm();

    expect(StarRating).toHaveBeenCalled();
  });

  describe("when the user submits", () => {
    it("should call the mutation when IsLoading is false", async () => {
      renderAddReviewForm();

      const container = screen.getByTestId("add-review-form-content");
      const inputs = screen.getAllByTestId("input-form");
      const areaInput = screen.getByTestId("text-area-element");

      await act(async () => {
        fireEvent.input(inputs[0], {
          target: {
            value: "name",
          },
        });

        fireEvent.input(inputs[1], {
          target: {
            value: "email",
          },
        });

        fireEvent.input(areaInput, {
          target: {
            value: "content",
          },
        });

        const { onChange } = StarRating.mock.calls[0][0];

        onChange(1);

        fireEvent.submit(container);
      });

      expect(mockAddNewReview).toHaveBeenCalledWith({
        content: "content",
        email: "email",
        name: "name",
        rating: 1,
        productId: "id",
      });
    });

    it("should not call the mutation when IsLoading is false", async () => {
      useAddNewReviewMutation.mockReturnValue([
        mockAddNewReview,
        {
          isLoading: true,
        },
      ]);

      renderAddReviewForm();

      const container = screen.getByTestId("add-review-form-content");
      const inputs = screen.getAllByTestId("input-form");
      const areaInput = screen.getByTestId("text-area-element");

      await act(async () => {
        fireEvent.input(inputs[0], {
          target: {
            value: "name",
          },
        });

        fireEvent.input(inputs[1], {
          target: {
            value: "email",
          },
        });

        fireEvent.input(areaInput, {
          target: {
            value: "content",
          },
        });

        const { onChange } = StarRating.mock.calls[0][0];

        onChange(1);

        fireEvent.submit(container);
      });

      expect(mockAddNewReview).not.toHaveBeenCalled();
    });

    it("should not call the mutation when no rating is set", async () => {
      useAddNewReviewMutation.mockReturnValue([
        mockAddNewReview,
        {
          isLoading: false,
        },
      ]);

      renderAddReviewForm();

      const container = screen.getByTestId("add-review-form-content");
      const inputs = screen.getAllByTestId("input-form");
      const areaInput = screen.getByTestId("text-area-element");

      await act(async () => {
        fireEvent.input(inputs[0], {
          target: {
            value: "name",
          },
        });

        fireEvent.input(inputs[1], {
          target: {
            value: "email",
          },
        });

        fireEvent.input(areaInput, {
          target: {
            value: "content",
          },
        });

        fireEvent.submit(container);
      });

      expect(mockAddNewReview).not.toHaveBeenCalled();
    });
  });
});

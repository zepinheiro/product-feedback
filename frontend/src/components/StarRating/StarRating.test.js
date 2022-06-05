import { render, screen } from "@testing-library/react";
import { Star } from "./Star";

import styles from "./StarRating.module.css";

import { StarRating } from "./StarRating";
import { act } from "react-dom/test-utils";

jest.mock("./Star", () => ({
  Star: jest.fn(() => <mock-start />),
}));

const mockOnChange = jest.fn();

const DEFAULT_PROPS = {
  onChange: mockOnChange,
  rating: 0,
  disabled: false,
};

const renderStarRating = (props) => {
  return render(<StarRating {...props} />);
};

describe("Star Rating Component", () => {
  it("should render the container", () => {
    renderStarRating(DEFAULT_PROPS);

    const container = screen.queryByTestId("star-rating-container");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.container);
  });

  it("should render 5 stars", () => {
    renderStarRating(DEFAULT_PROPS);

    expect(Star).toHaveBeenCalledTimes(5);
  });

  describe("when clicking the first star", () => {
    it("should change call onChange", () => {
      renderStarRating(DEFAULT_PROPS);

      const firstStar = Star.mock.calls[0][0];

      act(() => {
        firstStar.onClick();
      });

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });
  });

  describe("when clicking on the star with the same rating", () => {
    it("should call onChange with 0", () => {
      renderStarRating({ ...DEFAULT_PROPS, rating: 1 });

      const firstStar = Star.mock.calls[0][0];

      act(() => {
        firstStar.onClick();
      });

      expect(mockOnChange).toHaveBeenCalledWith(0);
    });
  });

  describe("when rating value changes", () => {
    it("should re render the stars", () => {
      const { rerender } = renderStarRating({
        ...DEFAULT_PROPS,
        disabled: true,
      });

      const firstStar = Star.mock.calls[0][0];

      expect(firstStar.filled).toBe(false);

      const newProps = {
        ...DEFAULT_PROPS,
        rating: 1,
      };
      rerender(<StarRating {...newProps} />);

      const firstStarReRender = Star.mock.calls[5][0];
      expect(firstStarReRender.filled).toBe(true);
    });
  });

  describe("when disabled is true", () => {
    it("should not fire onChange callback", () => {
      renderStarRating({ ...DEFAULT_PROPS, disabled: true });

      const firstStar = Star.mock.calls[0][0];

      act(() => {
        firstStar.onClick();
      });

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });
});

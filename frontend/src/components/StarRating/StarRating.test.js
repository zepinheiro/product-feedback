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
  value: 0,
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
    it("should change the filled to true", () => {
      renderStarRating(DEFAULT_PROPS);

      const firstStar = Star.mock.calls[0][0];

      expect(firstStar.filled).toBe(false);

      act(() => {
        firstStar.onClick();
      });

      const firstStarReRender = Star.mock.calls[5][0];

      expect(firstStarReRender.filled).toBe(true);
      expect(mockOnChange).toHaveBeenCalledWith(1);
    });
  });

  describe("when disabled is true", () => {
    it("should not re render the stars", () => {
      renderStarRating({ ...DEFAULT_PROPS, disabled: true });

      const firstStar = Star.mock.calls[0][0];

      expect(firstStar.filled).toBe(false);

      act(() => {
        firstStar.onClick();
      });

      expect(Star.mock.calls.length).toBe(5);
    });
  });

  describe("when onChange is not provided", () => {
    it("should not re render the stars", () => {
      renderStarRating({ ...DEFAULT_PROPS, onChange: undefined });

      const firstStar = Star.mock.calls[0][0];

      expect(firstStar.filled).toBe(false);

      act(() => {
        firstStar.onClick();
      });

      expect(Star.mock.calls.length).toBe(5);
    });
  });
});

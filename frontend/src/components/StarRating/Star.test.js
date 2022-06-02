import { render } from "@testing-library/react";

import { FaStar } from "react-icons/fa";

import { Star } from "./Star";

jest.mock("react-icons/fa", () => ({
  FaStar: jest.fn(() => <mock-far-star />),
}));

const mockOnClick = jest.fn();

const DEFAULT_PROPS = {
  filled: false,
  onClick: mockOnClick,
};

const renderStar = (props) => {
  return render(<Star {...props} />);
};

describe("Start Component", () => {
  describe("when filled is false", () => {
    it("should set the color as 'lightgray'", () => {
      renderStar(DEFAULT_PROPS);

      expect(FaStar).toHaveBeenCalledWith(
        {
          "data-testid": "star-component",
          color: "lightgray",
          onClick: mockOnClick,
        },
        {}
      );
    });
  });

  describe("when filled is true", () => {
    it("should set the color as 'orange'", () => {
      renderStar({ ...DEFAULT_PROPS, filled: true });

      expect(FaStar).toHaveBeenCalledWith(
        {
          "data-testid": "star-component",
          color: "orange",
          onClick: mockOnClick,
        },
        {}
      );
    });
  });
});

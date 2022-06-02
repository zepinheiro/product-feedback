import { render, screen } from "@testing-library/react";

import { Bar } from "react-chartjs-2";
import { useGetReviewsQuery } from "../../app/api";

import styles from "./ReviewChart.module.css";

import { ReviewChart } from "./ReviewChart";

jest.mock("../../app/api");
jest.mock("react-chartjs-2", () => ({
  Bar: jest.fn(() => <mock-bar />),
}));
jest.mock("chart.js", () => ({
  Chart: {
    register: jest.fn(),
  },
  CategoryScale: jest.fn(() => "category-scale"),
  LinearScale: jest.fn(() => "linear-scale"),
  BarElement: jest.fn(() => "bar-element"),
  Tooltip: jest.fn(() => "tooltip"),
}));

const DEFAULT_PROPS = {
  productId: "id",
};

const DATA = {
  0: 1,
  1: 0,
  2: 2,
  3: 0,
  4: 5,
  5: 1,
};

const renderReviewChart = (props) => {
  return render(<ReviewChart {...props} />);
};
describe("Review Chart Component", () => {
  beforeEach(() => {
    useGetReviewsQuery.mockReturnValue({ ratings: DATA });
  });

  it("should render the Bar component", () => {
    renderReviewChart(DEFAULT_PROPS);

    const container = screen.getByTestId("review-chart-container");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.container);

    expect(Bar).toHaveBeenCalledWith(
      {
        data: {
          labels: ["0", "1", "2", "3", "4", "5"],
          datasets: [
            {
              label: "ratings",
              data: DATA,
              backgroundColor: "#ffcdac",
            },
          ],
        },
      },
      {}
    );
  });
});

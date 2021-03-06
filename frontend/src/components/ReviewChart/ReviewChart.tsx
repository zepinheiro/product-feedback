import { useMemo } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { createSelectRatingsFromData } from "../ProductPage/ProcutPage.selectors";
import { useGetReviewsQuery } from "../../app/api";
import styles from "./ReviewChart.module.css";

type ReviewChartProps = {
  productId: string;
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const labels = ["1", "2", "3", "4", "5"];

/**
 * Uses Chart.Js to render the product reviews ratings
 * @param productId - Product ID to fech the reviews
 */
export const ReviewChart = ({ productId }: ReviewChartProps) => {
  const selectRatingsFromData = useMemo(() => {
    return createSelectRatingsFromData();
  }, []);

  const { ratings } = useGetReviewsQuery(productId, {
    selectFromResult: (result) => ({
      ...result,
      // maps the response using reselect to prevent unecessary re renders
      ratings: selectRatingsFromData(result.data),
    }),
  });

  const data = {
    labels,
    datasets: [
      {
        label: "ratings",
        data: ratings,
        backgroundColor: "#ffcdac",
      },
    ],
  };

  return (
    <div data-testid="review-chart-container" className={styles.container}>
      <Bar data={data} />
    </div>
  );
};

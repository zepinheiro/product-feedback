import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useGetReviewsQuery } from "../../app/api";
import { ReviewDTO } from "../../types/review";
import styles from "./ReviewChart.module.css";

type ReviewChartProps = {
  productId: string;
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const labels = ["0", "1", "2", "3", "4", "5"];

const defaultRatings: { [key: number]: number } = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

/**
 * Uses Chart.Js to render the product reviews ratings
 * @param productId - Product ID to fech the reviews
 * @returns
 */
export const ReviewChart = ({ productId }: ReviewChartProps) => {
  const selectRatingsFromData = useMemo(() => {
    // Return a unique selector instance for this page
    return createSelector(
      (res: ReviewDTO[] | undefined) => res,
      (data) => {
        return data?.reduce(
          (prev, current) => {
            prev[current.rating]++;
            return prev;
          },
          { ...defaultRatings }
        );
      }
    );
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

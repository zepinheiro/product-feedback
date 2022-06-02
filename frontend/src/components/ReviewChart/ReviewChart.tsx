import { createSelector } from "@reduxjs/toolkit";
import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useGetReviewsQuery } from "../../app/api";
import { ReviewDTO } from "../../types/review";
import styles from "./ReviewChart.module.css";

type ReviewChartProps = {
  productId: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ReviewChart = ({ productId }: ReviewChartProps) => {
  const selectRatingsFromData = useMemo(() => {
    const defaultRatings: { [key: number]: number } = {
      0: 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    // Return a unique selector instance for this page so that
    // the filtered results are correctly memoized
    return createSelector(
      (res: ReviewDTO[] | undefined) => res,
      (data) => {
        console.log("data", data);
        console.log("default", defaultRatings);
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
      ratings: selectRatingsFromData(result.data),
    }),
  });

  if (!ratings) return <div>No data available</div>;

  const labels = ["0", "1", "2", "3", "4", "5"];
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
    <div className={styles.container}>{ratings && <Bar data={data} />}</div>
  );
};

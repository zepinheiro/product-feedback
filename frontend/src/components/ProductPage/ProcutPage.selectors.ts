import { createSelector } from "@reduxjs/toolkit";
import { ReviewDTO } from "../../types/review";

const defaultRatings: { [key: number]: number } = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
};

export const createSelectRatingsFromData = () => {
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
};

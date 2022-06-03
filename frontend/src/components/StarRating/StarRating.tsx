import React from "react";
import { Star } from "./Star";

import styles from "./StarRating.module.css";

type StarRatingProps = {
  onChange?: (rating: number) => void;
  rating: number;
  disabled?: boolean;
};

/**
 * Renders the 5 stars used to rate a product
 *
 * @param onChange - callback that is called when a star is clicked
 * @param value - default selected star
 * @param disabled - if true, prevents the user from changing the select star
 */
export const StarRating: React.FunctionComponent<StarRatingProps> = ({
  onChange,
  rating,
  disabled,
}) => {
  const changeRating = (newRating: number) => {
    if (disabled) return;
    if (onChange) {
      const nextRating = newRating === rating ? 0 : newRating;
      onChange(nextRating);
    }
  };

  return (
    <div data-testid="star-rating-container" className={styles.container}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          data-testid="star-rating-star"
          key={value}
          filled={value <= rating}
          onClick={() => changeRating(value)}
        />
      ))}
    </div>
  );
};

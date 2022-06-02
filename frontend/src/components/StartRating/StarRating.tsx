import React, { useState } from "react";
import { Star } from "./Star";

import styles from "./StarRating.module.css";

type StarRatingProps = {
  onChange?: (rating: number) => void;
  value?: number;
  disabled?: boolean;
};

export const StarRating: React.FunctionComponent<StarRatingProps> = ({
  onChange,
  value,
  disabled,
}) => {
  const [rating, setRating] = useState(value || 0);

  const changeRating = (newRating: number) => {
    if (disabled) return;
    if (onChange) {
      const nextRating = newRating === rating ? 0 : newRating;
      setRating(nextRating);
      onChange(nextRating);
    }
  };
  return (
    <div className={styles.container}>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => changeRating(value)}
        />
      ))}
    </div>
  );
};

import React, { useState } from "react";
import { Star } from "./Star";

type StarRatingProps = {
  onChange: (rating: number) => void;
};

export const StarRating: React.FunctionComponent<StarRatingProps> = ({
  onChange,
}) => {
  const [rating, setRating] = useState(0);

  const changeRating = (newRating: number) => {
    const nextRating = newRating === rating ? 0 : newRating;
    setRating(nextRating);
    onChange(nextRating);
  };
  return (
    <span>
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          filled={value <= rating}
          onClick={() => changeRating(value)}
        />
      ))}
    </span>
  );
};

import React from "react";
import { FaStar } from "react-icons/fa";

type StarProps = {
  filled: boolean;
  onClick: () => void;
};

/**
 * Renders a Star
 *
 * @param filled - changes the color of the star according to the filled state
 * @param onClick - callback to be executed when the component is clicked
 */
export const Star: React.FunctionComponent<StarProps> = ({
  filled,
  onClick,
}) => {
  return (
    <FaStar
      data-testid="star-component"
      color={filled ? "orange" : "lightgray"}
      onClick={onClick}
    />
  );
};

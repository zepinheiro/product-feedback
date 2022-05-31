import React from "react";
import { FaStar } from "react-icons/fa";

type StarProps = {
  filled: boolean;
  onClick: () => void;
};

export const Star: React.FunctionComponent<StarProps> = ({
  filled,
  onClick,
}) => {
  return <FaStar color={filled ? "orange" : "lightgray"} onClick={onClick} />;
};

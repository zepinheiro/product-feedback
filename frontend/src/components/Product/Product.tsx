import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Product.module.css";

type ProductType = {
  name: string;
  _id: string;
};

export const Product = ({ name, _id }: ProductType) => {
  const navigate = useNavigate();

  const handleCLick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    navigate(_id);
  };

  return (
    <div className={styles.productContainer} onClick={handleCLick}>
      <p>{name}</p>
    </div>
  );
};

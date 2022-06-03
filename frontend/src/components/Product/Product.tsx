import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Product.module.css";

type ProductType = {
  name: string;
  _id: string;
};

/**
 *  Product component.
 *  Renders a card that when clicked navigates to the product page
 *
 * @param name - Product name
 * @param _id  - Product id
 */
export const Product = ({ name, _id }: ProductType) => {
  const navigate = useNavigate();

  const handleCLick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    navigate(_id);
  };

  return (
    <div
      data-testid="product-container"
      className={styles.productContainer}
      onClick={handleCLick}
    >
      <p data-testid="product-name">{name}</p>
    </div>
  );
};

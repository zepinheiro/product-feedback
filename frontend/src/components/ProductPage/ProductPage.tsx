import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../app/api";
import { AddReviewForm } from "../AddReviewForm/AddReviewForm";
import { ProductReviews } from "../ProductReviews/ProductReviews";
import { ReviewChart } from "../ReviewChart/ReviewChart";

import styles from "./ProductPage.module.css";

export const ProductPage = () => {
  let { productId = "" } = useParams();
  const { data, error } = useGetProductQuery(productId);

  if (error || !data) {
    return (
      <h1 data-testid="product-page-error">
        Oops! Looks like that product doesn't exist
      </h1>
    );
  }

  return (
    <div data-testid="product-page-container">
      <h1 data-testid="product-page-title">{data.name.toUpperCase()}</h1>
      <div
        data-testid="product-page-upper-section-container"
        className={styles.upperSection}
      >
        <AddReviewForm productId={productId} />
        <ReviewChart productId={productId} />
      </div>
      {data && <ProductReviews productId={productId} />}
    </div>
  );
};

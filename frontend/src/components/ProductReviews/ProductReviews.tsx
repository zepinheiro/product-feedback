import React from "react";
import { useGetReviewsQuery } from "../../app/api";
import { ReviewDTO } from "../../types/review";
import { ProductReview } from "../ProductReview/ProductReview";

import styles from "./ProductReviews.module.css";

type ProductReviewsProps = {
  productId: string;
};

export const ProductReviews: React.FunctionComponent<ProductReviewsProps> = ({
  productId,
}) => {
  const { data } = useGetReviewsQuery(productId);

  const renderedReviews = data?.map(
    ({ _id, name, email, rating, content }: ReviewDTO) => {
      return (
        <ProductReview
          key={_id}
          name={name}
          email={email}
          rating={rating}
          content={content}
        />
      );
    }
  );

  return (
    <div data-testid="product-reviews-component">
      <h3>Product reviews</h3>
      {!data?.length && <div>No reviews found!</div>}
      {data && (
        <div
          data-testid="product-reviews-container"
          className={styles.reviewsContainer}
        >
          {renderedReviews}
        </div>
      )}
    </div>
  );
};

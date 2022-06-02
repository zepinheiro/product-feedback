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

  // TODO: MOVE THIS TO A PURE VISUAL COMPONENT
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
    <div>
      <h3>Product reviews</h3>
      {!data?.length && <div>No reviews found!</div>}
      <div className={styles.reviewsContainer}>{renderedReviews}</div>
    </div>
  );
};

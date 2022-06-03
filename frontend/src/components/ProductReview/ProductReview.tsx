import React from "react";
import { StarRating } from "../StarRating/StarRating";
import styles from "./ProductReview.module.css";

type ProductReviewProps = {
  name: string;
  email: string;
  rating: number;
  content: string;
};

/**
 * Renders a review card with all the needed information
 * @param name - review name
 * @param email - review email
 * @param rating - review rating
 * @param content - review content
 */
const ProductReviewExerpt = ({
  name,
  email,
  rating,
  content,
}: ProductReviewProps) => {
  return (
    <div data-testid="product-review-container" className={styles.container}>
      <p data-testid="product-review-name" className={styles.name}>
        {name}
      </p>
      <div
        data-testid="product-review-meta-container"
        className={styles.metaContainer}
      >
        <p data-testid="product-review-meta-email" className={styles.email}>
          {email}
        </p>
        <StarRating rating={rating} disabled />
      </div>
      <p data-testid="product-review-content" className={styles.content}>
        {content}
      </p>
    </div>
  );
};

export const ProductReview = React.memo(ProductReviewExerpt);

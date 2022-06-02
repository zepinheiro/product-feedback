import { StarRating } from "../StartRating/StarRating";
import styles from "./ProductReview.module.css";

type ProductReviewProps = {
  name: string;
  email: string;
  rating: number;
  content: string;
};

export const ProductReview = ({
  name,
  email,
  rating,
  content,
}: ProductReviewProps) => {
  return (
    <div className={styles.container}>
      <p className={styles.name}>{name}</p>
      <div className={styles.metaContainer}>
        <p className={styles.email}>{email}</p>
        <StarRating value={rating} disabled />
      </div>
      <p className={styles.content}>{content}</p>
    </div>
  );
};

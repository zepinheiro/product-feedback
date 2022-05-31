import React from "react";
import { useGetReviewsQuery } from "../../app/api";
import { ReviewDTO } from "../../types/review";

type ProductReviewsProps = {
  productId: string;
};

export const ProductReviews: React.FunctionComponent<ProductReviewsProps> = ({
  productId,
}) => {
  // TODO: ADD PAGINATION
  const { data } = useGetReviewsQuery(productId);

  if (!data?.length) {
    return <div>No reviews found!</div>;
  }

  // TODO: MOVE THIS TO A PURE VISUAL COMPONENT
  const renderedReviews = data.map((review: ReviewDTO) => {
    return (
      <div key={review._id}>
        <p>Name: {review.name}</p>
        <p>Email: {review.email}</p>
        <p>Rating: {review.rating}</p>
        <p>Content: {review.content}</p>
      </div>
    );
  });

  return (
    <div>
      <h3>Product reviews</h3>
      {renderedReviews}
    </div>
  );
};

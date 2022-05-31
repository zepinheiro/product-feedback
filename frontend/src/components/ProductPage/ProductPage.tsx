import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../app/api";
import { AddReviewForm } from "../AddReviewForm/AddReviewForm";
import { ProductReviews } from "../ProductReviews/ProductReviews";

export const ProductPage = () => {
  //! REVIEW THIS PRODUCT ID THING

  let { productId = "" } = useParams();
  const { data, error } = useGetProductQuery(productId);

  if (error) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>Product page: {data?.name}</h1>
      <AddReviewForm productId={productId} />
      <ProductReviews productId={productId} />
    </div>
  );
};

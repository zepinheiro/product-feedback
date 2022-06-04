import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../app/api";
import { AddReviewForm } from "../AddReviewForm/AddReviewForm";
import { ProductReviews } from "../ProductReviews/ProductReviews";
import { ReviewChart } from "../ReviewChart/ReviewChart";

import styles from "./ProductPage.module.css";

/**
 * Fetches product metadata and renders all the needed components
 */
const ProductPage = () => {
  let { productId = "" } = useParams();
  const { data, error, isLoading } = useGetProductQuery(productId);

  return (
    <div data-testid="product-page-container">
      {error && (
        <h1 data-testid="product-page-error">
          Oops! Looks like that product doesn't exist
        </h1>
      )}
      {isLoading && <h1 data-testid="product-page-loading">Loading ...</h1>}
      {data && (
        <>
          <h1 data-testid="product-page-title" className={styles.productTitle}>
            {data.name.toUpperCase()}
          </h1>
          <div
            data-testid="product-page-upper-section-container"
            className={styles.upperSection}
          >
            <AddReviewForm productId={productId} />
            <ReviewChart productId={productId} />
          </div>
          <ProductReviews productId={productId} />
        </>
      )}
    </div>
  );
};

export default ProductPage;

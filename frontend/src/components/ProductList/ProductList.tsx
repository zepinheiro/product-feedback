import { useGetProductsQuery } from "../../app/api";
import { ProductDTO } from "../../types/product";
import { Product } from "../Product/Product";

import styles from "./ProductList.module.css";

export const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery();

  const mappedProducts = data?.map((product: ProductDTO) => {
    return (
      <div
        data-testid="product-list-product"
        className={styles.productItem}
        key={product._id}
      >
        <Product name={product.name} _id={product._id} />
      </div>
    );
  });

  return (
    <div
      data-testid="product-list-container"
      className={styles.productListContainer}
    >
      <h1 data-testid="product-list-title" className={styles.productListTitle}>
        Product list
      </h1>
      {isLoading && (
        <div data-testid="product-list-loading" className={styles.information}>
          Loading ...
        </div>
      )}
      {!isLoading && !data?.length && (
        <div
          data-testid="product-list-not-found"
          className={styles.information}
        >
          No products found ...
        </div>
      )}
      {!isLoading && data && (
        <div data-testid="product-list-products" className={styles.productList}>
          {mappedProducts}
        </div>
      )}
    </div>
  );
};

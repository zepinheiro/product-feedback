import { useGetProductsQuery } from "../../app/api";
import { ProductDTO } from "../../types/product";
import { Product } from "../Product/Product";

import styles from "./ProductList.module.css";

export const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery();

  const mappedProducts = data?.map((product: ProductDTO) => {
    return (
      <div className={styles.productItem} key={product._id}>
        <Product name={product.name} _id={product._id} />
      </div>
    );
  });

  return (
    <div className={styles.productListContainer}>
      <h1 className={styles.productListTitle}>Product list</h1>
      {isLoading && <div className={styles.information}>Loading ...</div>}
      {!isLoading && !data?.length && (
        <div className={styles.information}>No products found ...</div>
      )}
      {!isLoading && data && (
        <div className={styles.productList}>{mappedProducts}</div>
      )}
    </div>
  );
};

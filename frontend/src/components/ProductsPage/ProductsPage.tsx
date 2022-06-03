import { AddProductForm } from "../AddProductForm/AddProductForm";
import { ProductList } from "../ProductList/ProductList";

/**
 * Renders products page components
 */
export const ProductsPage = () => {
  return (
    <>
      <AddProductForm />
      <ProductList />
    </>
  );
};

import { AddProductForm } from "../AddProductForm/AddProductForm";
import { ProductList } from "../ProductList/ProductList";

/**
 * Renders products page components
 */
const ProductsPage = () => {
  return (
    <>
      <AddProductForm />
      <ProductList />
    </>
  );
};

export default ProductsPage;

import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../../app/api";
import { ProductDTO } from "../../types/product";

export const ProductList = () => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!data?.length) {
    return <div>No products found</div>;
  }
  const mappedProducts = data?.map((product: ProductDTO) => {
    return (
      <div key={product._id}>
        <span>{product.name}</span>
        <Link to={`/${product._id}`}>View Product</Link>
      </div>
    );
  });

  return (
    <div>
      <p>Product list</p>
      {mappedProducts}
    </div>
  );
};

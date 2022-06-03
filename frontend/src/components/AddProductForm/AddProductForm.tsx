import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewProductMutation } from "../../app/api";

import { InputForm } from "../InputForm/InputForm";
import { Button } from "../Button/Button";

import styles from "./AddProductForm.module.css";

type Inputs = {
  name: string;
};

/**
 * AddProductForm component
 *
 * Component used to POST a new product via the useAddNewProductMutation mutation
 */
export const AddProductForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const [addNewProduct, { isLoading }] = useAddNewProductMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // Only submit if request handler is stale
    if (!isLoading) {
      addNewProduct(data);
      reset();
    }
  };

  return (
    <div
      data-testid="add-product-form-container"
      className={styles.formContainer}
    >
      <h1 data-testid="add-product-form-title" className={styles.formTitle}>
        Add a new product
      </h1>
      <form
        data-testid="add-product-form-content"
        className={styles.formContent}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.inputForm}>
          <InputForm
            data-testid="add-product-form-input"
            text="Product Name"
            label="name"
            register={register}
            required
          />
        </div>
        <Button text="Add Product" />
      </form>
    </div>
  );
};

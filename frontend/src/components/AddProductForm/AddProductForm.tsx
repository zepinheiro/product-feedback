import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewProductMutation } from "../../app/api";

import { InputForm } from "../InputForm/InputForm";
import { Button } from "../Button/Button";

import styles from "./AddProductForm.module.css";

type Inputs = {
  name: string;
};

export const AddProductForm = () => {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const [addNewProduct, { isLoading }] = useAddNewProductMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!isLoading) {
      addNewProduct(data);
      reset();
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>Add a new product</h1>
      <form className={styles.formContent} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputForm}>
          <InputForm
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

import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewProductMutation } from "../../app/api";

type Inputs = {
  name: string;
};

export const AddProductForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [addNewProduct, { isLoading }] = useAddNewProductMutation();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!isLoading) {
      addNewProduct(data);
    }
  };

  return (
    <div>
      <p>Add Product Form</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name", { required: true, minLength: 5 })} />
        {errors.name?.type === "required" && (
          <span>This field is required</span>
        )}
        <input type="submit" />
      </form>
    </div>
  );
};

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewReviewMutation } from "../../app/api";
import { StarRating } from "../StartRating/StartRating";

type AddReviewFormProps = {
  productId: string;
};

type IFormInput = {
  name: string;
  email: string;
  rating: number;
  content: string;
};

export const AddReviewForm: React.FunctionComponent<AddReviewFormProps> = ({
  productId,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();

  const [addNewReview, { isLoading }] = useAddNewReviewMutation();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (!isLoading) {
      addNewReview({ productId, ...data });
    }
  };

  const handleRatingChange = (rating: number) => setValue("rating", rating);

  return (
    <div>
      <p>Enter a new review</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          {...register("name", {
            required: {
              value: true,
              message: "The name is required",
            },
            maxLength: 25,
          })}
        />
        {errors.name && <span role="alert">{errors.name.message}</span>}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email", {
            required: "required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          type="email"
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <StarRating onChange={handleRatingChange} />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          {...register("content", { required: "required" })}
        />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

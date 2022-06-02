import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewReviewMutation } from "../../app/api";
import { InputForm } from "../InputForm/InputForm";
import { StarRating } from "../StarRating/StarRating";
import { Button } from "../Button/Button";

import styles from "./AddReviewForm.module.css";
import { AreaForm } from "../AreaForm/AreaForm";

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
  const { register, handleSubmit, setValue, reset } = useForm<IFormInput>();
  const [addNewReview, { isLoading }] = useAddNewReviewMutation();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (!isLoading) {
      addNewReview({ productId, ...data });
      reset();
    }
  };

  const handleRatingChange = (rating: number) => setValue("rating", rating);

  return (
    <div data-testid="add-review-form-container" className={styles.container}>
      <form
        data-testid="add-review-form-content"
        className={styles.addReviewFormContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm text="Name" label="name" register={register} required />
        <InputForm text="Email" label="email" register={register} required />
        <div className={styles.ratingContainer}>
          <p className={styles.ratingLabel}>Rating:</p>
          <StarRating onChange={handleRatingChange} />
        </div>
        <AreaForm text="Content" label="content" register={register} required />
        <Button text="Add Review" />
      </form>
    </div>
  );
};

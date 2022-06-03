import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddNewReviewMutation } from "../../app/api";
import { InputForm } from "../InputForm/InputForm";
import { StarRating } from "../StarRating/StarRating";
import { Button } from "../Button/Button";

import styles from "./AddReviewForm.module.css";
import { AreaForm } from "../AreaForm/AreaForm";
import { useState } from "react";

type AddReviewFormProps = {
  productId: string;
};

type IFormInput = {
  name: string;
  email: string;
  rating: number;
  content: string;
};

/**
 * AddReviewForm component
 *
 * Component used to POST a new review for a product via the useAddNewReviewMutation mutation
 *
 * @param productId productId associated with the review
 */
export const AddReviewForm: React.FunctionComponent<AddReviewFormProps> = ({
  productId,
}) => {
  const { register, handleSubmit, setValue, reset } = useForm<IFormInput>();
  const [addNewReview, { isLoading }] = useAddNewReviewMutation();

  const [ratingValue, setRatingValue] = useState(0);

  const handleRatingChange = (rating: number) => {
    setValue("rating", rating);
    setRatingValue(rating);
  };
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // Only submit if request handler is stale and a rating is defined
    if (isLoading) return;
    if (!data.rating) return;

    addNewReview({ productId, ...data });
    reset();
    setRatingValue(0);
  };

  return (
    <div data-testid="add-review-form-container" className={styles.container}>
      <form
        data-testid="add-review-form-content"
        className={styles.addReviewFormContainer}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputForm text="Name" label="name" register={register} required />
        <InputForm
          text="Email"
          label="email"
          register={register}
          required
          type="email"
        />
        <div className={styles.ratingContainer}>
          <p className={styles.ratingLabel}>Rating:</p>
          <StarRating onChange={handleRatingChange} rating={ratingValue} />
        </div>
        <AreaForm text="Content" label="content" register={register} required />
        <Button text="Add Review" />
      </form>
    </div>
  );
};

import { UseFormRegister } from "react-hook-form";

import styles from "./AreaForm.module.css";

type AreaFormProps = {
  text: string;
  label: string;
  register: UseFormRegister<any>;
  required: boolean;
  maxLength?: number;
};

/**
 * Area Form Component
 *
 * @param text - Placeholder text
 * @param label - label name used to register the component on react form hooks
 * @param register - register function from react form hooks
 * @param required - controls if the field is required
 * @param maxLength - controls the max length of the text area
 */
export const AreaForm = ({
  text,
  label,
  register,
  required,
  maxLength = 250,
}: AreaFormProps) => (
  <textarea
    data-testid="text-area-element"
    className={styles.areaForm}
    placeholder={text}
    maxLength={maxLength}
    {...register(label, { required })}
  />
);

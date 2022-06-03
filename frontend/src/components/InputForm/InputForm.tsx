import { UseFormRegister } from "react-hook-form";

import styles from "./InputForm.module.css";

type InputProps = {
  text: string;
  label: string;
  register: UseFormRegister<any>;
  required: boolean;
  maxLength?: number;
};

/**
 * Input Form Component
 *
 * @param text - Placeholder text
 * @param label - label name used to register the component on react form hooks
 * @param register - register function from react form hooks
 * @param required - controls if the field is required
 * @param maxLength - controls the max length of the text area
 */
export const InputForm = ({
  text,
  label,
  register,
  required,
  maxLength = 50,
}: InputProps) => (
  <input
    data-testid="input-form"
    placeholder={text}
    className={styles.inputForm}
    maxLength={maxLength}
    {...register(label, { required })}
  />
);

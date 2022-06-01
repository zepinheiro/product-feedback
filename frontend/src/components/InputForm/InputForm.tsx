import { UseFormRegister } from "react-hook-form";

import styles from "./InputForm.module.css";

type InputProps = {
  text: string;
  label: string;
  register: UseFormRegister<any>;
  required: boolean;
  maxLength?: number;
};

export const InputForm = ({
  text,
  label,
  register,
  required,
  maxLength = 25,
}: InputProps) => (
  <input
    placeholder={text}
    className={styles.inputForm}
    maxLength={maxLength}
    {...register(label, { required })}
  />
);

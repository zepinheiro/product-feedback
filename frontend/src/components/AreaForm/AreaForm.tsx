import { UseFormRegister } from "react-hook-form";

import styles from "./AreaForm.module.css";

type AreaFormProps = {
  text: string;
  label: string;
  register: UseFormRegister<any>;
  required: boolean;
  maxLength?: number;
};

export const AreaForm = ({
  text,
  label,
  register,
  required,
  maxLength = 250,
}: AreaFormProps) => (
  <textarea
    className={styles.areaForm}
    placeholder={text}
    maxLength={maxLength}
    {...register(label, { required })}
  />
);

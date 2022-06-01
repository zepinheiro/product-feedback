import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className={styles.button} type="submit" onClick={onClick}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};

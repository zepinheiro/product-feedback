import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  onClick?: () => void;
};

/**
 * Custom Button component
 *
 * @param text - Text to be displayed on the Button
 * @param onClick - Callback to be executed when the button is clicked
 */
export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      data-testid="button-element"
      className={styles.button}
      type="submit"
      onClick={onClick}
    >
      <span data-testid="button-text" className={styles.text}>
        {text}
      </span>
    </button>
  );
};

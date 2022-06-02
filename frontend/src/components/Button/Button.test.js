import { render, screen, fireEvent } from "@testing-library/react";

import { Button } from "./Button";

import styles from "./Button.module.css";

const onClickMock = jest.fn();

const DEFAULT_PROPS = {
  text: "Button Text",
  onClick: onClickMock,
};

const renderButton = (props) => {
  return render(<Button {...props} />);
};

describe("Button Component", () => {
  it("should render the Button Component", () => {
    renderButton(DEFAULT_PROPS);

    const container = screen.getByTestId("button-element");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.button);
  });

  it("should render the Text Component", () => {
    renderButton(DEFAULT_PROPS);

    const container = screen.getByTestId("button-text");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.text);
    expect(container).toHaveTextContent("Button Text");
  });

  it("should call the onClick callback when the button is clicked", () => {
    renderButton(DEFAULT_PROPS);

    const container = screen.getByTestId("button-element");

    fireEvent.click(container);

    expect(onClickMock).toHaveBeenCalled();
  });
});

import { render, screen, fireEvent } from "@testing-library/react";

import { InputForm } from "./InputForm";

import styles from "./InputForm.module.css";

const registerMock = jest.fn();

const DEFAULT_PROPS = {
  text: "placeholder",
  label: "label",
  register: registerMock,
  required: true,
  maxLength: 50,
};

const renderInputForm = (props) => {
  return render(<InputForm {...props} />);
};

describe("Input Form Component", () => {
  it("should render the InputForm Component", () => {
    renderInputForm(DEFAULT_PROPS);

    const container = screen.getByTestId("input-form");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.inputForm);
    expect(container).toHaveAttribute("placeholder", "placeholder");
    expect(container).toHaveAttribute("maxLength", "50");
  });

  it("should call the register function", () => {
    renderInputForm(DEFAULT_PROPS);

    expect(registerMock).toHaveBeenCalledWith("label", { required: true });
  });

  it("should update the value when the user inputs text", () => {
    renderInputForm(DEFAULT_PROPS);

    const container = screen.getByTestId("input-form");
    expect(container).toHaveValue("");
    fireEvent.change(container, { target: { value: "changed text" } });
    expect(container).toHaveValue("changed text");
  });
});

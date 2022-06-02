import { render, screen, fireEvent } from "@testing-library/react";

import { AreaForm } from "./AreaForm";

import styles from "./AreaForm.module.css";

const registerMock = jest.fn();

const DEFAULT_PROPS = {
  text: "placeholder",
  label: "label",
  register: registerMock,
  required: true,
  maxLength: 255,
};

const renderAreaForm = (props) => {
  return render(<AreaForm {...props} />);
};

describe("Area Form Component", () => {
  it("should render the AreaForm Component", () => {
    renderAreaForm(DEFAULT_PROPS);

    const container = screen.getByTestId("text-area-element");

    expect(container).toBeInTheDocument();
    expect(container).toHaveClass(styles.areaForm);
    expect(container).toHaveTextContent("");
    expect(container).toHaveAttribute("placeholder", "placeholder");
    expect(container).toHaveAttribute("maxLength", "255");
  });

  it("should call the register function", () => {
    renderAreaForm(DEFAULT_PROPS);

    expect(registerMock).toHaveBeenCalledWith("label", { required: true });
  });

  it("should update the value when the user inputs text", () => {
    renderAreaForm(DEFAULT_PROPS);

    const container = screen.getByTestId("text-area-element");
    expect(container).toHaveValue("");
    fireEvent.change(container, { target: { value: "changed text" } });
    expect(container).toHaveValue("changed text");
  });
});

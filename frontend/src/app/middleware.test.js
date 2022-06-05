import { isRejectedWithValue } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { rtkQueryErrorLogger } from "./middleware";

const nextMock = jest.fn();

jest.mock("@reduxjs/toolkit", () => ({
  isRejectedWithValue: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("rtkQueryErrorLogger", () => {
  describe("when isRejectedWithValue is false", () => {
    beforeEach(() => {
      isRejectedWithValue.mockReturnValue(false);
    });

    it("should call next", () => {
      rtkQueryErrorLogger({})(nextMock)("action");

      expect(isRejectedWithValue).toHaveBeenCalledWith("action");
      expect(nextMock).toHaveBeenCalledWith("action");
    });
  });

  describe("when isRejectedWithValue is true", () => {
    beforeEach(() => {
      isRejectedWithValue.mockReturnValue(true);
    });

    describe("when payload status is 409", () => {
      it("should call next", () => {
        const action = {
          payload: {
            status: 409,
            data: {
              error: "error",
            },
          },
        };
        rtkQueryErrorLogger({})(nextMock)(action);

        expect(isRejectedWithValue).toHaveBeenCalledWith(action);
        expect(toast.error).toHaveBeenCalledWith("error");
        expect(nextMock).toHaveBeenCalledWith(action);
      });
    });

    describe("when payload status is another", () => {
      it("should call next", () => {
        const action = {
          payload: {
            status: 500,
            data: {
              error: "error",
            },
          },
        };
        rtkQueryErrorLogger({})(nextMock)(action);

        expect(isRejectedWithValue).toHaveBeenCalledWith(action);
        expect(toast.error).toHaveBeenCalledWith(
          "Failed to contact the web server"
        );
        expect(nextMock).toHaveBeenCalledWith(action);
      });
    });
  });
});

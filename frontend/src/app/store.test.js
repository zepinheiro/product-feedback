import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import { rtkQueryErrorLogger } from "./middleware";

jest.mock("@reduxjs/toolkit", () => ({
  configureStore: jest.fn(() => "ola"),
}));

jest.mock("./api", () => ({
  apiSlice: {
    reducerPath: "apiSlice",
    reducer: "apiReducer",
    middleware: "apiMiddleware",
  },
}));

jest.mock("./middleware", () => ({
  rtkQueryErrorLogger: "rtkmiddleware",
}));

const getDefaultMiddleware = jest.fn();

describe("configure store", () => {
  it("random", () => {
    require("./store");

    expect(configureStore).toHaveBeenCalledWith({
      reducer: {
        apiSlice: "apiReducer",
      },
      middleware: expect.any(Function),
    });

    getDefaultMiddleware.mockReturnValue([]);
    expect(
      configureStore.mock.calls[0][0].middleware(getDefaultMiddleware)
    ).toEqual(["apiMiddleware", "rtkmiddleware"]);
  });
});

import {
  MiddlewareAPI,
  isRejectedWithValue,
  Middleware,
} from "@reduxjs/toolkit";

import { toast } from "react-toastify";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      switch (action.payload.status) {
        case 409:
          toast.error(action.payload.data.error);
          break;
        default:
          toast.error("Failed to contact the web server");
          break;
      }
    }

    return next(action);
  };

import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./AnyUser";

export const store = configureStore({
  reducer: {
    user: UserSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./AnyUser";
import AmtSlice from "./AmtSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    amount: AmtSlice,
  },
});

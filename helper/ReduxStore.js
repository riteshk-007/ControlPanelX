import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./AnyUser";
import AmtSlice from "./AmtSlice";
import CreateUserSlice from "./CreateUserSlice";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    amount: AmtSlice,
    create: CreateUserSlice,
  },
});

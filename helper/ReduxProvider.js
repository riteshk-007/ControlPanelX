"use client";

import { Provider } from "react-redux";
import { store } from "./ReduxStore";

export const ReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

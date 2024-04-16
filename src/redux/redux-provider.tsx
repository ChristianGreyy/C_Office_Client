"use client";

import { PropsWithChildren } from "react";

import { Provider } from "react-redux";
import { store } from ".";

export default function ReduxProvider({ children }: PropsWithChildren<any>) {
  return <Provider store={store}>{children}</Provider>;
}

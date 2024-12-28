"use client";
import { myStore } from "@/app/redux/store";
import * as React from "react";
import { Provider } from "react-redux";

interface Props {
  children: React.ReactNode;
}

export function StoreProviderComponent({ children }: Props) {
  return (
    <>
      <Provider store={myStore}>{children}</Provider>
    </>
  );
}

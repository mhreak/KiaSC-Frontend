"use client";

import React, { createContext, useContext } from "react";
import { FormUIAdapter } from "./ui-contracts";

const UIAdapterContext = createContext<FormUIAdapter | null>(null);

export const UIAdapterProvider: React.FC<{
  adapter: FormUIAdapter;
  children: React.ReactNode;
}> = ({ adapter, children }) => {
  return (
    <UIAdapterContext.Provider value={adapter}>
      {children}
    </UIAdapterContext.Provider>
  );
};

export const useUIAdapter = (): FormUIAdapter => {
  const context = useContext(UIAdapterContext);
  if (!context) {
    throw new Error(
      "[FormBuilder] useUIAdapter must be used within a UIAdapterProvider context wrapper.",
    );
  }
  return context;
};

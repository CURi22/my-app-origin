"use client";

import { ReactNode, useState } from "react";

import { AppState, AppStateProps, initialAppState } from "contexts/app-state";

interface ContextProviderParams {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderParams) {
  const [appState, setAppState] = useState<AppStateProps>(initialAppState);

  return (
    <AppState.Provider value={{ appState, setAppState }}>
      {children}
    </AppState.Provider>
  );
}

import { createContext } from "react";

export const AppState = createContext<any>(null);

export interface AppStateProps {}

export interface AppStateContext {}

export const initialAppState: AppStateProps = {};

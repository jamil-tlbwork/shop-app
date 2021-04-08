import { createContext } from "react";
import { AuthStore } from "../stores/auth.store";

export const AuthContext = createContext<AuthStore>({} as AuthStore);
export const AuthProvider = AuthContext.Provider;

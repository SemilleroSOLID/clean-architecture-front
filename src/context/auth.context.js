import { createContext } from "react";

// { session, endedReason, signIn(email, password), signOut(reason) }; provided by AuthProvider.
export const AuthContext = createContext(null);

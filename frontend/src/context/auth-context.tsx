"use client";

import { authTokenStore } from "@/lib/api/auth-token";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (data: { token: string }) => void;
  clearAuth: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState<string | null>(null);

  const setAuth = ({ token }: { token: string }) => {
    setToken(token);
    authTokenStore.setToken(token);
  };

  const clearAuth = () => {
    setToken(null);
    authTokenStore.clearToken();
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated: !!token, setAuth, clearAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return ctx;
};

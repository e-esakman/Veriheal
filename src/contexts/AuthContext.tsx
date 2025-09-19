import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import {
  useAbstraxionAccount,
  useModal,
} from "@burnt-labs/abstraxion";

interface AuthContextType {
  wallet: string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: account } = useAbstraxionAccount();
  const [, setShow] = useModal();

  const [wallet, setWallet] = useState<string | null>(null);

  // Update wallet whenever Abstraxion account changes
  useEffect(() => {
    if (account?.bech32Address) {
      setWallet(account.bech32Address);
    } else {
      setWallet(null);
    }
  }, [account]);

  const login = async () => {
    try {
      setShow(true); // opens XION wallet connection flow
    } catch (err) {
      console.error("Wallet connect failed:", err);
    }
  };

  const logout = async () => {
    try {
      setWallet(null);
      // Note: Abstraxion doesn't have a direct disconnect method
      // The user would need to disconnect from their wallet directly
    } catch (err) {
      console.error("Wallet disconnect failed:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ wallet, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
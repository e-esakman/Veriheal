// App.js
import React from "react";
import { Slot } from "expo-router";
import { AbstraxionProvider } from "@burnt-labs/abstraxion-react-native";
import { AuthProvider } from "./src/contexts/AuthContext";
import Toast from 'react-native-toast-message';

const config = {
  rpcUrl: process.env.EXPO_PUBLIC_RPC_ENDPOINT || "https://rpc.xion-testnet-1.burnt.com:443",
  restUrl: process.env.EXPO_PUBLIC_REST_ENDPOINT || "https://api.xion-testnet-1.burnt.com:443",
  gasPrice: process.env.EXPO_PUBLIC_GAS_PRICE || "0.001uxion",
  treasury: process.env.EXPO_PUBLIC_TREASURY_CONTRACT_ADDRESS || "xion13jetl8j9kcgsva86l08kpmy8nsnzysyxs06j4s69c6f7ywu7q36q4k5smc",
  callbackUrl: process.env.EXPO_PUBLIC_CALLBACK_URL || "veriheal://callback",
};

console.log('Abstraxion config:', config);

export default function App() {
  return (
    <AbstraxionProvider config={config}>
      <AuthProvider>
        <Slot />
        <Toast />
      </AuthProvider>
    </AbstraxionProvider>
  );
}
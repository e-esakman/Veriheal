import "react-native-reanimated";
import "react-native-get-random-values";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AbstraxionProvider } from "@burnt-labs/abstraxion";
import { AuthProvider } from "../src/contexts/AuthContext";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AbstraxionProvider
        config={{
          contracts: [
            {
              address: process.env.EXPO_PUBLIC_DOCUSTORE_CONTRACT_ADDRESS || "",
              amounts: [{ denom: "uxion", amount: "1000000" }],
            },
          ],
        }}
      >
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </AuthProvider>
      </AbstraxionProvider>
    </GestureHandlerRootView>
  );
}
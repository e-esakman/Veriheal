import { Tabs } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

function HeaderBackButton() {
  const handleBack = async () => {
    router.replace("/");
  };

  return (
    <TouchableOpacity
      onPress={handleBack}
      style={{ marginRight: 15, padding: 5 }}
    >
      <Ionicons name="arrow-back-outline" size={24} color="#007AFF" />
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "#8e8e93",
        headerStyle: {
          backgroundColor: "#ffffff",
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: "#f0f0f0",
        },
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: "bold",
        },
        headerRight: () => <HeaderBackButton />,
        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 30 : 20,
          left: 20,
          right: 20,
          borderRadius: 25,
          height: 60,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderTopWidth: 0,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 14 : 13,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Dashboard
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="home-outline"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="verify"
        options={{
          title: "Verify Documents",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 14 : 13,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Verify
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="shield-checkmark-outline"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={{
                color,
                fontSize: focused ? 14 : 13,
                fontWeight: focused ? "bold" : "normal",
              }}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name="person-outline"
              size={focused ? size + 2 : size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
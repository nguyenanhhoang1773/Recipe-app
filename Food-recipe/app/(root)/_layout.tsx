import { View, Text } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "@/constant/colors";
import { useClerk, useUser } from "@clerk/clerk-expo";
const RootLayout = () => {
  const { user } = useUser();
  if (!user) return <Redirect href={"/(auth)/sign-in"} />;
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-primary" : "text-text-primary"
              } font-Inter-SemiBold`}
            >
              Home
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? colors.primary : colors["text-primary"]}
              size={22}
              name={focused ? "home" : "home-outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorite"
        options={{
          title: "My Favorite",
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-primary" : "text-text-primary"
              } font-Inter-SemiBold`}
            >
              Favorite
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              color={focused ? colors.primary : colors["text-primary"]}
              size={22}
              name={focused ? "heart" : "hearto"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Scan"
        options={{
          title: "My Scan",
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-primary" : "text-text-primary"
              } font-Inter-SemiBold`}
            >
              Scan
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? colors.primary : colors["text-primary"]}
              size={22}
              name={focused ? "camera-reverse-outline" : "camera"} // Thay đổi thành "camera"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-primary" : "text-text-primary"
              } font-Inter-SemiBold`}
            >
              Explore
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <Ionicons
              color={focused ? colors.primary : colors["text-primary"]}
              size={22}
              name={focused ? "newspaper" : "newspaper-outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: ({ focused }) => (
            <Text
              className={`${
                focused ? "text-primary" : "text-text-primary"
              } font-Inter-SemiBold`}
            >
              Profile
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              color={focused ? colors.primary : colors["text-primary"]}
              size={22}
              name={focused ? "account" : "account-outline"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default RootLayout;

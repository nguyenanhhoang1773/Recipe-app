import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Redirect, Tabs } from "expo-router";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import colors from "@/constant/colors";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { usePathname } from "expo-router";
import axios from "axios";

const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;
const RootLayout = () => {
  const path = usePathname();
  const { user } = useUser();
  useEffect(() => {
    axios
      .post(`${hostId}:80/api/login`, {
        id_user: user?.id,
        name: user?.fullName,
        image_url: user?.imageUrl,
        email: user?.emailAddresses[0].emailAddress,
        bio: "",
        favorites: [],
        recentlyLogin: user?.createdAt,
      })
      .then(function (response) {
        console.log("Đăng nhập thành công tài khoản:", response.data.email);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [user]);
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

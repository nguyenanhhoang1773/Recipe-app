import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView, Edge } from "react-native-safe-area-context";
import images from "@/constant/images";

const SignIn = () => {
  const widthWindow = Dimensions.get("window").width;
  return (
    <View className="flex-1 justify-center items-center">
      <Image
        className="w-full h-full absolute top-0 right-0 bottom-0 left-0"
        source={images.wallpaper}
      />
      <View
        style={{ width: widthWindow * 0.9 }}
        className="bg-white p-5 rounded-2xl"
      >
        <Text className="font-Inter-SemiBold text-2xl">
          Sign in to your account!
        </Text>
        <TouchableOpacity className="flex-row items-center justify-center bg-[rgba(0,0,0,0.05)] rounded-xl py-4  mt-6">
          <Image
            className="w-6 h-6"
            source={images.google}
          />
          <Text className="ml-2 font-Inter-SemiBold text-xl">
            Sign in with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="mt-2 flex-row justify-center bg-[rgba(0,0,0,0.05)] rounded-xl py-4  items-center">
          <Image
            className="w-6 h-6"
            source={images.google}
          />
          <Text className="ml-2 font-Inter-SemiBold text-xl">
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

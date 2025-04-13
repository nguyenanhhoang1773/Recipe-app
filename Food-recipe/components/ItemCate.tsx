import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import images from "@/constant/images";
import { router, useLocalSearchParams } from "expo-router";

const ItemCate = ({
  isFirst = false,
  source,
  title,
  type,
  inHome = false,
}: {
  isFirst?: boolean;
  source: any;
  title: string;
  type: string;
  inHome?: boolean;
}) => {
  const params = useLocalSearchParams();
  let isActive = params.type === type;
  const handlePress = () => {
    if (inHome) {
      router.push({
        pathname: "/category/[type]",
        params: { type: type },
      });
    } else {
      router.setParams({ type: type });
    }
  };
  return (
    <View
      className={`${!isFirst && "ml-2"} justify-center items-center flex-1`}
    >
      <TouchableOpacity
        onPress={handlePress}
        className={`p-2 w-full aspect-square rounded-full ${
          isActive ? "bg-[rgba(11,154,97,0.3)]" : "bg-[rgba(0,0,0,0.04)]"
        } items-center justify-center`}
      >
        <Image
          source={source}
          className="w-full h-full"
        />
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        className={`font-Inter-Medium ${isActive && "text-primary"} text-base`}
      >
        {title}
      </Text>
    </View>
  );
};

export default ItemCate;

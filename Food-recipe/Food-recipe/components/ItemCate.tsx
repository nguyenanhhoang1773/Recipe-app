import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import images from "@/constant/images";

const ItemCate = ({
  isFirst = false,
  source,
  title,
}: {
  isFirst?: boolean;
  source: any;
  title: string;
}) => {
  return (
    <View
      className={`${!isFirst && "ml-2"} justify-center items-center flex-1`}
    >
      <TouchableOpacity className="p-2 w-full aspect-square rounded-full bg-[rgba(0,0,0,0.04)] items-center justify-center">
        <Image
          source={source}
          className="w-full h-full"
        />
      </TouchableOpacity>
      <Text
        numberOfLines={1}
        className="font-Inter-Medium text-base"
      >
        {title}
      </Text>
    </View>
  );
};

export default ItemCate;

import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Feedback from "../app/feedback/feedback";
import images from "@/constant/images";
import { windowHeight } from "@/constant/constant";

export default function ItemDetail() {
  const router = useRouter();

  // Nhận params từ URL
  const { id_recipe, name, image, description, ingredients, instructions } =
    useLocalSearchParams();

  return (
    <View className="h-full bg-white">
      <Ionicons
        className="absolute left-2 top-10 z-10"
        name="arrow-back-circle-outline"
        color="#0B9A61"
        size={35}
        onPress={() => router.back()}
      />

      <ScrollView>
        <Image
          style={{ height: (windowHeight * 1) / 3 }}
          source={images[image as string]}
          className="w-full  rounded-md mb-2"
        />

        <View className="p-2">
          <Text className="font-bold text-[20px]">{name}</Text>
          <Text className="text-[14px] font-medium ml-2">{description}</Text>

          <Text className="mt-2 font-bold text-[16px]">Nguyên liệu:</Text>
          <Text className="ml-2 italic text-gray-700">{ingredients}</Text>

          <Text className="mt-2 font-bold text-[16px]">Công thức:</Text>
          <Text className="ml-2 italic text-gray-700">{instructions}</Text>

          <Text className="italic mt-4">
            Để lại nhận xét, chia sẻ của bạn tại đây nhé !!!
          </Text>
        </View>

        <Feedback id_recipe={id_recipe as string} />
      </ScrollView>
    </View>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter, useLocalSearchParams } from "expo-router";
import Feedback from "../app/feedback/feedback";
import images from "@/constant/images";
import { windowHeight } from "@/constant/constant";
import axios from "axios";
import { useClerk, useUser } from "@clerk/clerk-expo";

const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

export default function ItemDetail() {
  const router = useRouter();
  const { user } = useUser();

  // Nhận params từ URL
  const { id_recipe, name, image, description, ingredients, instructions } =
    useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleLiked = () => {
    const post = {
      id_recipe: id_recipe,
      id_user: user?.id,
      name: name,
      image: image,
      description: description,
      ingredients: ingredients,
      formula: instructions,
    };
    try {
      axios.post(`${hostId}:80/api/addLiked`, post).then((res) => {
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
          Alert.alert(
            "Thông báo!",
            `${res.data.message}`,
            [
              {
                text: "OK",
                onPress: () => console.log("Thêm thành công"),
                style: "cancel",
              },
            ],
            { cancelable: false }
          );
        }, 3000);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className="h-full bg-white">
      <Ionicons
        className="absolute left-2 top-5 z-10"
        name="arrow-back-circle-outline"
        color="#0B9A61"
        size={35}
        onPress={() => router.back()}
      />
      <Ionicons
        name="bookmark-outline"
        size={30}
        className=" absolute right-2 top-5 z-10"
        onPress={() => handleLiked()}
        color="#0B9A61"
      />

      <ScrollView>
        <View>
          <Image
            style={{ height: (windowHeight * 1) / 4 }}
            // source={images[image as string]}
            source={{
              uri: image as string,
            }}
            className="w-full rounded-md mb-2"
          />
        </View>
        {isLoading && (
          <Modal
            visible={true}
            transparent
            animationType="fade"
          >
            <View className="flex-1 justify-center items-center bg-black/60">
              <View className="bg-zinc-800 px-6 py-4 rounded-xl items-center">
                <ActivityIndicator
                  size="large"
                  color="#fff"
                />
                <Text className="text-white mt-2 text-base">Đang tải...</Text>
              </View>
            </View>
          </Modal>
        )}
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

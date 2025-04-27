import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import React, { useState, useCallback } from "react";
import images from "../../constant/images";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";
import { useRouter } from "expo-router";

const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

interface Dish {
  id_recipe: string;
  name: string;
  image: any;
  description: string;
  ingredients: string;
  formula: string;
}

type RootStackParamList = {
  Favorite: undefined;
  ItemDetail: { item: Dish };
};

type FavoriteNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Favorite"
>;

export default function Favorite() {
  const { user } = useUser();
  const router = useRouter();

  const [liked, setLiked] = useState<Dish[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Gọi lại API mỗi khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      getLikeds();
    }, [user?.id])
  );

  const getLikeds = () => {
    if (!user) return;
    axios
      .get(`${hostId}:80/api/liked/${user.id}`)
      .then((res) => setLiked(res.data))
      .catch((err) => console.log("Lỗi khi load liked", err));
  };

  const handleUnlike = (item: any) => {
    const info = {
      id_user: item.id_user,
      id_recipe: item.id_recipe,
    };

    Alert.alert(
      "Thông báo!",
      "Bạn có chắc chắn muốn xóa mục này không?",
      [
        {
          text: "Hủy",
          onPress: () => console.log("Hủy bỏ"),
          style: "cancel",
        },
        {
          text: "Xóa",
          onPress: () =>
            axios.post(`${hostId}:80/api/unLiked`, info).then((res) => {
              getLikeds();
              fakeLoadData();
              console.log(res.data);
            }),
        },
      ],
      { cancelable: false }
    );
  };

  const fakeLoadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Thông báo!", "Đã bỏ yêu thích công thức này !!!");
    }, 2000);
  };

  const handleNavigation = (dish: Dish) => {
    router.push({
      pathname: "/favorite/itemdetail",
      params: {
        id_recipe: dish.id_recipe,
        name: dish.name,
        image: dish.image,
        description: dish.description,
        ingredients: dish.ingredients,
        instructions: dish.formula,
      },
    });
  };

  return (
    <View className="bg-white h-full">
      <View className="p-3 bg-[#0B9A61]">
        <Text className="text-2xl font-bold text-white">Món Ăn Yêu Thích</Text>
      </View>

      <ScrollView className="bg-white">
        {isLoading && (
          <Modal visible transparent animationType="fade">
            <View className="flex-1 justify-center items-center bg-black/60">
              <View className="bg-zinc-800 px-6 py-4 rounded-xl items-center">
                <ActivityIndicator size="large" color="#fff" />
                <Text className="text-white mt-2 text-base">Đang tải...</Text>
              </View>
            </View>
          </Modal>
        )}

        <View className="p-4">
          {liked.length === 0 ? (
            <Text className="text-center text-gray-600">Chưa có món nào được yêu thích.</Text>
          ) : (
            liked.map((data, index) => (
              <TouchableOpacity
                key={index}
                className="rounded-lg p-2 mb-4"
                style={{ backgroundColor: "rgba(0, 188, 0, 0.1)" }}
                onPress={() => handleNavigation(data)}
              >
                <View className="flex-row justify-between gap-2 relative">
                  <Ionicons
                    name={"heart"}
                    color="#ff0000"
                    size={20}
                    className="absolute right-0 top-0 z-10"
                    onPress={() => handleUnlike(data)}
                  />

                  <View className="w-[40%]">
                    <Image
                      source={{ uri: data.image }}
                      className="w-full h-40 rounded-md mb-2"
                    />
                  </View>

                  <View className="w-[55%]">
                    <Text className="text-lg font-semibold mb-1">
                      {data.name}
                    </Text>
                    <Text
                      className="text-gray-600"
                      numberOfLines={6}
                      ellipsizeMode="tail"
                    >
                      {data.description}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

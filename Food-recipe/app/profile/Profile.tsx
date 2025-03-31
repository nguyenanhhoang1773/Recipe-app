import { View, Text, Image, TouchableOpacity, FlatList, Alert } from "react-native";
import images from "@/constant/images";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import data from "@/constant/data";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native"; 
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type TabParamList = {
  Profile: undefined;
  Favorite: undefined;
  Explore: undefined;
  Login: undefined;
};

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();

  useLayoutEffect(() => {
    navigation.setOptions({ animation: "slide_from_right" });
  }, [navigation]);

  const handleLogOut = () => {
    Alert.alert("Thông báo!", "Bạn có chắc chắn muốn đăng xuất không?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", onPress: () => navigation.replace("Login") }
    ]);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Ảnh nền */}
      <View className="relative h-52">
        <Image source={images.thumbnail} className="w-full h-full" resizeMode="cover" />
        <View className="absolute bottom-0 w-full h-5 bg-gray-100" style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }} />
        <View className="absolute w-full px-2">
          <View className="flex-row justify-between items-center px-6 pt-6">
            <Text className="text-2xl font-semibold">My profile</Text>
            <MaterialIcons name="settings" size={24} color="black" />
          </View>
        </View>
      </View>

      {/* Avatar */}
      <View className="absolute w-full items-center" style={{ top: 100 }}>
        <Image source={images.pancake} className="w-48 h-48 rounded-full border-4 border-white" />
      </View>

      {/* Thông tin người dùng */}
      <View className="items-center mt-24">
        <Text className="text-3xl font-bold">Trang</Text>
        <Text className="text-gray-500 text-lg">Nấu ăn từ 10/2024</Text>
      </View>

      {/* Badge */}
      <View className="flex-row justify-center mt-3 space-x-3">
        <View className="items-center min-w-[150px]">
          <Text className="text-xl font-semibold">45</Text>
          <Text className="text-gray-500 text-lg text-center">Đã follow</Text>
        </View>
        <View className="items-center min-w-[150px]">
          <Text className="text-xl font-semibold">1.32k</Text>
          <Text className="text-gray-500 text-lg text-center">Followers</Text>
        </View>
      </View>

      {/* Danh sách công thức nấu ăn */}
      <View className="mt-5 px-4">
        <View className="flex-row justify-between">
          <Text className="text-xl font-semibold">Công thức cá nhân</Text>
          <TouchableOpacity className="flex-row" onPress={() => navigation.navigate("Explore")}>
            <Text className="text-green-500">Tất cả</Text>
            <Feather name="chevron-right" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.recipe.slice(0, 3)}
          renderItem={({ item }) => (
            <TouchableOpacity className="mr-4 mt-3">
              <Image className="w-64 h-40 rounded-lg" source={item.source} />
              <Text className="text-xl font-medium mt-2 mb-3">{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Các chức năng */}
      <View className="flex-1 bg-white px-5 pt-5">
        <TouchableOpacity activeOpacity={0.7} className="flex-row items-center py-4 border-b border-gray-200" onPress={() => navigation.navigate("Favorite")}>
          <Ionicons name="heart-outline" size={24} color="#6c63ff" />
          <Text className="flex-1 text-lg text-gray-800 ml-4">Yêu thích</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} className="flex-row items-center py-4 border-b border-gray-200" onPress={handleLogOut}>
          <Ionicons name="log-out-outline" size={24} color="#6c63ff" />
          <Text className="flex-1 text-lg text-gray-800 ml-4">Đăng xuất</Text>
          <Ionicons name="chevron-forward-outline" size={20} color="#bbb" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;
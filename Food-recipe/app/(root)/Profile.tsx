import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import images from "@/constant/images";
import { Ionicons, Feather, MaterialIcons} from "@expo/vector-icons";
import data from "@/constant/data";
import React from "react";


const Profile = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Ảnh nền */}
      <View className="relative h-52">
        <Image
          source={images.thumbnail}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 w-full h-5 bg-gray-100" 
    style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }} 
  />
        {/* Icon cài đặt & quay lại */}
        <View className="absolute w-full px-2">
          <View className="flex-row justify-between items-center px-6 pt-6">
            <Text className="text-2xl font-semibold">My profile</Text>
            <MaterialIcons name="settings" size={24} color="black" />
          </View>
        </View>
      </View>

      {/* Thông tin người dùng */}
      <View className="items-center mt-[-70px]">
        <Image
          source={images.pancake}
          className="w-40 h-40 rounded-full border-4 border-white"
        />
        <Text className="text-3xl font-bold mt-2">Trang</Text>
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
          <TouchableOpacity className="flex-row">
            <Text className="text-green-500">Tất cả</Text>
            <Feather name="chevron-right" size={20} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Danh sách món ăn */}
         <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.recipe}
          renderItem={({ item }) => (
            <TouchableOpacity className="mr-4 mt-3">
              <Image
                className="w-64 h-40 rounded-lg"
                source={item.source}
            />
              <Text className="text-xl font-medium mt-1">{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;

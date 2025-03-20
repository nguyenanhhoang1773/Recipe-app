import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import images from "@/constant/images";
import {
  Ionicons,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

function index({data}:any) {
    const dishes = [
        {
          id: 1,
          name: 'Phở Bò',
          image: images.pho,
          description: 'Món phở bò truyền thống của Việt Nam với nước dùng thơm ngon và bánh phở mềm.',
        },
        {
          id: 2,
          name: 'Sushi',
          image: images.clock,
          description: 'Món sushi Nhật Bản với các loại cá tươi ngon và cơm dấm.',
        },
        {
          id: 3,
          name: 'Pizza Margherita',
          image: images.chicken,
          description: 'Pizza Margherita với sốt cà chua, mozzarella và lá basil tươi.',
        },
        {
          id: 4,
          name: 'Gà rán KFC',
          image: images.cookie,
          description: 'Gà rán giòn rụm thơm ngon, thương hiệu KFC.',
        },
        {
          id: 5,
          name: 'Bánh mì',
          image: images.pancake,
          description: 'Bánh mì Việt Nam với nhiều loại nhân khác nhau như thịt nướng, chả lụa, pate...',
        },
      ];
    return (
        <ScrollView className="flex-1 bg-gray-100">
            <View className="p-4">
                <Text className="text-2xl font-bold mb-4">Món Ăn Yêu Thích</Text>
                {dishes.map((dish) => (
                    <TouchableOpacity key={dish.id} className="bg-gray-300 rounded-lg p-4 mb-4 " >
                        <View className="relative">
                            <Image source={dish.image} className="w-full h-40 rounded-md mb-2  " />
                            <Ionicons className="absolute right-2 top-2" name={"heart"} color="#ff0000" size={20} />
                        </View>
                        <Text className="text-lg font-semibold mb-1">{dish.name}</Text>
                        <Text className="text-gray-600">{dish.description}</Text>

                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    )
}

export default index
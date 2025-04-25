import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";

type PostDataProps = {
  displayName: string;
  avatar: string;
  name: string;
  description: string;
  instructions: string;
  list_images: string[];
  type?: string;
  createdAt: string;
  onDelete?: () => void;
  onEdit?: () => void; 
};

const PostCard = ({
  displayName,
  avatar,
  name,
  description,
  instructions,
  list_images,
  createdAt,
  type,
  onDelete = () => {},
  onEdit = () => {},
}: PostDataProps) => {
  const [showOptions, setShowOptions] = useState(false);
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const shouldShowToggle = instructions.length > 100;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <View className="p-4 bg-white rounded-lg mt-2 relative shadow">
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <Image source={{ uri: avatar }} className="w-12 h-12 rounded-full" />
          <View className="ml-3">
            <Text className="text-base font-bold">{displayName}</Text>
            <Text className="text-xs text-gray-500">{formatDate(createdAt)}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {showOptions && (
        <View className="absolute top-16 right-4 bg-gray-200 rounded-lg p-3 z-10 shadow-md">
          <TouchableOpacity
            onPress={() => {
              setShowOptions(false);
              onEdit(); 
            }}
          >
            <Text className="py-1 text-base">Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setShowOptions(false);
              onDelete(); 
            }}
          >
            <Text className="py-1 text-base text-red-500">Xóa</Text>
          </TouchableOpacity>
        </View>
      )}

      {list_images?.length > 0 && (
        <Image
          source={{ uri: list_images[0] }}
          className="w-full h-72 rounded-lg"
          resizeMode="cover"
        />
      )}

      <Text className="text-lg font-bold mt-3">{name}</Text>
      <Text className="text-sm text-gray-700 mt-1">{description}</Text>
      <Text className="text-sm text-gray-600 mt-1 italic">
        <Text className="font-bold">Phương pháp chế biến: {type || "không rõ"}</Text>
      </Text>

      <Text
        className="text-sm text-gray-700 mt-1"
        numberOfLines={showFullInstructions ? undefined : 1}
      >
        <Text className="font-bold text-base">Công thức:</Text>
        {"\n"}{instructions}
      </Text>

      {shouldShowToggle && (
        <TouchableOpacity
          onPress={() => setShowFullInstructions(!showFullInstructions)}
        >
          <Text className="text-green-500 text-sm mt-1 font-medium">
            {showFullInstructions ? "Thu gọn" : "Xem thêm"}
          </Text>
        </TouchableOpacity>
      )}

      <View className="flex-row items-center mt-3 space-x-5">
        <View className="flex-row items-center space-x-2">
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text className="text-base">10</Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

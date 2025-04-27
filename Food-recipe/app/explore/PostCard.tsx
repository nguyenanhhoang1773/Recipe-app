import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type PostDataProps = {
  id_recipe: string;
  displayName: string;
  avatar: string;
  name: string;
  description: string;
  instructions: string;
  list_images: string[];
  type?: string;
  createdAt: string;
  feedbackCount: number;
  onDelete?: () => void;
  onEdit?: () => void;
};

const PostCard = ({
  id_recipe,
  displayName,
  avatar,
  name,
  description,
  instructions,
  list_images,
  createdAt,
  type,
  feedbackCount,
  onDelete = () => {},
  onEdit = () => {},
}: PostDataProps) => {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const shouldShowToggle = instructions.length > 30;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <View className="w-full items-center">
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          router.push({
            pathname: "/explore/itemdetail",
            params: {
              id_recipe,
              name,
              image: list_images[0],
              description,
              ingredients: "Chưa cập nhật",
              instructions,
            },
          })
        }
        style={{
          width: SCREEN_WIDTH * 0.92,
          marginBottom: 16,
          flexGrow: 0,
          flexShrink: 1,
        }}
      >
        <View className="p-4 bg-white rounded-lg relative shadow">
          {/* Header */}
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

          {/* Menu Chỉnh sửa / Xóa */}
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

          {/* Ảnh bài viết */}
          {list_images?.length > 0 && (
            list_images.length > 1 ? (
              <Swiper
                style={{ width: "100%", aspectRatio: 4 / 3 }}
                showsPagination
                autoplay
              >
                {list_images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    className="w-full h-full rounded-lg"
                    resizeMode="cover"
                  />
                ))}
              </Swiper>
            ) : (
              <Image
                source={{ uri: list_images[0] }}
                className="w-full rounded-lg"
                style={{ aspectRatio: 4 / 3 }}
                resizeMode="cover"
              />
            )
          )}

          {/* Thông tin bài viết */}
          <View className="mt-3">
            <Text className="text-lg font-bold">{name}</Text>

            <Text className="text-sm text-gray-700 mt-1" numberOfLines={2} ellipsizeMode="tail">
              {description}
            </Text>

            <Text className="text-sm text-gray-600 mt-1 italic">
              <Text className="font-bold">Phương pháp chế biến: </Text>
              {type || "không rõ"}
            </Text>

            {/* Công thức */}
            <Text
              className="text-sm text-gray-700 mt-1"
              numberOfLines={showFullInstructions ? undefined : 1}
            >
              <Text className="font-bold text-base">Công thức:</Text>
              {"\n"}{instructions}
            </Text>

            {/* Nút Xem thêm / Thu gọn */}
            {shouldShowToggle && (
              <TouchableOpacity onPress={() => setShowFullInstructions(!showFullInstructions)}>
                <Text className="text-green-500 text-sm mt-1 font-medium">
                  {showFullInstructions ? "Thu gọn" : "Xem thêm"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Icon comment */}
          <View className="flex-row items-center mt-3 space-x-5">
            <View className="flex-row items-center space-x-2">
              <Ionicons name="chatbubble-outline" size={24} color="black" />
              <Text style={{ fontSize: 17 }}> {feedbackCount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PostCard;

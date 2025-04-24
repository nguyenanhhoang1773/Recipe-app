import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";
import { useUser } from "@clerk/clerk-expo";
import PostCard from "./PostCard";

type RootStackParamList = {
  Explore: undefined;
  POST: { post?: Post; onPostSuccess?: () => void };
};

type Post = {
  _id: string;
  userName: string;
  userAvatar: string;
  name: string;
  description: string;
  instructions: string;
  list_images: string[];
  type: string;
  createdAt: string;
};

type ExploreScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Explore"
>;

const Explore = () => {
  const navigation = useNavigation<ExploreScreenNavigationProp>();
  const { user } = useUser();
  const isFocused = useIsFocused();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

  const fetchPosts = async () => {
    if (!user?.id) {
      console.log("Chưa đăng nhập - không có user.id");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${hostId}:80/api/getPost`, {
        id_user: user.id,
      });
      setPosts(res.data);
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa bài viết này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${hostId}:80/api/deletePost`, {
              data: { id: postId },
            });
            setPosts((prev) => prev.filter((post) => post._id !== postId));
          } catch (error) {
            console.error("Lỗi khi xóa bài viết:", error);
          }
        },
      },
    ]);
  };

  useEffect(() => {
    if (isFocused) fetchPosts();
  }, [user, isFocused]);

  const renderPostItem = ({ item }: { item: Post }) => (
    <PostCard
      displayName={item.userName}
      avatar={item.userAvatar}
      name={item.name}
      description={item.description}
      instructions={item.instructions}
      list_images={item.list_images}
      type={item.type}
      createdAt={item.createdAt}
      onDelete={() => handleDeletePost(item._id)}
      onEdit={() =>
        navigation.navigate("POST", {
          post: item,
          onPostSuccess: fetchPosts,
        })
      }
    />
  );

  return (
    <View className="flex-1 bg-gray-100">
      <View className="p-3 flex-row justify-between items-center bg-[#0B9A61]">
        <Text className="text-white text-2xl font-bold">Công thức của tôi</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("POST", {
              onPostSuccess: fetchPosts,
            })
          }
          className="ml-4"
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View className="px-4 mt-4">
        {loading ? (
          <ActivityIndicator size="large" className="mt-8" />
        ) : posts.length === 0 ? (
          <Text className="text-center mt-10 text-base text-gray-500">Bạn chưa có bài viết nào.</Text>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item._id}
            renderItem={renderPostItem}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default Explore;
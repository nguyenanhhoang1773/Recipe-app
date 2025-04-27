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
  id_recipe: string;
  title: string;
  description: string;
  ingredients: string;
  formula: string;
  image: string;
  type: string;
  author: string;
  userAvatar?: string;
  createdAt?: string;

  instructions?: string;
  list_images?: string[];
  feedbackCount?: number;
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
  const [userAvatar, setUserAvatar] = useState<string>("");

  

  const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

  const fetchUserAvatar = async () => {
    try {
      const res = await axios.post(`${hostId}:80/api/getUser`, { id_user: user?.id });
      setUserAvatar(res.data?.image_url || "");
    } catch (error) {
      console.error("Lỗi khi lấy avatar người dùng:", error);
    }
  };

  const fetchPosts = async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await axios.post(`${hostId}:80/api/getMyRecipes`, {
        id_user: user.id,
      });
      setPosts(
        res.data.map((post: Post) => ({
          ...post,
          userAvatar: userAvatar || post.image,
          id_recipe: post.id_recipe,
          feedbackCount: post.feedbackCount || 0,
        }))
      );
    } catch (error) {
      console.error("Lỗi khi tải công thức cá nhân:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused && user?.id) {
      fetchUserAvatar().then(fetchPosts);
    }
  }, [user, isFocused]);

  const handleDeletePost = async (postId: string) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa công thức này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await axios.delete(`${hostId}:80/api/deleteRecipe`, {
              data: { id: postId },
            });
            setPosts((prev) => prev.filter((post) => post._id !== postId));
          } catch (error) {
            console.error("Lỗi khi xóa công thức:", error);
          }
        },
      },
    ]);
  };

  const renderPostItem = ({ item }: { item: Post }) => (
    <PostCard
      id_recipe={item.id_recipe}
      displayName={item.author}
      avatar={item.userAvatar || item.image}
      name={item.title}
      description={item.description}
      instructions={item.formula}
      list_images={[item.image]}
      type={item.type}
      createdAt={item.createdAt || new Date().toISOString()}
      feedbackCount={item.feedbackCount || 0}
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

      <View className="flex-1 px-4 mt-4">
        {loading ? (
          <ActivityIndicator size="large" className="mt-8" />
        ) : posts.length === 0 ? (
          <Text className="text-center mt-10 text-base text-gray-500">Bạn chưa có công thức nào.</Text>
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

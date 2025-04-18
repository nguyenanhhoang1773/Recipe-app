import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
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
  POST: { onPostSuccess?: () => void };
};

type Post = {
  _id: string;
  userName: string;
  userAvatar: string;
  name: string;
  image: string;
  description: string;
  instructions: string;
  id_category?: {
    _id?: string;
    type?: string;
  };
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
      image={item.image}
      description={item.description}
      instructions={item.instructions}
      id_category={item.id_category}
      createdAt={item.createdAt}
      onDelete={() => handleDeletePost(item._id)}
    />
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Công thức của tôi</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("POST", {
              onPostSuccess: fetchPosts,
            })
          }
        >
          <Ionicons name="add-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Danh sách bài viết */}
      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : posts.length === 0 ? (
        <Text style={styles.noPostText}>Bạn chưa có bài viết nào.</Text>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item._id}
          renderItem={renderPostItem}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f2f2f2",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  loading: {
    marginTop: 30,
  },
  noPostText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Explore: undefined;
  POST: undefined;
};

type PostDataProps = {
  displayName: string;
  avatar: string;
  name: string;
  image: string;
  description: string;
  instructions: string;
  createdAt: string;
  onDelete?: () => void;
};

const PostCard = ({
  displayName,
  avatar,
  name,
  image,
  description,
  instructions,
  createdAt,
  onDelete = () => {},
}: PostDataProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showOptions, setShowOptions] = useState(false);
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const shouldShowToggle = instructions.length > 100;

  const handleDelete = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa bài này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", style: "destructive", onPress: onDelete },
    ]);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  return (
    <View style={styles.container}>
      {/* Avatar + Tên người đăng + Ngày */}
      <View style={styles.userInfoWrapper}>
        <View style={styles.userInfo}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <View style={styles.nameDate}>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.date}>{formatDate(createdAt)}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menu tùy chọn */}
      {showOptions && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => navigation.navigate("POST")}>
            <Text style={styles.menuItem}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <Text style={[styles.menuItem, { color: "red" }]}>Xóa</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Ảnh món ăn */}
      <Image source={{ uri: image }} style={styles.img} />

      {/* Thông tin món ăn */}
      <Text style={styles.foodTitle}>{name}</Text>
      <Text style={styles.description}> {description}</Text>
      <Text
        style={styles.instructions}
        numberOfLines={showFullInstructions ? undefined : 1}
      > 
        <Text style={{ fontWeight: 'bold', fontSize:15 }}>Công thức: </Text>
         {'\n'}
         {instructions}
      </Text>

      {shouldShowToggle && (
        <TouchableOpacity onPress={() => setShowFullInstructions(!showFullInstructions)}>
          <Text style={styles.toggleText}>
            {showFullInstructions ? "Thu gọn" : "Xem thêm"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Like + Comment */}
      <View style={styles.actions}>
        <View style={styles.sub}>
          <Ionicons name="heart-outline" size={24} color="black" />
          <Text style={styles.actionText}>10</Text>
        </View>
        <View style={styles.sub}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text style={styles.actionText}>10</Text>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: "white",
    borderRadius: 8,
    marginTop: 10,
    elevation: 2,
    position: "relative",
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  nameDate: {
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "gray",
  },
  img: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: "cover",
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  instructions: {
    fontSize: 14,
    color: "#444",
    marginTop: 4,
  },
  toggleText: {
    color: "#3498db",
    fontSize: 14,
    marginTop: 4,
    fontWeight: "500",
  },
  sub: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  actions: {
    marginTop: 10,
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  actionText: {
    fontSize: 17,
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 15,
    backgroundColor: "#eee",
    borderRadius: 8,
    padding: 10,
    zIndex: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 6,
    fontSize: 16,
  },
});

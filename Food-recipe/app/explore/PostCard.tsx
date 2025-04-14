import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import images from "@/constant/images";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Explore: undefined;
  POST: undefined;
};

type USER_AVATAR = {
  name?: string;
  image?: any;
  date?: string;
  onDelete?: () => void;
};

const PostCard = ({
  name = "Suong",
  image = images.pho,
  date = "30/4",
  onDelete = () => {},
}: USER_AVATAR) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showOptions, setShowOptions] = useState(false);

  const handleDelete = () => {
    Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa bài này?", [
      { text: "Hủy", style: "cancel" },
      { text: "Xóa", style: "destructive", onPress: onDelete },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Avatar */}
      <View style={styles.userInfoWrapper}>
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          <Image source={image} style={styles.avatar} />
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.name}>{name}</Text>
            <Text>{date}</Text>
          </View>
        </View>

        {/* Icon */}
        <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
          <Ionicons name="ellipsis-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menu Tùy chọn */}
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

      {/* Nội dung bài viết */}
      <Text style={styles.text}> mamsnfkjsfjf</Text>
      <Image source={image} style={styles.img} />

      {/* Like + Comment */}
      <View style={styles.actions}>
        <View style={styles.sub}>
          <Ionicons name="heart-outline" size={24} color="black" />
          <Text style={{ fontSize: 17 }}> 10 </Text>
        </View>
        <View style={styles.sub}>
          <Ionicons name="chatbubble-outline" size={24} color="black" />
          <Text style={{ fontSize: 17 }}> 10 </Text>
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
    position: "relative",
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 18,
    marginTop: 10,
  },
  img: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    objectFit: "cover",
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
  },
  menuItem: {
    paddingVertical: 6,
    fontSize: 16,
  },
});

import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import PostCard from "./PostCard";
import images from "@/constant/images"; 

type RootStackParamList = {
  Explore: undefined;
  POST: undefined;
};

type ExploreScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Explore">;

const Explore = () => {
  const navigation = useNavigation<ExploreScreenNavigationProp>();

  const posts = [
    {
      id: "1",
      name: "Suong",
      image: images.pho,
      date: "30/4",
    },
    {
      id: "2",
      name: "Linh",
      image: images.banhmi,
      date: "29/4",
    },
    {
      id: "3",
      name: "Huy",
      image: images.chicken,
      date: "28/4",
    },
  ];

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Toolbar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Công thức của tôi</Text>
        <TouchableOpacity onPress={() => navigation.navigate("POST")}>
          <Ionicons name="add-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>

      {/* Danh sách bài viết */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostCard name={item.name} image={item.image} date={item.date} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Explore;

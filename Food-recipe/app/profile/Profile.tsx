import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import images from "@/constant/images";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import data from "@/constant/data";
import { Modal, TextInput } from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useUser, useClerk } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

type TabParamList = {
  Profile: undefined;
  Favorite: undefined;
  Explore: undefined;
  Login: undefined;
};

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigation = useNavigation<NativeStackNavigationProp<TabParamList>>();
  const [bio, setBio] = useState(""); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [editingBio, setEditingBio] = useState(""); 

  useLayoutEffect(() => {
    navigation.setOptions({ animation: "slide_from_right" });
  }, [navigation]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);
  
  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${hostId}:80/api/user/${user?.id}`);
      const { bio, image_url } = res.data;
      if (bio) setBio(bio);
      if (image_url) setAvatar(image_url);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error.message);
      } else {
        console.error("Lỗi không xác định:", error);
      }
    }    
  };

  const handleSettingsPress = () => {
    Alert.alert(
      "Cài đặt hồ sơ",
      "Bạn muốn thực hiện thao tác gì?",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Thay đổi ảnh đại diện",
          onPress: async () => {
            Alert.alert("Chọn ảnh", "Bạn muốn thực hiện thao tác nào?", [
              {
                text: "Chụp ảnh",
                onPress: async () => {
                  const permission = await ImagePicker.requestCameraPermissionsAsync();
                  if (!permission.granted) return;
        
                  const result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                  });
        
                  if (!result.canceled) {
                    const uri = result.assets[0].uri;
                    console.log("Ảnh chụp:", uri);
                  }
                },
              },
              {
                text: "Chọn từ thư viện",
                onPress: async () => {
                  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                  if (!permission.granted) return;
        
                  const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                  });
        
                  if (!result.canceled) {
                    const uri = result.assets[0].uri;
                    console.log("Ảnh đã chọn:", uri);
                  }
                },
              },
              {
                text: "Hủy",
                style: "cancel",
              },
            ]);
          },
        },        
        {
          text: "Thêm giới thiệu hồ sơ",
          onPress: handleAddBio,
        },
        
      ],
      { cancelable: true }
    );
  };
  const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;
  const handleAddBio = () => {
    setEditingBio(bio); 
    setModalVisible(true);

  };  
  
  const handleLogOut = () => {
    Alert.alert("Thông báo!", "Bạn có chắc chắn muốn đăng xuất không?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", onPress: () => signOut() },
    ]);
  };

  const [avatar, setAvatar] = useState<string | null>(null);

  return (
    <View className="flex-1 bg-gray-100">
      {/* Ảnh nền */}
      <View className="relative h-52">
        <Image
          source={images.thumbnail}
          className="w-full h-full"
          resizeMode="cover"
        />
        <View
          className="absolute bottom-0 w-full h-5 bg-gray-100"
          style={{ borderTopLeftRadius: 32, borderTopRightRadius: 32 }}
        />
        <View className="absolute w-full px-2">
          <View className="flex-row justify-between items-center px-6 pt-6">
            <Text className="text-2xl font-semibold">My profile</Text>
            <MaterialIcons
              onPress={handleSettingsPress}
              name="settings"
              size={24}
              color="black"
            />
          </View>
        </View>
      </View>

      {/* Avatar */}
      <View
        className="absolute w-full items-center"
        style={{ top: 100 }}
      >
        <Image
          source={{ uri: avatar || user?.imageUrl }}
          className="w-48 h-48 rounded-full border-4 border-white"
        />
      </View>

      {/* Thông tin người dùng */}
      <View className="items-center mt-28">
        <Text className="text-2xl font-bold">{user?.fullName}</Text>
        <Text className="text-gray-500 text-lg">{bio}</Text>
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
          <TouchableOpacity
            className="flex-row"
            onPress={() => navigation.navigate("Explore")}
          >
            <Text className="text-green-500">Tất cả</Text>
            <Feather
              name="chevron-right"
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data.recipe.slice(0, 3)}
          renderItem={({ item }) => (
            <TouchableOpacity className="mr-4 mt-3">
              <Image
                className="w-64 h-40 rounded-lg"
                source={item.source}
              />
              <Text className="text-xl font-medium mt-2 mb-3">
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Các chức năng */}
      <View className="flex-1 bg-white px-5 pt-5">
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center py-4 border-b border-gray-200"
          onPress={() => navigation.navigate("Favorite")}
        >
          <Ionicons
            name="heart-outline"
            size={24}
            color="#6c63ff"
          />
          <Text className="flex-1 text-lg text-gray-800 ml-4">Yêu thích</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#bbb"
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          className="flex-row items-center py-4 border-b border-gray-200"
          onPress={handleLogOut}
        >
          <Ionicons
            name="log-out-outline"
            size={24}
            color="#6c63ff"
          />
          <Text className="flex-1 text-lg text-gray-800 ml-4">Đăng xuất</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
            color="#bbb"
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
        <View className="flex-1 justify-center items-center bg-black/30 px-4">
          <View className="bg-white w-full rounded-xl p-6 space-y-4">
            <Text className="text-xl font-semibold  mb-2">Giới thiệu hồ sơ</Text>
            <TextInput
              placeholder="Nhập nội dung giới thiệu..."
              className="border border-gray-300 rounded-lg p-3 text-base"
              value={editingBio}
              onChangeText={setEditingBio}
              multiline
            />
            <View className="flex-row justify-end mt-4">
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text className="text-gray-500 text-base">Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="ml-6"
                onPress={() => {
                  setBio(editingBio);
                  setModalVisible(false);

                  axios
                  .post(`${hostId}:80/api/login`, {
                    id_user: user?.id,
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                    image_url: avatar || user?.imageUrl,
                    bio: editingBio,
                    favorites: [],
                    recentlyLogin: user?.createdAt,
                  })
                  .then((res) => {
                    setBio(res.data.bio);
                    console.log("Cập nhật thành công:", res.data);
                  })
                  .catch((err) => {
                    console.error("Lỗi khi cập nhật:", err.message);
                  });
                }}
              >
                <Text className="text-green-600 font-semibold text-base">Lưu</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default Profile;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

const POST = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<{ avatar?: string } | null>(null);

  const displayName =
    user?.fullName ||
    user?.username ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.emailAddresses[0]?.emailAddress ||
    "Người dùng";

  const today = new Date().toLocaleDateString("vi-VN");
  const avatarUri =
    userData?.avatar || user?.imageUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  useEffect(() => {
    if (!user?.id) return;
    axios
      .post(`${hostId}:80/api/getUser`, { id_user: user.id })
      .then((res) => setUserData(res.data))
      .catch((error) => console.error("Không thể tải thông tin người dùng:", error));
  }, [user]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) setSelectedImage(result.assets[0].uri);
    else Alert.alert("Thông báo", "Bạn chưa chọn ảnh nào.");
  };

  const uploadImageToCloudinary = async (imageUri: string) => {
    const formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any);
    formData.append("upload_preset", "Food-recipe");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dry2myuau/image/upload", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      return result.secure_url;
    } catch (error) {
      console.log("Lỗi khi upload Cloudinary:", error);
      return null;
    }
  };

  const handlePost = async () => {
    if (!title || !description || !ingredients || !instructions) {
      return Alert.alert("Thiếu thông tin", "Vui lòng điền đầy đủ các trường bắt buộc.");
    }

    if (!user?.id) {
      return Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
    }

    let imageUrl = "";
    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
      if (!imageUrl) return Alert.alert("Lỗi", "Không thể tải ảnh lên.");
    }

    const postData = {
      id_user: user.id,
      userName: displayName,
      userAvatar: user.imageUrl,
      name: title,
      description,
      ingredients,
      instructions,
      image: imageUrl,
    };

    try {
      const response = await fetch(`${hostId}:80/api/addPost`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (data.status || data.success) {
        Alert.alert("Thành công", "Bài viết đã được đăng!");
        setTitle("");
        setDescription("");
        setIngredients("");
        setInstructions("");
        setSelectedImage(null);
        
      } else {
        Alert.alert("Thất bại", data.message || "Đăng bài không thành công.");
      }
    } catch (err) {
      console.log("Lỗi gửi dữ liệu:", err);
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi đăng bài.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Thêm bài viết</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* User Info */}
      <View style={styles.userInfoWrapper}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.date}>{today}</Text>
        </View>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput placeholder="Tiêu đề" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput placeholder="Mô tả" value={description} onChangeText={setDescription} multiline style={[styles.input, { height: 50 }]} />
        <TextInput placeholder="Nguyên liệu" value={ingredients} onChangeText={setIngredients} multiline style={[styles.input, { height: 80 }]} />
        <TextInput placeholder="Công thức chi tiết" value={instructions} onChangeText={setInstructions} multiline style={[styles.input, { height: 140 }]} />
      </View>

      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.preview} />}

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Feather name="image" size={20} color="#007bff" />
        <Text style={styles.imagePickerText}>Chọn hình ảnh</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Đăng</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default POST;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f8f8",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
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
  date: {
    fontSize: 12,
    color: "gray",
  },
  form: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    elevation: 3,
  },
  preview: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  imagePickerText: {
    color: "#007bff",
    fontSize: 14,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
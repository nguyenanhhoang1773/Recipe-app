import React, { useState } from "react";
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
import images from "@/constant/images";
import { useNavigation } from "@react-navigation/native";

type USER_AVATAR = {
  name?: string;
  image?: any;
  date?: string;
};
const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;
const POST = ({
  name = "Suong",
  image = images.pho,
  date = "30/4",
}: USER_AVATAR) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      console.log("Selected image URI:", uri);
    } else {
      Alert.alert("Thông báo", "Bạn chưa chọn ảnh nào.");
    }
  };

  const uploadImageToCloudinary = async (imageUri: string) => {
    const data = new FormData();
    data.append("file", {
      uri: imageUri,
      type: "image/jpeg",
      name: "upload.jpg",
    } as any);
    data.append("upload_preset", "Food-recipe");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dry2myuau/image/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      return result.secure_url;
    } catch (error) {
      console.log("Upload error", error);
      return null;
    }
  };


  const handlePost = async () => {
    if (!title || !description || !ingredients || !instructions) {
      return Alert.alert("Thiếu thông tin", "Vui lòng điền đủ thông tin!");
    }

    let imageUrl = "";
    if (selectedImage) {
      imageUrl = await uploadImageToCloudinary(selectedImage);
      if (!imageUrl) {
        return Alert.alert("Lỗi", "Tải ảnh lên thất bại.");
        
      }
    }

    // const postData = {
    //   text: JSON.stringify({
    //     name: title,
    //     description,
    //     ingredients,
    //     instructions,
    //   }),
    //   image: imageUrl,
    // };
    const postData = {
      name: title,
      description,
      ingredients,
      instructions,
      image: imageUrl,
    };

    try {
      console.log("Post data:", postData);
      const response = await fetch(`${hostId}/api/create-post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      console.log("Response status:", response.status); // Log the HTTP status
      const data = await response.json();
      console.log("Response data:", data); // Log the response body

      
      if (data.success) {
        Alert.alert("Thông báo", "Đăng bài thành công!");
        setTitle("");
        setDescription("");
        setIngredients("");
        setInstructions("");
        setSelectedImage(null);
      } else {
        Alert.alert("Lỗi", "Đăng bài thất bại.");
      }
    } catch (err) {
      console.log("Error posting:", err);
      // console.log("Error name:", err.name);
      // console.log("Error message:", err.message);
      // console.log("Error stack:", err.stack);

      Alert.alert("Lỗi", "Có lỗi xảy ra khi đăng bài.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerBar}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Thêm bài viết</Text>
        <View style={{ width: 24 }} /> {/* Để cân header */}
      </View>

      {/* User Info */}
      <View style={styles.userInfoWrapper}>
        <Image source={image} style={styles.avatar} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
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

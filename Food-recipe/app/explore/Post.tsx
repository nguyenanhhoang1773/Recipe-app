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
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const POST = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

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

    axios
      .get(`${hostId}:80/api/getCategory`)
      .then((res) => setCategories(res.data as any))
      .catch((err) => console.error("Lỗi khi tải danh mục:", err));
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
    if (!title || !description || !ingredients || !instructions || !selectedCategory) {
      return Alert.alert("Thiếu thông tin", "Vui lòng điền đầy đủ các trường bắt buộc.");
    }
    if (!user?.id) return Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
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
      id_category: selectedCategory,
    };
    console.log("Dữ liệu gửi đến server:", postData);
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
        setSelectedCategory("");
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
      <View style={styles.headerBar}>
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerText}>Thêm bài viết</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.userInfoWrapper}>
        <Image source={{ uri: avatarUri }} style={styles.avatar} />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.name}>{displayName}</Text>
          <Text style={styles.date}>{today}</Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Danh mục</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setShowCategoryDropdown(!showCategoryDropdown);
          }}
        >
          <Text style={styles.dropdownText}>
            {categories.find((c) => c._id === selectedCategory)?.type || "Chọn danh mục"}
          </Text>
          <Ionicons name={showCategoryDropdown ? "chevron-up" : "chevron-down"} size={20} color="#666" />
        </TouchableOpacity>

        {showCategoryDropdown && (
          <View style={styles.dropdownList}>
            {categories.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => {
                  setSelectedCategory(item._id);
                  setShowCategoryDropdown(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{item.type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <Text style={styles.label}>Tiêu đề</Text>
        <TextInput placeholder="Tên món ăn" value={title} onChangeText={setTitle} style={styles.input} />

        <Text style={styles.label}>Mô tả</Text>
        <TextInput placeholder="Giới thiệu ngắn về món ăn" value={description} onChangeText={setDescription} multiline style={[styles.input, { height: 60 }]} />

        <Text style={styles.label}>Nguyên liệu</Text>
        <TextInput placeholder="Liệt kê nguyên liệu" value={ingredients} onChangeText={setIngredients} multiline style={[styles.input, { height: 80 }]} />

        <Text style={styles.label}>Công thức chi tiết</Text>
        <TextInput placeholder="Các bước chế biến" value={instructions} onChangeText={setInstructions} multiline style={[styles.input, { height: 120 }]} />
      </View>

      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.preview} />}

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Feather name="image" size={20} color="#007bff" />
        <Text style={styles.imagePickerText}> Chọn hình ảnh</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handlePost}>
        <Text style={styles.buttonText}>Đăng bài</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default POST;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fdfdfd" },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#222" },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  name: { fontSize: 17, fontWeight: "600" },
  date: { fontSize: 12, color: "gray" },
  form: { marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 4, fontSize: 15, color: "#444" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
    fontSize: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  dropdownList: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 4,
    marginBottom: 12,
    elevation: 3,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderColor: "#eee",
  },
  dropdownText: {
    fontSize: 15,
    color: "#333",
  },
  preview: {
    width: "100%",
    height: 180,
    borderRadius: 14,
    marginBottom: 20,
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  imagePickerText: {
    color: "#007bff",
    fontSize: 15,
    marginLeft: 8,
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
});

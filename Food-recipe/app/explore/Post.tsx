import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  LayoutAnimation,
  UIManager,
  Platform,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useUser } from "@clerk/clerk-expo";
import axios from "axios";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type PostType = {
  _id: string;
  title: string;
  description: string;
  ingredients: string;
  formula: string;
  image: string;
  type: string;
  duration: string; 
};

type RootStackParamList = {
  POST: { post?: PostType };
};

const POST = () => {
  const { user } = useUser();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "POST">>();
  const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

  const postToEdit = route.params?.post || null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [userData, setUserData] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const displayName =
    user?.fullName ||
    user?.username ||
    `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
    user?.emailAddresses[0]?.emailAddress ||
    "Người dùng";

  const today = new Date().toLocaleDateString("vi-VN");
  const avatarUri =
    userData?.image_url || user?.imageUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  useEffect(() => {
    if (!user?.id) return;
    axios.post(`${hostId}:80/api/getUser`, { id_user: user.id }).then((res) => setUserData(res.data));
    axios.get(`${hostId}:80/api/getCategory`).then((res) => setCategories(res.data as any));
  }, [user]);

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title || "");
      setDescription(postToEdit.description || "");
  
      // Kiểm tra xem ingredients có phải là mảng không, nếu không thì gán chuỗi rỗng
      setIngredients(
        Array.isArray(postToEdit.ingredients) 
          ? postToEdit.ingredients.join("\n") 
          : postToEdit.ingredients || ""
      );
      
      setInstructions(postToEdit.formula || "");
      setSelectedCategory(postToEdit.type || "");
      setSelectedImages([postToEdit.image || ""]);
      setDuration(postToEdit.duration || "");
    }
  }, [postToEdit]);
  

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      const uris = result.assets.map((a) => a.uri);
      setSelectedImages((prev) => [...prev, ...uris]);
    } else {
      Alert.alert("Thông báo", "Bạn chưa chọn ảnh nào.");
    }
  };

  const uploadMultipleImages = async () => {
    const urls: string[] = [];
    for (const uri of selectedImages) {
      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "image/jpeg",
        name: "upload.jpg",
      } as any);
      formData.append("upload_preset", "Food-recipe");
      const res = await fetch("https://api.cloudinary.com/v1_1/dry2myuau/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      urls.push(data.secure_url);
    }
    return urls;
  };

  const handlePost = async () => {
    if (!title || !description || !ingredients || !instructions || !selectedCategory || !duration)
      return Alert.alert("Thiếu thông tin", "Vui lòng điền đầy đủ các trường bắt buộc.");
    
    if (!user?.id) return Alert.alert("Lỗi", "Không tìm thấy thông tin người dùng.");
  
    let list_images: string[] = [];
    if (!postToEdit && selectedImages.length > 0) {
      list_images = await uploadMultipleImages();
    } else {
      list_images = selectedImages;
    }
  
    // Chuyển chuỗi ingredients thành mảng
    const ingredientsArray = ingredients.split("\n").map(item => item.trim()).filter(item => item !== "");
  
    const postData = {
      id_recipe: Math.random().toString(36).substring(7),
      id_user: user.id,
      title,
      image: list_images[0] || "",
      type: selectedCategory,
      duration,
      author: displayName,
      userAvatar: userData?.image_url || "",
      number_or_ingredients: ingredientsArray.length,
      ingredients: ingredientsArray,  // Gửi dữ liệu dưới dạng mảng
      formula: instructions,
      description,
    };
  
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    try {
      const url = postToEdit ? `${hostId}:80/api/updateRecipe` : `${hostId}:80/api/addRecipe`;
      const method = postToEdit ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postToEdit ? { ...postData, id: postToEdit._id } : postData),
      });
      const data = await response.json();
      if (data.status || data.recipe) {
        Alert.alert("Thành công", postToEdit ? "Công thức đã được cập nhật!" : "Đăng công thức thành công!");
        setTitle("");
        setDescription("");
        setIngredients("");
        setInstructions("");
        setDuration("");
        setSelectedCategory("");
        setSelectedImages([]);
        navigation.goBack();
      }
    } catch (err) {
      Alert.alert("Lỗi", "Đã xảy ra lỗi khi gửi dữ liệu.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <ScrollView className="flex-1 p-4 bg-white" contentContainerStyle={{ paddingBottom: 100 }}>
      {/* Header */}
      <View className="flex-row items-center justify-between mb-5">
        <Ionicons name="arrow-back" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text className="text-xl font-bold text-gray-800">
          {postToEdit ? "Chỉnh sửa bài viết" : "Thêm bài viết"}
        </Text>
        <View className="w-6" />
      </View>

      {/* User Info */}
      <View className="flex-row items-center mb-5">
        <Image source={{ uri: avatarUri }} className="w-12 h-12 rounded-full" />
        <View className="ml-3">
          <Text className="text-base font-semibold">{displayName}</Text>
          <Text className="text-xs text-gray-500">{today}</Text>
        </View>
      </View>

      {/* Category */}
      <View className="mb-3">
        <Text className="font-semibold mb-1 text-base text-gray-700">Phương pháp chế biến</Text>
        <TouchableOpacity
          className="flex-row justify-between items-center bg-white p-3 rounded-xl mb-2 shadow"
          onPress={() => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            setShowCategoryDropdown(!showCategoryDropdown);
          }}
        >
          <Text className="text-base text-gray-700">
            {selectedCategory || "Chọn phương pháp chế biến"}
          </Text>
          <Ionicons name={showCategoryDropdown ? "chevron-up" : "chevron-down"} size={20} color="#666" />
        </TouchableOpacity>

        {showCategoryDropdown && (
          <View className="bg-white rounded-lg py-2 mb-3 shadow max-h-52">
            <ScrollView nestedScrollEnabled className="max-h-52">
              {categories.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  onPress={() => {
                    setSelectedCategory(item.type);
                    setShowCategoryDropdown(false);
                  }}
                  className="py-2 px-4 border-b border-gray-100"
                >
                  <Text className="text-base text-gray-800">{item.type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Inputs */}
        <Text className="font-semibold mb-1 text-base text-gray-700">Tiêu đề</Text>
        <TextInput
          placeholder="Tên món ăn"
          value={title}
          onChangeText={setTitle}
          className="bg-white rounded-xl px-4 py-3 mb-3 text-base shadow"
        />

        <Text className="font-semibold mb-1 text-base text-gray-700">Mô tả</Text>
        <TextInput
          placeholder="Giới thiệu ngắn về món ăn"
          value={description}
          onChangeText={setDescription}
          multiline
          className="bg-white rounded-xl px-4 py-3 mb-3 text-base shadow h-16"
        />

        <Text className="font-semibold mb-1 text-base text-gray-700">Nguyên liệu</Text>
        <TextInput
          placeholder="Liệt kê nguyên liệu"
          value={ingredients}
          onChangeText={setIngredients}
          multiline
          className="bg-white rounded-xl px-4 py-3 mb-3 text-base shadow h-20"
        />

        <Text className="font-semibold mb-1 text-base text-gray-700">Công thức chi tiết</Text>
        <TextInput
          placeholder="Các bước chế biến"
          value={instructions}
          onChangeText={setInstructions}
          multiline
          className="bg-white rounded-xl px-4 py-3 mb-3 text-base shadow h-32"
        />

        <Text className="font-semibold mb-1 text-base text-gray-700">Thời gian nấu</Text>
        <TextInput
          placeholder="VD: 30 phút, 1 giờ..."
          value={duration}
          onChangeText={setDuration}
          className="bg-white rounded-xl px-4 py-3 mb-3 text-base shadow"
        />
      </View>

      {/* Images Preview */}
      <View className="flex-col gap-2 mb-3">
        {selectedImages.map((img, idx) => (
          <View key={idx} className="relative w-full h-44">
            <Image source={{ uri: img }} className="w-full h-full rounded-xl" />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-white/80 rounded-full"
              onPress={() => {
                const updated = [...selectedImages];
                updated.splice(idx, 1);
                setSelectedImages(updated);
              }}
            >
              <Ionicons name="close-circle-sharp" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Pick Image */}
      <TouchableOpacity className="flex-row items-center mb-6 px-3" onPress={pickImages}>
        <Feather name="image" size={20} color="#0B9A61" />
        <Text className="text-500 text-base ml-2 font-medium text-[#0B9A61]">Chọn một hoặc nhiều ảnh</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity
        className={`py-4 rounded-xl items-center shadow-md ${isSubmitting ? "bg-gray-400" : "bg-[#0B9A61]"}`}
        onPress={handlePost}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text className="text-white text-base font-bold tracking-wide">
            {postToEdit ? "Cập nhật bài viết" : "Đăng bài"}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default POST;

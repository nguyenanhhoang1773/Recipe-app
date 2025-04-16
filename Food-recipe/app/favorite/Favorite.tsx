import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import images from "../../constant/images";
import { Ionicons, AntDesign, MaterialCommunityIcons, } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import DetailsScreen from "./Details";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useClerk, useUser } from "@clerk/clerk-expo";
import axios from "axios";

const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

interface Dish {
  id_recipe: string;
  name: string;
  image: any;
  description: string;
  ingredients: string;
  instructions: string;
}


type RootStackParamList = {
  Favorite: undefined;
  ItemDetail: { item: Dish };
};

type FavoriteNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Favorite"
>;


function Favorite() {

  const navigation = useNavigation<FavoriteNavigationProp>();

  const handlenavigation = (dish: Dish) => {
    navigation.navigate('ItemDetail', { item: dish }); // Thêm tham số nếu cần
  };
  const { user } = useUser();
  const [liked, setLiked] = useState<Dish[]>([])

  useEffect(() => {
    if (!user) return;
    getLikeds()
  }, [])

  const getLikeds = () => {
    if (!user) return;
    axios.get(`${hostId}:80/api/liked/${user.id}`)
      .then((res) => {
        setLiked(res.data);
      });
  };
  const handleUnlike = (item: any) => {
    const info = {
      id_user: item.id_user,
      id_recipe: item.id_recipe
    }


    Alert.alert(
      'Thông báo!',
      'Bạn có chắc chắn muốn xóa mục này không?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Hủy bỏ'),
          style: 'cancel',
        },
        {
          text: 'Xóa', onPress: () =>
            axios.post(`${hostId}:80/api/unLiked`, info)
              .then((res) => {
                getLikeds()
                console.log(res.data)
              })
        },
      ],
      { cancelable: false }
    );
  }
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold mb-4">Món Ăn Yêu Thích</Text>
        {liked.map((data, index) => (
          <TouchableOpacity key={index} className="bg-gray-300 rounded-lg p-4 mb-4 " onPress={() => handlenavigation(data)} >
            <View className="relative">
              <Image source={{ uri: data.image }} className="w-full h-40 rounded-md mb-2  " />
              <Ionicons className="absolute right-1 top-1" name={"heart"} color="#ff0000" size={30} onPress={() => { handleUnlike(data) }} />
            </View>
            <Text className="text-lg font-semibold mb-1">{data.name}</Text>
            <Text className="text-gray-600">{data.description}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

export default Favorite;
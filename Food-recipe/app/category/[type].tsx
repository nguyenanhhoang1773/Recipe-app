import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import ItemCate from "@/components/ItemCate";
import images from "@/constant/images";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@clerk/clerk-expo";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import data from "@/constant/data";
import { LinearGradient } from "expo-linear-gradient";
import colors from "@/constant/colors";
import { Recipe } from "@/type";
import axios from "axios";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;
const Category = () => {
  const { user } = useUser();
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  useEffect(() => {
    axios
      .get(`${hostId}:80/api/getRecipes`)
      .then(function (response) {
        setRecipes(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  const handlePressRecipe = (recipe: Recipe) => {
    router.push({
      pathname: "/favorite/itemdetail",
      params: {
        id_recipe: 1,
        name: recipe.title,
        image: recipe.image,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.formula,
      },
    });
  };
  return (
    <SafeAreaView>
      <ScrollView className="px-7 pt-5">
        <View className="flex-row items-center">
          <View className="flex-1">
            <Text className="text-xl text-text-primary font-Inter-SemiBold">
              Xin chào, {user?.fullName}
            </Text>
            <Text className="text-3xl font-Inter-Bold mt-2">
              Bạn muốn nấu món gì cho hôm nay?
            </Text>
          </View>
          <Image
            className="size-16 rounded-full ml-4"
            source={{ uri: user?.imageUrl }}
          />
        </View>
        <View className="">
          <View className=" flex-row items-center justify-center mt-5 bg-[rgba(0,0,0,0.02)] rounded-full">
            <TouchableOpacity className="p-4">
              <AntDesign
                size={28}
                name="search1"
              />
            </TouchableOpacity>
            <TextInput
              className="flex-1 py-2 text-lg"
              placeholder="Tìm kiếm công thức món ngon,..."
            />
            <View className="bg-text-primary h-8 w-[1px]"></View>
            <TouchableOpacity className="p-4">
              <FontAwesome6
                size={20}
                name="sliders"
              />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row justify-between items-center mt-5">
          <Text className=" text-2xl font-Inter-Bold">Danh mục</Text>
          <Text className="text-primary text-xl font-Inter-SemiBold">
            See all
          </Text>
        </View>
        <View className=" flex-row items-center mt-2">
          <ItemCate
            isFirst
            title="Bữa sáng"
            source={images.breakfast}
            type="Breakfast"
          />
          <ItemCate
            title="Món chính"
            source={images.chicken}
            type="MainCourse"
          />
          <ItemCate
            title="Món nước"
            source={images.pho}
            type="Noodle"
          />
          <ItemCate
            title="Salad"
            source={images.salad}
            type="Vegetable"
          />
          <ItemCate
            title="Đồ ngọt"
            source={images.cookie}
            type="Sweets"
          />
        </View>
        <View className="flex-row justify-between items-center mt-5">
          <Text className="text-2xl font-Inter-Bold">Đề xuất cho bạn</Text>
          <Text className="text-primary text-xl font-Inter-SemiBold">
            See all
          </Text>
        </View>
        <FlatList
          data={recipes}
          className="mt-4 pb-5"
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handlePressRecipe(item)}>
              <View
                style={{
                  height: windowHeight / 4,
                  width: windowWidth / 2.5,
                }}
                className={`${index && "ml-3"} w-full`}
              >
                <Image
                  className="w-full h-full rounded-3xl"
                  source={images[item.image]}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: "30%",
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                  }}
                />
                <View className="absolute bottom-4 right-4 left-4">
                  <Text
                    numberOfLines={1}
                    className="text-white font-Inter-Medium text-xl"
                  >
                    {item.title}
                  </Text>
                  <Text className="text-text-primary text-xs font-Inter-Light">
                    By {item.author}
                  </Text>
                  <View className="flex-row items-center mt-2">
                    <Image
                      className="w-4 h-4"
                      source={images.clock}
                    />
                    <Text className="ml-2 text-sm text-white font-Inter-Light">
                      {item.duration}
                    </Text>
                    <Image
                      className="w-4 h-4 ml-2"
                      source={images.ingredients}
                    />
                    <Text className="ml-2 text-sm text-white font-Inter-Light">
                      {item.number_of_ingredients}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />

        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-2xl font-Inter-Bold">Món ngon nhất tuần!</Text>
          <Text className="text-primary text-xl font-Inter-SemiBold">
            See all
          </Text>
        </View>
        <FlatList
          data={recipes.reverse()}
          className="mt-4 pb-5"
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => handlePressRecipe(item)}>
              <View
                style={{
                  height: windowHeight / 3,
                  width: windowWidth / 1.4,
                }}
                className={`${index && "ml-3"} w-full`}
              >
                <Image
                  onLoad={() => console.log(item.title)}
                  className="w-full h-full rounded-3xl"
                  source={images[item.image]}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: "50%",
                    borderBottomLeftRadius: 24,
                    borderBottomRightRadius: 24,
                  }}
                />
                <View className="absolute flex-row items-center justify-center px-4 py-2 top-4 right-4 bg-[rgba(11,154,97,0.2)] rounded-2xl">
                  <AntDesign
                    color={colors.primary}
                    size={20}
                    name="heart"
                  />
                  <Text className="ml-2 font-Inter-Medium text-lg text-white">
                    4
                  </Text>
                </View>
                <View className="absolute bottom-4 right-4 left-4 ">
                  <Text
                    numberOfLines={1}
                    className="text-white font-Inter-Medium text-2xl"
                  >
                    {item.title}
                  </Text>
                  <Text className="text-text-primary text-sm  font-Inter-Light">
                    By {item.author}
                  </Text>
                  <View className="flex-row items-center justify-between mt-2">
                    <View className="flex-row items-center">
                      <Image
                        className="w-6 h-6"
                        source={images.clock}
                      />
                      <Text className="ml-2 text-md text-white font-Inter-Light">
                        {item.duration}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Image
                        className="w-6 h-6 ml-2"
                        source={images.ingredients}
                      />
                      <Text className="ml-2 text-lg text-white font-Inter-Light">
                        {item.number_of_ingredients}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Category;

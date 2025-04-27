import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  handlePressRecipe,
  windowHeight,
  windowWidth,
} from "@/constant/constant";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/constant/images";
import { Recipe } from "@/type";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;
const newWindowWidth = windowWidth - 8 * 3;
const ShowRecipes = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const { textSearch, type } = useLocalSearchParams();
  useEffect(() => {
    if (type === "search") {
      axios
        .get(`${hostId}:80/api/searchRecipes`, {
          params: {
            textSearch: textSearch,
          },
        })
        .then(function (response) {
          setRecipes(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (type === "all") {
      axios
        .get(`${hostId}:80/api/getRecipes`)
        .then(function (response) {
          setRecipes(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [textSearch]);
  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <View className="flex-1 px-[8] ">
        {type !== "all" && (
          <Text className="px-5 text-2xl font-semibold text-white">
            Kết quả với "{textSearch}":
          </Text>
        )}

        <FlatList
          data={recipes}
          className={`${type !== "all" && "mt-4"} pb-5`}
          contentContainerClassName="gap-2"
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          ListFooterComponent={() => (
            <View className="">
              <Text className="text-center text-xl font-Inter-SemiBold py-3 text-text-primary">
                Đây là tất cả công thức hiện có
              </Text>
            </View>
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className={`${index % 2 != 0 && "ml-2"}`}
              onPress={() => handlePressRecipe(item)}
            >
              <View
                style={{
                  height: windowHeight / 3,
                  width: newWindowWidth / 2,
                }}
              >
                <Image
                  className="w-full h-full rounded-3xl"
                  source={{ uri: item.image }}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.6)"]}
                  style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    top: "30%",
                    borderBottomLeftRadius: 21,
                    borderBottomRightRadius: 21,
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
      </View>
    </SafeAreaView>
  );
};

export default ShowRecipes;

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import { Recipe } from "@/type";
import images from "@/constant/images";
import colors from "@/constant/colors";
import { LinearGradient } from "expo-linear-gradient";
import {
  handlePressRecipe,
  windowHeight,
  windowWidth,
} from "@/constant/constant";
import { router } from "expo-router";
const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

const SearchPage = () => {
  const [recipes, setRecipes] = useState<Array<Recipe>>([]);
  const [searchedRecipes, setSearchedRecipes] = useState<Array<Recipe>>([]);

  const [textValue, setTextValue] = useState("");
  const inputField = useRef<TextInput>(null);
  useEffect(() => {
    axios
      .get(`${hostId}:80/api/getRecipes`)
      .then(function (response) {
        setRecipes(response.data.slice(0, 4));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log("searchedRecipes:", searchedRecipes.length);
  }, [searchedRecipes]);
  const handleChangeText = (text: string) => {
    console.log(text);
    setTextValue(text);
    axios
      .get(`${hostId}:80/api/searchRecipes`, {
        params: {
          textSearch: text,
        },
      })
      .then(function (response) {
        setSearchedRecipes(response.data.slice(0, 4));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleShowALl = () => {
    router.push({
      pathname: "/showRecipes",
      params: {
        type: "all",
      },
    });
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4">
        <View className=" flex-row items-center justify-center bg-[rgba(0,0,0,0.02)] rounded-full">
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/showRecipes",
                params: {
                  textSearch: textValue,
                  type: "search",
                },
              })
            }
            className="p-4"
          >
            <AntDesign
              size={28}
              name="search1"
            />
          </TouchableOpacity>
          <TextInput
            onSubmitEditing={() =>
              router.push({
                pathname: "/showRecipes",
                params: {
                  textSearch: textValue,
                  type: "search",
                },
              })
            }
            value={textValue}
            onChangeText={handleChangeText}
            autoFocus={true}
            ref={inputField}
            className="flex-1 py-2 text-xl align-middle"
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
        <View className="">
          {!textValue && (
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-2xl font-Inter-SemiBold">Mới đây</Text>
              <TouchableOpacity onPress={handleShowALl}>
                <Text className="text-primary text-xl font-Inter-SemiBold">
                  tất cả
                </Text>
              </TouchableOpacity>
            </View>
          )}
          <View className="mt-2">
            {textValue
              ? searchedRecipes.map((item) => (
                  <TouchableOpacity onPress={() => handlePressRecipe(item)}>
                    <View className="flex-row items-center mt-2">
                      <Image
                        className="size-14 rounded-full"
                        source={{ uri: item.image }}
                      />
                      <Text className="flex-1 text-xl font-Inter-Medium ml-4">
                        {item.title}
                      </Text>
                      <AntDesign
                        name="closecircleo"
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                ))
              : recipes.map((item) => (
                  <TouchableOpacity onPress={() => handlePressRecipe(item)}>
                    <View className="flex-row items-center mt-2">
                      <Image
                        className="size-14 rounded-full"
                        source={{ uri: item.image }}
                      />
                      <Text className="flex-1 text-xl font-Inter-Medium ml-4">
                        {item.title}
                      </Text>
                      <AntDesign
                        name="closecircleo"
                        size={20}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
          </View>

          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-2xl font-Inter-Bold">
              Món ngon bạn có thể sẽ thích!
            </Text>
            <TouchableOpacity onPress={handleShowALl}>
              <Text className="text-primary text-xl font-Inter-SemiBold">
                tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={recipes.slice().reverse()}
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
                    source={{ uri: item.image }}
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchPage;

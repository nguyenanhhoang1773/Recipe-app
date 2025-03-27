import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Dimensions,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6, AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import images from "@/constant/images";
import ItemCate from "@/components/ItemCate";
import data from "@/constant/data";
import { LinearGradient } from "expo-linear-gradient";
import { Redirect } from "expo-router";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const Home = () => {
  return <Redirect href={"/(auth)/sign-in"} />;
  return (
    <SafeAreaView
      edges={["top", "left", "right"]}
      className="flex-1 bg-white"
    >
      <View className="flex-1">
        <View className="px-7 flex-row items-center justify-between pb-2">
          <TouchableOpacity className="rounded-full bg-[rgba(0,0,0,0.02)] p-3">
            <AntDesign
              size={26}
              name="bars"
            />
          </TouchableOpacity>
          <View className="items-center ">
            <Text className="text-text-primary font-Inter-Medium text-lg">
              Location
            </Text>
            <View className="flex-row items-center justify-center">
              <Ionicons
                size={20}
                style={{ marginTop: -2, color: "#f04146" }}
                name="location"
              />
              <Text className="font-Inter-Medium text-xl mx-1">
                69 Nguyễn Đình Hiến
              </Text>
              <Feather
                size={20}
                name="chevron-down"
              />
            </View>
          </View>
          <TouchableOpacity className="rounded-full bg-[rgba(0,0,0,0.02)] p-3">
            <Feather
              size={26}
              name="bell"
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4 h-[180px] mt-2 ">
            <Swiper
              containerStyle={{
                borderRadius: 24,
                overflow: "hidden",
              }}
            >
              <View className="flex-1 mx-2">
                <Image
                  resizeMode="cover"
                  source={images.thumbnail1}
                  className="w-full h-full rounded-3xl"
                />
              </View>
              <View className="flex-1 mx-2">
                <Image
                  resizeMode="cover"
                  source={images.thumbnail1}
                  className="w-full h-full rounded-3xl"
                />
              </View>
            </Swiper>
          </View>
          <View className="px-7">
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
                  size={24}
                  name="sliders"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="px-7 flex-row items-center mt-5">
            <ItemCate
              isFirst
              title="Bữa sáng"
              source={images.breakfast}
            />
            <ItemCate
              title="Món chính"
              source={images.chicken}
            />
            <ItemCate
              title="Món nước"
              source={images.pho}
            />
            <ItemCate
              title="Salad"
              source={images.salad}
            />
            <ItemCate
              title="Đồ ngọt"
              source={images.cookie}
            />
          </View>
          <FlatList
            data={data.recipe}
            className="mt-5 pb-5"
            contentContainerClassName="px-7"
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View
                style={{
                  height: windowHeight / 2.5,
                  width: windowWidth / 1.7,
                }}
                className={`${index && "ml-3"} w-full`}
              >
                <Image
                  className="w-full h-full rounded-3xl"
                  source={item.source}
                />
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.5)"]}
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
                <View className="absolute items-center justify-center px-4 py-2 top-4 left-4 bg-[rgba(11,154,97,0.4)] rounded-2xl">
                  <Text className="font-Inter-Medium text-lg text-white">
                    {item.type}
                  </Text>
                </View>
                <View className="absolute bottom-4 right-0 left-4 ">
                  <Text
                    numberOfLines={1}
                    className="text-white font-Inter-Medium text-2xl"
                  >
                    {item.title}
                  </Text>
                  <Text className="text-text-primary text-sm font-Inter-Light">
                    By {item.author}
                  </Text>
                  <View className="flex-row items-center mt-5">
                    <Image
                      className="w-5 h-5"
                      source={images.clock}
                    />
                    <Text className="ml-2 text-sm text-white font-Inter-Light">
                      {item.time}
                    </Text>
                    <Image
                      className="w-5 h-5 ml-4"
                      source={images.ingredients}
                    />
                    <Text className="ml-2 text-sm text-white font-Inter-Light">
                      {item.ingredients} nguyên liệu
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default Home;

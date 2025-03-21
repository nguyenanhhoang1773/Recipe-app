import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import images from "@/constant/images";
import Ionicons from '@expo/vector-icons/Ionicons';

const Detail = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View style={{
        position:'absolute',
        zIndex:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        padding:20,
      }}>
        <TouchableOpacity >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity >
          <Ionicons name="heart-outline" size={24} color="white" />
        </TouchableOpacity> 
      </View>
      <Image source={images.saladTrung}
        style={{
          width:'100%',
          height: 340
        }}
      />

      <View style={{
        padding: 15,
        marginTop:-40,
        backgroundColor:'#fff',
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text className="text-3xl font-semibold">Salad trứng trộn</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 5 }}>
            <Ionicons name="star" size={24} color="#FFD700" />
            <Text className="text-black font-semibold ml-1">4.5</Text>
          </View>
        </View>
        <Text style={{fontSize:13, fontFamily:'outfit'}}>By Nguyễn Anh Hoàng</Text>
        <View className="flex-row items-center space-x-4 mt-2">
          <View className="flex-row items-center">
            <Image className="w-5 h-5"source={images.clock}/>
            <Text className="text-gray-500 text-sm ml-1">10 mins</Text>
          </View>
          <View className="flex-row items-center">
            <Image className="w-5 h-5 ml-4" source={images.ingredients}/>
            <Text className="text-gray-500 text-sm ml-1">Medium</Text>
          </View>
        </View>

        {/* Mo ta */}
        <View className="mt-4">
          <Text className="text-xl font-bold">Description</Text>
          <Text className="text-gray-600 text-sm mt-1">
          Salad trứng trộn là một món ăn nhẹ, bổ dưỡng và dễ làm, thường bao gồm trứng luộc chín được cắt nhỏ hoặc nghiền nhuyễn,
          trộn cùng sốt mayonnaise hoặc sữa chua để tạo độ béo ngậy. Món này thường được kết hợp với rau xanh như xà lách, dưa leo, cà chua, và có thể thêm hành tây, cần tây hoặc bắp cải để tăng độ giòn. Một số phiên bản còn thêm gia vị như tiêu, muối, mù tạt hoặc nước cốt chanh để tạo hương vị cân bằng. Salad trứng trộn có thể ăn riêng, dùng kèm bánh mì, hoặc làm nhân sandwich rất ngon.
          </Text>
        </View>

        {/* Thanh phan */}
        
      </View>    
    </ScrollView>
  );
};

export default Detail;

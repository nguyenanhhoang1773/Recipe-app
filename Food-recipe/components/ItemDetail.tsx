
import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, AntDesign, MaterialCommunityIcons, } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
// import images from "@/constant/images";
import Feedback from "../app/feedback/feedback"
interface Dish {
    id_recipe: string;
    name: string;
    image: any;
    description: string;
    ingredients: string
    instructions: string
}
export default function Details() {

    const route = useRoute<any>();
    const item: Dish = route.params?.item;
    const ingredients = item.ingredients.split(';');
    const instructions = item.instructions.split(';');

    const videotest = require('../app/favorite/0323.mp4');
    const player = useVideoPlayer(videotest, (player) => {
        player.loop = true;
        player.showNowPlayingNotification = false;
        player.currentTime = 1;
        player.play();
    });



    const navigation = useNavigation();

    return (
        // <ImageBackground source={images.vegetable}>
        <View className='p-2 h-full  '>
            <View>
                <View className='m-1 p-1'>

                    {/* {player && (
                        <VideoView
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                            startsPictureInPictureAutomatically
                            style={{ width: '100%', height: 200, marginTop: 10 }} // Thêm style cho VideoView
                        />
                    )} */}
                </View>
                <Ionicons className="absolute left-1 top-1 z-10" name={"arrow-back-circle-outline"} color="#999999" size={30} onPress={() => navigation.goBack()} />
            </View>
            <ScrollView>
                <View>
                    <Text className='font-bold text-[20px] '>{item.name}</Text>
                    <Text className='text-{18px] font-medium'>{item.description}</Text>
                    <Text className="mt-2 font-bold text-[16px]">Nguyên liệu:</Text>
                    {ingredients.map((item, index) => (
                        item.trim() !== '' && (
                            <Text key={index} className="ml-2 italic">
                                {item.trim()}
                            </Text>
                        )
                    ))}
                    <Text className="mt-2 font-bold text-[16px]">Công thức:</Text>
                    {instructions.map((item, index) => (
                        item.trim() !== '' && (
                            <Text key={index} className="m-2 italic">
                                {item.trim()}
                            </Text>
                        )
                    ))}
                    <Image source={{ uri: item.image }} className='w-full h-[180px] rounded-md my-2 ' />
                    <Text className='italic'>Để lại nhận xét, chia sẻ của bạn tại đây nhé !!!</Text>
                </View>



                <Feedback id_recipe={item.id_recipe} />

            </ScrollView>




        </View>

    )
}


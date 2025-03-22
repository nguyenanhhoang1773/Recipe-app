
import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Ionicons, AntDesign, MaterialCommunityIcons, } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useVideoPlayer, VideoView } from 'expo-video';
import images from "@/constant/images";
interface Dish {
    id: number;
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

    const videotest = require('./nauan.mp4');
    const player = useVideoPlayer(videotest, (player) => {
        player.loop = true;
        player.showNowPlayingNotification = false;
        player.currentTime = 1;
        player.play();
    });

    const commentsData = [
        {
            avatar: images.andanh, // Giả định images.andanh đã được import
            name: 'Hoàng Đạt',
            date: '22/03/2025',
            comment: 'món này ngon nha bro',
        },
        {
            avatar: images.breakfast, // Giả định images.anotherAvatar đã được import
            name: 'Nguyễn Văn A',
            date: '21/03/2025',
            comment: 'Tuyệt vời, sẽ ủng hộ tiếp!',
        },
        {
            avatar: images.cookie, // Giả định images.yetAnotherAvatar đã được import
            name: 'Trần Thị B',
            date: '20/03/2025',
            comment: 'Giá cả hợp lý, chất lượng tốt.',
        },
        {
            avatar: images.thumbnail1, // Giả định images.randomAvatar đã được import
            name: 'Lê Minh C',
            date: '19/03/2025',
            comment: 'Giao hàng nhanh, đóng gói cẩn thận.',
        },
        {
            avatar: images.chicken, // Giả định images.someAvatar đã được import
            name: 'Phạm Thu D',
            date: '18/03/2025',
            comment: 'Hương vị đậm đà, rất thích!',
        },
    ];

    const navigation = useNavigation();
    const [text, setText] = useState('');


    function handleFeedback() {
        console.log('xử lý backend tại đây')
    }
    const handleLiked = () => {
        alert('Đã thích bình luận này!');
    }
    return (
        // <ImageBackground source={images.vegetable}>
        <View className='p-2 h-full  '>
            <View>
                <View className='m-1 p-1'>

                    {player && (
                        <VideoView
                            player={player}
                            allowsFullscreen
                            allowsPictureInPicture
                            startsPictureInPictureAutomatically
                            style={{ width: '100%', height: 200, marginTop: 10 }} // Thêm style cho VideoView
                        />
                    )}
                </View>
                <Ionicons className="absolute left-1 top-1" name={"arrow-back-circle-outline"} color="#999999" size={30} onPress={() => navigation.goBack()} />
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
                    <Image source={item.image} className='w-full h-[180px] rounded-md my-2 ' />
                    <Text className='italic'>Để lại nhận xét, chia sẻ của bạn tại đây nhé !!!</Text>
                </View>


                <View className='p-2 my-1  bg-gray-200 rounded-lg'>
                    <Text className='font-bold text-[20px]'>
                        Đánh giá món ăn
                    </Text>
                    <TextInput
                        className='border p-2 border-black rounded-lg '
                        onChangeText={setText}
                        value={text}
                        placeholder="Nhập văn bản..."
                    />
                    <View className='flex justify-end flex-row'>
                        <Text className='p-2 bg-red-500 text-white rounded-lg font-bold m-1' onPress={() => setText('')}>Hủy</Text>

                        <Text className='p-2 bg-green-500 text-white rounded-lg font-bold m-1' onPress={handleFeedback}>Nhận xét</Text>
                    </View>
                </View>


                <View className='py-1 my-1 '>
                    <Text className='font-bold text-[20px] my-1'>
                        Tất cả nhận xét
                    </Text>
                    {commentsData.map((comment, index) => (
                        <View key={index} className='p-2 flex flex-row py-4 border-t'>
                            <Image source={comment.avatar} className='rounded-full h-[50px] w-[50px] mr-2' />
                            <View className='flex flex-col w-[80%]'>
                                <View className='border p-2 mt-1 rounded-lg  bg-gray-200'>
                                    <Text className='font-medium text-[16px]'>
                                        {comment.name} - {comment.date}
                                    </Text>
                                    <Text>{comment.comment}</Text>
                                </View>
                                <View className='flex flex-row justify-end mx-1'>
                                    <Text className='mx-3' onPress={() => handleLiked()}> <Ionicons className="" name={"heart-circle-outline"} color="#999999" size={20} /></Text>
                                    <Text>Trả lời</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>




        </View>
        // </ImageBackground>
    )
}


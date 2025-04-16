import { View, Text, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../constant/images'
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useClerk, useUser } from "@clerk/clerk-expo";
import axios from 'axios';
const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;
interface FeedbackProps {
    id_recipe: string;
}

const Feedback: React.FC<FeedbackProps> = ({ id_recipe }) => {
    const { user } = useUser();
    // console.log(user)
    type Feedback = {
        user_name: string;
        createdAt: string;
        text: string;
    };
    useEffect(() => {
        getFeedback()
    }, [])
    const [listFeedback, setListFeedback] = useState<Feedback[]>([]);
    const getFeedback = () => {
        const info = {
            id_recipe: id_recipe,
            id_user: user?.id
        }
        try {
            axios.post(`${hostId}:80/api/getFeedback`, info)
                .then((res) => {
                    setListFeedback(res.data)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const [text, setText] = useState('');


    function handleFeedback() {
        if (!text.trim()) {
            Alert.alert("Thông báo", "Không để trống dữ liệu");
            return;
        }
        const feedback = {
            user_name: user?.lastName,
            id_recipe: id_recipe,
            text: text,
            image: ""
        }
        try {
            axios.post(`${hostId}:80/api/addFeedback`, feedback)
                .then((res) => {
                    getFeedback()
                })
        } catch (error) {
            console.log("Lỗi:" + error)
        }
    }

    const handleLiked = () => {
        alert('Đã thích bình luận này!');
    }
    return (
        <View>
            <View className='p-2 my-1  bg-gray-200 rounded-lg'>
                <Text className='font-bold text-[20px]'>
                    Đánh giá món ăn
                </Text>
                <TextInput
                    className='border-b p-2 border-gray-300 rounded-lg '
                    onChangeText={setText}
                    value={text}
                    placeholder="Nhập văn bản..."
                />
                <View className='flex justify-end flex-row'>
                    <Text className='p-2 bg-red-400 text-white rounded-lg font-bold m-1' onPress={() => setText('')}>Hủy</Text>

                    <Text className='p-2 bg-green-400 text-white rounded-lg font-bold m-1' onPress={handleFeedback}>Nhận xét</Text>
                </View>
            </View>


            <View className='py-1 my-1 '>
                <Text className='font-bold text-[20px] my-1'>
                    Tất cả nhận xét
                </Text>
                {listFeedback.map((comment, index) => (
                    <View key={index} className=' flex flex-row p-1'>
                        <Image source={images.andanh} className='rounded-full h-[50px] w-[50px] mr-2' />
                        <View className='flex flex-col w-[80%]'>
                            <View className=' p-2 mt-1 rounded-lg  bg-gray-200'>
                                <Text className='font-medium text-[16px]'>
                                    {comment.user_name} - <Text className='text-[12px]'>{comment.createdAt}</Text>
                                </Text>
                                <Text>{comment.text}</Text>
                            </View>
                            <View className='flex flex-row justify-end mx-1'>
                                <Text className='mx-3' onPress={() => handleLiked()}> <Ionicons className="" name={"heart-circle-outline"} color="#999999" size={20} /></Text>
                                <Text>Trả lời</Text>
                            </View>
                        </View>
                    </View>

                ))}
            </View>
        </View>
    )
}

export default Feedback
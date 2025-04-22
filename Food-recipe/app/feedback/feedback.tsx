import { View, Text, Image, Alert, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import images from '../../constant/images'
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useClerk, useUser } from "@clerk/clerk-expo";
import axios from 'axios';
// import Spinner from 'react-native-loading-spinner-overlay';
const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;
interface FeedbackProps {
    id_recipe: string;
}

const Feedback: React.FC<FeedbackProps> = ({ id_recipe }) => {
    const { user } = useUser();

    const [isLoading, setIsLoading] = useState(false);
    const fakeLoadData = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            getFeedback()
            Alert.alert(
                'Thông báo!',
                'Bình luận của bạn về món ăn đã được thêm !!!',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('Thêm thành công'),
                        style: 'cancel',
                    }

                ],
                { cancelable: false }
            );
        }, 3000);
    };



    // console.log(user)
    type Feedback = {
        user_name: string;
        createdAt: string;
        text: string;
    };

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

    useEffect(() => {
        getFeedback()
    }, [])

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
                    setText('')
                    fakeLoadData();
                })
        } catch (error) {
            console.log("Lỗi:" + error)
        }
    }

    const handleLiked = () => {
        alert('Đã thích bình luận này!');
    }
    return (
        <View className='bg-white'>
            {
                isLoading &&
                <Modal visible={true} transparent animationType="none">
                    <View className="flex-1 justify-center items-center bg-black/60">
                        <View className="bg-green-500 px-6 py-4 rounded-xl items-center">
                            <ActivityIndicator size="large" color="#fff" />
                            <Text className="text-white mt-2 text-base">Đang tải...</Text>
                        </View>
                    </View>
                </Modal>
            }

            <View className="p-2 my-1 rounded-lg bg-[rgba(0,188,0,0.1)]">
                {/* <Spinner visible={isLoading} textContent="Loading..." textStyle={{ color: '#FFF' }} /> */}

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

                    <Text className='p-2 text-white rounded-lg font-bold m-1' style={{ backgroundColor: '#0B9A61' }} onPress={handleFeedback}>Nhận xét</Text>
                </View>
            </View>


            <View className='py-1 my-1 '>
                <Text className='font-bold text-[20px] my-1'>
                    Tất cả nhận xét
                </Text>
                {listFeedback.length === 0 && <Text className='text-center'>Chưa có đánh giá nào về công thức này!!!</Text>}
                {listFeedback.map((comment, index) => (
                    <View key={index} className=' flex flex-row p-1'>

                        <Image source={images.andanh} className='rounded-full h-[50px] w-[50px] mr-2' />
                        <View className='flex flex-col w-[80%] relative'>
                            <Text className='absolute z-10 right-2 top-0 font-bold text-[18px]'>...</Text>
                            <View className=' p-2 mt-1 rounded-lg ' style={{ backgroundColor: 'rgba(0, 188, 0, 0.1)' }}>
                                <Text className='font-medium text-[16px]'>
                                    {comment.user_name} - <Text className='text-[12px]'>{new Date(comment.createdAt).toLocaleString()}</Text>
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
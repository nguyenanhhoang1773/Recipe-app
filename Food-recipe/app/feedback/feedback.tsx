import { View, Text, Image, Alert, ActivityIndicator, Modal, TextInput, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from "@clerk/clerk-expo";
import axios from 'axios';
import images from '../../constant/images';

const hostId = process.env.EXPO_PUBLIC_LOCAL_HOST_ID;

interface FeedbackProps {
    id_recipe: string;
}

type FeedbackItem = {
    user_name: string;
    createdAt: string;
    text: string;
};

const Feedback: React.FC<FeedbackProps> = ({ id_recipe }) => {
    const { user } = useUser();
    const [listFeedback, setListFeedback] = useState<FeedbackItem[]>([]);
    const [text, setText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Load tất cả feedback
    const getFeedback = async () => {
        try {
            const res = await axios.post(`${hostId}:80/api/getFeedback`, { id_recipe });
            setListFeedback(res.data);
        } catch (error) {
            console.error("Lỗi lấy feedback:", error);
        }
    };
    

    useEffect(() => {
        getFeedback();
    }, []);

    // Gửi feedback mới
    const handleFeedback = async () => {
        if (!text.trim()) {
            Alert.alert("Thông báo", "Không để trống dữ liệu");
            return;
        }

        const feedback = {
            user_name: user?.lastName || "Ẩn danh",
            id_recipe,
            text: text.trim(),
            image: ""
        };

        try {
            setIsLoading(true);
            await axios.post(`${hostId}:80/api/addFeedback`, feedback);
            setText('');
            await getFeedback(); // 🔥 Load lại feedback mới ngay sau khi gửi
            setIsLoading(false);
            Alert.alert("Thông báo!", "Bình luận của bạn đã được thêm!");
        } catch (error) {
            setIsLoading(false);
            console.error("Lỗi gửi feedback:", error);
            Alert.alert("Lỗi", "Không thể thêm bình luận, vui lòng thử lại.");
        }
    };

    // Bấm like feedback
    const handleLiked = () => {
        alert('Đã thích bình luận này!');
    };

    return (
        <View className="bg-white">

            {isLoading && (
                <Modal visible transparent animationType="fade">
                    <View className="flex-1 justify-center items-center bg-black/60">
                        <View className="bg-green-500 px-6 py-4 rounded-xl items-center">
                            <ActivityIndicator size="large" color="#fff" />
                            <Text className="text-white mt-2 text-base">Đang xử lý...</Text>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Nhập feedback */}
            <View className="p-2 my-1 rounded-lg bg-[rgba(0,188,0,0.1)]">
                <Text className="font-bold text-[20px]">Đánh giá món ăn</Text>

                <TextInput
                    className="border-b p-2 border-gray-300 rounded-lg"
                    onChangeText={setText}
                    value={text}
                    placeholder="Nhập văn bản..."
                />

                <View className="flex flex-row justify-end mt-2">
                    <TouchableOpacity className="p-2 bg-red-400 rounded-lg mx-1" onPress={() => setText('')}>
                        <Text className="text-white font-bold">Hủy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2 bg-green-600 rounded-lg mx-1" onPress={handleFeedback}>
                        <Text className="text-white font-bold">Nhận xét</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Hiển thị tất cả feedback */}
            <View className="py-1 my-1">
                <Text className="font-bold text-[20px] my-1">Tất cả nhận xét</Text>

                {listFeedback.length === 0 ? (
                    <Text className="text-center">Chưa có đánh giá nào về công thức này!!!</Text>
                ) : (
                    listFeedback.map((comment, index) => (
                        <View key={index} className="flex flex-row p-1">
                            <Image source={images.andanh} className="rounded-full h-[50px] w-[50px] mr-2" />
                            <View className="flex-1 relative">
                                <TouchableOpacity className="absolute z-10 right-2 top-0">
                                    <Text className="font-bold text-[18px]">...</Text>
                                </TouchableOpacity>

                                <View className="p-2 mt-1 rounded-lg" style={{ backgroundColor: 'rgba(0, 188, 0, 0.1)' }}>
                                    <Text className="font-medium text-[16px]">
                                        {comment.user_name} - <Text className="text-[12px]">{new Date(comment.createdAt).toLocaleString()}</Text>
                                    </Text>
                                    <Text>{comment.text}</Text>
                                </View>

                                <View className="flex flex-row justify-end mx-1 mt-1">
                                    <TouchableOpacity className="mx-3" onPress={handleLiked}>
                                        <Ionicons name="heart-circle-outline" color="#999999" size={20} />
                                    </TouchableOpacity>
                                    <Text>Trả lời</Text>
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </View>

        </View>
    );
};

export default Feedback;

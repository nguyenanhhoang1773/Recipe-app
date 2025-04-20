import { View, Text, Image, ScrollView, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import images from "@/constant/images";
import { useUser } from "@clerk/clerk-expo";
import axios from 'axios'

const IndexChat = () => {
    const { user } = useUser();
    const scrollViewRef = useRef<ScrollView>(null)
    const [text, setText] = useState("");
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: `Xin chào ${user?.fullName} !! Tôi có thể giúp gì cho bạn`,
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleChat = async () => {
        if (!text.trim()) return;

        const userMessage = { type: 'user', text };
        setMessages(prev => [...prev, userMessage]);
        setText("");

        setIsTyping(true);
        const thinkingMessage = { type: 'bot', text: '🤖 Đang suy nghĩ...' };
        setMessages(prev => [...prev, thinkingMessage]);

        try {
            const response = await axios.post('https://n8n.laptrinhmang3.xyz/webhook/recipe', { request: text });

            setMessages(prev => [
                ...prev.filter(msg => msg.text !== '🤖 Đang suy nghĩ...'),
                { type: 'bot', text: response.data.responed }
            ]);
        } catch (error) {
            console.log("Có lỗi xảy ra:", error);
            setMessages(prev => [
                ...prev.filter(msg => msg.text !== '🤖 Đang suy nghĩ...'),
                { type: 'bot', text: '❌ Có lỗi xảy ra. Vui lòng thử lại!' }
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleBack = () => {
        Alert.alert(
            'Thông báo!',
            'Bạn có chắc chắn muốn thoát cuộc trò chuyện, Đoạn Chat sẽ biến mất?',
            [
                {
                    text: 'Hủy',
                    onPress: () => console.log('Hủy bỏ'),
                    style: 'cancel',
                },
                {
                    text: 'Thoát', onPress: () => router.back()

                },
            ],
            { cancelable: false }
        );
    }
    return (
        <SafeAreaView className='bg-white h-full'>
            {/* Header */}
            <View className="p-3 flex-row gap-2 items-center" style={{ backgroundColor: "#0B9A61" }}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons
                        name="arrow-back-circle-outline"
                        color="#fff"
                        size={30}
                    />
                </TouchableOpacity>
                <Text className="text-2xl font-bold text-white">Chatbot tư vấn</Text>
            </View>

            <View className='w-full border' />

            {/* Tin nhắn */}
            <ScrollView className='p-3'
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
                {messages.map((msg, index) => (
                    <View
                        key={index}
                        className={`flex-row gap-2 py-2 mb-2 ${msg.type === 'user' ? 'justify-end' : ''}`}
                    >
                        {msg.type === 'bot' && (
                            <Image className='border border-gray-200 rounded-full w-[40px] h-[40px]' source={images.chatbot} />
                        )}
                        <View
                            className={`p-2 rounded-md max-w-[80%] ${msg.type === 'user' ? 'items-end self-end' : 'self-start'}`}
                            style={{
                                backgroundColor: msg.type === 'user'
                                    ? 'rgba(0, 188, 0, 0.1)'
                                    : 'rgba(200, 200, 200, 0.2)',
                                flexShrink: 1, // 🔥 Ngăn tràn nội dung
                            }}
                        >
                            <Text className='font-medium text-[16px]'>{msg.text}</Text>
                        </View>
                        {msg.type === 'user' && (
                            <Image className='border border-gray-200 rounded-full w-[40px] h-[40px]' source={user?.imageUrl ? { uri: user.imageUrl } : images.chatbot} />
                        )}
                    </View>
                ))}
                {isTyping && (
                    <View className="flex-row items-center gap-2 mt-2 my-4">
                        <ActivityIndicator size="small" color="#0B9A61" />
                        <Text className="text-sm text-gray-500">Bot đang trả lời...</Text>
                    </View>
                )}

            </ScrollView>

            {/* Ô nhập */}
            <View className="flex-row gap-2 items-center border border-gray-300 px-4 py-2 bg-white">
                <TextInput
                    value={text}
                    onChangeText={setText}
                    className="w-[90%] text-black border border-gray-300 rounded-full px-2"
                    placeholder="Nhập tin nhắn..."
                    placeholderTextColor="#888"
                />
                <TouchableOpacity onPress={handleChat}>
                    <Ionicons
                        name="send-outline"
                        color="#0B9A61"
                        size={30}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default IndexChat;

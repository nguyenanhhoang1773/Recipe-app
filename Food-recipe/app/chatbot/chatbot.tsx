import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

const ChatbotFloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true); // hiển thị trong 3s

      const hideTimeout = setTimeout(() => {
        setVisible(false);
      }, 3000);
      
      return () => clearTimeout(hideTimeout);
    }, 13000); // mỗi vòng là 13 giây (10s chờ + 3s hiển thị)

    return () => clearInterval(interval);
  }, []);

  const handlenavigation = () => {
    setVisible(false);
    router.push({ pathname: '/chatbot/IndexChat' });
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlenavigation}
        className="absolute bottom-[60px] right-3 bg-primary rounded-full p-5 z-50"
      >
        <Ionicons name="chatbubble-ellipses" size={30} color="white" />
      </TouchableOpacity>

      {visible && (
        <View className="absolute bottom-[70px] right-6 w-72 max-h-96 bg-white rounded-xl p-3 shadow-lg z-40 border border-gray-200">
          <Text className="font-semibold text-base mb-2 text-black">
            Bạn có cần tư vấn món ăn?
          </Text>
        </View>
      )}
    </>
  );
};

export default ChatbotFloatingButton;

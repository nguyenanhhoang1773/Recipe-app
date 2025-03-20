import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import images from "@/constant/images";
const Scan = () => {
  const [image, setImage] = useState(null);
  console.log("sao nó ko log ra đc")

  const handleCamera = async () => {
    try {
      const result = await launchCamera({ mediaType: 'photo', quality: 0.8 });
      console.log("Kết quả từ launchImageLibrary:", result);
      // ... xử lý kết quả
  } catch (error) {
      console.error("Lỗi launchImageLibrary:", error);
  }
  };

  const handleLibraryLaunch = async () => {
    try {
        const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
        console.log("Kết quả từ launchImageLibrary:", result);
        // ... xử lý kết quả
    } catch (error) {
        console.error("Lỗi launchImageLibrary:", error);
    }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn Hình Ảnh</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={ handleCamera}>
          <Text style={styles.buttonText}>Chụp Ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText} onPress={handleLibraryLaunch}>Chọn từ Thư Viện</Text>
        </TouchableOpacity>
      </View>
      {image && <Image source={image} style={styles.image} />}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});
export default Scan
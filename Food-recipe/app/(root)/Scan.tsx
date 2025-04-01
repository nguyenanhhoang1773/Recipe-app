import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from 'react';

const Scan = () => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus !== "granted" || libraryStatus !== "granted") {
        alert("Cần cấp quyền để chụp ảnh hoặc chọn ảnh!");
      }
    })();
  }, []);

  // Chọn ảnh từ thư viện
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    });

    if (result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("Bạn chưa chọn ảnh nào");
    }
  };

  // Chụp ảnh từ camera
  const takePhotoAsync = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Bạn chưa cấp quyền sử dụng camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1
    });

    if (result.assets && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("Bạn chưa chụp ảnh nào");
    }
  };

  return (
    <View style={styles.container}>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <Text style={styles.title}>Chọn Hình Ảnh</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhotoAsync}>
          <Text style={styles.buttonText}>Chụp Ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImageAsync}>
          <Text style={styles.buttonText}>Chọn từ Thư Viện</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
    marginBottom: 20,
  },
});

export default Scan;

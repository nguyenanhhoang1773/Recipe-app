import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import images from "@/constant/images";
const Scan = () => {

 

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chọn Hình Ảnh</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Chụp Ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText} >Chọn từ Thư Viện</Text>
        </TouchableOpacity>
      </View>
      {/* {image && <Image source={image} style={styles.image} />} */}
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
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function App() {
  const [capturedImage, setCapturedImage] = useState(null);
  const [detectedObjects, setDetectedObjects] = useState([]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const formData = new FormData();
      formData.append('image_file', {
        uri: result.assets[0].uri,
        name: 'image.jpg',
        type: 'image/jpg',
      });

      try {
        const response = await axios.post('http://192.168.0.106:4000/detect', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Response Status Code:', response.status);

        if (response.status === 200) {
          const boxes = await response.data;
          console.log('Response Body:', boxes);

          // Actualiza el estado de los objetos detectados
          setDetectedObjects(boxes);
        } else {
          console.log('Error in the request:', response.status);
        }
      } catch (error) {
        console.log('Error during image recognition:', error.message);
      }

      setCapturedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}> Seleccionar Imagen</Text>
      </TouchableOpacity>

      {capturedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: capturedImage }} style={styles.image} />
          {detectedObjects.map(([x1, y1, x2, y2, label, confidence], index) => (
            <View key={index} style={[styles.rectangle, { left: x1, top: y1, width: x2 - x1, height: y2 - y1 }]}>
              <Text style={styles.label}>{`${label} (${confidence})`}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 640,
    height: 350,
    marginBottom: 50,
  },
  rectangle: {
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
  label: {
    color: '#00FF00',
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
});

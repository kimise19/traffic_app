import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import objectData from '../componets/data3D/data.json';

const DetectionScreen = () => {
  const cameraRef = useRef(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [detectedObject, setDetectedObject] = useState(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const serverIp = 'http://192.168.0.106:4000';

  const processFrame = async () => {
    try {
      if (cameraRef.current && isCameraReady) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 1,
            base64: true,
          });

          const response = await axios.post(`${serverIp}/detect`, {
            image: photo.base64,
          });

          console.log('Response Status Code:', response.status);
          console.log('Response Body:', response.data);

          if (response.status === 200 && response.data.length > 0) {
            const detectedItem = response.data[0];
            setDetectedObject(detectedItem);
          } else {
            // No hay objeto detectado, limpiar estado
            setDetectedObject(null);
          }
        }
      }
    } catch (error) {
      console.error('Error during object detection:', error.message);
    } finally {
      requestAnimationFrame(processFrame);
    }
  };

  useEffect(() => {
    const setupCamera = async () => {
      try {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
          setCameraReady(true);
        }
      } catch (error) {
        console.error('Error setting up camera:', error.message);
      }
    };

    setupCamera();

    return () => {
      // Limpieza necesaria al desmontar el componente
      // ...
    };
  }, []);

  useEffect(() => {
    if (isCameraReady) {
      requestAnimationFrame(processFrame);
    }
  }, [isCameraReady]);

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={(ref) => {
          cameraRef.current = ref;
        }}
        style={{ flex: 1 }}
        onCameraReady={() => setCameraReady(true)}
        onMountError={(error) => console.error('Camera mount error:', error.message)}
        type={Camera.Constants.Type.back}
      />
      {detectedObject && (
        <>
          {/* Mostrar la imagen del objeto */}
          <Image
            style={{
              position: 'absolute',
              left: (detectedObject[0] / 4320) * screenWidth,
              top: (detectedObject[1] / 5760) * screenHeight,
              width: (detectedObject[2] / 4320) * screenWidth - (detectedObject[0] / 4320) * screenWidth,
              height: (detectedObject[3] / 5760) * screenHeight - (detectedObject[1] / 5760) * screenHeight,
            }}
            source={{ uri: objectData.find(obj => obj.name === detectedObject[4])?.image }}
          />
          {/* Mostrar el nombre del objeto */}
          <View style={[styles.detectedObjectContainer, { left: (detectedObject[0] / 4320) * screenWidth, top: (detectedObject[1] / 5760) * screenHeight - 30 }]}>
            <Text style={styles.detectedObjectNameText}>{detectedObject[4]}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detectedObjectContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 255, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
  },
  detectedObjectNameText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DetectionScreen;

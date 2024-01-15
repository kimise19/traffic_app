import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const DetectionScreen = () => {
  const cameraRef = useRef(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [detectedObjectName, setDetectedObjectName] = useState(null);
  const [detectedObjectRect, setDetectedObjectRect] = useState(null);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const serverIp = 'http://192.168.0.106:4000';

  const processFrame = async () => {
    try {
      if (cameraRef.current && isCameraReady) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        if (status === 'granted') {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 1, // Ajusta la calidad para aumentar la resolución (1 es la máxima)
            base64: true,
          });

          const response = await axios.post('${serverIp}/detect', {
            image: photo.base64,
          });

          console.log('Response Status Code:', response.status);
          console.log('Response Body:', response.data);

          if (response.status === 200 && response.data.length > 0) {
            const detectedItem = response.data[0];
            setDetectedObjectName(detectedItem[4]);

            // Calcular los puntos para formar el rectángulo
            const x1 = (detectedItem[0] / 4320) * screenWidth;
            const y1 = (detectedItem[1] / 5760) * screenHeight;
            const x2 = (detectedItem[2] / 4320) * screenWidth;
            const y2 = (detectedItem[3] / 5760) * screenHeight;
            setDetectedObjectRect({ x1, y1, x2, y2 });
          } else {
            // No hay objeto detectado, limpiar estados
            setDetectedObjectName(null);
            setDetectedObjectRect(null);
          }
        }
      }
    } catch (error) {
      console.error('Error during object detection:', error.message);
    } finally {
      // Continuar procesando fotogramas
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
      // Comenzar el procesamiento de fotogramas
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
      {detectedObjectName && detectedObjectRect && (
        <>
          {/* Dibujar el rectángulo */}
          <View
            style={[
              styles.detectedObjectRect,
              {
                left: detectedObjectRect.x1,
                top: detectedObjectRect.y1,
                width: detectedObjectRect.x2 - detectedObjectRect.x1,
                height: detectedObjectRect.y2 - detectedObjectRect.y1,
              },
            ]}
          />
          {/* Mostrar el nombre del objeto */}
          <View style={[styles.detectedObjectContainer, { left: detectedObjectRect.x1, top: detectedObjectRect.y1 - 30 }]}>
            <Text style={styles.detectedObjectNameText}>{detectedObjectName}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detectedObjectRect: {
    position: 'absolute',
    borderColor: 'green',
    borderWidth: 2,
  },
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
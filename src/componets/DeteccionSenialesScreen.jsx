import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import objectData from '../componets/data3D/data.json';
import Icon from 'react-native-vector-icons/Ionicons';

const DetectionScreen = ({ navigation }) => {
  const cameraRef = useRef(null);
  const [isCameraReady, setCameraReady] = useState(false);
  const [detectedObject, setDetectedObject] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const serverIp = 'http://192.168.0.106:4000';

  // Añadir animación de rotación
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.timing(spinValue, {
      toValue: 1,
      duration: 10000, // Duración de la rotación en milisegundos
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.loop(spinAnimation).start();

    // Restablecer la animación al desmontar el componente
    return () => {
      spinValue.setValue(0);
    };
  }, []);

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
            setShowDescription(false);
          } else {
            // No hay objeto detectado, limpiar estado
           // setDetectedObject(null);
            setShowDescription(false);
          }
        } else {
          // Si los permisos no han sido concedidos, manejar el caso aquí
          console.warn('Permisos de cámara no concedidos.');
          setDetectedObject(null);
          setShowDescription(false);
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

  const goBackToMainMenu = () => {
    navigation.navigate('MainMenu');
  };
  console.log('Detected Object:', detectedObject);
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
          {/* Mostrar la imagen del objeto con animación de rotación */}
          <Animated.Image
            style={{
              position: 'absolute',
                left: screenWidth /20, // Ajusta la posición izquierda para centrar la imagen
                top: screenHeight /20, // Ajusta la posición superior para centrar la imagen
                width: (screenWidth / 2.1)*2, // Ajusta el ancho para que sea la mitad de la pantalla
                height: (screenHeight / 2.5)*2, // Ajusta la altura para que sea la mitad de la pantalla
                resizeMode: 'contain',
              transform: [{ rotateY: spinValue.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] }) }],
            }}
            source={{ uri: objectData.find(obj => obj.name === detectedObject[4])?.image }}
          />
          {/* Mostrar la descripción debajo de la imagen */}
        <View style={[styles.descriptionContainer]}>
          <Text style={styles.descriptionText}>
            {objectData.find(obj => obj.name === detectedObject[4])?.description || 'Descripción no disponible'}
          </Text>
        </View>
        </>

      )}
      
      {/* Botón flotante para regresar al MainMenu */}
      <TouchableOpacity style={styles.floatingButton} onPress={goBackToMainMenu}>
        <Icon name="arrow-back" size={40} color="#63B5E5" />
      </TouchableOpacity>
      
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
  floatingButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    borderRadius: 30,
    padding: 20,
  },
  descriptionContainer: {
    position: 'absolute',
    backgroundColor: '#3498db', // Azul más claro
    top: 750,
    left: 50,
    borderRadius: 12,
    padding: 15,
    width: '80%', // Ancho del 80% de la pantalla
    alignSelf: 'center', // Centrar horizontalmente
    //top: screenHeight - 120, // Ajustar la posición desde la parte inferior
    elevation: 5,
  },
  descriptionText: {
    color: '#ecf0f1', // Blanco más claro
    fontSize: 15,
    textAlign: 'center', // Centrar el texto horizontalmente
   // fontFamily: '',
  },
});

export default DetectionScreen;

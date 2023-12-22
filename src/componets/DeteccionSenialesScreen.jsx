import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native'; // Importante agregar esta línea

const DeteccionSenialesScreen = () => {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [modelo, setModelo] = useState(null);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const cargarModeloONNX = async () => {
      try {
        await tf.ready();
        // Cargar el modelo como recurso local utilizando require
        const loadedModel = await tf.loadGraphModel(require('./models/best.onnx'));
        setModelo(loadedModel);
      } catch (error) {
        console.error('Error al cargar el modelo ONNX:', error);
      }
    };

    cargarModeloONNX();

    return () => {
      if (modelo) {
        modelo.dispose();
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleCameraCapture = async () => {
    if (cameraRef.current && modelo) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });

      try {
        const inputTensor = tf.tensor([photo.base64]); // Ajusta según el formato de entrada del modelo
        const output = modelo.predict(inputTensor);
        const resultados = output.dataSync();

        setPredictions(resultados);

        inputTensor.dispose();
        output.dispose();
      } catch (error) {
        console.error('Error en la inferencia del modelo ONNX:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No se ha otorgado permiso para acceder a la cámara.</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} type={Camera.Constants.Type.back}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleCameraCapture} style={styles.button}>
            <Text style={styles.buttonText}>Capturar</Text>
          </TouchableOpacity>
        </View>
      </Camera>

      {/* Muestra las predicciones en la interfaz */}
      {predictions.length > 0 && (
        <View style={styles.predictionsContainer}>
          {predictions.map((prediction, index) => (
            <Text key={index} style={styles.predictionText}>
              {prediction.class} - Confianza: {prediction.confidence.toFixed(3)}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
  },
  button: {
    backgroundColor: "#63B5E5",
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  predictionsContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 10,
    borderRadius: 5,
    maxWidth: 300,
  },
  predictionText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default DeteccionSenialesScreen;

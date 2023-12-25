import React from 'react';
import { Modal, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const DescripcionPage = ({ signal, onClose }) => {
  return (
    <Modal transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CloseButton onPress={onClose} />
          <SignalDetails signal={signal} />
        </View>
      </View>
    </Modal>
  );
};

const CloseButton = ({ onPress }) => (
  <TouchableOpacity style={styles.closeButton} onPress={onPress}>
    <Text style={styles.closeButtonText}>X</Text>
  </TouchableOpacity>
);

const SignalDetails = ({ signal }) => (
  <>
    <Text style={styles.signalName}>{signal.nombre}</Text>
    <Image style={styles.signalImage} source={{ uri: signal.imagen }} />
    <Text style={styles.signalInfo}>Tipo de señal: {signal.tipo_senial}</Text>
    <Text style={styles.signalInfo}>Nombre: {signal.nombre}</Text>
    <Text style={styles.signalInfo}>Descripción: {signal.descripcion}</Text>
  </>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    backgroundColor: '#2C2C38',
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'white',
  },
  signalName: {
    fontSize: 28,
    color: 'white',
    marginBottom: 16,
  },
  signalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  signalInfo: {
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
});

export default DescripcionPage;

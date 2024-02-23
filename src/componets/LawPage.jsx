import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
      <Icon name="arrow-back" size={50} color="#63B5E5" />
    </TouchableOpacity>
  </View>
);

const LawPage = () => {
  const pdfUrl = 'https://www.obraspublicas.gob.ec/wp-content/uploads/downloads/2021/08/LOTAIP_6_Ley-Organica-de-Transporte-Terrestre-Transito-y-Seguridad-Vial-2021.pdf';

  // Función para manejar la apertura del enlace con aplicaciones externas
  const handleOpenLink = async () => {
    try {
      const supported = await Linking.canOpenURL(pdfUrl);

      if (supported) {
        await Linking.openURL(pdfUrl);
      } else {
        console.error('No se puede abrir el enlace:', pdfUrl);
      }
    } catch (error) {
      console.error('Error al intentar abrir el enlace:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Leyes de Tránsito</Text>
        <Image
          source={require("./images/leyes_logo.jpg")}
          style={styles.image}
        />

        {/* Botón para abrir el enlace con aplicaciones externas */}
        <TouchableOpacity style={styles.button} onPress={handleOpenLink}>
          <Text style={styles.buttonText}>Descargar</Text>
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
    backgroundColor: '#2C2C38',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#63B5E5',
    padding: 10,
  },
  image: {
    width: 400,
    height: 400,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  button: {
    width: 250,
    height: 60,
    backgroundColor: '#63B5E5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  headerContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
});

export default LawPage;

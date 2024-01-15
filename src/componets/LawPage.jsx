import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
      <Icon name="arrow-back" size={50} color="#63B5E5" />
    </TouchableOpacity>
  </View>
);

const LawPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Leyes de Tránsito</Text>
        <Image
          source={{
            uri: 'https://transitoecuador.com/wp-content/uploads/nueva-ley-de-transito-ecuador-2021.jpg', // 
          }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.button} onPress={() => console.log('Descargar')}>
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
      padding:  10,
    },
    image: {
      width: 400,
      height:400,
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
      left:20,
    },
   

  });
  
  export default LawPage;
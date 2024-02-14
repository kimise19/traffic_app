import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={50} color="#FFFFFF" style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const ImageDetailPage = ({ route }) => {
  const { image } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <View style={styles.imageContainer}>
        <Text style={styles.title}>{image.nombre}</Text>
        <Image source={{ uri: image.imagen }} style={styles.image} resizeMode="contain" />
      </View>
      
      <Text style={styles.description}>{image.descripcion}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2C2C38',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    marginBottom: 10,
  },
  image: {
    flex: 1,
    borderRadius: 10,
  },
  title: {
    fontSize: 25,
    top: -20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ADD8E6',
    marginVertical: 8,
  },
  description: {
    padding: 10,
    fontSize: 18,
    color: '#ADD8E6',
    marginVertical: 8,
  },
  headerContainer: {
    position: 'absolute',
    top: 75,
    //left: '40%',
    zIndex: 1,
  },
  icon: {
    width: 75,
    height: 75,
    backgroundColor: 'rgba(99, 181, 229, 1)',
    borderRadius: 75/2,
    padding: 11,
  },
});

export default ImageDetailPage;

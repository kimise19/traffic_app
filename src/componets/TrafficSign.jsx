import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
      <Icon name="arrow-back" size={50} color="#63B5E5" />
    </TouchableOpacity>
  </View>
);

const TransitoPage = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://us-central1-swtesis-e0343.cloudfunctions.net/app/api/seniales');
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderImagesByType = () => {
    const imagesByType = {};

    if (data) {
      data.forEach(item => {
        const { tipo_senial } = item;

        if (!imagesByType[tipo_senial]) {
          imagesByType[tipo_senial] = [];
        }

        imagesByType[tipo_senial].push(item);
      });
    }

    return imagesByType;
  };

  const handleImagePress = (image) => {
    navigation.navigate('ImageDetailPage', { image });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#63B5E5" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Header navigation={navigation} />
      {error ? (
        <Text>Error al cargar datos</Text>
      ) : (
        <View>
          {Object.entries(renderImagesByType()).map(([type, images]) => (
            <View key={type} style={styles.typeContainer}>
              <Text style={styles.title}>{type}</Text>
              <View style={styles.imageRow}>
                {images.map((image, index) => (
                  <TouchableOpacity key={index} style={styles.imageContainer} onPress={() => handleImagePress(image)}>
                    <Image source={{ uri: image.imagen }} style={styles.image} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#2C2C38',
  },
  typeContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ADD8E6',
    marginVertical: 8,
  },
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    marginRight: 'auto',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C2C38',
  },
});

export default TransitoPage;

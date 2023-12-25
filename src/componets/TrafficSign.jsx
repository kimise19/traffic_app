import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import DescripcionPage from './DescripcionPage';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Asegúrate de importar el ícono adecuado

const TransitoPage = ({ navigation }) => {
  const [signalCategories, setSignalCategories] = useState({});
  const [addedImageUrls, setAddedImageUrls] = useState(new Set());
  const [selectedSignal, setSelectedSignal] = useState(null);

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    try {
      const response = await fetch('https://us-central1-swtesis-e0343.cloudfunctions.net/app/api/seniales');
      const data = await response.json();
      organizeSignalsByCategory(data);
    } catch (error) {
      console.error('Failed to load signals', error);
    }
  };

  const organizeSignalsByCategory = (signals) => {
    const order = {
      'R1': 1,
      'R2': 2,
      // ... (add the rest of your order mapping)
    };

    signals.sort((a, b) => (order[a.id_clase] || Number.POSITIVE_INFINITY) - (order[b.id_clase] || Number.POSITIVE_INFINITY));

    const newSignalCategories = { ...signalCategories };

    signals.forEach((signal) => {
      const category = signal.tipo_senial;
      const imageUrl = signal.imagen;

      if (!addedImageUrls.has(imageUrl)) {
        newSignalCategories[category] = newSignalCategories[category] || [];
        newSignalCategories[category].push(signal);
        setAddedImageUrls(new Set([...addedImageUrls, imageUrl]));
      }
    });

    setSignalCategories(newSignalCategories);
  };

  const buildImageGrid = (category, crossAxisCount) => (
    <View style={styles.imageGrid}>
      {signalCategories[category].map((signal, index) => (
        <SignalImage key={index} signal={signal} onPress={() => setSelectedSignal(signal)} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header personalizado */}
      <Header navigation={navigation} />

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {Object.keys(signalCategories).map((category) => (
          <View key={category}>
            <SignalCategory title={category} />
            {buildImageGrid(category, calculateCrossAxisCount(Dimensions.get('window').width))}
          </View>
        ))}
      </ScrollView>

      {selectedSignal && (
        <DescripcionPage
          signal={selectedSignal}
          onClose={() => setSelectedSignal(null)}
        />
      )}
    </View>
  );
};

const SignalImage = ({ signal, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      style={[styles.image, { marginRight: 1 }]}
      source={{ uri: signal.imagen }}
      resizeMode="cover"
      PlaceholderContent={<ActivityIndicator />}
    />
  </TouchableOpacity>
);

const SignalCategory = ({ title }) => (
  <View>
    <Text style={styles.categoryTitle}>{title}</Text>
    <View style={styles.divider} />
  </View>
);

const Header = () => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.navegate}>
      <Icon name="arrow-back" size={30} color="#63B5E5" />
    </TouchableOpacity>
  </View>
);

const calculateCrossAxisCount = (width) => Math.floor(width / 120);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C2C38',
  },
  scrollViewContent: {
    padding: 16,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ADD8E6',
    marginVertical: 8,
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  image: {
    width: Dimensions.get('window').width / calculateCrossAxisCount(Dimensions.get('window').width) - 16,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  headerContainer: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default TransitoPage;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DescripcionPage from './DescripcionPage'; // Importa tu componente DescripcionPage

const TransitoPage = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [signalCategories, setSignalCategories] = useState({});
  const [selectedSignal, setSelectedSignal] = useState(null);
  const [addedImageUrls, setAddedImageUrls] = useState(new Set());

  useEffect(() => {
    fetchSignals();
  }, []);

  const fetchSignals = async () => {
    try {
      setLoading(true);

      const response = await fetch('https://us-central1-swtesis-e0343.cloudfunctions.net/app/api/seniales');
      const data = await response.json();
      organizeSignalsByCategory(data);
    } catch (error) {
      console.error('Failed to load signals', error);
    } finally {
      setLoading(false);
    }
  };

  const organizeSignalsByCategory = (signals) => {
    const order = {
      'R1': 1,
      'R2': 2,
      // ... (add the rest of your order mapping)
    };

    signals.sort((a, b) => (order[a.id_clase] || Number.POSITIVE_INFINITY) - (order[b.id_clase] || Number.POSITIVE_INFINITY));

    const newSignalCategories = {};

    signals.forEach((signal) => {
      const category = signal.tipo_senial;
      const imageUrl = signal.imagen;

      if (!addedImageUrls.has(imageUrl)) {
        newSignalCategories[category] = newSignalCategories[category] || [];
        newSignalCategories[category].push(signal);
        setAddedImageUrls((prevSet) => new Set([...prevSet, imageUrl]));
      }
    });

    setSignalCategories(newSignalCategories);
  };

  const buildImageGrid = (category) => (
    <View style={styles.imageGrid}>
      {signalCategories[category].map((signal, index) => (
        <SignalImage key={index} signal={signal} onPress={() => setSelectedSignal(signal)} />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />

      {loading && <ActivityIndicator style={styles.loader} size="large" color="#63B5E5" />}

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {Object.keys(signalCategories).map((category) => (
          <View key={category}>
            <SignalCategory title={category} />
            {buildImageGrid(category)}
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

const Header = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('MainMenu')}>
      <Icon name="arrow-back" size={30} color="#63B5E5" />
    </TouchableOpacity>
  </View>
);

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
    width: Dimensions.get('window').width / Math.floor(Dimensions.get('window').width / 120) - 16,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransitoPage;

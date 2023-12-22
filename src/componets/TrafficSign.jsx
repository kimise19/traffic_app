import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, Image } from "react-native";

const TrafficSign = () => {
  const [seniales, setSeniales] = useState([]);

  useEffect(() => {
    // Llamada a la API de Firebase
    fetch("https://us-central1-swtesis-e0343.cloudfunctions.net/app/api/seniales")
      .then((response) => response.json())
      .then((data) => setSeniales(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={seniales}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Puedes ajustar la cantidad de columnas según tus necesidades
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.imagen }} style={styles.itemImage} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgb(99, 181, 229)',
  },
  itemContainer: {
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  itemImage: {
    width: 102, // Ancho de la imagen
    height: 102, // Altura de la imagen
    resizeMode: 'cover',
  },
});

export default TrafficSign;

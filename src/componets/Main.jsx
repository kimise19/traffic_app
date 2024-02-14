import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const Main = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("./images/logo.png")}  
        style={styles.logo}
      />

      {/* Información con Icono de Alerta */}
      <View style={styles.infoContainer}>
        <View style={styles.infoHeader}>
          
          <Text style={styles.infoTitle}><Icon name="error-outline" size={20} color="#63B5E5" />INFORMACIÓN</Text>
        </View>
        <Text style={styles.infoText}>
          Apunte con la cámara de su dispositivo a una señal de tránsito y espere a que la aplicación la reconozca.
        </Text>
      </View>

      {/* Botón Iniciar */}
      <Button
        title="Iniciar"
        onPress={() => navigation.navigate('MainMenu')}
        buttonStyle={styles.button}  // Aplica el estilo del botón
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C2C38",
  },
  logo: {
    width: 361,
    height: 361,
    marginBottom: 1,
  },
  infoContainer: {
    marginBottom: 26,
    marginHorizontal: 41,
    alignItems: "center",
    borderWidth: 1,         
    borderColor: '#63B5E5',  
    paddingHorizontal: 19, 
    paddingVertical: 10,    
    borderRadius: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: '#fff',
  },
  infoText: {
    fontSize: 16,
    textAlign: "center",
    color: '#fff',
  },
  button: {
    width: 280,
    height: 44,
    backgroundColor: '#63B5E5',
  },
});

export default Main;

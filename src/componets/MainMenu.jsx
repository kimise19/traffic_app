// MainMenu.js
import React from "react";
import { StyleSheet, View, Text , TouchableWithoutFeedback} from "react-native";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const MainMenu = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Botones con iconos fuera del botón */}
      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Icon name="camera-alt" size={60} color="#63B5E5" />
        </View>
        <Button
          title="Camara"
          onPress={() => navigation.navigate('DeteccionSenialesScreen')}
          buttonStyle={styles.button}
          titleStyle={styles.titleStyle}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Icon name="traffic" size={60} color="#63B5E5" />
        </View>
        <Button
          title="Señales"
          onPress={() => navigation.navigate('TrafficSign')}
          buttonStyle={styles.button}
          titleStyle={styles.titleStyle}
        />
      </View>

      <View style={styles.buttonContainer}>
        <View style={styles.iconContainer}>
          <Icon name="gavel" size={60} color="#63B5E5" />
        </View>
        <Button
          title="Leyes"
          onPress={() => console.log("Botón Leyes presionado")}
          buttonStyle={styles.button}
          titleStyle={styles.titleStyle}
        />
      </View>

      {/* Icono para volver a Main */}
      <View style={styles.iconContainer}>
          <TouchableWithoutFeedback
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={60} color="#63B5E5" />
          </TouchableWithoutFeedback>
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    marginRight: 10,
  },
  button: {
    width: 156,
    height: 60,
    backgroundColor: '#63B5E5',
  },
  titleStyle: {
    fontSize: 18,
  },
});

export default MainMenu;

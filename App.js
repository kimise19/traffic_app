// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/componets/Main.jsx";
import MainMenu from "./src/componets/MainMenu.jsx";
import TrafficSign from "./src/componets/TrafficSign.jsx";
import DeteccionSenialesScreen from "./src/componets/DeteccionSenialesScreen.jsx";
import LawPage from "./src/componets/LawPage.jsx";
import ImageDetailPage from "./src/componets/ImageDetailPage.jsx"; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DeteccionSenialesScreen"
          component={DeteccionSenialesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TrafficSign"
          component={TrafficSign}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LawPage"
          component={LawPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ImageDetailPage"
          component={ImageDetailPage}
          options={{ headerShown: false }}
          //options={{ title: "Detalles de la Imagen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

// App.js (o cualquier archivo donde configures tu navegación)
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/componets/Main.jsx";
import MainMenu from "./src/componets/MainMenu.jsx";
import TrafficSign from "./src/componets/TrafficSign.jsx";
import DeteccionSenialesScreen from "./src/componets/DeteccionSenialesScreen.jsx";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }} // Oculta el encabezado en Main
        />
        <Stack.Screen
          name="MainMenu"
          component={MainMenu}
          options={{ headerShown: false }} // Oculta el encabezado en MainMenu
        />
        <Stack.Screen
          name="DeteccionSenialesScreen"
          component={DeteccionSenialesScreen}
          options={{ headerShown: false }} // Oculta el encabezado en MainMenu
        />
        <Stack.Screen
          name="TrafficSign"
          component={TrafficSign}
          options={{ headerShown: false }} // Oculta el encabezado en MainMenu
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

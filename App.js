import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold,
} from "@expo-google-fonts/montserrat";

import HomeScreen from "./screens/HomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import { fontExtra } from "./screens/styles/variables";
import LoginScreen from "./screens/LoginScreen";
import DashboardScreen from "./screens/DashboardScreen";
import ProfileScreen from "./screens/ProfileScreen";

import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import CreateProjects from "./screens/CreateProjects";

import { LogBox } from "react-native";
import CreateTask from "./screens/CreateTask";

LogBox.ignoreLogs(["Setting a timer"]);
LogBox.ignoreLogs(["function body of a different component"]);

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Proyectos";

  switch (routeName) {
    case "Proyectos":
      return "Tus Proyectos";
    case "Tareas":
      return "Tus Tareas";
    case "Reloj":
      return "Timer";
    case "Estadisticas":
      return "Estadisticas";
  }
}

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: "#0E121A",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: "white",
    textTransform: "uppercase",
    fontFamily: fontExtra,
    fontSize: 16,
  },
  headerTintColor: "white",
  headerTitleAlign: "center",
};

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Start" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen
            name="Home"
            component={DashboardScreen}
            options={({ route }) => ({
              headerTitle: getHeaderTitle(route),
            })}
          />
          <Stack.Screen name="Create Projects" component={CreateProjects} />
          <Stack.Screen name="Create Tasks" component={CreateTask} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

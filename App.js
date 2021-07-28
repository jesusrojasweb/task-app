import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'
import {AppLoading} from 'expo'
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import { fontExtra } from './screens/styles/variables';

const Stack = createStackNavigator();

const globalScreenOptions = {
  headerStyle: {
    backgroundColor: '#0E121A',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: 'white', 
    textTransform: 'uppercase', 
    fontFamily: fontExtra,
    fontSize: 16
  },
  headerTintColor: 'white',
  headerTitleAlign: 'center',
}

export default function App() {

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_800ExtraBold,
  });
  if (!fontsLoaded) {
    return <View><Text>Cargando...</Text></View>;
  }else{
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen
            name="Start"
            component={HomeScreen}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
});

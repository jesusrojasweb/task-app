import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";

import { auth, db } from "../firebase";
import { colorBackground, colorLight, colorText } from "./styles/variables";
import ProjectsScreen from "./ProjectsScreen";
import TaskListScreen from "./TaskListScreen";
import TimerScreen from "./TimerScreen";
import StatisticsScreen from "./StatisticsScreen";

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ navigation, route }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const unsuscribe = db
      .collection("dashboard")
      .doc(auth.currentUser.uid)
      .collection("projects")
      .onSnapshot((snapshot) =>
        setProjects(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsuscribe;
  }, [route]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Profile")}
          style={styles.photo}
        >
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL,
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: colorLight,
        inactiveTintColor: colorText,
        labelStyle: {
          display: "none",
        },
        style: {
          backgroundColor: colorBackground,
          borderTopWidth: 3,
          borderTopColor: "#283349",
        },
      }}
      style={styles.bottomBar}
    >
      <Tab.Screen
        name="Proyectos"
        children={() => (
          <ProjectsScreen projects={projects} navigation={navigation} />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Tareas"
        component={TaskListScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="list" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Reloj"
        component={TimerScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="clock-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Estadisticas"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bar-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: colorBackground,
  },
  photo: {
    marginLeft: 31,
  },
});

import React, { useState } from "react";
import { StyleSheet, View, useWindowDimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import CompletedScreen from "./CompletedScreen";
import ProjectsPercentScreen from "./ProjectsPercentScreen";
import {
  colorBackground,
  colorPrincipal,
  fontSemiBold,
} from "./styles/variables";
import TimeLineScreen from "./TimeLineScreen";

const renderScene = SceneMap({
  first: CompletedScreen,
  second: ProjectsPercentScreen,
  third: TimeLineScreen,
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "transparent" }}
    tabStyle={{
      padding: 4,
    }}
    renderLabel={({ route, color }) => (
      <Text
        style={{
          color: color,
          backgroundColor:
            color === "rgba(255, 255, 255, 1)" ? colorPrincipal : "transparent",
          fontFamily: fontSemiBold,
          paddingHorizontal: 9,
          paddingVertical: 16,
          fontSize: 12,
          margin: 0,
          borderRadius: 8,
        }}
      >
        {route.title}
      </Text>
    )}
    style={{ backgroundColor: colorBackground }}
  />
);

const StatisticsScreen = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes, setRoutes] = useState([
    { key: "first", title: "Completado" },
    { key: "second", title: "Proyectos" },
    { key: "third", title: "Tiempo" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ windth: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({});

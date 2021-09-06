import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { backgroundDefault } from "../screens/styles/variables";

const LoadingStart = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

export default LoadingStart;

const styles = StyleSheet.create({
  container: {
    ...backgroundDefault,
    height: "100%",
    justifyContent: "center",
  },
});

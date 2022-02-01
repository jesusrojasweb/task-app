import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colorLight, fontRegular } from "../screens/styles/variables";

const TimerControls = ({ time, name, isPlaying, setIsPlaying, setIsPause }) => {
  const handlePlay = () => {
    if (isPlaying) {
      setIsPause();
    } else {
      setIsPlaying();
    }
  };

  return (
    <View style={styles.control}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.label}>{name}</Text>
      <TouchableOpacity onPress={handlePlay}>
        <FontAwesome
          name={isPlaying ? "pause" : "play"}
          size={18}
          color={colorLight}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TimerControls;

const styles = StyleSheet.create({
  control: {
    alignItems: "center",
  },
  time: {
    color: "white",
    fontFamily: fontRegular,
    fontSize: 30,
  },
  label: {
    color: colorLight,
    fontFamily: fontRegular,
  },
});

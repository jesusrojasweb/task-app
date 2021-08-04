import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input, Text } from "react-native-elements";
import {
  colorLight,
  colorText,
  fontRegular,
  fontSemiBold,
} from "../screens/styles/variables";

const Inputs = (props) => {
  const [isFocus, setIsFocus] = useState(false);

  const { labelText = "Label" } = props;

  return (
    <View style={styles().container}>
      {/* <TouchableWithoutFeedback> */}

      <Text style={styles().text}>{labelText}</Text>
      <Input
        {...props}
        inputContainerStyle={styles(isFocus).input}
        inputStyle={styles(isFocus).input}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
};

export default Inputs;

const styles = (isFocus) =>
  StyleSheet.create({
    container: {},
    text: {
      color: colorText,
      fontFamily: fontSemiBold,
      fontSize: 14,
      marginBottom: 15,
    },
    input: {
      backgroundColor: isFocus ? "#6E788C" : "#363B45",
      paddingHorizontal: 18,
      marginLeft: -10,
      borderRadius: 8,
      borderBottomColor: "transparent",
      fontSize: 14,
      fontFamily: fontRegular,
      color: isFocus ? colorLight : colorText,
      bottom: 0,
      color: "white",
    },
  });

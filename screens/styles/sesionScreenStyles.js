import { StyleSheet } from "react-native";
import { backgroundDefault, colorLight, fontRegular } from "./variables";

export const sesionScreenStyles = StyleSheet.create({
  background: {
    ...backgroundDefault,
    // height: '100%',
    paddingHorizontal: 31,
    paddingVertical: 31,
  },
  buttonPrimary: {
    marginBottom: 20,
  },
  buttonText: {
    textAlign: "center",
  },
  bottomTextContainer: {
    flexDirection: "row",
    marginTop: 17,
  },
  bottomText: {
    color: "white",
    fontFamily: fontRegular,
  },
  touchable: {
    marginLeft: 10,
  },
  touchableText: {
    color: colorLight,
    fontFamily: fontRegular,
  },
});

import React, { useLayoutEffect, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ButtonType from "../components/ButtonType";
import Inputs from "../components/Inputs";
import { auth } from "../firebase";
import { useAuth } from "../hooks/useAuth";
import { sesionScreenStyles } from "./styles/sesionScreenStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Iniciar Sesión",
    });
  }, [navigation]);

  useAuth(navigation);

  const signIn = () => {
    setIsLoading(true);

    auth
      .signInWithEmailAndPassword(email.trim(), password)
      .catch((error) => alert(error));
  };

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={sesionScreenStyles.background}
      scrollEnabled
    >
      <View style={{ marginTop: 20 }}></View>
      <Inputs
        labelText="Tu email"
        placeholder="correo@gmail.com"
        type="text"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Inputs
        labelText="Contraseña"
        placeholder="**********"
        type="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />

      {isLoading && <ActivityIndicator size="large" color="#FFFFFF" />}

      <View style={{ marginTop: 40 }}></View>

      <ButtonType
        title="Iniciar Sesión"
        type="primary"
        styleParentButton={sesionScreenStyles.buttonPrimary}
        styleParentText={sesionScreenStyles.buttonText}
        onPress={signIn}
      />
      {/* <ButtonType
                title="Iniciar Sesión con Google"
                styleParentText={sesionScreenStyles.buttonText}
                icon='google'
            /> */}

      <View
        style={{
          ...sesionScreenStyles.bottomTextContainer,
          marginTop: 40,
        }}
      >
        <Text style={sesionScreenStyles.bottomText}>
          ¿No tienes una cuenta?
        </Text>
        <TouchableOpacity
          style={sesionScreenStyles.touchable}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={sesionScreenStyles.touchableText}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingBottom: 60 }}></View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;

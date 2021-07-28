import React, { useLayoutEffect, useState } from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonType from '../components/ButtonType'
import Inputs from '../components/Inputs'
import { registerScreenStyles } from './styles/registerScreenStyles'

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Crear Cuenta'
        })
    })

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={registerScreenStyles.background}
            scrollEnabled
        >
            <Inputs
                labelText="Tu nombre"
                placeholder='Luis Lopez'
                type="text"
                value={name}
                onChangeText={text => setName(text)}
            />
            <Inputs
                labelText="Tu correo"
                placeholder='correo@gmail.com'
                type="email"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Inputs
                labelText="Contraseña"
                placeholder='***************'
                type="text"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <ButtonType
                title="Crear Cuenta"
                type="primary"
                styleParentButton={registerScreenStyles.buttonPrimary}
                styleParentText={registerScreenStyles.buttonText}
            />
            <ButtonType
                title="Sign up width Google"
                styleParentText={registerScreenStyles.buttonText}
            />
            <View style={registerScreenStyles.bottomTextContainer}>

                <Text style={registerScreenStyles.bottomText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity style={registerScreenStyles.touchable}><Text style={registerScreenStyles.touchableText}>Iniciar Sesión</Text></TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen

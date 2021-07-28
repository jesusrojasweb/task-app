import React, { useLayoutEffect, useState } from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ButtonType from '../components/ButtonType'
import Inputs from '../components/Inputs'
import { sesionScreenStyles } from './styles/sesionScreenStyles'

import {auth} from '../firebase'
import { useAuth } from '../hooks/useAuth'

const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Crear Cuenta'
        })
    })

    useAuth()

    const handleRegister = () => {
        auth.createUserWithEmailAndPassword(email.trim(),password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name.trim(),
                photoURL: 'https://secure.gravatar.com/avatar/4a173bccee235e94b623d6abd2661076?s=26&d=mm'
            })
        }).catch(error => alert(error.message))
    }
    

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={sesionScreenStyles.background}
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
                type="password"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <ButtonType
                title="Crear Cuenta"
                type="primary"
                styleParentButton={sesionScreenStyles.buttonPrimary}
                styleParentText={sesionScreenStyles.buttonText}
                onPress={handleRegister}
            />
            <ButtonType
                title="Sign up width Google"
                icon='google'
                styleParentText={sesionScreenStyles.buttonText}
            />
            <View style={sesionScreenStyles.bottomTextContainer}>

                <Text style={sesionScreenStyles.bottomText}>¿Ya tienes una cuenta?</Text>
                <TouchableOpacity 
                    style={sesionScreenStyles.touchable}
                    onPress={()=>navigation.navigate('Login')}
                ><Text style={sesionScreenStyles.touchableText}>Iniciar Sesión</Text></TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen

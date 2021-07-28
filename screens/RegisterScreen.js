import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
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
        <KeyboardAvoidingView behavior='padding' style={registerScreenStyles.background}>
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
            />
            <ButtonType
                title="Sign up width Google"
            />
            <Text>¿Ya tienes una cuenta? <TouchableOpacity><Text>Iniciar Sesión</Text></TouchableOpacity></Text>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

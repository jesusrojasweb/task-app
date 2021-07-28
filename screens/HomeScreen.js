import React, { Component, useLayoutEffect } from 'react'
import {View } from 'react-native'
import {Text} from 'react-native-elements'
import { StatusBar } from 'expo-status-bar';

import Illustration from '../assets/Illustration'
import { homeScreenStyles } from './styles/homeScreenStyles';
import ButtonType from '../components/ButtonType';

function HomeScreen ({navigation}){

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown: false
        })
    },[navigation])

    const handleNavigate = (to) => {
        navigation.navigate(to)
    }
    

    return (
        <View style={homeScreenStyles.background}>
            <View style={homeScreenStyles.illustration}>
                <Illustration/>
            </View>
            <View style={homeScreenStyles.content}>
                <Text style={homeScreenStyles.title}>Tu opción para mejorar tu enfoque</Text>
                <Text style={homeScreenStyles.description}>Utiliza tu estado de flow correctamente sin ninguna disctracción.</Text>
                <View style={homeScreenStyles.buttonsContainer}>
                    <ButtonType
                        title="Registrarme"
                        type="primary"
                        onPress={()=> handleNavigate('Register')}
                    />
                    <ButtonType
                        title="Iniciar Sesión"
                        type="outline"
                    />
                </View>
            </View>
            <StatusBar style={'light'} />
        </View>
    )
}

export default HomeScreen

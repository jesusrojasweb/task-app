import React, { useLayoutEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Avatar,Text } from 'react-native-elements'
import ProfileCards from '../components/ProfileCards'

import { auth } from '../firebase'
import { backgroundDefault, colorText, fontExtra, fontRegular } from './styles/variables'

const ProfileScreen = ({navigation}) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Perfil'
        })
    })

    const signOutUser = () => {
        auth.signOut().then(()=>{
            navigation.replace('Start')
        })
    }
    
    
    return (
        <View style={styles.container}>
            <Avatar
                source={{
                    uri: auth?.currentUser.photoURL
                }}
                containerStyle={styles.profilePhoto}
                size="xlarge"
                rounded
            />
            <Text style={styles.name} h3>{auth?.currentUser.displayName}</Text>
            <Text style={styles.tasks}>20 tareas esta semana</Text>
            <ProfileCards
                name="Cambiar Nombre"
                icon="sign-out"
                // onPress={signOutUser}
            />
            <ProfileCards
                name="Cambiar correo"
                icon="sign-out"
                // onPress={signOutUser}
            />
            <ProfileCards
                name="Cambiar Contraseña"
                icon="sign-out"
                // onPress={signOutUser}
            />
            <ProfileCards
                name="Cerrar Sesión"
                icon="sign-out"
                onPress={signOutUser}
            />
        </View>
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
    container:{
        ...backgroundDefault,
        paddingHorizontal: 31,
        height: '100%'
    },
    profilePhoto:{
        width: 100,
        height: 100,
        marginBottom: 10
    },
    name:{
        color: 'white',
        fontFamily: fontExtra,
        marginBottom: 4
    },
    tasks:{
        color: colorText,
        marginBottom: 40,
        fontFamily: fontRegular
    }
})
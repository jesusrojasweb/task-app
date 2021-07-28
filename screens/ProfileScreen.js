import React, { useLayoutEffect } from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'
import { Avatar,Text } from 'react-native-elements'
import ProfileCards from '../components/ProfileCards'

import { auth } from '../firebase'
import { backgroundDefault } from './styles/variables'

const ProfileScreen = ({navigation}) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Perfil'
        })
    })

    const signOutUser = () => {
        auth.signOut().then(()=>{
            navigation.replace('Home')
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
            <Text h3>{auth?.currentUser.displayName}</Text>
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
    },
    profilePhoto:{
        width: 100,
        height: 100,
    }
})
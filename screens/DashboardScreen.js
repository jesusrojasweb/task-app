import React, { useLayoutEffect } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import { auth } from '../firebase'

const DashboardScreen = ({navigation}) => {

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Tus proyectos',
            headerLeft: ()=>(
                <TouchableOpacity
                    onPress={signOutUser}
                    style={styles.photo}
                >
                    <Avatar 
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL
                        }}
                    />
                </TouchableOpacity>
            )
        })
    })

    const signOutUser = () => {
        auth.signOut().then(()=>{
            navigation.replace('Login')
        })
    }

    return (
        <View>
            <Text>Este es el dashboard</Text>
        </View>
    )
}

export default DashboardScreen


const styles = StyleSheet.create({
    photo: {
        marginLeft: 31
    }
})
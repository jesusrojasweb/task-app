import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import { fontSemiBold } from '../screens/styles/variables'

const ProfileCards = ({name = '',icon = '',onPress}) => {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={onPress}
        >
            <View style={styles.left}>

                <View style={styles.icon}>
                    <FontAwesome name={icon} size={18} color="white" />
                </View>
                <Text style={styles.text}>{name}</Text>
                <View style={styles.border}></View>
            </View>
            <View style={styles.right}>
                <FontAwesome name="angle-right" size={20} color="#6B7589" />
            </View>


        </TouchableOpacity>
    )
}

export default ProfileCards

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
        width: '100%'
    },
    left: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative'
    },
    icon:{
        backgroundColor: '#3F53FF',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    text:{
        color: 'white',
        fontFamily: fontSemiBold,
        marginLeft: 10,
        fontSize: 14,
    },
    border:{
        height: 2,
        width: 240,
        backgroundColor: '#1D2535',
        position: 'absolute',
        bottom: -10,
        left: 40
    }
})

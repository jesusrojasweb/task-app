import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import { colorBackground, colorText, fontRegular, fontSemiBold } from '../screens/styles/variables'
import { TouchableOpacity } from 'react-native'

const ProjectCard = ({icon, name, color, onPress}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View  style={styles.info} >
                <View style={{
                    ...styles.icon,
                    backgroundColor: `#${color}`
                }}>
                    <FontAwesome name={icon} size={24} color="white" />
                </View>
                <View  style={styles.text}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.time}>0 m</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.menu}>
                <FontAwesome name='ellipsis-h' size={24} color="white" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ProjectCard

const styles = StyleSheet.create({
    container:{
        backgroundColor: colorBackground,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 31,
        paddingVertical: 15,
        marginBottom: 8,
    },
    info:{
        flexDirection: 'row',
        alignItems:'center'
    },
    icon:{
        backgroundColor: '#3F53FF',
        padding: 14,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        marginLeft: 10
    },
    name:{
        fontFamily: fontSemiBold,
        color: 'white',
        marginBottom: 10
    },
    time:{
        color: colorText,
        fontFamily: fontRegular
    },
    menu:{
        paddingLeft: 14,
        paddingVertical: 14,
    }
})

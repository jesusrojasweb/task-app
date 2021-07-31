import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import { colorBackground, colorText, fontRegular, fontSemiBold } from '../screens/styles/variables'

const TaskCard = (props) => {

    const {focus,name,isCompleted,rest,date,id, navigation} = props

    const goEditTask = () => {
        navigation.navigate('Create Tasks', props)
    }
    

    return (
        <TouchableOpacity style={styles.container} onPress={goEditTask}>
            <View style={styles.info}>
                <TouchableOpacity style={styles.checked}></TouchableOpacity>
                <View  style={styles.texts}>
                    <Text  style={styles.name}>{name}</Text>
                    <Text style={styles.time}>Focus: {focus} m Rest: {rest} m</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.play}>
                <FontAwesome name="play" size={10} color={'#707BF7'} />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default TaskCard

const styles = StyleSheet.create({
    container:{
        backgroundColor: colorBackground,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 8,
        padding: 14,
        marginBottom: 15
    },
    info:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    checked:{
        width: 26,
        height: 26,
        borderWidth: 2,
        borderColor: '#3D8B68',
        borderRadius: 200,
        backgroundColor: '#2C5B45',
        marginRight: 20
    },
    name:{
        color: 'white',
        fontFamily: fontSemiBold,
        fontSize: 14,
        marginBottom: 8
    },
    time:{
        color: colorText,
        fontFamily: fontRegular,
        fontSize: 12
    },
    play:{
        width: 26,
        height: 26,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#707BF7',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

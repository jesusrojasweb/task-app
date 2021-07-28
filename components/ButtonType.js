import React from 'react'
import { View, StyleSheet, TouchableOpacity} from 'react-native'
import {Text} from 'react-native-elements'
import { colorLight, fontSemiBold } from '../screens/styles/variables'

const ButtonType = ({title,type,onPress,styleParentButton = {}, styleParentText = {}}) => {
    return (
        <TouchableOpacity
            title={title}
            onPress={onPress}
            style={styles(styleParentButton,styleParentText,type).button}
        >
            <Text style={styles(styleParentButton,styleParentText,type).btnText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonType



const styles = (styleParentButton,styleParentText,type) => StyleSheet.create({
    button:{
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 14,
        paddingHorizontal: 18,
        borderColor: colorLight,
        backgroundColor: type === 'primary' ? colorLight : 'transparent',
        ...styleParentButton,
    },
    btnText:{
        fontFamily: fontSemiBold,
        color: type === 'primary' ? 'white' : colorLight,
        fontSize: 16,
        ...styleParentText,
    }
})
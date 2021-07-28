import React from 'react'
import { View } from 'react-native'
import {Input,Text} from 'react-native-elements'

const Inputs = (props) => {
    const {labelText = 'Label'} = props
    return (
        <View>
            <Text>{labelText}</Text>
            <Input
                {...props}
            />
        </View>
    )
}

export default Inputs

import { StyleSheet} from 'react-native'
import { backgroundDefault } from './variables'

export const registerScreenStyles = StyleSheet.create({
    background: {
        ...backgroundDefault,
        height: '100%',
        paddingHorizontal: 31,
        paddingVertical: 31,
    }
})

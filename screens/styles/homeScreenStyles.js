import { StyleSheet } from "react-native";
import { colorPrincipal, colorText, fontExtra, fontRegular } from "./variables";

export const homeScreenStyles = StyleSheet.create({
    background: {
        backgroundColor: colorPrincipal,
        height: '100%',
        justifyContent: 'flex-end',
        paddingBottom: 40,
    },
    illustration: {
        position: 'absolute',
        paddingBottom: '40%',
        opacity: .8
    },
    content: {
        paddingHorizontal: 31
    },
    title:{
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontWeight: '800',
        fontSize: 18,
        marginBottom: 20,
        fontFamily: fontExtra
    },
    description: {
        color: colorText,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 40,
        fontFamily: fontRegular
    },
    buttonsContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        
    },
    
})
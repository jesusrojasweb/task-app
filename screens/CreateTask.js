import React, { useLayoutEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import Inputs from '../components/Inputs'
import ButtonType from '../components/ButtonType'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { backgroundDefault, colorBackground, colorText, fontSemiBold } from './styles/variables'
import DatePicker from 'react-native-datepicker'
import { auth, db } from '../firebase'

const CreateTask = (props) => {

    const now = new Date()
    
    const {
        navigation,
        route,
    } = props

    const {
        date = `${now.getFullYear()}-0${now.getMonth() + 1}-${now.getDate()}`,
        name = '',
        focus = 0,
        rest= 0,
        taskId,
        projectId
    } = route.params

    const [dateInput, setDate] = useState(date)
    const [nameText, setName] = useState(name)
    const [focusInput, setFocus] = useState(focus)
    const [restInput, setRest] = useState(rest)
    const [isLoading, setIsLoading] = useState(false)

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: name === '' ? 'Crear Tarea' : 'Editar Tarea'
        })

    }, [route])

    const createTask = async () => {
        setIsLoading(true)
        const data = {
            name: nameText,
            focus: focusInput,
            rest: restInput,
            projectId: projectId ? projectId : route.params.id,
            date: dateInput,
            isCompleted: false
        }

        if(name === ''){
            await db.collection('dashboard').doc(auth.currentUser.uid).collection('tasks').add(data)

            .then(()=>{
                navigation.goBack()
                setIsLoading(false)
            }).catch((error)=> {
                alert(error)
                setIsLoading(false)
            })
        }else{
            
            await db.collection('dashboard').doc(auth.currentUser.uid).collection('tasks').doc(taskId).set(data)

            .then(()=>{
                navigation.goBack()
                setIsLoading(false)
            }).catch((error)=> {
                alert(error)
                setIsLoading(false)
            })
        }
    }
    
    

    return (
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled
        >
            <Inputs
                labelText="Nombre de la Tarea"
                placeholder="Hacer ejercicio"
                value={nameText}
                onChangeText={(text)=> setName(text)}
                
            />
            <Text style={styles.label} >Fecha</Text>
            <DatePicker
                date={dateInput}
                mode="date"
                placerholder="Elegir fecha"
                minDate={`${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`}
                maxDate={`${now.getFullYear()}-${now.getMonth() + 2}-${now.getDate()}`}
                fontmat="DD-MM-YYYY"
                confirmBtnText="Confirmar"
                cancelBtnText="Cancelar"
                onDateChange={(date)=> setDate(date)}
                style={styles.datePicker}
                customStyles={{
                    dateInput:{
                        borderColor: 'transparent',
                    },
                    dateText:{
                        color: colorText
                    }
                }}
            />
            <Inputs
                labelText="Tiempo de enfoque (m)"
                placeholder="160"
                type="number"
                value={focusInput}
                onChangeText={(text)=> setFocus(text)}
            />
            <Inputs
                labelText="Tiempo de descanso (m)"
                placeholder="80"
                type="number"
                value={restInput}
                onChangeText={(text)=> setRest(text)}
            />
            {isLoading && <ActivityIndicator size="large" color="#FFFFFF" />}
            <View style={styles.buttonContainer}>
                <ButtonType
                    title='Cancelar'
                    styleParentButton={styles.buttons}
                    onPress={()=> navigation.goBack()}
                />
                <ButtonType
                    title='Guardar'
                    type='primary'
                    onPress={createTask}
                    styleParentButton={styles.buttons}
                />
            </View>
        </KeyboardAwareScrollView>
    )
}

export default CreateTask

const styles = StyleSheet.create({
    container: {
        ...backgroundDefault,
        padding: 31
    },
    label:{
        color: colorText,
        fontFamily: fontSemiBold,
        marginBottom: 10
    },
    datePicker:{
        width: '97%',
        borderWidth: 1,
        backgroundColor: '#363B45',
        borderRadius: 8,
        marginBottom: 15,
        borderColor: 'transparent'
    },
    buttonContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttons:{
        width: '45%'
    }
})

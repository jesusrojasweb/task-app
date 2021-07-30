import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import { Input } from 'react-native-elements'

import ButtonType from '../components/ButtonType'
import Inputs from '../components/Inputs'
import { backgroundDefault, colorBackground, colorLight, colorText, fontRegular } from './styles/variables'
import {IconFamilies} from '../IconConstant'
import ProfileCards from '../components/ProfileCards'
import { auth, db } from '../firebase'


const CreateProjects = ({navigation}) => {

    const [name, setName] = useState('')
    const [icons, setIcons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState(icons)
    const [thereIcons, setThereIcons] = useState(false)
    const [iconChoosed, setIconChoosed] = useState('')

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: 'Crear Proyecto'
        })
    },[navigation])

    const showIcons = () => {
        setIsLoading(true)
        setTimeout(()=>{

            setIcons(Object.keys(IconFamilies.FontAwesome))
            setSearchData(Object.keys(IconFamilies.FontAwesome))
            setIsLoading(false)
            setThereIcons(true)
        },100)
    }
    
    const handleSearch = (text) => {

        const searchText = text.toLowerCase().split(' ').join('-')

        let searchRequest

        if(text.trim() !== ''){
            searchRequest = icons.filter((iconName) => iconName.includes(searchText))
        }else{
            searchRequest = icons
        }
        setSearchData(searchRequest)
        setSearch(text)
    }

    const chooseIcon = (name) => {
        handleSearch(name)

        setIconChoosed(name)
    }
    
    const createProject = async () => {
        if(name.trim() !== '' && iconChoosed !== ''){

            setIsLoading(true)
            await db.collection('dashboard').doc(auth.currentUser.uid).collection('projects').add({
                name: name,
                icon: iconChoosed
            })
            .then(()=>{
                navigation.goBack()
                setIsLoading(false)
            })
            .catch((error)=> {
                alert(error)
                setIsLoading(false)
            })
        }else{
            alert('Todos los campos son requeridos')
        }
    }
    
    
    
    
    return (
        <SafeAreaView style={styles().container}>
            <ScrollView contentContainerStyle={{flexDirection: 'column'}}>
                <Inputs
                    labelText="Nombre del proyecto"
                    placeholder="Trabajo"
                    value={name}
                    onChangeText={(text)=> setName(text)}
                />

                {!thereIcons && (
                    <ProfileCards
                        name="Elegir Icono"
                        icon="list"
                        onPress={showIcons}
                    />
                )}

                {thereIcons && (
                    <Input
                    placeholder='Buscar Icono en Ingles'
                    value={search}
                    onChangeText={handleSearch}
                        inputStyle={{
                            color: 'white',
                            fontFamily: fontRegular
                        }}
                        />
                )}
                
                <View style={styles().iconList}>
                    {
                        searchData.map((iconName)=> (
                            <TouchableOpacity style={styles(iconChoosed === iconName).icon} onPress={()=> chooseIcon(iconName)}>
                                <FontAwesome name={iconName} size={20} color={iconChoosed === iconName ? 'white' : colorText} />
                            </TouchableOpacity>
                        ))
                    }
                </View>
                
                {isLoading && <ActivityIndicator size="large" color="#FFFFFF"/>}

            <ButtonType
                    title="Crear Proyecto"
                    type="primary"
                    styleParentButton={{marginTop: 20}}
                    onPress={createProject}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateProjects

const styles = (choosed) => StyleSheet.create({
    container:{
        paddingHorizontal: 31,
        paddingVertical: 31,
        flexDirection: 'column',
        height: '100%',
        ...backgroundDefault
    },
    iconList:{
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon:{
        backgroundColor: choosed ? colorLight : colorBackground,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderRadius: 8,
        width: '25%',
        marginRight: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

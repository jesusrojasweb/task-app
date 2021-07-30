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

const COLORS = [
    'FF675D',
    '3F53FF',
    '21A2FF',
    'EE4F92',
    '008E82',
    '155BE7',
    'E70012',
    'ECE833',
    '1600B5',
    '820075',
    'F4903C',
    '1FE6D5',
    '5844EB',
    '155BE7',
    '3422B4',
    '27179B',
    '46DA41',
    'B44822',
    'E700B6',
    '280CF4',
]


const CreateProjects = ({navigation}) => {

    const [name, setName] = useState('')
    const [icons, setIcons] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [searchData, setSearchData] = useState(icons)
    const [thereIcons, setThereIcons] = useState(false)
    const [iconChoosed, setIconChoosed] = useState('')
    const [color, setColor] = useState('FF675D')
    const [showColors, setShowColors] = useState(false)

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
                name,
                icon: iconChoosed,
                color
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
                {!showColors && (

                    <ProfileCards
                        name="Elegir color"
                        icon="paint-brush"
                        onPress={()=> setShowColors(true)}
                    />
                )}
                <View style={styles().iconList}>

                    {
                        showColors && COLORS.map((colorHex)=>(
                            <TouchableOpacity 
                                onPress={()=> setColor(colorHex)} 
                                style={{
                                    backgroundColor: `#${colorHex}`,
                                    width: '16%',
                                    height: 45,
                                    marginRight: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    padding: 4,
                                    borderRadius: 100,
                                    marginBottom: 8
                                }}
                            >
                                {/* <Text style={{color: 'white'}}>{colorHex}</Text> */}
                                {
                                    colorHex === color && <FontAwesome name='check' size={15} color='white' />
                                }
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
    },
})

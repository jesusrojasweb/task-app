import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { colorPrincipal, fontRegular } from './styles/variables'

import ButtonType from '../components/ButtonType'
import ProjectCard from '../components/ProjectCard'

const ProjectsScreen = ({navigation, projects}) => {

    const [thereProjects, setThereProjects] = useState(projects)

    useEffect(()=>{

        setThereProjects(projects[0] !== undefined)

    }, [projects])

    const enterProject = (id,projectName) => {
        navigation.navigate('Tareas',{
            id,projectName
        })
    }
    


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colorPrincipal}}>
            <ScrollView contentContainerStyle={{paddingTop: 31}}>

                {!thereProjects && (
                    <Text style={styles.textEmpty}>Aun no tienes proyectos</Text>
                )}
                {
                    projects.map(({id,data})=>(
                        <ProjectCard 
                            key={id} 
                            {...data}
                            onPress={()=> enterProject(id, data.name)} 
                        />
                    ))
                }

                <ButtonType
                    title="Crear proyecto"
                    type='primary'
                    styleParentButton={{marginHorizontal: 31,marginTop: 40}}
                    onPress={()=> navigation.navigate('Create Projects')}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default ProjectsScreen

const styles = StyleSheet.create({
    textEmpty:{
        color: 'white',
        fontFamily: fontRegular,
        fontSize: 20,
        marginHorizontal: 31,
        marginTop: 40,
        marginBottom: 20
    }
})

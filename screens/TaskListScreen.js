import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import ButtonType from '../components/ButtonType'
import TaskCard from '../components/TaskCard'
import { auth, db } from '../firebase'
import { colorPrincipal, fontExtra, fontRegular } from './styles/variables'

const TaskListScreen = ({navigation,route}) => {

    const {projectName, id} = route.params

    const [tasks, setTasks] = useState([])

    useEffect( ()=>{

        const unsubscribe = db.collection('dashboard').doc(auth.currentUser.uid).collection('tasks').onSnapshot(snapshot => {
            setTasks(
                snapshot.docs.filter((doc) => doc.data().projectId === id).map((doc)=>({
                    id: doc.id,
                    data: doc.data()
                }))
            )
        })

        return unsubscribe

    },[route])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    projectName && (
                        <Text style={styles.projectName}>
                            Proyecto: <Text style={{fontFamily: fontRegular}}>{projectName}</Text>
                        </Text>
                    )
                }

                {
                    tasks.map(({id, data})=>(
                        <TaskCard
                            key={id}
                            {...data}
                        />
                    ))
                }

                <ButtonType
                    title="Crear Tarea"
                    type="primary"
                    styleParentButton={{
                        marginTop: 30
                    }}
                    onPress={()=> navigation.navigate('Create Tasks',{id})}
                />

            </ScrollView>
        </SafeAreaView>
    )
}

export default TaskListScreen

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: colorPrincipal, 
        padding: 31
    },
    projectName:{
        color: 'white',
        fontFamily: fontExtra,
        fontSize: 20,
        marginBottom: 30,
    }
})

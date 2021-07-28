import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCY12oOuUj5nWgI093NpYzpc6ahdFQq-gs",
    authDomain: "task-app-jesusrojasweb.firebaseapp.com",
    projectId: "task-app-jesusrojasweb",
    storageBucket: "task-app-jesusrojasweb.appspot.com",
    messagingSenderId: "820880005075",
    appId: "1:820880005075:web:b73018083417ad2c4ec126"
};

let app

if(firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig)
}else{
    app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export {db, auth}
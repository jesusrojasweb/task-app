import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAe1PtNO1XshcYWOUVy_0zbNCfQtYjh2i8",
  apiKey: "ABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890_A",
  authDomain: "nombre-proyecto.firebaseapp.com",
  projectId: "nombre-proyecto",
  storageBucket: "nombre-proyecto.appspot.com",
  messagingSenderId: "012345678901",
  appId: "0:123456789012:web:1a2b1234567890123456yr",
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };

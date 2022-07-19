import { initializeApp } from 'firebase/app';
import 'firebase/firestore'
//import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
//import { ref, onUnmounted } from 'vue'

const config = {
    apiKey: "AIzaSyBP_Wz-cQXegrLzCxKHXOvX2_5IXsIFu8U",
    authDomain: "contrax-1df88.firebaseapp.com",
    projectId: "contrax-1df88",
    storageBucket: "contrax-1df88.appspot.com",
    messagingSenderId: "608889843373",
    appId: "1:608889843373:web:046c7c5c8112f96c27a024",
    measurementId: "G-CKXX59JM4Z"
};

const firebaseApp = initializeApp(config);

//const auth = getAuth(firebaseApp);

const db = firebaseApp.firestore();
const usersCollection = db.collection('users');

export const createUser = user => {
    return usersCollection.add(user);
}

export const getUser = async id => {
    const user = await usersCollection.doc(id).get();
    return user.exists ? user.data() : null;
}

export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user);
}

export const deleteUser = id => {
    return usersCollection.doc(id).delete();
}

// export const createAuthenticatedUser = async (email, password) => {
//     const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
//     console.log(userCredentials.user);
// }

// export const loginUser = async (email, password) => {
//    const userCredentials = await signInWithEmailAndPassword(auth, email, password);
//    console.log(userCredentials.user);
// }
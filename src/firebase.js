import firebase from 'firebase';
import 'firebase/firestore'

const config = {
    apiKey: "AIzaSyBP_Wz-cQXegrLzCxKHXOvX2_5IXsIFu8U",
    authDomain: "contrax-1df88.firebaseapp.com",
    projectId: "contrax-1df88",
    storageBucket: "contrax-1df88.appspot.com",
    messagingSenderId: "608889843373",
    appId: "1:608889843373:web:046c7c5c8112f96c27a024",
    measurementId: "G-CKXX59JM4Z"
};

const firebaseApp = firebase.initializeApp(config);

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

export const registerUser = (email, password, name) => {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        });
    }).catch(error => {
        alert(error.message);
    });
}

export const loginUser = async (email, password) => {
    let user  = {};
    let errMsg = "";
    await firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
        user = firebase.auth().currentUser;
    }).catch(error => {
        switch (error.code) {
            case 'auth/invalid-email':
                errMsg = 'Invalid email'
                break
            case 'auth/user-not-found':
                errMsg = 'No account with that email was found'
                break
            case 'auth/wrong-password':
                errMsg = 'Incorrect password'
                break
            default:
                errMsg = 'Email or password was incorrect'
                break
        }
        return errMsg;
    });
    return errMsg != "" ? errMsg : user;
}
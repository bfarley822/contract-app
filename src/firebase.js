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
const listingsCollection = db.collection('listings');

export const createListing = listing => {
    return listingsCollection.add(listing);
}

export const getListing = async id => {
    const listing = await listingsCollection.doc(id).get();
    return listing.exists ? listing.data() : null;
}
export const getAllListings = async () => {
    const listings = await listingsCollection.get();
    return listings.docs.map(listing => {
        return {id: listing.id, ...listing.data()}
    });
}

export const updateListing = (id, listing) => {
    return listingsCollection.doc(id).update(listing);
}

export const deleteListing = id => {
    return listingsCollection.doc(id).delete();
}

export const registerUser = async (email, password, name) => {
    let errMsg = "";
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        });
        // user.sendEmailVerification().then(() => {
        //     alert("verification email sent")
        // }).catch(error => {
        //     alert(error);
        // });
    }).catch(error => {
        errMsg = error.message;
    });
    return errMsg;
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

export const resetPassword = async (email) => {
    await firebase.auth().sendPasswordResetEmail(email.toString()).then(() => {
        
    }).catch(error => {
        alert(error.message);
    });
}

export const updateUser = async (user) => {
    const currUser = firebase.auth().currentUser;
    await currUser.updateProfile({
        displayName: user.firstName + " " + user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL
    }).then(() => {

    }).catch((error) => {
        alert(error.message);
    });
}

export const uploadProfilePic = async (image) => {
    let pictureUrl = null;
    const storageRef = await firebase.storage().ref(`profilePics/${image.name}`).put(image);
    await storageRef.ref.getDownloadURL().then((url) => {
        pictureUrl = url;
    }).catch((error) => {
        alert(error.message);
    });
    return pictureUrl;
}

export const uploadImage = async (image) => {
    let pictureUrl = null;
    const storageRef = await firebase.storage().ref(`images/${image.name}`).put(image);
    await storageRef.ref.getDownloadURL().then((url) => {
        pictureUrl = url;
    }).catch((error) => {
        alert(error.message);
    });
    return pictureUrl;
}
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, collection, getDoc, getDocs, query, orderBy, where, addDoc, updateDoc,onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadString } from "firebase/storage";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2vmWgpMDctM0-HdULbySOO0uDUzuJYEk",
    authDomain: "diletto-128c7.firebaseapp.com",
    projectId: "diletto-128c7",
    storageBucket: "diletto-128c7.appspot.com",
    messagingSenderId: "902461497903",
    appId: "1:902461497903:web:3344710cfc030d190c1cda",
    measurementId: "G-MSKR0EQPBG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export {app,collection,getDocs}
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
export { db, doc, onSnapshot,onAuthStateChanged, collection, getDoc, setDoc, getDocs, query,signOut, orderBy, where, addDoc, storage, ref, uploadString, uploadBytes, getDownloadURL, updateDoc, getAuth, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
export default app
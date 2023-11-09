import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDn8ScBaBDtFAMnxnP8-uEFlG5QMmoyepw",
    authDomain: "justchat-3a79e.firebaseapp.com",
    projectId: "justchat-3a79e",
    storageBucket: "justchat-3a79e.appspot.com",
    messagingSenderId: "849479600214",
    appId: "1:849479600214:web:c3752e9341ba79449653f7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth }
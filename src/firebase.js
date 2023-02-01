
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "@firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyBth-Kh1HjUy9LSDrsIy7Qn9iJVVZ1WSmM",
    authDomain: "todos-45c7f.firebaseapp.com",
    databaseURL: "https://todos-45c7f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "todos-45c7f",
    storageBucket: "todos-45c7f.appspot.com",
    messagingSenderId: "314559018354",
    appId: "1:314559018354:web:ac3d4764a2d13a48cad9eb",
    measurementId: "G-WQEX3Y2BHZ"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Corrected to getFirestore

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "#",
    authDomain: "ai-travel-planner-b3987.firebaseapp.com",
    projectId: "ai-travel-planner-b3987",
    storageBucket: "ai-travel-planner-b3987.appspot.com",
    messagingSenderId: "127529745310",
    appId: "1:127529745310:web:832de88431fa4114eb748f",
    measurementId: "G-L7G7YZXDMB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Initialize Firestore correctly

// export const analytics = getAnalytics(app);

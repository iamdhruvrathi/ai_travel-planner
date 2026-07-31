import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "ai-travel-planner-b3987.firebaseapp.com",
    projectId: "ai-travel-planner-b3987",
    storageBucket: "ai-travel-planner-b3987.appspot.com",
    messagingSenderId: "127529745310",
    appId: "1:127529745310:web:97be472b82b1e46eeb748f",
    measurementId: "G-TN7ZM4P4JB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
let analytics = null;

if (typeof window !== "undefined") {
    analytics = getAnalytics(app);
}

export { app, db, auth, analytics };

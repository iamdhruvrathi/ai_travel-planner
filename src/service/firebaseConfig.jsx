// Import the required Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "ai-travel-planner-b3987.firebaseapp.com",
  projectId: "ai-travel-planner-b3987",
  storageBucket: "ai-travel-planner-b3987.appspot.com", // ✅ Fixed storageBucket
  messagingSenderId: "127529745310",
  appId: "1:127529745310:web:97be472b82b1e46eeb748f",
  measurementId: "G-TN7ZM4P4JB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // ✅ Corrected
const db = getFirestore(app); // ✅ Initialize Firestore properly
const analytics = getAnalytics(app); // ✅ Corrected app reference

// Export instances for use in other files
export { app, db, analytics };

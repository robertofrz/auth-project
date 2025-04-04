import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXDm5_scrAnTihycPaRf0j5UrmRAxqTlI",
  authDomain: "auth-project-7f61d.firebaseapp.com",
  projectId: "auth-project-7f61d",
  storageBucket: "auth-project-7f61d.firebasestorage.app",
  messagingSenderId: "297666660094",
  appId: "1:297666660094:web:4f79a523c91eb7e84007af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

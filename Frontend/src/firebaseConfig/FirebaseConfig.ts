import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA7NB-v7vE6kAzeTTrnTK_XGqvEEfSLavk",
  authDomain: "ecodatastorage.firebaseapp.com",
  projectId: "ecodatastorage",
  storageBucket: "ecodatastorage.appspot.com",
  messagingSenderId: "1002223769475",
  appId: "1:1002223769475:web:bac3ed1ae3cc60cf3b48b6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export { auth, provider, storage };

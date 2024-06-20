// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmHU_3Lq0A9NyZYpfsnnzjbUZDFFBx4hg",
  authDomain: "imovel-app-b6a55.firebaseapp.com",
  projectId: "imovel-app-b6a55",
  storageBucket: "imovel-app-b6a55.appspot.com",
  messagingSenderId: "819263920070",
  appId: "1:819263920070:web:0dea23d81ea1eacfcbc4c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)
export{
auth,db
}

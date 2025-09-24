// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración que copias desde tu consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD8jQKgN8KH_ezxR7bc4BaWgoJho-YeBO8",
  authDomain: "prueba-29323.firebaseapp.com",
  databaseURL: "https://prueba-29323-default-rtdb.firebaseio.com",
  projectId: "prueba-29323",
  storageBucket: "prueba-29323.firebasestorage.app",
  messagingSenderId: "1070603297894",
  appId: "1:1070603297894:web:8ffe8e9d131f2e02e0f9a7",
  measurementId: "G-YGW0QR8NLF"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

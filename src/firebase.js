// Importa funções do Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDBf0v3TwzCz6eruQPE2iGBfeeRh8hZ2H4",
  authDomain: "luciadecor-cortinados-4d638.firebaseapp.com",
  databaseURL: "https://luciadecor-cortinados-4d638-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "luciadecor-cortinados-4d638",
  storageBucket: "luciadecor-cortinados-4d638.firebasestorage.app",
  messagingSenderId: "827334076343",
  appId: "1:827334076343:web:fb64890ec92bedf18fea32"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Realtime Database
const database = getDatabase(app);

export { database, ref, push };
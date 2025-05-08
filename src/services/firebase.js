// firebase.js (backend)
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// Cargar las variables de entorno
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Función para obtener las visitas desde Firestore
export const getVisits = async () => {
  const docRef = doc(db, "contador", "visitas");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().cantidad;
  } else {
    throw new Error("Documento no encontrado");
  }
};

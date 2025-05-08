import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";

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

const docRef = doc(db, "contador", "visitas");

export const getVisits = async () => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().cantidad;
  } else {
    throw new Error("Documento no encontrado");
  }
};

export const incrementVisits = async () => {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, { cantidad: increment(1) });
    const updated = await getDoc(docRef);
    return updated.data().cantidad;
  } else {
    await setDoc(docRef, { cantidad: 1 });
    return 1;
  }
};

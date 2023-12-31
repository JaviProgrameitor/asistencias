import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'

export default {
  apiKey: "AIzaSyC2qqFtsPNTfZJ3lXzPR6_yBIRNHsoslqo",
  authDomain: "control-asistencias-dfa14.firebaseapp.com",
  projectId: "control-asistencias-dfa14",
  storageBucket: "control-asistencias-dfa14.appspot.com",
  messagingSenderId: "488253676858",
  appId: "1:488253676858:web:34ebcf9c0c302f89d88403"
};

const firebaseConfig = {
  apiKey: "AIzaSyC2qqFtsPNTfZJ3lXzPR6_yBIRNHsoslqo",
  authDomain: "control-asistencias-dfa14.firebaseapp.com",
  projectId: "control-asistencias-dfa14",
  storageBucket: "control-asistencias-dfa14.appspot.com",
  messagingSenderId: "488253676858",
  appId: "1:488253676858:web:34ebcf9c0c302f89d88403"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const st = getStorage(app);

//Todo: Funciones Database
export const createDatabase = async (direccion, datos) => {
  const collectionRef = collection(db, direccion)
  const docRef = await addDoc(collectionRef, datos)
}

export const deleteDatabase = async (direccion, id) => {
  const docRef = doc(db, direccion, id)
  await deleteDoc(docRef)
}

export const updateDatabase = async (direccion, id, datos) => {
  const docRef = doc(db, direccion, id)
  await setDoc(docRef, datos)
}

//Todo: Funciones Storage
export const createStorage = async (referencia, dato) => {
  const metadata = {contentType: dato.type}
  const storageRef = ref(st, referencia)
  await uploadBytesResumable(storageRef, dato, metadata)
}

export const deleteStorage = async (referencia) => {
  const desertRef = ref(st, referencia);
  await deleteObject(desertRef)
}

export const getURLStorage = async (referencia) => {
  return await getDownloadURL(ref(st, referencia))
}
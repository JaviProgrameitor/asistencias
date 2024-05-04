import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, doc, deleteDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, uploadBytes , getDownloadURL, deleteObject } from 'firebase/storage'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";

export const firebaseConfig =  {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGE_ING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app);
const st = getStorage(app);
export const auth = getAuth(app);

export const usuarioActual = auth.currentUser

//Todo: Funciones Auth
export const createUserAuth = async (correo, contrasena) => {
  const user = await createUserWithEmailAndPassword(auth, correo, contrasena)
  .then((userCredential) => {
    // Signed in 
    return userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  console.log(user)
}

export const loginUsuario = async (correo, contrasena) => {
  const user = await signInWithEmailAndPassword(auth, correo, contrasena)
  .then((userCredential) => {
    // Signed in 
    return userCredential.user
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    throw new Error(errorMessage)

  });

  return user
}

export const verificarCodeContrasena = async (actionCode) => {
  try {
    const email = await verifyPasswordResetCode(auth, actionCode)

    return email
  } catch (error) {
    throw new Error(error.message)
  }
}

export const resetPassword = async (correo) => {
  sendPasswordResetEmail(auth, correo)
  .then((respuesta) => {
    return respuesta
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}

export const confirmarContrasena = async (actionCode, newPassword) => {
  const respuesta = confirmPasswordReset(auth, actionCode, newPassword)
  .then((res) => res)
  .catch(error => {
    throw new Error(error.message)
  })

  return respuesta
}

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

export const createStorageBlob = async (referencia, dato) => {
  const metadata = {
    contentType: 'image/png',
  };
  const storageRef = ref(st, referencia)
  await uploadBytes(storageRef, dato, metadata)
}

export const deleteStorage = async (referencia) => {
  const desertRef = ref(st, referencia);
  await deleteObject(desertRef)
}

export const getURLStorage = async (referencia) => {
  return await getDownloadURL(ref(st, referencia))
}
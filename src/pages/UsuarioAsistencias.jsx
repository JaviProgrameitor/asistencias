
import { useState, useEffect } from "react"

import { Routes, Route } from "react-router-dom"

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

import UsuarioAsistenciasContenido from "./UsuarioAsistenciasContenido";

function UsuarioAsistencias(props) {
  const { claveEstudiante } = props.datos

  const [ asistenciasEntrada, setAsistenciasEntrada ] = useState([])

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

    //Todo: Función para leer los datos de la base de datos
    useEffect(
      () => 
      onSnapshot(collection(db, 'asistenciasEntrada'),(snapshot) => 
        setAsistenciasEntrada(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
    )

  return (
    <div>
      <h3 className='titulos-1'>Asistencias</h3>
      <Routes>
        <Route path='/' element={<UsuarioAsistenciasContenido datos={asistenciasEntrada.filter(justi => justi.claveEstudiante === claveEstudiante)} />} />
      </Routes>
    </div>
  )
}

export default UsuarioAsistencias
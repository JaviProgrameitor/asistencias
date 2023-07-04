
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"

import ReportesContenido from "./ReportesContenido"

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';


function Reportes() {
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
    <div className='container-justificantes'>
      <div className='contenedor__titulos-1'>
        <h3 className='titulos-1'>Reportes</h3>
      </div>
      <Routes>
        <Route path='/' element={<ReportesContenido flechaRegresar={false} asistencias={asistenciasEntrada} />} />
      </Routes>
    </div>
  )
}

export default Reportes
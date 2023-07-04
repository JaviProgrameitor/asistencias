import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom"

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

import TablaJustificantes from './TablaJustificantes';
import TablaJustificantesAlumno from './TablaJustificantesAlumno';
import JustificantesRechazados from './JustificantesRechazados';
import JustificantesAceptados from './JustificantesAceptados';

function Justificantes() {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const [ justificantesEnEspera, setJustificantesEnEspera ] = useState(false)
  const [ justificantesRechazados, setJustificantesRechazados ] = useState([])
  const [ justificantesAceptados, setJustificantesAceptados ] = useState([])
  const [ alumnos, setAlumnos ] = useState(false)
  const [ idAlumno, setIdAlumno ] = useState(false)
  const [ claveAlumno, setClaveAlumno ] = useState()

  function actualizarDatos(datos) {
    setClaveAlumno(datos.claveEstudiante)
    setIdAlumno(datos.id)
  }

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'justificantesEnEspera'),(snapshot) => 
      setJustificantesEnEspera(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'justificantesRechazados'),(snapshot) => 
      setJustificantesRechazados(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

    //Todo: Función para leer los datos de la base de datos
    useEffect(
      () => 
        onSnapshot(collection(db, 'justificantesAceptados'),(snapshot) => 
        setJustificantesAceptados(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        ),
        [db]
    )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'alumnos'),(snapshot) => 
        setAlumnos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  return (
    <div className='container-justificantes'>
      <div className='contenedor__titulos-1'>
        <h3 className='titulos-1'>Justificantes</h3>
      </div>
      <Routes>
        <Route path='/' element={<TablaJustificantes Justificantes={justificantesEnEspera} />} />
        <Route path='/alumnos' element={<TablaJustificantesAlumno alumnos={alumnos} idAlumno={idAlumno} actualizarDatos={actualizarDatos} />} />
        <Route path='/alumnos/justificantes-rechazados' element={<JustificantesRechazados justificantesRechazados={justificantesRechazados.filter(jus => jus.claveEstudianteJustificante === claveAlumno)} />} />
        <Route path='/alumnos/justificantes-aceptados' element={<JustificantesAceptados justificantesAceptados={justificantesAceptados.filter(jus => jus.claveEstudianteJustificante === claveAlumno)} />} />
      </Routes>
    </div>
  )
}

export default Justificantes
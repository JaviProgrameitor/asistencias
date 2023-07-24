import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom"

import TablaAlumnos from './TablaAlumnos';
import PerfilAlumno from './PerfilAlumno';
import AgregarAlumno from './AgregarAlumno';
import EditarAlumno from './EditarAlumno';

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

function Alumnos(props) {
  const { puestoAdmin } = props

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const [ perfilAlumno, setPerfilAlumno ] = useState()
  const [ idAlumno, setIdAlumno ] = useState(false)
  const [ alumnos, setAlumnos ] = useState([])
  const [ asistenciasEntrada, setAsistenciasEntrada ] = useState([])
  const [ justificantesEnEspera, setJustificantesEnEspera ] = useState([])
  const [ justificantesAceptados, setJustificantesAceptados ] = useState([])
  const [ justificantesRechazados, setJustificantesRechazados ] = useState([])

  function actualizarDatos(datos) {
    setPerfilAlumno(datos)
    setIdAlumno(datos.id)
  }

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'alumnos'),(snapshot) => 
        setAlumnos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
    onSnapshot(collection(db, 'asistenciasEntrada'),(snapshot) => 
    setAsistenciasEntrada(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
    ),
    [db]
  )

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
      onSnapshot(collection(db, 'justificantesAceptados'),(snapshot) => 
      setJustificantesAceptados(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
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

  return (
    <div className="container-alumnos">
      <div className="contenedor__titulos-1">
        <h3 className="titulos-1">Alumnos</h3>
      </div>
      <Routes>
        <Route 
          path='/' 
          element={<TablaAlumnos 
            puestoAdmin={puestoAdmin} 
            perfilAlumno={perfilAlumno} 
            actualizarDatos={actualizarDatos} 
            alumnos={alumnos} 
            idAlumno={idAlumno} 
            setIdAlumno={setIdAlumno} 
            asistenciasEntrada={asistenciasEntrada}
            justificantesAceptados={justificantesAceptados}
            justificantesEnEspera={justificantesEnEspera}
            justificantesRechazados={justificantesRechazados}
          />} 
        />
        <Route 
          path='/agregar-alumno' 
          element={<AgregarAlumno 
            alumnos={alumnos} 
          />} 
        />
        <Route 
          path='/editar-alumno' 
          element={<EditarAlumno 
            idAlumno={idAlumno} 
            datos={perfilAlumno} 
            asistenciasEntrada={asistenciasEntrada}
            justificantesAceptados={justificantesAceptados}
            justificantesEnEspera={justificantesEnEspera}
            justificantesRechazados={justificantesRechazados}
          />} 
        />
        <Route 
          path='/perfil/:identificador' 
          element={<PerfilAlumno 
            idAlumno={idAlumno} 
            datos={perfilAlumno} 
          />} 
        />
      </Routes>
    </div>
  )
}

export default Alumnos
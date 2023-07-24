
import { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom"

import TablaAsistencias from './TablaAsistencias';
import TablaAsistenciasAlumnos from './TablaAsistenciasAlumnos';
import AsistenciasPersonales from './AsistenciasPersonales';
import ReportesContenido from "./ReportesContenido"

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

function Asistencias() {
  const [ asistenciasEntrada, setAsistenciasEntrada ] = useState([])
  const [ alumnos, setAlumnos ] = useState([])
  const [ añoActual, setAñoActual ] = useState(new Date().getFullYear())
  const [ mesActual, setMesActual ] = useState(new Date().getMonth())
  const [ fechaActual, setFechaActual ] = useState(new Date().getDate())
  const [ claveAlumno, setClaveAlumno ] = useState()
  const [ idAlumno, setIdAlumno ] = useState(false)
  const [ nombreAlumno, setNombreAlumno ] = useState(false)

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  function actualizarDatos(datos) {
    setClaveAlumno(datos.claveEstudiante)
    setIdAlumno(datos.id)
    setNombreAlumno(`${datos.nombre} ${datos.apellido}`)
  }

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
      onSnapshot(collection(db, 'alumnos'),(snapshot) => 
        setAlumnos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  return (
    <div className='container-justificantes'>
      <div className='contenedor__titulos-1'>
        <h3 className='titulos-1'>Asistencias</h3>
      </div>
      <Routes>
        <Route 
          path='/' 
          element={<TablaAsistencias 
            asistenciasEntrada={asistenciasEntrada.filter(asis => asis.añoAsistenciaEntrada == añoActual && asis.mesAsistenciaEntrada == mesActual && asis.fechaAsistenciaEntrada === fechaActual && asis)} 
            fechaActual={fechaActual} 
          />} 
        />
        <Route 
          path='/alumnos' 
          element={<TablaAsistenciasAlumnos 
            idAlumno={idAlumno} 
            actualizarDatos={actualizarDatos} 
            alumnos={alumnos} 
            Asistencias={asistenciasEntrada} 
          />}
        />
        <Route 
          path='/alumnos/asistencias-personales' 
          element={<AsistenciasPersonales 
            asistenciasEntrada={asistenciasEntrada.filter(asis => asis.claveEstudianteAsistenciaEntrada === claveAlumno)} 
          />} 
        />
        <Route 
          path='/alumnos/graficas-asistencias-personales' 
          element={<ReportesContenido 
            setClaveAlumno={setClaveAlumno} 
            setIdAlumno={setIdAlumno} 
            setNombreAlumno={setNombreAlumno} 
            nombreAlumno={nombreAlumno} 
            flechaRegresar={true} 
            asistencias={asistenciasEntrada.filter(asis => asis.claveEstudianteAsistenciaEntrada === claveAlumno && asis.entradaSalidaAsistencia == 'Entrada')} 
          />} 
        />
      </Routes>
    </div>
  )
}

export default Asistencias
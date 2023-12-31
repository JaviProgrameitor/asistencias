
import { useState } from 'react';
import { Routes, Route } from "react-router-dom"

import TablaAsistencias from './TablaAsistencias';
import TablaAsistenciasAlumnos from './TablaAsistenciasAlumnos';
import AsistenciasPersonales from './AsistenciasPersonales';
import ReportesContenido from "./ReportesContenido"

function Asistencias(props) {
  const { clases, alumnos, asistenciasEntrada, idiomasImpartidos } = props

  const [ añoActual, setAñoActual ] = useState(new Date().getFullYear())
  const [ mesActual, setMesActual ] = useState(new Date().getMonth())
  const [ fechaActual, setFechaActual ] = useState(new Date().getDate())
  const [ claveAlumno, setClaveAlumno ] = useState()
  const [ idAlumno, setIdAlumno ] = useState(false)
  const [ nombreAlumno, setNombreAlumno ] = useState(false)
  const [ idiomasAlumno, setIdiomasAlumno ] = useState([])

  function actualizarDatos(datos) {
    if(datos === false) {
      setClaveAlumno(null)
      setIdAlumno(false)
      setNombreAlumno(false)
      setIdiomasAlumno([])
    }

    else {
      setClaveAlumno(datos.claveEstudiante)
      setIdAlumno(datos.id)
      setNombreAlumno(`${datos.nombre} ${datos.apellido}`)
      setIdiomasAlumno(datos.idiomaAprendizaje)
    }
  }

  return (
    <div className='container-justificantes'>
      <div className='contenedor__titulos-1'>
        <h3 className='titulos-1'>Asistencias</h3>
      </div>
      <Routes>
        <Route 
          path='/' 
          element={
            <TablaAsistencias 
              asistenciasEntrada={
                asistenciasEntrada.filter(asistencia => 
                  new Date(asistencia.fechaAsistenciaEntrada).getFullYear() == añoActual &&
                  new Date(asistencia.fechaAsistenciaEntrada).getMonth() == mesActual &&
                  new Date(asistencia.fechaAsistenciaEntrada).getDate() == fechaActual
                )
              }
            />
          } 
        />
        <Route 
          path='/alumnos' 
          element={
            <TablaAsistenciasAlumnos 
              idAlumno={idAlumno} 
              actualizarDatos={actualizarDatos} 
              alumnos={alumnos} 
              Asistencias={asistenciasEntrada} 
            />
          }
        />
        <Route 
          path='/alumnos/asistencias-personales' 
          element={
            <AsistenciasPersonales 
              asistenciasEntrada={asistenciasEntrada.filter(asis => asis.claveEstudianteAsistenciaEntrada === claveAlumno)}
              nombreAlumno={nombreAlumno} 
            />
          } 
        /> 
        <Route 
          path='/alumnos/graficas-asistencias-personales' 
          element={
            <ReportesContenido 
              setClaveAlumno={setClaveAlumno} 
              setIdAlumno={setIdAlumno} 
              setNombreAlumno={setNombreAlumno} 
              nombreAlumno={nombreAlumno} 
              flechaRegresar={true} 
              asistencias={
                asistenciasEntrada.filter(asis => 
                  asis.claveEstudianteAsistenciaEntrada === claveAlumno && asis.entradaSalidaAsistencia == 'Entrada'
                )
              }
              clases={clases}
              idiomasImpartidos={idiomasAlumno}
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default Asistencias
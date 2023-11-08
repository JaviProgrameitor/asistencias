import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom"

import TablaJustificantes from './TablaJustificantes';
import TablaJustificantesAlumno from './TablaJustificantesAlumno';
import JustificantesRechazados from './JustificantesRechazados';
import JustificantesAceptados from './JustificantesAceptados';

function Justificantes(props) {
  const { alumnos, justificantesEnEspera, justificantesRechazados, justificantesAceptados } = props

  const [ idAlumno, setIdAlumno ] = useState(false)
  const [ claveAlumno, setClaveAlumno ] = useState()

  function actualizarDatos(datos) {
    if(datos === false) {
      setClaveAlumno(null)
      setIdAlumno(false)
    }

    else {
      setClaveAlumno(datos.claveEstudiante)
      setIdAlumno(datos.id)
    }
  }

  return (
    <div className='container-justificantes'>
      <div className='contenedor__titulos-1'>
        <h3 className='titulos-1'>Justificantes</h3>
      </div>
      <Routes>
        <Route 
          path='/' 
          element={
            <TablaJustificantes 
              justificantes={justificantesEnEspera} 
            />
          } 
        />
        <Route 
          path='/alumnos' 
          element={
            <TablaJustificantesAlumno 
              alumnos={alumnos} 
              idAlumno={idAlumno} 
              actualizarDatos={actualizarDatos} 
            />
          } 
        />
        <Route 
          path='/alumnos/justificantes-rechazados' 
          element={
            <JustificantesRechazados 
              justificantesRechazados={justificantesRechazados.filter(jus => jus.claveEstudianteJustificante === claveAlumno)} 
            />
          } 
        />
        <Route 
          path='/alumnos/justificantes-aceptados' 
          element={
            <JustificantesAceptados 
              justificantesAceptados={justificantesAceptados.filter(jus => jus.claveEstudianteJustificante === claveAlumno)} 
            />
          } 
        />
      </Routes>
    </div>
  )
}

export default Justificantes
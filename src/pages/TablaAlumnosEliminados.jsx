
import { Link, useResolvedPath } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { FcContacts, FcCurrencyExchange, FcCalendar } from "react-icons/fc";
import { useState } from "react"

import FilasAlumnosEliminados from "../components/FilasAlumnosEliminados/FilasAlumnosEliminados"

function TablaAlumnosEliminados(props) {
  const { alumnosEliminados, idAlumno, setIdAlumno } =props

  const url = useResolvedPath("").pathname

  function actualizarDatos(id) {
    if(id) {
      setIdAlumno(id)
    }

    else {
      setIdAlumno(null)
    }
  }

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <h2 className='titulos-2'>Tabla de Alumnos En Seguimiento</h2>
      {/* {
        idAlumno !== null && (
          <div>
            <Link to={`${url}/actividad-alumno`}>
              <FcCalendar className='alumno-completo icon-alumno' />
            </Link>
            <Link to={`${url}/perfil/${idAlumno}`}>
              <FcContacts className='alumno-completo icon-alumno' />
            </Link>
          </div>
        )
      } */}
      <div className='contenedor__tabla-scroll tamaño-tabla_250-400'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Clave de Estudiante</th>
              <th colSpan='1'>Fecha Eliminación</th>
              <th colSpan='1'>Motivo Eliminación</th>
            </tr>
          </thead>
          <tbody className='tabla-cuerpo'>
            {
              alumnosEliminados.map((alumno, index) => 
                <FilasAlumnosEliminados 
                  datos={alumno}
                  key={index}
                  idAlumno={idAlumno}
                  actualizarDatos={actualizarDatos}
                />
              )
            } 
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaAlumnosEliminados
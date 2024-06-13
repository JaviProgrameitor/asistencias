
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useState } from "react"

import FilasAlumnosEliminados from "../components/FilasAlumnosEliminados/FilasAlumnosEliminados"

function TablaAlumnosEliminados(props) {
  const { alumnosEliminados } =props

  const [ idAlumno, setIdAlumno ] = useState(null)

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
      <h2 className='titulos-2'>Tabla de Alumnos Eliminados</h2>
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
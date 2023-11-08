import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import FilasAsistenciasEntrada from "../components/FilasAsistenciasEntrada/FilasAsistenciasEntrada"

function AsistenciasPersonales(props) {
  const { asistenciasEntrada, nombreAlumno } = props

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/asistencias/alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <h3 className='titulos-2'>Asistencias de {nombreAlumno}</h3>
      <div className='contenedor__tabla-scroll tamaño-tabla__400'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
              <tr>
                <th colSpan='1'>Entrada o Salida</th>
                <th colSpan='1'>Fecha de Asistencia</th>
                <th colSpan='1'>Hora</th>
                <th colSpan='1'>Horario</th>
                <th colSpan='1'>Modalidad</th>
              </tr>
          </thead>
          <tbody className="tabla-cuerpo">
            {
              asistenciasEntrada.map((asis, index) => 
                <FilasAsistenciasEntrada 
                  datos={asis} 
                  key={index}
                  posicion={index}
                />
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AsistenciasPersonales
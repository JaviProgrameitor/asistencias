import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import FilasAsistenciasEntrada from "../components/FilasAsistenciasEntrada/FilasAsistenciasEntrada"

function AsistenciasPersonales(props) {
  const { asistenciasEntrada } = props

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/panel-control/asistencias/alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
      </div>
      <h3 className='titulos-2'>Asistencias del día de hoy</h3>
      <div className='container-tabla'>
        <table className='tabla-alumnos'>
          <thead className='tabla-cabecera'>
              <tr>
                <th colSpan='1'>Nombre</th>
                <th colSpan='1'>Apellido</th>
                <th colSpan='1'>Clave de Estudiante</th>
                <th colSpan='1'>Fecha de Asistencia</th>
                <th colSpan='1'>Hora de Asistencia</th>
                <th colSpan='1'>Horario</th>
              </tr>
          </thead>
          <tbody className="tabla-cuerpo">
            {
              asistenciasEntrada ? asistenciasEntrada.map((asis, index) => <FilasAsistenciasEntrada 
              datos={asis} 
              key={index}
              posicion={index}
            />) 
            : <></>
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AsistenciasPersonales
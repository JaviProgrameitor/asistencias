
import { Link, useResolvedPath } from "react-router-dom"

import FilasAsistenciasEntrada from "../components/FilasAsistenciasEntrada/FilasAsistenciasEntrada"

function TablaAsistencias(props) {
  const { asistenciasEntrada } = props

  const url = useResolvedPath("").pathname

  return (
    <div>
      <h3 className='titulos-2'>Asistencias del día de hoy</h3>
      <div className='contenedor__todo-final'>
        <Link to={`${url}/alumnos`} className='boton__verde-oscuro' >
          <span>Ver Todos Los Justificantes</span>
        </Link>
      </div>
      <div className='container-tabla'>
        <table className='tabla-alumnos'>
          <thead className='tabla-cabecera'>
              <tr>
                <th colSpan='1'>Entrada o Salida</th>
                <th colSpan='1'>Nombre</th>
                <th colSpan='1'>Apellido</th>
                <th colSpan='1'>Clave de Estudiante</th>
                <th colSpan='1'>Fecha de Asistencia</th>
                <th colSpan='1'>Hora</th>
                <th colSpan='1'>Horario</th>
                <th colSpan='1'>Modalidad</th>
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

export default TablaAsistencias
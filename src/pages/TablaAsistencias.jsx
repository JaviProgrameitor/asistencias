
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
          <span>Ver todas las asistencias</span>
        </Link>
      </div>
      <div className='contenedor__tabla-scroll tamaño-tabla__400'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
              <tr>
                <th colSpan='1'>Entrada o Salida</th>
                <th colSpan='1'>Nombre</th>
                <th colSpan='1'>Apellido</th>
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
                  personales
                />
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaAsistencias
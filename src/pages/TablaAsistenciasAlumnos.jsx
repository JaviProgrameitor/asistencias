
import { Link, useResolvedPath } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import FilasAlumnos from "../components/FilasAlumnos/FilasAlumnos"

function TablaAsistenciasAlumnos(props) {
  const { alumnos, idAlumno, actualizarDatos } = props

  const url = useResolvedPath("").pathname

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/panel-control/asistencias'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
      </div>
      <h4 className="titulos-2">Selecciona el alumno para ver todas sus asistencias</h4>
      {
        idAlumno ? <div className="contenedor__todo-final">
          <Link to={`${url}/asistencias-personales`} className='boton__verde-oscuro'>Asistencias</Link>
          <Link to={`${url}/graficas-asistencias-personales`} className='boton__blanco'>Gráficas Asistencias</Link>
        </div> 
        : <></>
      }
      <div className='container-tabla'>
        <table className='tabla-alumnos'>
          <thead className='tabla-cabecera'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Número Telefónico</th>
              <th colSpan='1'>Clave de Estudiante</th>
              <th colSpan='1'>Idioma de Aprendizaje</th>
              <th colSpan='1'>Modalidad de Estudio</th>
              <th colSpan='1'>Fecha de Pago</th>
            </tr>
          </thead>
          <tbody className="tabla-cuerpo">
            {
              alumnos.map((alumno, index) => <FilasAlumnos 
                datos={alumno} 
                posicion={index} 
                key={index} 
                id={alumno.id}
                idAlumno={idAlumno}
                actualizarDatos={actualizarDatos}
              />)
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaAsistenciasAlumnos
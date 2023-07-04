
import { useState } from "react"

import FilasAsistenciasEntrada from "../components/FilasAsistenciasEntrada/FilasAsistenciasEntrada";

function UsuarioAsistenciasContenido(props) {
  const { datos } = props

  const [ asistenciasEntrada, setAsistenciasEntrada ] = useState(datos)

  return (
    <div>
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
              datos ? datos.map((asis, index) => <FilasAsistenciasEntrada 
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

export default UsuarioAsistenciasContenido
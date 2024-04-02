import 'aos/dist/aos.css';
import '../../assets/css/components/Filas.css'

import { useEffect, useState } from 'react'

function FilasAlumnos(props) {
  const { idAlumno, actualizarDatos, datos, comprobarMensualidad = false } = props
  const { 
    nombre, 
    apellido,
    claveEstudiante, 
    idiomaAprendizaje, 
    modalidadEstudio, 
    fechaPago, 
    estadoMensualidad,
    clasesMensualidad,
    id 
  } = datos
  const [ activo, setActivo ] = useState("")

  useEffect(() => {
    id === idAlumno ? setActivo('activo') : setActivo('inactivo')
  }, [idAlumno])

  return (
    <tr
      className={`fila ${activo} ${comprobarMensualidad ? clasesMensualidad.join(' ') : ''}`} 
      onClick={() => {activo === "activo" ? actualizarDatos(false) : actualizarDatos(datos)}}
    >
      <td className='td-admin'>{nombre}</td>
      <td className='td-admin'>{apellido}</td>
      <td className='td-admin'>{claveEstudiante}</td>
      {
        comprobarMensualidad && (
          <td className='td-admin td-mobil'>
            <ul>
              {
                idiomaAprendizaje.map((idioma, index) => 
                  <li key={index}>{estadoMensualidad[index]}</li>
                )
              }
            </ul>
          </td>
        )
      }
      <td className='td-admin'>
        <ul>
          {
            idiomaAprendizaje.map((idioma, index) => <li key={index}>{idioma}</li>)
          }
        </ul>
      </td>
      {
        comprobarMensualidad && (
          <>
            <td className='td-admin'>
              <ul>
                {
                  fechaPago.map((fecha, index) => <li key={index}>{fecha}</li>)
                }
              </ul>
            </td>
      
            <td className='td-admin td-desktop'>
              <ul>
                {
                  idiomaAprendizaje.map((idioma, index) => 
                    <li key={index}>{estadoMensualidad[index]}</li>
                  )
                }
              </ul>
            </td>
          </>
        )
      }
    </tr>
  )
}

export default FilasAlumnos
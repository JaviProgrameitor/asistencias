import '../../assets/css/components/Filas.css'

import { useEffect, useState } from 'react'

function FilasAlumnos(props) {
  const { idAlumno, actualizarDatos, datos, comprobarMensualidad = false } = props
  const { 
    nombre, 
    apellido, 
    numeroTelefono, 
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
      <td>{nombre}</td>
      <td>{apellido}</td>
      <td>{numeroTelefono}</td>
      <td>{claveEstudiante}</td>
      <td>
        <ul>
          {
            idiomaAprendizaje.map((idioma, index) => <li key={index}>{idioma}</li>)
          }
        </ul>
      </td>
      <td>
        <ul>
          {
            modalidadEstudio.map((modalidad, index) => <li key={index}>{modalidad}</li>)
          }
        </ul>
      </td>
      <td>
        <ul>
          {
            fechaPago.map((fecha, index) => <li key={index}>{fecha}</li>)
          }
        </ul>
      </td>
      {
        comprobarMensualidad ?
          <td>
            <ul>
              {
                idiomaAprendizaje.map((idioma, index) => 
                  <li key={index}>{estadoMensualidad[index]}</li>
                )
              }
            </ul>
          </td>
        : <></>
      }
    </tr>
  )
}

export default FilasAlumnos
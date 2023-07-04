import '../../assets/css/components/Filas.css'

import { useEffect, useState } from 'react'

function FilasAlumnos(props) {
  const { posicion, idAlumno, actualizarDatos, datos } = props
  const { nombre, apellido, numeroTelefono, claveEstudiante, idiomaAprendizaje, modalidadEstudio, fechaPago, id } = props.datos
  const [tipo, setTipo] = useState()
  const [activo, setActivo] = useState()

  useEffect(() => {
    if(posicion === 0 || posicion % 2 === 0) setTipo('elemento-par')
    else setTipo('elemento-impar')

    if(id === idAlumno) setActivo('activo')
    else setActivo('inactivo')
  }, [idAlumno])

  return (
    <tr className={`fila ${tipo} ${activo}`} onClick={() => actualizarDatos(datos)}>
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
    </tr>
  )
}

export default FilasAlumnos
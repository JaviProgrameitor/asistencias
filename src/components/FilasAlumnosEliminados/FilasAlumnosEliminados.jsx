
import '../../assets/css/components/Filas.css'

import { useEffect, useState } from 'react'

function FilasAlumnosEliminados(props) {
  const { 
    idAlumno, 
    actualizarDatos, 
    datos,
  } = props
  const { 
    nombre, 
    apellido,
    claveEstudiante,
    fechaEliminacion,
    motivoEliminacion,
    id 
  } = datos

  const [ activo, setActivo ] = useState("")

  useEffect(() => {
    id === idAlumno ? setActivo('activo') : setActivo('inactivo')
  }, [idAlumno])

  return (
    <tr
      className={`fila ${activo}`} 
      onClick={
        () => {
          activo === "activo"
            ? actualizarDatos(false)
            : actualizarDatos(id)
        }
      }
    >
      <td className='td-admin'>{nombre}</td>
      <td className='td-admin'>{apellido}</td>
      <td className='td-admin'>{claveEstudiante}</td>
      <td className='td-admin'>{new Date(fechaEliminacion).toLocaleDateString()}</td>
      <td className='td-admin'>{motivoEliminacion}</td>
    </tr>
  )
}

export default FilasAlumnosEliminados
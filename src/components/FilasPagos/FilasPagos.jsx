import '../../assets/css/components/Filas.css'

import { useEffect, useState } from 'react'
import PagosAlumnos from '../../pages/PagosAlumnos'

function FilasPagos(props) {
  const { posicion, pagoSeleccionado, setPagoSeleccionado, personal = false } = props
  const {
    nombre,
    apellido,
    claveEstudiante,
    idiomaPago,
    id,
    diaPago,
    inicioMensualidad
  } = props.datos

  const [ activo, setActivo ] = useState("")

  useEffect(() => {
    if(id === pagoSeleccionado.id) setActivo('activo')
    else setActivo('inactivo')
  }, [pagoSeleccionado.id])

  return (
    <tr 
      className={`fila ${activo}`} 
      onClick={() => {
        if(activo === 'activo') setPagoSeleccionado(false)
        else setPagoSeleccionado(props.datos)
      }}
    >
      {
        !personal
          ? <>
              <td className='td-admin'>{nombre}</td>
              <td className='td-admin'>{apellido}</td>
            </>
          : ''
      }
      
      <td className='td-admin'>{idiomaPago}</td>
      <td className='td-admin'>{new Date(diaPago).toLocaleDateString()}</td>
      <td className='td-admin'>{new Date(inicioMensualidad).toLocaleDateString()}</td>
    </tr>
  )
}

export default FilasPagos
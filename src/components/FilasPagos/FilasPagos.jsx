import '../../assets/css/components/Filas.css'

import { useEffect, useState } from 'react'
import PagosAlumnos from '../../pages/PagosAlumnos'

function FilasPagos(props) {
  const { posicion, pagoSeleccionado, setPagoSeleccionado } = props
  const {
    nombrePago,
    apellidoPago,
    claveEstudiantePago,
    idiomaPago,
    añoPagoMenActual,
    numeroMesPagoMenActual,
    fechaPagoMenActual,
    fechaCompletaPagoMenActual,
    añoDiaPago,
    mesDiaPago,
    fechaDiaPago,
    fechaCompletaDiaPago,
    id
  } = props.datos

  const [tipo, setTipo] = useState("")
  const [ activo, setActivo ] = useState("")

  useEffect(() => {
    if(id === pagoSeleccionado.id) setActivo('activo')
    else setActivo('inactivo')
  }, [pagoSeleccionado.id])

  useEffect(() => {
    if(posicion === 0 || posicion % 2 === 0) setTipo('elemento-par')
    else setTipo('elemento-impar')
  }, [posicion])

  return (
    <tr 
      className={`fila ${tipo} ${activo}`} 
      onClick={() => {
        if(activo === 'activo') setPagoSeleccionado(false)
        else setPagoSeleccionado(props.datos)
      }}
    >
      <td className='td-admin'>{nombrePago}</td>
      <td className='td-admin'>{apellidoPago}</td>
      <td className='td-admin'>{claveEstudiantePago}</td>
      <td className='td-admin'>{idiomaPago}</td>
      <td className='td-admin'>{fechaCompletaDiaPago}</td>
      <td className='td-admin'>{fechaCompletaPagoMenActual}</td>
    </tr>
  )
}

export default FilasPagos
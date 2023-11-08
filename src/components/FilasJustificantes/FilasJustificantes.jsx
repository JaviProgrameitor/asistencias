
import { useState, useEffect } from "react"

function FilasJustificantes(props) {
  const { posicion, valor, cambiarValor } = props

  const { 
    nombreJustificante, 
    apellidoJustificante, 
    claveEstudianteJustificante, 
    numeroTelefonoJustificante, 
    fechaEmisionJustificante,
    horaEmisionJustificante, 
    fechaJustificante, 
    motivoJustificante, 
    explicacionJustificante, 
    fotoJustificante, 
    id,
    correoJustificante,
    idFotoJustificante
  } = props.datos
  const [tipo, setTipo] = useState()
  const [activo, setActivo] = useState()

  useEffect(() => {
    posicion === 0 || posicion % 2 === 0 ? setTipo('elemento-par') : setTipo('elemento-impar')
  }, [posicion])

  useEffect(() => {
    valor === fotoJustificante ? setActivo('activo') : setActivo('inactivo')
  }, [valor])

  return (
    <tr 
      className={`fila fila-administrador ${tipo} ${activo}`} 
      onClick={() => { activo == 'activo' ? cambiarValor(false) : cambiarValor(props.datos) }}
    >
      <td className='td-admin'>{nombreJustificante}</td>
      <td className='td-admin'>{apellidoJustificante}</td>
      <td className='td-admin'>{claveEstudianteJustificante}</td>
      <td className='td-admin'>{horaEmisionJustificante}</td>
      <td className='td-admin'>{fechaEmisionJustificante}</td>
      <td className='td-admin'>{fechaJustificante}</td>
      <td className='td-admin'>{motivoJustificante}</td>
      <td className='td-admin'>{explicacionJustificante}</td>
    </tr>
  )
}

export default FilasJustificantes
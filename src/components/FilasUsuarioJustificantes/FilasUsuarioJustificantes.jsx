
import { useState, useEffect } from "react"

function FilasUsuarioJustificantes(props) {
  const { posicion, valor, cambiarValor } = props
  const { fechaEmisionJustificante, horaEmisionJustificante, fechaJustificante, motivoJustificante, explicacionJustificante, fotoJustificante } = props.datos

  const [tipo, setTipo] = useState()
  const [activo, setActivo] = useState()

  useEffect(() => {
    if(posicion === 0 || posicion % 2 === 0) setTipo('elemento-par')
    else setTipo('elemento-impar')

    if(valor === fotoJustificante) setActivo('activo')
      else setActivo('inactivo')
  })

  return (
    <tr className={`fila fila-administrador ${tipo} ${activo}`} onClick={() => cambiarValor(fotoJustificante)}>
      <td className='td-admin'>{fechaEmisionJustificante}</td>
      <td className='td-admin'>{horaEmisionJustificante}</td>
      <td className='td-admin'>{fechaJustificante}</td>
      <td className='td-admin'>{motivoJustificante}</td>
      <td className='td-admin'>{explicacionJustificante}</td>
    </tr>
  )
}

export default FilasUsuarioJustificantes
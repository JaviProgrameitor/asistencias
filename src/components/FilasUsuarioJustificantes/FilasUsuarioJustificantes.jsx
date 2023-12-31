
import { useState, useEffect } from "react"

function FilasUsuarioJustificantes(props) {
  const { posicion, valor, cambiarValor } = props
  const { 
    nombreJustificante, 
    apellidoJustificante,
    claveEstudianteJustificante,
    numeroTelefonoJustificante,
    fechaInternaJustificante,
    fechaEmisionJustificante,
    fechaJustificante,
    motivoJustificante,
    explicacionJustificante,
    fotoJustificante,
    correoJustificante,
    idFotoJustificante,
    id
  } = props.datos

  const [tipo, setTipo] = useState()
  const [activo, setActivo] = useState()

  useEffect(() => {
    if(posicion === 0 || posicion % 2 === 0) setTipo('elemento-par')
    else setTipo('elemento-impar')

    if(valor === fotoJustificante) setActivo('activo')
      else setActivo('inactivo')
  })

  return (
    <tr 
      className={`fila fila-administrador ${tipo} ${activo}`} 
      onClick={() => {
          if(activo === "activo") cambiarValor(false)
          else cambiarValor(fotoJustificante)
        }
      }
    >
      <td className='td-admin'>{`${new Date(fechaEmisionJustificante).getHours()}:${new Date(fechaEmisionJustificante).getMinutes()}`}</td>
      <td className='td-admin'>{new Date(fechaEmisionJustificante).toLocaleDateString()}</td>
      <td className='td-admin'>{new Date(fechaJustificante).toLocaleDateString()}</td>
      <td className='td-admin'>{motivoJustificante}</td>
      <td className='td-admin'>{explicacionJustificante}</td>
    </tr>
  )
}

export default FilasUsuarioJustificantes
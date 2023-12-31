
import { useState, useEffect } from "react"

function FilasJustificantes(props) {
  const { posicion, valor, cambiarValor, personal = false } = props
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
  const [activo, setActivo] = useState()

  function actualizar(dato) {
    if(!dato) cambiarValor(false)
    else {
      personal 
        ? cambiarValor(fotoJustificante)
        : cambiarValor(props.datos)
    }
  }

  useEffect(() => {
    valor === fotoJustificante ? setActivo('activo') : setActivo('inactivo')
  }, [valor])

  return (
    <tr 
      className={`fila fila-administrador ${posicion === 0 || posicion % 2 === 0 ? 'elemento-par' : 'elemento-impar'} ${activo}`} 
      onClick={() => { activo == 'activo' ? actualizar(false) : actualizar(true) }}
    >
      {
        !personal
          ? <>
              <td className='td-admin'>{nombreJustificante}</td>
              <td className='td-admin'>{apellidoJustificante}</td>
            </>
          : <></>
      }
      <td className='td-admin'>{`${new Date(fechaEmisionJustificante).getHours()}:${new Date(fechaEmisionJustificante).getMinutes()}`}</td>
      <td className='td-admin'>{new Date(fechaEmisionJustificante).toLocaleDateString()}</td>
      <td className='td-admin'>{new Date(fechaJustificante).toLocaleDateString()}</td>
      <td className='td-admin'>{motivoJustificante}</td>
      <td className='td-admin'>{explicacionJustificante}</td>
    </tr>
  )
}

export default FilasJustificantes
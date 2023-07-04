import '../../assets/css/components/Filas.css'

import { useEffect, useState } from 'react'

function FilasAdministradores(props) {
  const { posicion, idAdministrador, actualizarDatos, datos } = props
  const { nombre, apellido, correo, puesto, id } = props.datos
  const [ tipo, setTipo ] = useState()
  const [ activo, setActivo ] = useState()

  useEffect(() => {
    if(posicion === 0 || posicion % 2 === 0) setTipo('elemento-par')
    else setTipo('elemento-impar')

    if(id === idAdministrador) setActivo('activo')
    else setActivo('inactivo')
  })

  return (
    <tr className={`fila fila-administrador ${tipo} ${activo}`}  onClick={() => actualizarDatos(datos)}>
      <td className='td-admin'>{nombre}</td>
      <td className='td-admin' >{apellido}</td>
      <td className='td-admin' >{correo}</td>
      <td className='td-admin' >{puesto}</td>
    </tr>
  )
}

export default FilasAdministradores
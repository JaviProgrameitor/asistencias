
import { TiDelete } from 'react-icons/ti'

function FilasCodigosQR(props) {
  const { datos, codigoSeleccionado, setCodigoSelecionado } = props
  const { posicion, nombreCompleto, codigoQR, id } = datos

  return (
    <tr 
      className={`fila fila-administrador ${codigoSeleccionado.id == id ? 'activo' : ''}`}
      onClick={() => 
        codigoSeleccionado.id == id
        ? setCodigoSelecionado({})
        : setCodigoSelecionado(datos)
      }
    >
      <td className='td-admin'>{posicion}</td>
      <td className='td-admin'>{nombreCompleto}</td>
      <td className='td-admin'>{codigoQR}</td>
    </tr>
  )
}

export default FilasCodigosQR
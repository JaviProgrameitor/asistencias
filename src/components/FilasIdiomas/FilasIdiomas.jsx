
import { TiDelete } from 'react-icons/ti'

function FilasIdiomas(props) {
  const { posicion, nombre, id, seleccionarIdioma, handleOpen, variable, puestoAdmin, accesoDenegado } = props

  async function seleccionar() {
    await seleccionarIdioma({nombre, id})
    handleOpen(variable)
  }

  return (
    <tr className={`fila fila-administrador`}>
      <td className='td-admin'>{posicion}</td>
      <td className='td-admin'>{nombre}</td>
      <td className='td-admin'>
        <TiDelete 
          className="icon-justificante icon-rechazar" 
          onClick={() => 
            puestoAdmin == 'Director(a)'
            ? seleccionar()
            : accesoDenegado()
          }
        />
      </td>
    </tr>
  )
}

export default FilasIdiomas
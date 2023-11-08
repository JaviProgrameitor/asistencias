
import { TiDelete } from 'react-icons/ti'

function FilasClases(props) {
  const { numero, seleccionarClase, handleOpen, variable, accesoDenegado, puestoAdmin } = props

  const {
    claveClase,
    nombreClase,
    idiomaClase,
    modalidadClase,
    horaInicioClase,
    horaFinalClase,
    diasClase,
    id
  } = props.datos

  let datosCompletos = [
    {
      titulo: 'Clave',
      respuesta: claveClase
    },
    {
      titulo: 'Nombre',
      respuesta: nombreClase
    },
    {
      titulo: 'Idioma',
      respuesta: idiomaClase
    },
    {
      titulo: 'Modalidad',
      respuesta: modalidadClase
    },
    {
      titulo: 'Días',
      respuesta: diasClase
    },
    {
      titulo: 'Hora de Inicio',
      respuesta: horaInicioClase
    },
    {
      titulo: 'Hora del Final',
      respuesta: horaFinalClase
    },
  ]

  async function seleccionar() {
    await seleccionarClase(datosCompletos, id)
    handleOpen(variable)
  }

  return (
    <tr className={`fila fila-administrador`}>
      <td className='td-admin'>{numero}</td>
      <td className='td-admin'>{claveClase}</td>
      <td className='td-admin'>{nombreClase}</td>
      <td className='td-admin'>{idiomaClase}</td>
      <td className='td-admin'>{diasClase}</td>
      <td className='td-admin'>{horaInicioClase}</td>
      <td className='td-admin'>{horaFinalClase}</td>
      <td className='td-admin'>{modalidadClase}</td>
      <td className='td-admin'>
        <TiDelete 
          className="icon-justificante icon-rechazar" 
          onClick={() => 
            puestoAdmin == 'Director'
            ? seleccionar()
            : accesoDenegado()
          }
        />
      </td>
    </tr>
  )
}

export default FilasClases
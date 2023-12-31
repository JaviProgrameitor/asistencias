import '../../assets/css/components/FotoDemostracion.css'

import { saveAs } from 'file-saver';

import BotonDescargas from '../BotonDescargas/BotonDescargas';

function FotoDemostracion(props) {
  const { alumno, imagen, documento, nombreDocumento } = props

  const descargarDocumento = () => {
    fetch(imagen)
      .then(res => res.blob())
      .then(blob => saveAs(blob, `${nombreDocumento}`))
  }

  return (
    <div className='container-documentos'>
      <h4 className='titulos-3 titulos__sin-margen balance'>{documento}</h4>
      <div>
        <img className='imagen-documento' src={imagen} alt={`${documento} de ${alumno}`} />
      </div>
      <BotonDescargas descargarDocumento={descargarDocumento} />
    </div>
  )
}

export default FotoDemostracion
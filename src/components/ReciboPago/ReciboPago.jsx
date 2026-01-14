import '../../assets/css/components/ReciboPago.css'

import EstructuraReciboPago from '../EstructuraReciboPago/EstructuraReciboPago';

import { PDFViewer } from '@react-pdf/renderer';

function ReciboPago(props) {
  const {
    numeroReferencia, 
    personaPago, 
    listaAlumnosPago, 
    lengua, 
    modalidad, 
    cantidadPagadaNumero, 
    cantidadPagadaEscrita,
    fechaRecibo,
    concepto
  } = props

  return (
    <div className='pdf-vista'>
      <PDFViewer style={{width: '100%', height: '100%'}}>
        <EstructuraReciboPago
          numeroReferencia={numeroReferencia}
          personaPago={personaPago}
          listaAlumnosPago={listaAlumnosPago}
          lengua={lengua}
          modalidad={modalidad}
          cantidadPagadaNumero={cantidadPagadaNumero}
          cantidadPagadaEscrita={cantidadPagadaEscrita}
          fechaRecibo={fechaRecibo}
          concepto={concepto}
        />
      </PDFViewer>
    </div>
  )
}

export default ReciboPago
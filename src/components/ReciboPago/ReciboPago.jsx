import '../../assets/css/components/ReciboPago.css'

import FondoDocumento from '../../assets/img/fondoRecibo.png'
import ReciboEjemplo from '../../assets/img/reciboEjemplo.jpg'
import Logo from '../../assets/img/logoRecibo.png'
import LogoCambridge from '../../assets/img/CambridgeLogoRecibo.png'
import LogoSIELE from '../../assets/img/SIELELogoRecibo.png'
import LogoDELF from '../../assets/img/DELFLogoRecibo.png'
import LogoOSD from '../../assets/img/OSDLogoRecibo.png'
import FirmaRecibo from '../../assets/img/firmaRecibo.png'

function ReciboPago(props) {
  const { 
    targetRef, 
    numeroReferencia, 
    personaPago, 
    listaAlumnosPago, 
    lengua, 
    modalidad, 
    cantidadPagadaNumero, 
    cantidadPagadaEscrita,
    fechaRecibo
  } = props

  return (
    <div ref={targetRef}>
      <div className='documento'>
        <img className='fondo__documento' src={FondoDocumento} alt="Fondo del documento" />
        <img className='logo__documento' src={Logo} alt="Logo de el Centro de Idiomas" />
        <div className='segundo-contenedor'>
          <div className='info__numero-referencia'>
            <h3 className='titulo__numero-referencia'>RECIBO PAGO</h3>
            <p className='numero-referencia'>No. {numeroReferencia}</p>
          </div>
          <div className='fecha__documento'>
          {fechaRecibo}
          </div>
          <div className='info__pago'>
            <p className='info__pago-texto'>
              Quien suscribe el presente documento: <span className='underline'>Lic. Martha I. Rosas G. </span> 
              manifiesta haber recibido a entera satisfacción la cantidad de <span className='underline'>${cantidadPagadaNumero} </span>
              ( <span className='underline'>{cantidadPagadaEscrita} pesos M.N.</span> ) misma que me fue entregada por parte
              de: <strong className='underline'>{personaPago}</strong> por concepto de: <span className='underline'>Inversión mensual. {listaAlumnosPago.length} {listaAlumnosPago.length > 1 ? 'estudiantes' : 'estudiante'}.
              <strong> Nombres: {Array.prototype.join.call(listaAlumnosPago, ", ")}</strong>. Clases de Lengua {lengua}. 
              Modalidad: <strong>{modalidad}</strong>. Sin adeudo a la fecha.</span>
            </p>
          </div>
        </div>
        <div className='tercer-contenedor'>
          <span className='texto__firma-documento'>Recibí:</span>
          <div className='caja__firma-documento'>
            <img className='firma__documento' src={FirmaRecibo} alt="Firma del documento" />
          </div>
        </div>
        <div className='cuarto-contenedor'>
          <img className='logo__cambridge' src={LogoCambridge} alt="Logo de Cambridge" />
          <img className='logo__siele' src={LogoSIELE} alt="Logo de SIELE" />
          <img className='logo__delf' src={LogoDELF} alt="Logo de DELF" />
          <img className='logo__osd' src={LogoOSD} alt="Logo de OSD" />
        </div>
      </div>
    </div>
  )
}

export default ReciboPago
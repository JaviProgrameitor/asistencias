import '../../assets/css/components/ReciboPago.css'

import { Page, Text, Image, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

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
    numeroReferencia, 
    personaPago, 
    listaAlumnosPago, 
    lengua, 
    modalidad, 
    cantidadPagadaNumero, 
    cantidadPagadaEscrita,
    fechaRecibo
  } = props

  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }, 
    documento: {
      width: '752px',
      height: '456px',
      position: 'relative',
      backgroundColor: 'red'
    },
    fondo__documento: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: -1
    },
    primer__contenedor: {
      width: '100%',
      height: '352px',
      display: 'flex',
      flexDirection: 'row'
    },
    logo: {
      width: '300px',
      height: '309.49px'
    }, 
    contenido: {
      width: '452px',
      height: '100%'
    },
    elemento__superior: {
      width: '100%',
      height: '60px',
      backgroundColor: 'red'
    },
    elemento__inferior: {
      width: '100%',
      height: '252px',
      backgroundColor: 'blue'
    },
    elemento__firma: {
      width: '100%',
      height: '42px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      gap: '5px',
      paddingRight: '58px'
    },
    caja__firma__documento: {
      borderBottom: '3px solid black',
      paddingHorizontal: '15px'
    },
    firma__documento: {
      width: '110px',
      objectFit: 'contain',
      transform: 'translateY(14px)'
    },
    segundo__contenedor: {
      width: '100%',
      height: '104',
      paddingLeft: '42px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: '10px'
    },
    logo__cambridge: {
      width: '164px'
    },
    logo__siele: {
      width: '59px'
    },
    logo__delf: {
      width: '94px',
      marginLeft: '14px'
    },
    logo__osd: {
      width: '90px',
      marginLeft: '15px'
    }
  });

  return (
    // <div ref={targetRef}>
    //   <div className='documento'>
    //     <img className='fondo__documento' src={FondoDocumento} alt="Fondo del documento" />
    //     <img className='logo__documento' src={Logo} alt="Logo de el Centro de Idiomas" />
    //     <div className='segundo-contenedor'>
    //       <div className='info__numero-referencia'>
    //         <h3 className='titulo__numero-referencia'>RECIBO PAGO</h3>
    //         <p className='numero-referencia'>No. {numeroReferencia}</p>
    //       </div>
    //       <div className='fecha__documento'>
    //       {fechaRecibo}
    //       </div>
    //       <div className='info__pago'>
    //         <p className='info__pago-texto'>
    //           Quien suscribe el presente documento: <span className='underline'>Lic. Martha I. Rosas G. </span> 
    //           manifiesta haber recibido a entera satisfacción la cantidad de <span className='underline'>${cantidadPagadaNumero} </span>
    //           ( <span className='underline'>{cantidadPagadaEscrita} pesos M.N.</span> ) misma que me fue entregada por parte
    //           de: <strong className='underline'>{personaPago}</strong> por concepto de: <span className='underline'>Inversión mensual. {listaAlumnosPago.length} {listaAlumnosPago.length > 1 ? 'estudiantes' : 'estudiante'}.
    //           <strong> Nombres: {Array.prototype.join.call(listaAlumnosPago, ", ")}</strong>. Clases de Lengua {lengua}. 
    //           Modalidad: <strong>{modalidad}</strong>. Sin adeudo a la fecha.</span>
    //         </p>
    //       </div>
    //     </div>
    //     <div className='tercer-contenedor'>
    //       <span className='texto__firma-documento'>Recibí:</span>
    //       <div className='caja__firma-documento'>
    //         <img className='firma__documento' src={FirmaRecibo} alt="Firma del documento" />
    //       </div>
    //     </div>
    //     <div className='cuarto-contenedor'>
    //       <img className='logo__cambridge' src={LogoCambridge} alt="Logo de Cambridge" />
    //       <img className='logo__siele' src={LogoSIELE} alt="Logo de SIELE" />
    //       <img className='logo__delf' src={LogoDELF} alt="Logo de DELF" />
    //       <img className='logo__osd' src={LogoOSD} alt="Logo de OSD" />
    //     </div>
    //   </div>
    // </div>
    <>
      <PDFViewer className='pdf-vista'>
        <Document>
          <Page 
            style={styles.page}
            size="A4" 
            orientation='landscape'
          >
            <View style={styles.documento}>
              <Image 
                src={FondoDocumento}
                style={styles.fondo__documento}
              />
              <View style={styles.primer__contenedor}>
                <Image 
                  style={styles.logo}
                  src={Logo}
                />
                <View style={styles.contenido}>
                  <View style={styles.elemento__superior}>
                    <Text>
                      {fechaRecibo}
                    </Text>
                  </View>
                  <View style={styles.elemento__inferior}>

                  </View>
                  <View style={styles.elemento__firma}>
                    <Text>
                      Recibí:
                    </Text>
                    <View style={styles.caja__firma__documento}>
                      <Image 
                        style={styles.firma__documento}
                        src={FirmaRecibo}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.segundo__contenedor}>
                <Image 
                  src={LogoCambridge}
                  style={styles.logo__cambridge}
                />
                <Image 
                  src={LogoSIELE}
                  style={styles.logo__siele}
                />
                <Image 
                  src={LogoDELF}
                  style={styles.logo__delf}
                />
                <Image 
                  src={LogoOSD}
                  style={styles.logo__osd}
                />
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </>
  )
}

export default ReciboPago
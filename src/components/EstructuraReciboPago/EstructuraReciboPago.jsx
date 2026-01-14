import '../../assets/css/components/ReciboPago.css'

import { Page, Text, Image, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

import FondoDocumento from '../../assets/img/fondoRecibo.png'
import ReciboEjemplo from '../../assets/img/reciboEjemplo.jpg'
import Logo from '../../assets/img/logoRecibo.png'
import LogoCambridge from '../../assets/img/CambridgeLogoRecibo.png'
import LogoSIELE from '../../assets/img/SIELELogoRecibo.png'
import LogoDELF from '../../assets/img/DELFLogoRecibo.png'
import LogoOSD from '../../assets/img/OSDLogoRecibo.png'
import FirmaRecibo from '../../assets/img/firmaRecibo.png'

import AgencyFBReg from '../../fonts/agencyfb_reg.ttf'
import AgencyFBBold from '../../fonts/agencyfb_bold.ttf'

function EstructuraReciboPago(props) {
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

  Font.register(
    {
      family: 'Agency',
      fonts: [
        {
          src: AgencyFBReg,
          fontWeight: 400
        },
        {
          src: AgencyFBBold,
          fontWeight: 700
        }
      ]
    }
  );

  const styles = StyleSheet.create({
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }, 
    documento: {
      width: '566.92920528px',
      height: '340.15752317px',
      position: 'relative'
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
      width: '230px',
      height: '244px'
    }, 
    contenido: {
      width: '336px',
      height: '100%',
      paddingRight: '25px'
    },
    elemento__superior: {
      width: '100%',
      height: '60px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: '12px'
    },
    informacion: {
      width: '155px',
    }, 
    titulo__informacion: {
      fontFamily: 'Agency',
      fontWeight: 700,
      fontSize: '15px',
    },
    numero__referencia: {
      fontSize: '14px',
      marginTop: '8px',
      fontFamily: 'Agency',
      fontWeight: 400
    },
    fecha: {
      fontFamily: 'Agency',
      fontWeight: 700,
      fontSize: '13px',
      paddingRight: '6px'
    },
    elemento__inferior: {
      width: '100%',
      height: '252px',
      paddingTop: '20px'
    },
    texto__contenido: {
      lineHeight: '1.5px',
      fontSize: '11px',
      textAlign: 'justify',
    },
    underline: {
      textDecoration: 'underline'
    },
    underline__bold: {
      textDecoration: 'underline',
      fontFamily: 'Agency',
      fontWeight: 700,
      textDecoration: 'underline'
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
    texto_firma: {
      fontSize: '14px'
    },
    caja__firma__documento: {
      borderBottom: '1px solid black',
      paddingHorizontal: '15px'
    },
    firma__documento: {
      width: '40px',
      height: '40px',
      transform: 'translateY(21px)'
    },
    segundo__contenedor: {
      width: '100%',
      height: '104',
      paddingLeft: '20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: '10px'
    },
    logo__cambridge: {
      width: '124px'
    },
    logo__siele: {
      width: '32px'
    },
    logo__delf: {
      width: '74px',
      marginLeft: '14px'
    },
    logo__osd: {
      width: '70px',
      marginLeft: '15px'
    }
  });

  return (
    <Document title='reciboPago.pdf' language='es'>
      <Page 
        style={styles.page}
        size={[612.2835417, 396.8504437]}
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
                <View style={styles.informacion}>
                  <Text style={styles.titulo__informacion}>
                    RECIBO DE PAGO
                  </Text>
                  <Text style={styles.numero__referencia}>
                    No. {numeroReferencia}
                  </Text>
                </View>
                <Text style={styles.fecha}>
                  {fechaRecibo}
                </Text>
              </View>
              <View style={styles.elemento__inferior}>
                <Text style={styles.texto__contenido}>
                  Quien suscribe el presente documento: <Text style={styles.underline}>Lic. Martha I. Rosas G.</Text> manifiesta haber recibido a entera
                  satisfacción la cantidad de: <Text style={styles.underline}>${cantidadPagadaNumero}</Text> ( <Text  style={styles.underline}>{cantidadPagadaEscrita} pesos M.N.</Text> ) misma
                  que me fue entregada por parte de: <Text style={styles.underline__bold}>{personaPago}</Text> por concepto de: 
                  <Text style={styles.underline}> {concepto}.  {listaAlumnosPago.length} {listaAlumnosPago.length === 1 ? 'estudiante' : 'estudiantes'}. <Text>{listaAlumnosPago.length === 1 ? 'Nombre' : 'Nombres'}: {listaAlumnosPago.join(', ')}. </Text>
                  Clases de Lengua {lengua}. Modalidad: <Text style={styles.underline__bold}>{modalidad}</Text>. Sin adeudo a la fecha.</Text>
                </Text>
              </View>
              <View style={styles.elemento__firma}>
                <Text style={styles.texto_firma}>
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
  )
}

export default EstructuraReciboPago
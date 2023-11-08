import '../assets/css/PagosAlumnos.css'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

import CampoAutocompletar from '../components/CampoAutocompletar/CampoAutocompletar';
import CampoNumero from '../components/CampoNumero/CampoNumero';
import CampoLectura from '../components/CampoLectura/CampoLectura';
import Indicadores from '../components/Indicadores/Indicadores';
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore  } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import firebaseConfig from '../firebase';

import { Toaster, toast } from 'sonner'

import { v4 as uuid } from 'uuid';

function CrearPago(props) {
  const { 
    foto, 
    actaNacimiento,
    ine,
    curp,
    comprobantePagoInicial,
    nombre, 
    apellido, 
    numeroTelefono,
    codigoPostal,
    pais,
    estado,
    municipio,
    colonia,
    calle,
    numeroExterior,
    claveEstudiante, 
    idiomaAprendizaje, 
    modalidadEstudio, 
    fechaPago, 
    id, 
    fechaNacimiento, 
    correo, 
    nivelAcademico, 
    nivelIdioma, 
    fechaIngreso 
  } = props.perfilAlumno

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const st = getStorage(app);

  const [ pasoExactoPago, setPasoExactoPago ] = useState(0)
  const [ idiomaPagoAlumno, setIdiomaPagoAlumno ] = useState(false)

  const [ añoPagoMenActualAlumno, setAñoPagoMenActualAlumno ] = useState(new Date().getFullYear())
  const [ mesPagoMenActualAlumno, setMesPagoMenActualAlumno ] = useState(`${calcularMesPorNumero(new Date().getMonth())}`)
  const [ numeroMesPagoMenActualAlumno, setNumeroMesPagoMenActualAlumno ] = useState(calcularNumeroPorMes(mesPagoMenActualAlumno))
  const [ fechaPagoMenActualAlumno, setFechaPagoMenActualAlumno ] = useState("")

  const [ comprobantePagoMensualidadAlumno, setComprobantePagoMensualidadAlumno ] = useState()

  const [ fotoApoyoComprobantePagoMensualidad, setFotoApoyoComprobantePagoMensualidad ] = useState(false)

  const pasosPago = [
    'Selecciona el Idioma del Pago',
    'Selecciona el Mes y la Fecha',
    'Comprobante de Pago',
    'Confirmación del Pago'
  ]

  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  const fechasMes = [
    "1",
    "2", 
    "3", 
    "4", 
    "5", 
    "6", 
    "7", 
    "8", 
    "9", 
    "10", 
    "11", 
    "12", 
    "13", 
    "14", 
    "15", 
    "16", 
    "17", 
    "18", 
    "19", 
    "20", 
    "21", 
    "22", 
    "23", 
    "24", 
    "25", 
    "26", 
    "27", 
    "28", 
    "29", 
    "30", 
    "31"
  ]

  const diasMeses = {
    "Enero" : 31,
    "Febrero" : 28,
    "FebreroBisiesto" : 29,
    "Marzo" : 31,
    "Abril" : 30,
    "Mayo" : 31,
    "Junio" : 30,
    "Julio" : 31,
    "Agosto" : 31,
    "Septiembre" : 30,
    "Octubre" : 31,
    "Noviembre" : 30,
    "Diciembre" : 31
  }

  function valorMes(valor) {
    setMesPagoMenActualAlumno(valor)

    setNumeroMesPagoMenActualAlumno(calcularNumeroPorMes(valor))
  }

  function calcularNumeroPorMes(valor) {
    if(valor === 'Enero') return 0
    else if(valor === 'Febrero') return 1
    else if(valor === 'Marzo') return 2
    else if(valor === 'Abril') return 3
    else if(valor === 'Mayo') return 4
    else if(valor === 'Junio') return 5
    else if(valor === 'Julio') return 6
    else if(valor === 'Agosto') return 7
    else if(valor === 'Septiembre') return 8
    else if(valor === 'Octubre') return 9
    else if(valor === 'Noviembre') return 10
    else if(valor === 'Diciembre') return 11
  }

  function calcularMesPorNumero(valor) {
    if(0 == valor) return 'Enero'
    else if(1 == valor) return 'Febrero'
    else if(2 == valor) return 'Marzo'
    else if(3 == valor) return 'Abril'
    else if(4 == valor) return 'Mayo'
    else if(5 == valor) return 'Junio'
    else if(6 == valor) return 'Julio'
    else if(7 == valor) return 'Agosto'
    else if(8 == valor) return 'Septiembre'
    else if(9 == valor) return 'Octubre'
    else if(10 == valor) return 'Noviembre'
    else if(11 == valor) return 'Diciembre'
  }

  function calcularFinMensualidad(tipoRespuesta, fecha, mes, año) {
    let mesFinal;
    let añoFinal;
    let fechaFinal;

    if(12 == (mes + 1)) {
      mesFinal = 'Enero'
      añoFinal = año + 1;

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(1 == (mes + 1)) {
      mesFinal = 'Febrero'
      añoFinal = año

      if(año % 4 == 0) {
        if(parseInt(fecha) > diasMeses["FebreroBisiesto"]) fechaFinal = diasMeses["FebreroBisiesto"]
        else fechaFinal = fecha
      }

      else {
        if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
        else fechaFinal = fecha
      }
    }
    else if(2 == (mes + 1)) {
      mesFinal = 'Marzo'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(3 == (mes + 1)) {
      mesFinal = 'Abril'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(4 == (mes + 1)) {
      mesFinal = 'Mayo'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(5 == (mes + 1)) {
      mesFinal = 'Junio'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(6 == (mes + 1)) {
      mesFinal = 'Julio'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(7 == (mes + 1)) {
      mesFinal = 'Agosto'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(8 == (mes + 1)) {
      mesFinal = 'Septiembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(9 == (mes + 1)) {
      mesFinal = 'Octubre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(10 == (mes + 1)) {
      mesFinal = 'Noviembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(11 == (mes + 1)) {
      mesFinal = 'Diciembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    if(tipoRespuesta == "string") return `${fechaFinal}/${mesFinal}/${añoFinal}`
    else if(tipoRespuesta == "objeto") return [fechaFinal, calcularNumeroPorMes(mesFinal), añoFinal]
  }

  async function agregarPago() {
    //Todo: Storage
    const identificadorAleatorio = uuid()

    const metadata = {contentType: comprobantePagoMensualidadAlumno.type};
    const storageRef = ref(st, `pagosMensualidades/${identificadorAleatorio}`)
    await uploadBytesResumable(storageRef, comprobantePagoMensualidadAlumno, metadata)

    const date = new Date()
    const año = date.getFullYear()
    const mes = date.getMonth()
    const fecha = date.getDate()

    let mesExacto;
    let fechaExacto;

    let fechaPagoExacto;
    let mesPagoExacto;

    //Todo: Calcular exactamente la fecha y la hora
    if((mes + 1) < 10) mesExacto = `0${mes + 1}`
    else if((mes + 1) >= 10) mesExacto = `${mes + 1}`

    if(fecha < 10) fechaExacto = `0${fecha}`
    else if(fecha >= 10) fechaExacto = `${fecha}`

    //Todo: Calcular exactamente la mensualidad a pagar
    if((numeroMesPagoMenActualAlumno + 1) < 10) mesPagoExacto = `0${numeroMesPagoMenActualAlumno + 1}`
    else if((numeroMesPagoMenActualAlumno + 1) >= 10) mesPagoExacto = `${numeroMesPagoMenActualAlumno + 1}`

    if(fechaPagoMenActualAlumno < 10) fechaPagoExacto = `0${fechaPagoMenActualAlumno}`
    else if(fechaPagoMenActualAlumno >= 10) fechaPagoExacto = `${fechaPagoMenActualAlumno}`


    const comprobantePagoMensualidad = await getDownloadURL(storageRef)
    const idComprobantePagoMensualidad = identificadorAleatorio

    const nombrePago = nombre
    const apellidoPago = apellido
    const claveEstudiantePago = claveEstudiante

    const idiomaPago = idiomaPagoAlumno

    const añoPagoMenActual = añoPagoMenActualAlumno
    const numeroMesPagoMenActual = numeroMesPagoMenActualAlumno
    const fechaPagoMenActual = parseInt(fechaPagoMenActualAlumno)
    const fechaCompletaPagoMenActual = `${fechaPagoExacto}/${mesPagoExacto}/${añoPagoMenActual}`

    const añoDiaPago = año
    const mesDiaPago = mes
    const fechaDiaPago = fecha
    const fechaCompletaDiaPago = `${fechaExacto}/${mesExacto}/${año}`
    const fechaInternaDiaPago = `${año}-${mesExacto}-${fechaExacto}`

    const [ fechaFinMensualidad, mesFinMensualidad, añoFinMensualidad ] = calcularFinMensualidad("objeto", fechaPagoMenActualAlumno, numeroMesPagoMenActualAlumno, añoPagoMenActualAlumno)

    const datos = {
      comprobantePagoMensualidad,
      idComprobantePagoMensualidad,
      nombrePago,
      apellidoPago,
      claveEstudiantePago,
      idiomaPago,
      añoPagoMenActual,
      numeroMesPagoMenActual,
      fechaPagoMenActual,
      fechaCompletaPagoMenActual,
      añoDiaPago,
      mesDiaPago,
      fechaDiaPago,
      fechaCompletaDiaPago,
      fechaInternaDiaPago,
      añoFinMensualidad,
      mesFinMensualidad,
      fechaFinMensualidad
    }

    const collectionRef = collection(db, 'pagosMensualidades')
    const docRef = await addDoc(collectionRef, datos)

    toast.success('El Pago ha sido creado con exito')

    setIdiomaPagoAlumno(false)
    setPasoExactoPago(0)
  }

  // console.log(new Date().getTime())
  // console.log(new Date().getTime() == 1691042400000)
  // console.log(new Date('August 3, 2023'))
  // console.log(new Date('8 3, 2023'))
  // console.log(new Date().getDate())

  useEffect(() => {
    setFechaPagoMenActualAlumno(`${idiomaPagoAlumno ? fechaPago[idiomaAprendizaje.indexOf(idiomaPagoAlumno)] : ""}`)
  },[idiomaPagoAlumno])

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos/pagos-alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
      </div>
      <h4 className="titulos-2">Crear Pago</h4>
      <div>
        <Stepper activeStep={pasoExactoPago} alternativeLabel>
          {pasosPago.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div className="contenedor__columna-centro">
          <h5 className='titulos-3'>{pasosPago[pasoExactoPago]}</h5>
          {
            pasoExactoPago == 0 ?
              <div className='contenedor__completo contenedor__columna-centro'>
                <div className='container-idiomas'>
                  {
                    idiomaAprendizaje.map((idioma, index) => {
                      return (
                        <div 
                          className={`caja-idiomas ${idiomaPagoAlumno == idioma ? "idioma-activo" : "idioma-inactivo"}`} 
                          key={index} 
                          onClick={() => setIdiomaPagoAlumno(idioma)}
                        >
                          {idioma}
                        </div>
                      )
                    })
                  }
                </div>
                <div className='container-botones contenedor__todo-final'>
                  <button 
                    className='boton__blanco' 
                    onClick={() => {
                      if(idiomaPagoAlumno)setPasoExactoPago(1)
                      else toast.error('Selecciona un idioma')
                    }}
                  >
                    Siguiente
                    <AiOutlineArrowRight />
                  </button>
                </div>
              </div>
            : <></>
          }
          {
            pasoExactoPago == 1 ?
              <div className='contenedor__completo contenedor__columna-centro'>
                <div>
                  <div>
                    <h5 className="titulos-4">Fecha que corresponde el pago</h5>
                    <CampoNumero
                      titulo='Año'
                      valor={añoPagoMenActualAlumno}
                      cambiarValor={setAñoPagoMenActualAlumno}
                    />
                    <CampoAutocompletar
                      titulo='Mes'
                      placeholder='Selecciona el mes del año'
                      opciones={meses}
                      valor={mesPagoMenActualAlumno}
                      cambiarValor={valorMes}
                    />
                    <CampoLectura
                      titulo='Fecha'
                      valor={fechaPagoMenActualAlumno}
                    />
                  </div>
                </div>
                <div className='container-botones contenedor__entre'>
                  <button 
                    className='boton__blanco'
                    onClick={() => setPasoExactoPago(0)}
                  >
                    <AiOutlineArrowLeft />
                    Anterior
                  </button>
                  <button 
                    className='boton__blanco' 
                    onClick={() => setPasoExactoPago(2)}
                  >
                    Siguiente
                    <AiOutlineArrowRight />
                  </button>
                </div>
              </div>
            : <></>
          }
          {
            pasoExactoPago == 2 ? 
              <div className='contenedor__completo contenedor__columna-centro'>
                <div>
                  <FotoAlumno 
                    titulo='Foto del Comprobante del Pago'
                    className='foto-cuadrada'
                    valor={comprobantePagoMensualidadAlumno}
                    cambiarValor={setComprobantePagoMensualidadAlumno}
                    tipo={false}
                    foto={fotoApoyoComprobantePagoMensualidad}
                    setFoto={setFotoApoyoComprobantePagoMensualidad}
                    required={true}
                    classInput='imagen__comprobante-pago-mensualidad'
                  />
                </div>
                <div className='container-botones contenedor__entre'>
                  <button 
                    className='boton__blanco'
                    onClick={() => setPasoExactoPago(1)}
                  >
                    <AiOutlineArrowLeft />
                    Anterior
                  </button>
                  <button 
                    className='boton__blanco' 
                    onClick={() => {
                        if(fotoApoyoComprobantePagoMensualidad !== false) setPasoExactoPago(3)
                        else toast.error('Debe subir el Comprobante del Pago')
                      }
                    }
                  >
                    Siguiente
                    <AiOutlineArrowRight />
                  </button>
                </div>
              </div>
            : <></>
          }
          {
            pasoExactoPago == 3 ? 
              <div className='contenedor__completo contenedor__columna-centro'>
                <div>
                  <Indicadores 
                    titulo='Nombre del Alumno'
                    respuesta={`${nombre} ${apellido}`}
                    claseExtra='indicadores__chicos'
                  />
                  <Indicadores 
                    titulo='Idioma de Pago'
                    respuesta={`${idiomaPagoAlumno}`}
                    claseExtra='indicadores__chicos'
                  />
                  <Indicadores 
                    titulo='Fecha que empieza la mensualidad'
                    respuesta={`${fechaPagoMenActualAlumno}/${mesPagoMenActualAlumno}/${añoPagoMenActualAlumno}`}
                    claseExtra='indicadores__chicos'
                  />
                  <Indicadores 
                    titulo='Fecha que termina la mensualidad'
                    respuesta={calcularFinMensualidad("string", fechaPagoMenActualAlumno, numeroMesPagoMenActualAlumno,añoPagoMenActualAlumno)}
                    claseExtra='indicadores__chicos'
                  />
                </div>
                <div className='container-botones contenedor__entre'>
                  <button 
                    className='boton__blanco'
                    onClick={() => setPasoExactoPago(2)}
                  >
                    <AiOutlineArrowLeft />
                    Anterior
                  </button>
                  <button 
                    className='boton__blanco' 
                    onClick={() => agregarPago()}
                  >
                    Finalizar
                    <AiOutlineArrowRight />
                  </button>
                </div>
              </div>
            : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default CrearPago
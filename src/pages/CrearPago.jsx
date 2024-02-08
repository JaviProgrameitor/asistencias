import '../assets/css/PagosAlumnos.css'

import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai'

import ListaOpciones from "../components/ListaOpciones/ListaOpciones"
import CampoNumero from '../components/CampoNumero/CampoNumero';
import CampoLectura from '../components/CampoLectura/CampoLectura';
import Indicadores from '../components/Indicadores/Indicadores';
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'
import Loader from '../components/Loader/Loader';

import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import { createDatabase, createStorage, getURLStorage } from '../firebase';

import { Toaster, toast } from 'sonner'

import { v4 as uuid } from 'uuid';

function CrearPago(props) {
  const {
    nombre, 
    apellido,
    claveEstudiante, 
    idiomaAprendizaje,
    fechaPago,
    id
  } = props.perfilAlumno

  const [ pasoExactoPago, setPasoExactoPago ] = useState(0)
  const [ idiomaPagoAlumno, setIdiomaPagoAlumno ] = useState(false)

  const [ añoPagoMenActualAlumno, setAñoPagoMenActualAlumno ] = useState(new Date().getFullYear())
  const [ mesPagoMenActualAlumno, setMesPagoMenActualAlumno ] = useState(`${calcularMesPorNumero(new Date().getMonth())}`)
  const [ numeroMesPagoMenActualAlumno, setNumeroMesPagoMenActualAlumno ] = useState(calcularNumeroPorMes(mesPagoMenActualAlumno))
  const [ fechaPagoMenActualAlumno, setFechaPagoMenActualAlumno ] = useState("")

  const [ comprobantePagoMensualidadAlumno, setComprobantePagoMensualidadAlumno ] = useState()

  const [ fotoApoyoComprobantePagoMensualidad, setFotoApoyoComprobantePagoMensualidad ] = useState(false)
  const [ activarLoader, setActivarLoader ] = useState(false)

  const pasosPago = [
    'Selecciona el Idioma del Pago',
    'Selecciona el Mes y la Fecha',
    'Comprobante de Pago',
    'Confirmación del Pago'
  ]

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

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
    const mesMilisegundos = 2629800000;

    const date = new Date()
    const hora = date.getHours()
    const minutos = date.getMinutes()

    let fechaActual = new Date(`${mes} 15, ${año}`).getTime()
    let nuevaFecha = new Date(fechaActual + mesMilisegundos)

    let mesFinal = nuevaFecha.getMonth() + 1
    let nombreMesFinal = calcularMesPorNumero(mesFinal -  1)
    let añoFinal = nuevaFecha.getFullYear()
    let fechaFinal = diasMeses[nombreMesFinal] < parseInt(fecha) ? diasMeses[nombreMesFinal] : fecha

    if(tipoRespuesta == "string") return `${fechaFinal}/${mesFinal}/${añoFinal}`
    else if(tipoRespuesta == "objeto") return `${mesFinal} ${fechaFinal}, ${añoFinal} ${hora}:${minutos}`
  }

  function calcularInicioMensualidad(tipoRespuesta, fecha, mes, año) {
    const date = new Date()
    const hora = date.getHours()
    const minutos = date.getMinutes()

    let nombreMesInicio = calcularMesPorNumero(mes - 1)
    let fechaInicio = diasMeses[nombreMesInicio] < parseInt(fecha) ? diasMeses[nombreMesInicio] : fecha

    if(tipoRespuesta == "string") return `${fechaInicio}/${mes}/${año}`
    else if(tipoRespuesta == "objeto") return `${mes} ${fechaInicio}, ${año} ${hora}:${minutos}`
  }

  async function agregarPago() {
    setActivarLoader(true)

    //Todo: Storage
    const identificadorAleatorio = uuid()
    const storageRef = `pagosMensualidades/${identificadorAleatorio}`
    await createStorage(storageRef, comprobantePagoMensualidadAlumno)

    const date = new Date()
    const año = date.getFullYear()
    const mes = date.getMonth()
    const fecha = date.getDate()
    const hora = date.getHours()
    const minutos = date.getMinutes()

    let mesExacto;
    let fechaExacto;

    //Todo: Calcular exactamente la fecha y la hora
    if((mes + 1) < 10) mesExacto = `0${mes + 1}`
    else if((mes + 1) >= 10) mesExacto = `${mes + 1}`

    if(fecha < 10) fechaExacto = `0${fecha}`
    else if(fecha >= 10) fechaExacto = `${fecha}`

    const comprobantePagoMensualidad = await getURLStorage(storageRef)
    const idComprobantePagoMensualidad = identificadorAleatorio

    const nombrePago = nombre
    const apellidoPago = apellido
    const claveEstudiantePago = claveEstudiante

    const idiomaPago = idiomaPagoAlumno

    const inicioMensualidad = calcularInicioMensualidad("objeto", fechaPagoMenActualAlumno, (numeroMesPagoMenActualAlumno + 1), añoPagoMenActualAlumno)

    const fechaInternaDiaPago = `${año}-${mesExacto}-${fechaExacto}`
    const diaPago = new Date(`${mes + 1} ${fecha}, ${año} ${hora}:${minutos}`).getTime()

    const finalMensualidad = calcularFinMensualidad("objeto", fechaPagoMenActualAlumno, (numeroMesPagoMenActualAlumno + 1), añoPagoMenActualAlumno)

    const datos = {
      comprobantePagoMensualidad,
      idComprobantePagoMensualidad,
      nombrePago,
      apellidoPago,
      claveEstudiantePago,
      idiomaPago,
      inicioMensualidad,
      fechaInternaDiaPago,
      diaPago,
      finalMensualidad,
      idPropietario: id
    }

    await createDatabase('pagosMensualidades', datos)

    setActivarLoader(false)

    toast.success('El Pago ha sido creado con exito')

    setIdiomaPagoAlumno(false)
    setPasoExactoPago(0)
  }

  useEffect(() => {
    setFechaPagoMenActualAlumno(`${idiomaPagoAlumno ? fechaPago[idiomaAprendizaje.indexOf(idiomaPagoAlumno)] : ""}`)
  },[idiomaPagoAlumno])

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos/pagos-alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
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
            pasoExactoPago == 0 
            ? <div className='contenedor__completo contenedor__columna-centro'>
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
                <div className='container-botones contenedor__centro-separacion'>
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
            pasoExactoPago == 1 
            ? <div className='contenedor__completo contenedor__columna-centro'>
                <div>
                  <div>
                    <h5 className="titulos-4">Fecha que corresponde el pago</h5>
                    <CampoNumero
                      className='input-MUI__verde'
                      titulo='Año'
                      valor={añoPagoMenActualAlumno}
                      cambiarValor={setAñoPagoMenActualAlumno}
                    />
                    <ListaOpciones 
                      titulo='Mes'
                      placeholder='Selecciona el mes del año'
                      valor={mesPagoMenActualAlumno}
                      cambiarValor={valorMes}
                      opciones={meses}
                      className='lista-opciones__verde-claro'
                    />
                    <CampoLectura
                      titulo='Fecha'
                      valor={fechaPagoMenActualAlumno}
                    />
                  </div>
                </div>
                <div className='container-botones contenedor__centro-separacion'>
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
            pasoExactoPago == 2 
            ? <div className='contenedor__completo contenedor__columna-centro'>
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
                <div className='container-botones contenedor__centro-separacion'>
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
            pasoExactoPago == 3 
            ? <div className='contenedor__completo contenedor__columna-centro'>
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
                    respuesta={calcularInicioMensualidad("string", fechaPagoMenActualAlumno, (numeroMesPagoMenActualAlumno + 1), añoPagoMenActualAlumno)}
                    claseExtra='indicadores__chicos'
                  />
                  <Indicadores 
                    titulo='Fecha que termina la mensualidad'
                    respuesta={calcularFinMensualidad("string", fechaPagoMenActualAlumno, (numeroMesPagoMenActualAlumno + 1), añoPagoMenActualAlumno)}
                    claseExtra='indicadores__chicos'
                  />
                </div>
                <div className='container-botones contenedor__centro-separacion'>
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
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default CrearPago
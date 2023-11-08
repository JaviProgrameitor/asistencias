import '../assets/css/PerfilAlumno.css'
import '../assets/css/ScannerAlumno.css'

import alumnoIcono from '../assets/img/alumno.png'

import { useState } from 'react';
import { useNavigate } from "react-router-dom"

import Indicadores from '../components/Indicadores/Indicadores';
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';

import emailjs from '@emailjs/browser';

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import firebaseConfig from '../firebase';

function ScannerAlumno(props) {
  const {
    setScannerAlumno, 
    scannerModalidad, 
    setScannerModalidad, 
    asistenciasEntrada, 
    clases,
    pagosMensualidades
  } = props

  const { 
    foto, 
    nombre, 
    apellido,
    claveEstudiante, 
    idiomaAprendizaje,
    correo,
    fechaPago
  } = props.scannerAlumno[0]
  const informacionAlumno = [
    {
      titulo: 'Nombre Completo',
      valor: `${nombre} ${apellido}`
    },
    {
      titulo: 'Correo',
      valor: correo
    }
  ]

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const navigate = useNavigate()

  const mesMilisegundos = 2629800000;
  const minutos30 = 1800000;
  const diaMilisegundos = 86400000;
  const minutoMilisegundos = 60000;
  const coloresAlumno = {
    colorFondoCercaPago: 'cerca-pago',
    colorFondoPago: 'dia-pago',
    colorFondoDeuda: 'deudas',
  }

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

  const [ nombreAlumno, setNombreAlumno ] = useState(nombre)
  const [ apellidoAlumno, setApellidoAlumno ] = useState(apellido)
  const [ claveEstudianteAlumno, setClaveEstudianteAlumno ] = useState(claveEstudiante)
  const [ correoAlumno, setCorreoAlumno ] = useState(correo)

  // setTimeout(() => {
  //   if(nombre !== false) asistenciaEntrada()
  //   setScannerModalidad('')
  //   navigate('/sistema-asistencias')
  // }, 3000);

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

  function calcularAnteriorMensualidad(tipoRespuesta, fecha, mes, año) {
    let mesFinal;
    let añoFinal;
    let fechaFinal;

    if(0 == (mes - 1)) {
      mesFinal = 'Enero'
      añoFinal = año;

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(1 == (mes - 1)) {
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

    else if(2 == (mes - 1)) {
      mesFinal = 'Marzo'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(3 == (mes - 1)) {
      mesFinal = 'Abril'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(4 == (mes - 1)) {
      mesFinal = 'Mayo'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(5 == (mes - 1)) {
      mesFinal = 'Junio'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(6 == (mes - 1)) {
      mesFinal = 'Julio'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(7 == (mes - 1)) {
      mesFinal = 'Agosto'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    
    else if(8 == (mes - 1)) {
      mesFinal = 'Septiembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(9 == (mes - 1)) {
      mesFinal = 'Octubre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(10 == (mes - 1)) {
      mesFinal = 'Noviembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(-1 == (mes - 1)) {
      mesFinal = 'Diciembre'
      añoFinal = año - 1

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    if(tipoRespuesta == "string") return `${fechaFinal}/${mesFinal}/${añoFinal}`
    else if(tipoRespuesta == "objeto") return [fechaFinal, calcularNumeroPorMes(mesFinal), añoFinal]
  }

  function comprobarMensualidad(idioma, idiomaFecha) {
    let colorMensualidad = false;

    const date = new Date(1698384600000)
    const año = date.getFullYear()
    const mes = date.getMonth()
    const fecha = date.getDate()

    const [ fechaAnterior, mesAnterior, añoAnterior ] = calcularAnteriorMensualidad("objeto", idiomaFecha, mes, año)
    const [ fechaProximo, mesProximo, añoProximo ] = calcularFinMensualidad("objeto", idiomaFecha, mes, año)

    const pagoAnterior = pagosMensualidades.filter(pago => pago.añoFinMensualidad == año && pago.mesFinMensualidad == mes && pago.idiomaPago == idioma && pago.claveEstudiantePago == claveEstudiante)
    const pago = pagosMensualidades.filter(pago => pago.añoPagoMenActual == año && pago.numeroMesPagoMenActual == mes && pago.idiomaPago == idioma && pago.claveEstudiantePago == claveEstudiante)
    const pagoProximo = pagosMensualidades.filter(pago => pago.añoPagoMenActual == añoProximo && pago.numeroMesPagoMenActual == mesProximo && pago.idiomaPago == idioma && pago.claveEstudiantePago == claveEstudiante)

    if(pagoAnterior.length <= 0) {
      const hoyMili = new Date(`${mes + 1} ${fecha}, ${año}`)
      const pagoMili = new Date(`${mesAnterior + 1} ${fechaAnterior}, ${añoAnterior}`)
      const resto = Math.round((hoyMili - pagoMili) / diaMilisegundos)

      if(colorMensualidad === false) colorMensualidad = coloresAlumno.colorFondoDeuda

      return <span className={`${colorMensualidad}`}>{`Mensualidad del Idioma ${idioma}: Retraso de ${resto} días`}</span>
    }

    else if(pago.length > 0) {
      if(pagoProximo.length > 0) {
        return <span className={`${colorMensualidad}`}>{`Mensualidad del Idioma ${idioma}: Sin Deudas`}</span>
      }
      
      else {
        const hoyMili = new Date(`${mes + 1} ${fecha}, ${año}`)
        const pagoMili = new Date(`${mesProximo + 1} ${fechaProximo}, ${añoProximo}`)
        const resto = Math.round((pagoMili - hoyMili) / diaMilisegundos)

        if(resto <= 5) {
          if(colorMensualidad === false) colorMensualidad = coloresAlumno.colorFondoCercaPago

          return <span className={`${colorMensualidad}`}>{`Mensualidad del Idioma ${idioma}: Faltan ${resto} días`}</span>
        }

        return <span className={`${colorMensualidad}`}>{`Mensualidad del Idioma ${idioma}: Sin Deudas`}</span>
      }
    }

    else {
      const hoyMili = new Date(`${mes + 1} ${fecha}, ${año}`)
      const pagoMili = new Date(`${mes + 1} ${idiomaFecha}, ${año}`)

      if(idiomaFecha == fecha) {
        if(colorMensualidad === false) colorMensualidad = coloresAlumno.colorFondoPago

        return <span className={`${colorMensualidad}`}>{`Mensualidad del Idioma ${idioma}: Día de Pago`}</span>
      }

      else if(pagoMili > hoyMili) {
        const resto = Math.round((pagoMili - hoyMili) / diaMilisegundos)

        if(resto <= 5) {
          if(colorMensualidad === false) colorMensualidad = coloresAlumno.colorFondoCercaPago

          return <span className={`${colorMensualidad}`}>{`Mensualidad del Idioma ${idioma}: Faltan ${resto} días`}</span>
        }

        return <span className={`${colorMensualidad}`}>{`Mensualidad del Idioma ${idioma}: Sin Deudas`}</span>
      }

      else {
        const resto = Math.round((hoyMili - pagoMili) / diaMilisegundos)

        if(colorMensualidad === false) colorMensualidad = coloresAlumno.colorFondoDeuda

        return <span className={`${colorMensualidad} comprobante-mensualidad`}>{`Mensualidad del Idioma ${idioma}: Retraso de ${resto} días`}</span>
      }
    }
  }

  //Todo: Calcular Asistencia

  //Función para calcular la asistencia, saber la hora en la que asistió y la clase
  function calcularAsistencia(accion, hora, modalidad) {
    const date = new Date(1698384600000);
    const año = date.getFullYear()
    const mes = new Date(date.getTime() + mesMilisegundos).getMonth()
    const fecha = date.getDate()
    let dia = date.getDay()

    for(let i = 0; i < clases.length; i++) {
      let horaInicioPrueba = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaInicioClase}`).getTime()
      let horaFinalPrueba = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaFinalClase}`).getTime();
      let horaInicio;
      let horaFinal;
      let puntualidad;
      
      if(horaInicioPrueba > horaFinalPrueba) {
        let restoInicio = hora - horaInicioPrueba;
        let restoFinal = hora - horaFinalPrueba;

        if(restoInicio < 0 && restoFinal < 0) {
          restoInicio = restoInicio * -1;
          restoFinal = restoFinal * -1;
        }

        if(restoInicio < restoFinal) {
          horaInicio = horaInicioPrueba;
          horaFinal = horaFinalPrueba + diaMilisegundos;
        }

        else {
          horaInicio = horaInicioPrueba - diaMilisegundos;
          horaFinal = horaFinalPrueba;
        }
      }

      else {
        horaInicio = horaInicioPrueba;
        horaFinal = horaFinalPrueba;
      }

      if(
          accion == 'Entrada' &&
          clases[i].modalidadClase == modalidad && 
          clases[i].diasNumeroClase.includes(dia) && 
          (horaInicio - minutos30) < hora && hora < horaFinal
        ) {
        if(hora <= horaInicio) puntualidad = 'Llegó a tiempo.'
        else puntualidad = `Llegó ${Math.round((hora - horaInicio) / minutoMilisegundos)} minutos tarde.`

        return {
          diasHorarios : clases[i].diasClase,
          horaHorario : `${clases[i].horaInicioClase} a ${clases[i].horaFinalClase}`,
          claveHorario : clases[i].claveClase,
          puntualidadClase: puntualidad,
          idiomaAsistenciaEntrada: clases[i].idiomaClase
        }
      }

      else if(
        accion == 'Salida' &&
        clases[i].modalidadClase == modalidad && 
        clases[i].diasNumeroClase.includes(dia) && 
        horaInicio < hora && hora < (horaFinal + minutos30)
      ) {
        if(hora >= horaFinal) puntualidad = 'Salió en tiempo.'
        else puntualidad = `Salió ${Math.round((horaFinal - hora) / minutoMilisegundos)} minutos antes.`

        return {
          diasHorarios : clases[i].diasClase,
          horaHorario : `${clases[i].horaInicioClase} a ${clases[i].horaFinalClase}`,
          claveHorario : clases[i].claveClase,
          puntualidadClase: puntualidad,
          idiomaAsistenciaEntrada: clases[i].idiomaClase
        }
      }
    }
  }

  //Función para enviar el mensaje a los alumnos
  function enviarMensaje(accionAula) {  
    let serviceId;
    let datosMensaje;

    if(accionAula) datosMensaje = {
      alumno__asistencia: `${nombreAlumno}`,
      from_name: correoAlumno,
      accion__asistencia: 'entrado a el'
    }

    else datosMensaje = {
      alumno__asistencia: `${nombreAlumno}`,
      from_name: correoAlumno,
      accion__asistencia: 'salido del'
    }

    if(correoAlumno.includes('@hotmail.com') || correoAlumno.includes('@outlook.com')) serviceId = 'service_72zexmm'

    else if(correoAlumno.includes('@gmail.com')) serviceId = 'service_rtdxwlf'

    emailjs.send(serviceId, 'template_mbn5lyh', datosMensaje, 'EjqKxLfA5pfR3G7aa')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  //Función para saber si es entrada o salida del alumno
  function entradaSalidaAlumno(hora) {
    let asistencia = []
    const date = new Date(1698384600000);
    const año = date.getFullYear()
    const mes = new Date(date.getTime() + mesMilisegundos).getMonth()
    const fecha = date.getDate()
    let dia = date.getDay()

    for(let i = 0; i < clases.length; i++) {
      let horaInicioPrueba = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaInicioClase}`).getTime() - minutos30
      let horaFinalPrueba = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaFinalClase}`).getTime() + minutos30;
      let horaInicio;
      let horaFinal;
      
      if(horaInicioPrueba > horaFinalPrueba) {
        let restoInicio = hora - horaInicioPrueba;
        let restoFinal = hora - horaFinalPrueba;

        if(restoInicio < 0 && restoFinal < 0) {
          restoInicio = restoInicio * -1;
          restoFinal = restoFinal * -1;
        }

        if(restoInicio < restoFinal) {
          horaInicio = horaInicioPrueba;
          horaFinal = horaFinalPrueba + diaMilisegundos;
        }

        else {
          horaInicio = horaInicioPrueba - diaMilisegundos;
          horaFinal = horaFinalPrueba;
        }
      }

      else {
        horaInicio = horaInicioPrueba;
        horaFinal = horaFinalPrueba;
      }

      if(
        clases[i].diasNumeroClase.includes(dia) && 
        horaInicio < hora && hora < horaFinal
      ) {
        asistencia = asistenciasEntrada.filter((a) => 
          a.claveEstudianteAsistenciaEntrada == claveEstudianteAlumno && 
          horaInicio < a.horaAsistenciaMilisegundos && a.horaAsistenciaMilisegundos < horaFinal &&
          a.claveHorario == clases[i].claveClase
        )
      }
    }

    return (asistencia.length % 2 == 0)
  }

  //Función para saber la hora de la entrada del alumno
  function horaEntrada() {
    const date = new Date(1698384600000);
    const horaExacta = date.getTime()

    let nombreClase;

    let accion = entradaSalidaAlumno(horaExacta) ? 'Entrada' :  'Salida';

    let { puntualidadClase } = calcularAsistencia(accion, horaExacta, scannerModalidad)

    if(accion == 'Entrada'  && puntualidadClase == 'Llegó a tiempo.') nombreClase = 'puntual'
    else if(accion == 'Salida'  && puntualidadClase == 'Salió en tiempo.') nombreClase = 'puntual'
    else nombreClase = 'impuntual'

    return <span className={`hora-entrada__texto ${nombreClase}`}>{puntualidadClase}</span>
  }

  //Función para agregar la asistencia del alumno
  async function asistenciaEntrada() {
    const date = new Date();
    const año = date.getFullYear()//Saber el año
    const mes = date.getMonth()//Saber el mes
    const fecha = date.getDate()//Saber la fecha
    const hora = date.getHours()//Saber la hora
    const minutos = date.getMinutes()//Saber los minutos
    const dia = date.getDay()//Saber el día de la semana
    const horaExacta = date.getTime()

    let mesExacto;
    let fechaExacto;
    let minutoExacto;

    let entradaSalida = entradaSalidaAlumno(horaExacta) ? 'Entrada' :  'Salida'
    let { 
      diasHorarios, 
      horaHorario, 
      claveHorario, 
      puntualidadClase, 
      idiomaAsistenciaEntrada 
    } = calcularAsistencia(entradaSalida, horaExacta, scannerModalidad)

    //Todo: Calcular exactametne la fecha y la hora de la asistencia
    if((mes + 1) < 10) mesExacto = `0${mes + 1}`
    else if((mes + 1) >= 10) mesExacto = `${mes + 1}`

    if(fecha < 10) fechaExacto = `0${fecha}`
    else if(fecha >= 10) fechaExacto = `${fecha}`

    if(minutos < 10) minutoExacto = `0${minutos}`
    else if(minutos >= 10) minutoExacto = `${minutos}`

    const nombreAsistenciaEntrada = nombreAlumno
    const apellidoAsistenciaEntrada = apellidoAlumno
    const claveEstudianteAsistenciaEntrada = claveEstudianteAlumno
    let fechaCompletaAsistenciaEntrada = `${fechaExacto}/${mesExacto}/${año}`
    const fechaInternaAsistenciaEntrada = `${año}-${mesExacto}-${fechaExacto}`
    const horaAsistenciaEntrada = `${hora}:${minutoExacto}`
    const diaAsistenciaEntrada = dia
    const fechaAsistenciaEntrada = fecha
    const mesAsistenciaEntrada = mes
    const añoAsistenciaEntrada = año
    const modalidadClase = scannerModalidad
    const entradaSalidaAsistencia = entradaSalida
    const horaAsistenciaMilisegundos = horaExacta

    const datos = {
      nombreAsistenciaEntrada, 
      apellidoAsistenciaEntrada,
      claveEstudianteAsistenciaEntrada,
      fechaCompletaAsistenciaEntrada,
      fechaInternaAsistenciaEntrada,
      horaAsistenciaEntrada,
      diaAsistenciaEntrada,
      fechaAsistenciaEntrada,
      mesAsistenciaEntrada,
      añoAsistenciaEntrada,
      diasHorarios,
      horaHorario,
      claveHorario,
      puntualidadClase,
      modalidadClase,
      entradaSalidaAsistencia,
      idiomaAsistenciaEntrada,
      horaAsistenciaMilisegundos
    }

    //enviarMensaje(entradaSalidaAlumno())

    const collectionRef = collection(db, 'asistenciasEntrada')
    const docRef = await addDoc(collectionRef, datos)
  }

  return (
    <div className={`container-principal-perfil-alumno container-principal-scanner-alumno ${nombre !== false ? "" : "contenedor__ambos-lados_centrado"}`}>
      {
        nombre !== false ? 
          <div className='container-perfil-alumno'>
            <div className='personal__fondo scanner-alumno-fondo'>
              <img className='perfil-foto-alumno perfil-foto-scanner-alumno' src={foto} alt="Foto de Perfil del Alumno" />
            </div>
            <div className='container-bienvenida'>
              <h2 className='bienvenida__titulo'>Bienvenidos Queridos Alumnos</h2>
            </div>
            <div className='container__hora-entrada'>
              {horaEntrada()}
            </div>
            <div className='contenedor__centrado-separacion'>
              {
                idiomaAprendizaje.map((idioma, index) => 
                  <span className='comprobante-mensualidad' key={index}>{comprobarMensualidad(idioma, fechaPago[index])}</span>
                )
              }
            </div>
            <div className='container-perfil-alumno__informacion'>
              <div className='perfil-alumno__personal perfil-scaner-alumno__personal'>
                <h2 className='titulos-2'>Información Personal</h2>
                {
                  informacionAlumno.map((info, index) => 
                    <Indicadores 
                      titulo={info.titulo} 
                      respuesta={info.valor} 
                      key={index} 
                    />
                  )
                }
              </div>
              <div className='perfil-alumno__centro-idiomas perfil-scaner-alumno__centro-idiomas'>
                <h2 className='titulos-2'>Información Centro de Idiomas</h2>
                <Indicadores titulo={'Clave del Estudiante'} respuesta={claveEstudiante} />
                <IndicadoresMultiples titulo={'Idiomas de Aprendizaje'} respuesta={idiomaAprendizaje} />
              </div>
            </div>
          </div>
        : 
          <div className='contenedor__ambos-lados_centrado'>
            <img className='icono__alumno-no-encontrado' src={alumnoIcono} alt="Icono de Alumno" />
            <p className='texto__alumno-no-encontrado'>Alumno no encontrado.</p>
          </div>
      }
    </div>
  )
}

export default ScannerAlumno
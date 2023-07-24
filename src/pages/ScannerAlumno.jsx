import '../assets/css/PerfilAlumno.css'
import '../assets/css/ScannerAlumno.css'

import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

import Indicadores from '../components/Indicadores/Indicadores';
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';

import emailjs from '@emailjs/browser';

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, onSnapshot  } from "firebase/firestore";
import firebaseConfig from '../firebase';

function ScannerAlumno(props) {
  const { infoScanner, setInfoScanner,scannerAlumno, setScannerAlumno, scannerTipo, setScannerTipo, asistenciasEntrada } = props
  const { 
    foto, 
    nombre, 
    apellido, 
    numeroTelefono, 
    claveEstudiante, 
    idiomaAprendizaje, 
    modalidadEstudio, 
    fechaPago, 
    id, 
    fechaNacimiento, 
    correo, 
    nivelAcademico, 
    nivelIdioma, 
    fechaIngreso,
    genero
  } = props.scannerAlumno[0]
  const informacionAlumno = [
    {
      titulo: 'Nombre Completo',
      valor: `${nombre} ${apellido}`
    },
    {
      titulo: 'Fecha de Nacimiento',
      valor: fechaNacimiento
    },
    {
      titulo: 'Correo',
      valor: correo
    },
    {
      titulo: 'Número Telefónico',
      valor: numeroTelefono
    },
    {
      titulo: 'Nivel Academico',
      valor: nivelAcademico
    }
  ]

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const navigate = useNavigate()

  const [ nombreAlumno, setNombreAlumno ] = useState(nombre)
  const [ apellidoAlumno, setApellidoAlumno ] = useState(apellido)
  const [ claveEstudianteAlumno, setClaveEstudianteAlumno ] = useState(claveEstudiante)
  const [ correoAlumno, setCorreoAlumno ] = useState(correo)

  setTimeout(() => {
    asistenciaEntrada()
    setInfoScanner('')
    setScannerTipo('')
    navigate('/')
  }, 8000);

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

    if(correoAlumno.includes('@hotmail.com')) serviceId = 'service_s03txqx'

    else if(correoAlumno.includes('@gmail.com')) serviceId = 'service_c3doz7i'

    emailjs.send(serviceId, 'template_mbn5lyh', datosMensaje, 'EjqKxLfA5pfR3G7aa')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  }

  function bienvenida() {
    if(genero === 'Hombre') return 'Bienvenido Querido Alumno'
    else if(genero === 'Mujer') return 'Bienvenida Querida Alumna'
  }

  function entradaSalidaAlumno() {
    const date = new Date();
    const año = date.getFullYear()//Saber el año
    const mes = date.getMonth()//Saber el mes
    const fecha = date.getDate()//Saber la fecha
    const hora = date.getHours()//Saber la hora
    const minutos = date.getMinutes()//Saber los minutos
    const dia = date.getDay()//Saber el día de la semana

    let minutoExacto;
    let horaClase;
    let asistencia;

    //Todo: Calcular exactametne la fecha y la hora de la asistencia
    if(minutos < 10) minutoExacto = `0${minutos}`
    else if(minutos >= 10) minutoExacto = `${minutos}`

    //Todo: calcular la clase de la asistencia

    horaClase = parseInt(`${hora}${minutoExacto}`)

    if(dia == 1 || dia == 3 || dia == 5) {
      if(1330 <= horaClase && horaClase <= 1520) {
        asistencia = asistenciasEntrada.filter((a) => 
          a.claveEstudianteAsistenciaEntrada == claveEstudianteAlumno && 
          a.añoAsistenciaEntrada == año &&
          a.mesAsistenciaEntrada == mes &&
          a.fechaAsistenciaEntrada == fecha &&
          a.claveHorario == 'MatuLuMiVi200320'
        )
      }
    }

    if(dia == 1 || dia == 3) {
      if(1630 <= horaClase && horaClase <= 1900) {
        asistencia = asistenciasEntrada.filter((a) => 
          a.claveEstudianteAsistenciaEntrada == claveEstudiante && 
          a.añoAsistenciaEntrada == año &&
          a.mesAsistenciaEntrada == mes &&
          a.fechaAsistenciaEntrada == fecha &&
          a.claveHorario == 'VesLuMi500700'
        )
      }
    }

    if(dia == 1 || dia == 2 || dia == 3 || dia == 4) {
      if(1920 <= horaClase && horaClase <= 2115) {
        asistencia = asistenciasEntrada.filter((a) => 
          a.claveEstudianteAsistenciaEntrada == claveEstudiante && 
          a.añoAsistenciaEntrada == año &&
          a.mesAsistenciaEntrada == mes &&
          a.fechaAsistenciaEntrada == fecha &&
          a.claveHorario == 'NocLuMaMiJu740915'
        )
      }
    }

    if(dia == 2 || dia == 4) {
      if(1100 <= horaClase && horaClase <= 1330) {
        asistencia = asistenciasEntrada.filter((a) => 
          a.claveEstudianteAsistenciaEntrada == claveEstudiante && 
          a.añoAsistenciaEntrada == año &&
          a.mesAsistenciaEntrada == mes &&
          a.fechaAsistenciaEntrada == fecha &&
          a.claveHorario == 'MatuMaJu1130130'
        )
      }

      if(1630 <= horaClase && horaClase <= 1900) {
        asistencia = asistenciasEntrada.filter((a) => 
          a.claveEstudianteAsistenciaEntrada == claveEstudiante && 
          a.añoAsistenciaEntrada == año &&
          a.mesAsistenciaEntrada == mes &&
          a.fechaAsistenciaEntrada == fecha &&
          a.claveHorario == 'VesMaJu500700'
        )
      }
    }

    if(dia == 6) {
      if(1230 <= horaClase && horaClase <= 1600) {
        asistencia = asistenciasEntrada.filter((a) => 
          a.claveEstudianteAsistenciaEntrada == claveEstudiante && 
          a.añoAsistenciaEntrada == año &&
          a.mesAsistenciaEntrada == mes &&
          a.fechaAsistenciaEntrada == fecha &&
          a.claveHorario == 'Saba100400'
        )
      }
    }

    console.log("Asistencias " + asistencia)
    console.log("Cantidad asistencias " + asistencia.length % 2)
    return (asistencia.length % 2 == 0)
  }

  function horaEntrada() {
    const date = new Date();
    const hora = date.getHours()//Saber la hora
    const minutos = date.getMinutes()//Saber los minutos
    const dia = date.getDay()//Saber el día de la semana

    let minutoExacto;
    let horaClase;
    let textoClase;
    let nombreClase;

    //Todo: Calcular exactametne la fecha y la hora de la asistencia
    if(minutos < 10) minutoExacto = `0${minutos}`
    else if(minutos >= 10) minutoExacto = `${minutos}`

    //Todo: calcular la clase de la asistencia

    horaClase = parseInt(`${hora}${minutoExacto}`) 

    if(dia === 1 || dia === 3 || dia === 5) {
      if(1330 <= horaClase && horaClase <= 1520) {
        if(horaClase <= 1411) textoClase = 'Gracias por llegar temprano.'
        else if(horaClase > 1459) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 40) - 1400} minutos tarde.`
        else if(horaClase > 1411) textoClase = `Trata de llegar más temprano. Llegáste ${horaClase - 1400} minutos tarde.`
      }
    }

    if(dia === 1 || dia === 3) {
      if(1630 <= horaClase && horaClase <= 1900) {
        if(horaClase <= 1711) textoClase = 'Gracias por llegar temprano.'
        else if(horaClase > 1859) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 80) - 1700} minutos tarde.`
        else if(horaClase > 1759) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 40) - 1700} minutos tarde.`
        else if(horaClase > 1711) textoClase = `Trata de llegar más temprano. Llegáste ${horaClase - 1700} minutos tarde.`
      }
    }

    if(dia === 1 || dia === 2 || dia === 3 || dia === 4) {
      if(1920 <= horaClase && horaClase <= 2115) {
        if(horaClase <= 1951) textoClase = 'Llegó puntual.'
        else if(horaClase > 2059) textoClase = `Llegó ${(horaClase - 80) - 1940} minutos tarde.`
        else if(horaClase > 1959) textoClase = `Llegó ${(horaClase - 40) - 1940} minutos tarde.`
        else if(horaClase > 1951) textoClase = `Llegó ${horaClase - 1940} minutos tarde.`
      }
    }

    if(dia == 2 || dia == 4) {
      if(1100 <= horaClase && horaClase <= 1330) {
        if(horaClase <= 1141) textoClase = 'Gracias por llegar temprano.'
        else if(horaClase > 1259) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 80) - 1130} minutos tarde.`
        else if(horaClase > 1159) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 40) - 1130} minutos tarde.`
        else if(horaClase > 1141) textoClase = `Trata de llegar más temprano. Llegáste ${horaClase - 1130} minutos tarde.`
      }

      if(1630 <= horaClase && horaClase <= 1900) {
        if(horaClase <= 1711) textoClase = 'Gracias por llegar temprano.'
        else if(horaClase > 1859) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 80) - 1700} minutos tarde.`
        else if(horaClase > 1759) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 40) - 1700} minutos tarde.`
        else if(horaClase > 1711) textoClase = `Trata de llegar más temprano. Llegáste ${horaClase - 1700} minutos tarde.`
      }
    }

    if(dia == 6) {
      if(1230 <= horaClase && horaClase <= 1600) {
        if(horaClase <= 1311) textoClase = 'Gracias por llegar temprano.'
        else if(horaClase > 1559) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 120) - 1300} minutos tarde.`
        else if(horaClase > 1459) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 80) - 1300} minutos tarde.`
        else if(horaClase > 1359) textoClase = `Trata de llegar más temprano. Llegáste ${(horaClase - 40) - 1300} minutos tarde.`
        else if(horaClase > 1311) textoClase = `Trata de llegar más temprano. Llegáste ${horaClase - 1300} minutos tarde.`
      }
    }

    if(textoClase == 'Gracias por llegar temprano.') nombreClase = 'puntual'
    else nombreClase = 'impuntual'

    return <span className={`hora-entrada__texto ${nombreClase}`}>{textoClase}</span>
  }

  async function asistenciaEntrada() {
    const date = new Date();
    const año = date.getFullYear()//Saber el año
    const mes = date.getMonth()//Saber el mes
    const fecha = date.getDate()//Saber la fecha
    const hora = date.getHours()//Saber la hora
    const minutos = date.getMinutes()//Saber los minutos
    const dia = date.getDay()//Saber el día de la semana

    let mesExacto;
    let fechaExacto;
    let minutoExacto;
    
    let horaClase;
    let tipoHorario;
    let diasHorarios;
    let horaHorario;
    let claveHorario;
    let puntualidadClase;
    let entradaSalida;

    //Todo: Calcular exactametne la fecha y la hora de la asistencia
    if((mes + 1) < 10) mesExacto = `0${mes + 1}`
    else if((mes + 1) >= 10) mesExacto = `${mes + 1}`

    if(fecha < 10) fechaExacto = `0${fecha}`
    else if(fecha >= 10) fechaExacto = `${fecha}`

    if(minutos < 10) minutoExacto = `0${minutos}`
    else if(minutos >= 10) minutoExacto = `${minutos}`

    //Todo: calcular la clase de la asistencia

    horaClase = parseInt(`${hora}${minutoExacto}`)

    //Todo: Se calcula si es la entrada o salida del alumno

    //Todo: Entrada
    if(entradaSalidaAlumno()) {
      entradaSalida = 'Entrada'

      if(scannerTipo == 'Presencial') {
        //Todo: Horarios de las clases de inglés presenciales
        if(dia == 1 || dia == 3 || dia == 5) {
          if(1330 <= horaClase && horaClase <= 1520) {
            tipoHorario = 'Matutino'
            diasHorarios = 'Lunes-Miercoles-Viernes'
            horaHorario = '2:00 p.m a 3:20 p.m'
            claveHorario = 'MatuLuMiVi200320'
  
            if(horaClase <= 1411) puntualidadClase = 'Llegó puntual.'
            else if(horaClase > 1459) puntualidadClase = `Llegó ${(horaClase - 40) - 1400} minutos tarde.`
            else if(horaClase > 1411) puntualidadClase = `Llegó ${horaClase - 1400} minutos tarde.`
          }
        }
  
        if(dia == 1 || dia == 3) {
          if(1630 <= horaClase && horaClase <= 1900) {
            tipoHorario = 'Vespertino'
            diasHorarios = 'Lunes-Miercoles'
            horaHorario = '5:00 p.m a 7:00 p.m'
            claveHorario = 'VesLuMi500700'
  
            if(horaClase <= 1711) puntualidadClase = 'Llegó puntual.'
            else if(horaClase > 1859) puntualidadClase = `Llegó ${(horaClase - 80) - 1700} minutos tarde.`
            else if(horaClase > 1759) puntualidadClase = `Llegó ${(horaClase - 40) - 1700} minutos tarde.`
            else if(horaClase > 1711) puntualidadClase = `Llegó ${horaClase - 1700} minutos tarde.`
          }
        }
  
        else if(dia == 2 || dia == 4) {
          if(1100 <= horaClase && horaClase <= 1330) {
            tipoHorario = 'Matutino'
            diasHorarios = 'Martes-Jueves'
            horaHorario = '11:30 a.m a 1:30 p.m'
            claveHorario = 'MatuMaJu1130130'
  
            if(horaClase <= 1141) puntualidadClase = 'Llegó puntual.'
            else if(horaClase > 1259) puntualidadClase = `Llegó ${(horaClase - 80) - 1130} minutos tarde.`
            else if(horaClase > 1159) puntualidadClase = `Llegó ${(horaClase - 40) - 1130} minutos tarde.`
            else if(horaClase > 1141) puntualidadClase = `Llegó ${horaClase - 1130} minutos tarde.`
          }
  
          if(1630 <= horaClase && horaClase <= 1900) {
            tipoHorario = 'Vespertino'
            diasHorarios = 'Martes-Jueves'
            horaHorario = '5:00 p.m a 7:00 p.m'
            claveHorario = 'VesMaJu500700'
  
            if(horaClase <= 1711) puntualidadClase = 'Llegó puntual.'
            else if(horaClase > 1859) puntualidadClase = `Llegó ${(horaClase - 80) - 1700} minutos tarde.`
            else if(horaClase > 1759) puntualidadClase = `Llegó ${(horaClase - 40) - 1700} minutos tarde.`
            else if(horaClase > 1711) puntualidadClase = `Llegó ${horaClase - 1700} minutos tarde.`
          }
        }
  
        else if(dia == 6) {
          if(1230 <= horaClase && horaClase <= 1600) {
            tipoHorario = 'Sabatina'
            diasHorarios = 'Sabado'
            horaHorario = '1:00 p.m a 4:00 p.m'
            claveHorario = 'Saba100400'
  
            if(horaClase <= 1311) puntualidadClase = 'Llegó puntual.'
            else if(horaClase > 1559) puntualidadClase = `Llegó ${(horaClase - 120) - 1300} minutos tarde.`
            else if(horaClase > 1459) puntualidadClase = `Llegó ${(horaClase - 80) - 1300} minutos tarde.`
            else if(horaClase > 1359) puntualidadClase = `Llegó ${(horaClase - 40) - 1300} minutos tarde.`
            else if(horaClase > 1311) puntualidadClase = `Llegó ${horaClase - 1300} minutos tarde.`
          }
        }
  
        else return 
      }
  
      else if(scannerTipo == 'En linea') {
        if(dia == 1 || dia == 2 || dia == 3 || dia == 4) {
          if(1920 <= horaClase && horaClase <= 2115) {
            tipoHorario = 'Nocturno'
            diasHorarios = 'Lunes-Martes-Miercoles-Jueves'
            horaHorario = '7:40 p.m a 9:15 p.m'
            claveHorario = 'NocLuMaMiJu740915'
  
            if(horaClase <= 1951) puntualidadClase = 'Llegó puntual.'
            else if(horaClase > 2059) puntualidadClase = `Llegó ${(horaClase - 80) - 1940} minutos tarde.`
            else if(horaClase > 1959) puntualidadClase = `Llegó ${(horaClase - 40) - 1940} minutos tarde.`
            else if(horaClase > 1951) puntualidadClase = `Llegó ${horaClase - 1940} minutos tarde.`
          }
        }
  
        else return
      }
  
      else return
    }

    //Todo: Salida
    if(entradaSalidaAlumno() == false) {
      entradaSalida = 'Salida'

      if(scannerTipo == 'Presencial') {
        //Todo: Horarios de las clases de inglés presenciales
        if(dia == 1 || dia == 3 || dia == 5) {
          if(1400 <= horaClase && horaClase <= 1600) {
            tipoHorario = 'Matutino'
            diasHorarios = 'Lunes-Miercoles-Viernes'
            horaHorario = '2:00 p.m a 3:20 p.m'
            claveHorario = 'MatuLuMiVi200320'
  
            if(horaClase >= 1520) puntualidadClase = 'Salió en tiempo.'
            else if(horaClase < 1500) puntualidadClase = `Salió ${(1520 - 40) - horaClase} minutos antes.`
            else if(horaClase < 1520) puntualidadClase = `Salió ${1520 - horaClase} minutos antes.`
          }
        }

        if(dia == 1 || dia == 3) {
          if(1700 <= horaClase && horaClase <= 1940) {
            tipoHorario = 'Vespertino'
            diasHorarios = 'Lunes-Miercoles'
            horaHorario = '5:00 p.m a 7:00 p.m'
            claveHorario = 'VesLuMi500700'
  
            if(horaClase >= 1900) puntualidadClase = 'Salió en tiempo.'
            else if(horaClase < 1800) puntualidadClase = `Salió ${(1900 - 80) - horaClase} minutos antes.`
            else if(horaClase < 1900) puntualidadClase = `Salió ${(1900 - 40) - horaClase} minutos antes.`
          }
        }

        else if(dia == 2 || dia == 4) {
          if(1130 <= horaClase && horaClase <= 1400) {
            tipoHorario = 'Matutino'
            diasHorarios = 'Martes-Jueves'
            horaHorario = '11:30 a.m a 1:30 p.m'
            claveHorario = 'MatuMaJu1130130'
  
            if(horaClase >= 1330) puntualidadClase = 'Salió en tiempo.'
            else if(horaClase < 1200) puntualidadClase = `Salió ${(1330 - 80) - horaClase} minutos antes.`
            else if(horaClase < 1300) puntualidadClase = `Salió ${(1330 - 40) - horaClase} minutos antes.`
            else if(horaClase < 1330) puntualidadClase = `Salió ${1330 - horaClase} minutos antes.`
          }
  
          if(1700 <= horaClase && horaClase <= 1940) {
            tipoHorario = 'Vespertino'
            diasHorarios = 'Martes-Jueves'
            horaHorario = '5:00 p.m a 7:00 p.m'
            claveHorario = 'VesMaJu500700'
  
            if(horaClase >= 1900) puntualidadClase = 'Salió en tiempo.'
            else if(horaClase < 1800) puntualidadClase = `Salió ${(1900 - 80) - horaClase} minutos antes.`
            else if(horaClase < 1900) puntualidadClase = `Salió ${(1900 - 40) - horaClase} minutos antes.`
          }
        }

        else if(dia == 6) {
          if(1300 <= horaClase && horaClase <= 1640) {
            tipoHorario = 'Sabatina'
            diasHorarios = 'Sabado'
            horaHorario = '1:00 p.m a 4:00 p.m'
            claveHorario = 'Saba100400'
  
            if(horaClase >= 1600) puntualidadClase = 'Salió en tiempo.'
            else if(horaClase < 1400) puntualidadClase = `Salió ${(1600 - 120) - horaClase} minutos antes.`
            else if(horaClase < 1500) puntualidadClase = `Salió ${(1600 - 80) - horaClase} minutos antes.`
            else if(horaClase < 1600) puntualidadClase = `Salió ${(1600 - 40) - horaClase} minutos antes.`
          }
        }
  
        else return 
      }

      else if(scannerTipo == 'En linea') {
        if(dia == 1 || dia == 2 || dia == 3 || dia == 4) {
          if(1940 <= horaClase && horaClase <= 2140) {
            tipoHorario = 'Nocturno'
            diasHorarios = 'Lunes-Martes-Miercoles-Jueves'
            horaHorario = '7:40 p.m a 9:15 p.m'
            claveHorario = 'NocLuMaMiJu740915'
  
            if(horaClase >= 2115) puntualidadClase = 'Salió en tiempo.'
            else if(horaClase < 2000) puntualidadClase = `Salió ${(2115 - 80) - horaClase} minutos antes.`
            else if(horaClase < 2100) puntualidadClase = `Salió ${(2115 - 40) - horaClase} minutos antes.`
            else if(horaClase < 2115) puntualidadClase = `Salió ${2115 - horaClase} minutos antes.`
          }
        }
  
        else return
      }

      else return
    }

    const nombreAsistenciaEntrada = nombreAlumno
    const apellidoAsistenciaEntrada = apellidoAlumno
    const claveEstudianteAsistenciaEntrada = claveEstudianteAlumno
    let fechaCompletaAsistenciaEntrada = `${fechaExacto}/${mesExacto}/${año}`
    const horaAsistenciaEntrada = `${hora}:${minutoExacto}`
    const diaAsistenciaEntrada = dia
    const fechaAsistenciaEntrada = fecha
    const mesAsistenciaEntrada = mes
    const añoAsistenciaEntrada = año
    const modalidadClase = scannerTipo
    const entradaSalidaAsistencia = entradaSalida

    const datos = {
      nombreAsistenciaEntrada, 
      apellidoAsistenciaEntrada,
      claveEstudianteAsistenciaEntrada,
      fechaCompletaAsistenciaEntrada,
      horaAsistenciaEntrada,
      diaAsistenciaEntrada,
      fechaAsistenciaEntrada,
      mesAsistenciaEntrada,
      añoAsistenciaEntrada,
      horaClase,
      tipoHorario,
      diasHorarios,
      horaHorario,
      claveHorario,
      puntualidadClase,
      modalidadClase,
      entradaSalidaAsistencia
    }

    enviarMensaje(entradaSalidaAlumno())

    const collectionRef = collection(db, 'asistenciasEntrada')
    const docRef = await addDoc(collectionRef, datos)
  }

  return (
    <div className='container-principal-perfil-alumno container-principal-scanner-alumno'>
      <div className='container-perfil-alumno'>
        <div className='personal__fondo scanner-alumno-fondo'>
          <img className='perfil-foto-alumno perfil-foto-scanner-alumno' src={foto} alt="Foto de Perfil del Alumno" />
        </div>
        <div className="container-loading-bar">
          <div className='caja-loading-bar'>
            <div className="loading-bar">
              8
            </div>
          </div>
        </div>
        <div className='container-bienvenida'>
          <h2 className='bienvenida__titulo'>{bienvenida()}</h2>
        </div>
        <div className='container__hora-entrada'>
          {horaEntrada()}
        </div>
        <div className='container-perfil-alumno__informacion'>
          <div className='perfil-alumno__personal perfil-scaner-alumno__personal'>
            <h2 className='titulos-2'>Información Personal</h2>
            {
              informacionAlumno.map((info, index) => <Indicadores titulo={info.titulo} respuesta={info.valor} key={index} />)
            }
          </div>
          <div className='perfil-alumno__centro-idiomas perfil-scaner-alumno__centro-idiomas'>
            <h2 className='titulos-2'>Información Centro de Idiomas</h2>
            <Indicadores titulo={'Clave del Estudiante'} respuesta={claveEstudiante} />
            <IndicadoresMultiples titulo={'Idiomas de Aprendizaje'} respuesta={idiomaAprendizaje} />
            <IndicadoresMultiples titulo={'Nivel MCERLC'} respuesta={nivelIdioma} />
            <IndicadoresMultiples titulo={'Modalidad de Estudio'} respuesta={modalidadEstudio} />
            <IndicadoresMultiples titulo={'Fecha de Ingreso'} respuesta={fechaIngreso} />
            <IndicadoresMultiples titulo={'Fecha de Pago'} respuesta={fechaPago} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScannerAlumno
import '../assets/css/PerfilAlumno.css'
import '../assets/css/ScannerAlumno.css'

import alumnoIcono from '../assets/img/alumno.webp'

import { useState } from 'react';
import { useNavigate } from "react-router-dom"

import Indicadores from '../components/Indicadores/Indicadores';
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';

import emailjs from '@emailjs/browser';

import { createDatabase } from '../firebase';

function ScannerAlumno(props) {
  const {
    setScannerAlumno,
    asistenciasEntrada,
    pagosMensualidades,
    setScannerClase,
    scannerClase
  } = props

  const { 
    foto, 
    nombre, 
    apellido,
    claveEstudiante, 
    idiomaAprendizaje,
    correo,
    estadoMensualidad,
    clasesMensualidad,
    id
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

  const navigate = useNavigate()

  const mesMilisegundos = 2629800000;
  const minutos30 = 1800000;
  const diaMilisegundos = 86400000;
  const minutoMilisegundos = 60000;

  const [ nombreAlumno, setNombreAlumno ] = useState(nombre)
  const [ apellidoAlumno, setApellidoAlumno ] = useState(apellido)
  const [ claveEstudianteAlumno, setClaveEstudianteAlumno ] = useState(claveEstudiante)
  const [ correoAlumno, setCorreoAlumno ] = useState(correo)

  setTimeout(() => {
    asistenciaEntrada()
    setScannerClase()
    setScannerAlumno()
    navigate('/sistema-asistencias')
  }, 10000);

  //Todo: Calcular Asistencia

  //Función para calcular la puntualidad
  function puntualidadAlumno(accion, hora) {
    const date = new Date();
    const año = date.getFullYear()
    const mes = new Date(date.getTime() + mesMilisegundos).getMonth()
    const fecha = date.getDate()

    let horaInicioPrueba = new Date(`${mes} ${fecha}, ${año} ${scannerClase.horaInicioClase}`).getTime()
    let horaFinalPrueba = new Date(`${mes} ${fecha}, ${año} ${scannerClase.horaFinalClase}`).getTime();
    let horaInicio;
    let horaFinal;
    let puntualidadClase;
    
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

    if(accion == 'Entrada') {
      if(hora <= horaInicio) puntualidadClase = 'Llegó a tiempo.'
      else puntualidadClase = `Llegó ${Math.round((hora - horaInicio) / minutoMilisegundos)} minutos tarde.`

      return puntualidadClase
    }

    else if(accion == 'Salida') {
      if(hora >= horaFinal) puntualidadClase = 'Salió en tiempo.'
      else puntualidadClase = `Salió ${Math.round((horaFinal - hora) / minutoMilisegundos)} minutos antes.`

      return puntualidadClase
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
    const date = new Date();
    const año = date.getFullYear()
    const mes = new Date(date.getTime() + mesMilisegundos).getMonth()
    const fecha = date.getDate()

    let horaInicioPrueba = new Date(`${mes} ${fecha}, ${año} ${scannerClase.horaInicioClase}`).getTime() - minutos30
    let horaFinalPrueba = new Date(`${mes} ${fecha}, ${año} ${scannerClase.horaFinalClase}`).getTime() + minutos30;
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

    asistencia = asistenciasEntrada.filter((a) => 
      a.claveEstudianteAsistenciaEntrada == claveEstudianteAlumno && 
      horaInicio < a.fechaAsistenciaEntrada && a.fechaAsistenciaEntrada < horaFinal &&
      a.claveHorario == scannerClase.claveClase
    )

    return asistencia.length % 2 == 0 ? 'Entrada' : 'Salida'
  }

  //Función para saber la hora de la entrada del alumno
  function horaEntrada() {
    const date = new Date();
    const horaExacta = date.getTime()

    let nombreClase;

    let accion = entradaSalidaAlumno(horaExacta)

    let puntualidadClase = puntualidadAlumno(accion, horaExacta)

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
    const horaExacta = date.getTime()

    let mesExacto;
    let fechaExacto;

    let entradaSalida = entradaSalidaAlumno(horaExacta)
    let puntualidadClase = puntualidadAlumno(entradaSalida, horaExacta)

    //Todo: Calcular exactametne la fecha y la hora de la asistencia
    if((mes + 1) < 10) mesExacto = `0${mes + 1}`
    else if((mes + 1) >= 10) mesExacto = `${mes + 1}`

    if(fecha < 10) fechaExacto = `0${fecha}`
    else if(fecha >= 10) fechaExacto = `${fecha}`

    const datos = {
      nombreAsistenciaEntrada: nombreAlumno, 
      apellidoAsistenciaEntrada: apellidoAlumno,
      claveEstudianteAsistenciaEntrada: claveEstudianteAlumno,
      fechaInternaAsistenciaEntrada: `${año}-${mesExacto}-${fechaExacto}`,
      fechaAsistenciaEntrada: horaExacta,
      diasHorarios: scannerClase.diasClase,
      horaHorario: `${scannerClase.horaInicioClase} a ${scannerClase.horaFinalClase}`,
      claveHorario: scannerClase.claveClase,
      puntualidadClase,
      modalidadClase: scannerClase.modalidadClase,
      entradaSalidaAsistencia: entradaSalida,
      idiomaAsistenciaEntrada: scannerClase.idiomaClase,
      idPropietario: id
    }

    //enviarMensaje(entradaSalidaAlumno())

    await createDatabase('asistenciasEntrada', datos)
  }

  return (
    <div className={`container-principal-perfil-alumno container-principal-scanner-alumno ${nombre !== false ? "" : "contenedor__ambos-lados_centrado"}`}>
      {
        nombre !== false ? 
          <div className='container-perfil-alumno'>
            <div className='personal__fondo'>
              <img className='perfil-foto-alumno' src={foto} alt="Foto de Perfil del Alumno" />
            </div>
            <div className='container-bienvenida'>
              <h2 className='bienvenida__titulo'>Bienvenidos Queridos Alumnos</h2>
            </div>
            <div className='container__hora-entrada'>
              {horaEntrada()}
            </div>
            <div className='contenedor__centrado-separacion center contenedor__wrap gap-x__25 gap-y__10'>
              {
                idiomaAprendizaje.map((idioma, index) => 
                  <span 
                    className={`comprobante-mensualidad padd__20 b-2px-black ${clasesMensualidad[index]}`} 
                    key={index}
                  >
                    {`Mensualidad del Idioma ${idioma}: ${estadoMensualidad[index]}`} 
                  </span>
                )
              }
            </div>
            <div className='container-perfil-alumno__informacion'>
              <div className='perfil-alumno__personal perfil-scaner-alumno__personal'>
                <h2 className='titulos-2'>Información Personal</h2>
                <div>
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
              </div>
              <div className='perfil-alumno__centro-idiomas perfil-scaner-alumno__centro-idiomas'>
                <h2 className='titulos-2'>Información Centro de Idiomas</h2>
                <div>
                  <Indicadores titulo={'Clave del Estudiante'} respuesta={claveEstudiante} />
                  <IndicadoresMultiples titulo={'Idiomas de Aprendizaje'} respuesta={idiomaAprendizaje} />
                </div>
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
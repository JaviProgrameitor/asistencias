import '../assets/css/Scanner.css'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { TiDelete } from 'react-icons/ti'

import CampoContrasena from '../components/CampoContrasena/CampoContrasena';

import { Toaster, toast } from 'sonner'

function Scanner(props) {
  const { 
    alumnos,
    clases,
    activarScanner, 
    setActivarScanner,
    setScannerAlumno, 
    setScannerModalidad 
  } = props
  
  const mesMilisegundos = 2629800000;
  const minutos30 = 1800000;
  const [ fechaActual, setFechaActual ] = useState(calcularFechaActual())
  const [ scannerInformacion, setScannerInformacion ] = useState('')

  const navigate = useNavigate()

  async function EscanearAlumno(e) {
    e.preventDefault()

    const alumno = alumnos.filter((alumno) => alumno.claveEstudiante == scannerInformacion)

    if(alumno.length > 0) {
      await setScannerModalidad('Presencial')
      await setScannerAlumno(alumno)

      navigate('/sistema-asistencias/scanner-alumno')
    } 
    
    else toast.error('Alumno no encontrado')
  }

  function calcularFechaActual() {
    const date = new Date();
    const año = date.getFullYear()
    const mes = new Date(date.getTime() + mesMilisegundos).getMonth()
    const fecha = date.getDate()
    const hora = date.getTime()
    let dia = date.getDay()

    for(let i = 0; i < clases.length; i++) {
      let horaInicio = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaInicioClase}`).getTime() - minutos30;
      let horaFinal = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaFinalClase}`).getTime() + minutos30;

      if(
          clases[i].diasNumeroClase.includes(dia) && 
          horaInicio < hora && hora < horaFinal
        ) {
          return true
        }
    }

    return false
  }

  useEffect(() => {
    const actualizandoFecha = setInterval(() => {
      setFechaActual(calcularFechaActual())
    }, 10000);

    return () => clearInterval(actualizandoFecha);
  }, []);

  return (
    <div className='container-qr-code__contenido'>
      <Toaster position="top-center" richColors />
      <TiDelete 
        className='foto-prueba__icon' 
        onClick={() => {setActivarScanner(!activarScanner)}}
      />
      {
        fechaActual ?
          <form onSubmit={EscanearAlumno}>
            <CampoContrasena 
              className='campo-oscuro'
              titulo='Escanea el Codigo QR'
              placeholder='Escanea el codigo'
              valor={scannerInformacion}
              cambiarValor={setScannerInformacion}
              autoFocus={true}
            />
          </form>
        : <div>
            <h4 className='titulos-2 titulos__blanco'>El scanner se desactivó temporalmente.</h4>
            <h4 className='titulos-2 titulos__blanco'>Se activará automaticamente cuando haya una clase activa.</h4>
          </div>
      }
    </div>
  )
}

export default Scanner
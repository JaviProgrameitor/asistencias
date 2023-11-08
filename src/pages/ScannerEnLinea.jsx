import '../assets/css/ScannerEnLinea.css'

import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import Html5QrcodePlugin from '../components/ScannerReader/ScannerReader';

import { Toaster, toast } from 'sonner'

function ScannerEnLinea(props) {
  const { alumnos, clases, setScannerAlumno, setScannerModalidad } = props
  
  const mesMilisegundos = 2629800000;
  const minutos30 = 1800000;
  const diaMilisegundos = 86400000;
  const [ fechaActual, setFechaActual ] = useState(calcularFechaActual())

  const navigate = useNavigate()

  function calcularFechaActual() {
    const date = new Date(1698384600000);
    const año = date.getFullYear()
    const mes = new Date(date.getTime() + mesMilisegundos).getMonth()
    const fecha = date.getDate()
    const hora = date.getTime()
    let dia = date.getDay()

    for(let i = 0; i < clases.length; i++) {
      let horaInicioPrueba = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaInicioClase}`).getTime() - minutos30
      let horaFinalPrueba = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaFinalClase}`).getTime() + minutos30
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
      ) 
        return true
    }

    return false
  }

  async function EscanearAlumno(respuestaScanner, decodedResult) {
    let alumno = alumnos.filter((alumno) => alumno.claveEstudiante == respuestaScanner)

    if(alumno.length > 0) {
      await setScannerModalidad('En linea')
      await setScannerAlumno(alumno)

      navigate('/sistema-asistencias/scanner-alumno')
    } 
    
    else toast.error('Alumno no encontrado')
  };

  useEffect(() => {
    const actualizandoFecha = setInterval(() => {
      setFechaActual(calcularFechaActual())
    }, 2000);

    return () => clearInterval(actualizandoFecha);
  }, []);

  return (
    <div className='container-qr-code-en-linea'>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias'}>
          <FaArrowCircleLeft className='flecha-regresar__blanco icon-40' />
        </Link>
      </div>
      { 
        fechaActual ?
          <div>
            <h2 className='titulos-2 titulo-qr-en-linea'>Escanea el Codigo QR</h2>
            <div className='caja-qr-en-linea'>
              <div className='qr-en-linea'>
                <Html5QrcodePlugin
                  fps={10}
                  qrbox={250}
                  disableFlip={false}
                  qrCodeSuccessCallback={EscanearAlumno}
                />
              </div>
            </div>
          </div>
        : <div>
            <h4 className='titulos-2 titulos__blanco'>El scanner se desactivó temporalmente.</h4>
            <h4 className='titulos-2 titulos__blanco'>Se activará automaticamente cuando haya una clase activa.</h4>
          </div>
      }
      <Toaster position="top-center" richColors />
    </div>
  );
};

export default ScannerEnLinea
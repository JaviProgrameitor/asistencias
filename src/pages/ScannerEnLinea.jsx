import '../assets/css/ScannerEnLinea.css'

import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import Html5QrcodePlugin from '../components/ScannerReader/ScannerReader';

import { Toaster, toast } from 'sonner'

function ScannerEnLinea(props) {
  const { alumnos, clases, setScannerAlumno, setScannerClase } = props
  
  const mesMilisegundos = 2629800000;
  const minutos30 = 1800000;
  const diaMilisegundos = 86400000;

  const [ clasesActivas, setClasesActivas ] = useState(calcularFechaActual())
  const [ idClaseSeleccionada, setIdClaseSeleccionada ] = useState(null)
  const [ etapaEscanear, setEtapaEscanear ] = useState(1)

  const navigate = useNavigate()

  function calcularFechaActual() {
    const date = new Date(1700013600000);
    const año = date.getFullYear()
    const mes = new Date(date.getTime() + mesMilisegundos).getMonth()
    const fecha = date.getDate()
    const hora = date.getTime()
    let dia = date.getDay()
    let clasesAct = []

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
      clasesAct.push(clases[i])
    }

    return clasesAct
  }

  async function EscanearAlumno(respuestaScanner, decodedResult) {
    let alumno = alumnos.filter((alumno) => alumno.claveEstudiante == respuestaScanner)

    if(alumno.length > 0) {
      await setScannerAlumno(alumno)

      navigate('/sistema-asistencias/scanner-alumno')
    } 
    
    else toast.error('Alumno no encontrado')
  };

  function seleccionarClase(clase) {
    if(!clase) {
      setIdClaseSeleccionada(null)
      setScannerClase()
    }
    else {
      setIdClaseSeleccionada(clase.id)
      setScannerClase(clase)
    }
  }

  useEffect(() => {
    const actualizandoFecha = setInterval(() => {
      setClasesActivas(calcularFechaActual())
    }, 10000);

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
        clasesActivas.length > 0 
        ? <div>
            {
              etapaEscanear == 1
              ? <>
                  <h2 className='titulos-2 titulo-qr-en-linea'>Selecciona la clase</h2>
                  <div className='contenedor__clases contenedor__columna-centro contenedor__gap-15 padd-top__20'>
                    {
                      clasesActivas.map((clase, index) => 
                        <div 
                          className={`cajas-clases ${idClaseSeleccionada == clase.id ? 'clase-activo' : ''}`} 
                          key={index} 
                          onClick={() => {
                            idClaseSeleccionada == clase.id 
                            ? seleccionarClase(false)
                            : seleccionarClase(clase)
                          }}
                        >
                          <p>Idioma: {clase.idiomaClase}</p>
                          <p>Clase: {clase.nombreClase}</p>
                        </div>
                      )
                    }
                  </div>
                </>
              : <>
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
                </>
            }
            <div className='contenedor__centro-separacion padd-top__20'>
              {
                etapaEscanear != 1
                ? <button
                    className='boton__blanco'
                    onClick={() => setEtapaEscanear(1)}
                  >
                    Regresar
                  </button>
                : <button 
                    className='boton__blanco' 
                    onClick={() => {
                      idClaseSeleccionada != null
                      ? setEtapaEscanear(2)
                      : toast.error('Selecciona una clase.')
                    }}
                  >
                    Siguiente
                  </button>
              }
            
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
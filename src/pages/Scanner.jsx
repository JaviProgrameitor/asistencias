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
    setScannerClase,
  } = props
  
  const mesMilisegundos = 2629800000;
  const minutos30 = 1800000;
  const [ clasesActivas, setClasesActivas ] = useState(calcularFechaActual())
  const [ scannerInformacion, setScannerInformacion ] = useState('')
  const [ idClaseSeleccionada, setIdClaseSeleccionada ] = useState(null)
  const [ etapaEscanear, setEtapaEscanear ] = useState(1)

  const navigate = useNavigate()

  async function EscanearAlumno(e) {
    e.preventDefault()

    const alumno = alumnos.filter((alumno) => alumno.claveEstudiante == scannerInformacion)

    if(alumno.length > 0) {
      await setScannerAlumno(alumno)

      navigate('/sistema-asistencias/scanner-alumno')
    } 
    
    else toast.error('Alumno no encontrado')
  }

  function calcularFechaActual() {
    const date = new Date(1699489800000);
    const año = date.getFullYear()
    const mes = new Date(date.getTime() + mesMilisegundos).getMonth()
    const fecha = date.getDate()
    const hora = date.getTime()
    let dia = date.getDay()
    let clasesAct = []

    for(let i = 0; i < clases.length; i++) {
      let horaInicio = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaInicioClase}`).getTime() - minutos30;
      let horaFinal = new Date(`${mes} ${fecha}, ${año} ${clases[i].horaFinalClase}`).getTime() + minutos30;

      if(
          clases[i].diasNumeroClase.includes(dia) && 
          horaInicio < hora && hora < horaFinal
        ) {
          clasesAct.push(clases[i])
        }
    }

    return clasesAct
  }

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
    <div className='container-qr-code__contenido'>
      <Toaster position="top-center" richColors />
      <TiDelete 
        className='foto-prueba__icon' 
        onClick={() => {setActivarScanner(!activarScanner)}}
      />
      <div className='modal__por-defecto modal__contenido modal__personalizado-scanner'>
      {
        clasesActivas.length > 0 
        ? <>
            {
              etapaEscanear == 1
              ? <>
                  <h3 className='titulos-3'>Selecciona la clase</h3>
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
                  <h3 className='titulos-3'>Escanea tu código QR</h3>
                  <form onSubmit={EscanearAlumno}>
                    <CampoContrasena 
                      className='campo-oscuro'
                      titulo='Escanea el Codigo QR'
                      placeholder='Escanea el codigo'
                      valor={scannerInformacion}
                      cambiarValor={setScannerInformacion}
                      autoFocus
                    />
                  </form>
                </>
            }
            <div className='contenedor__centro-separacion'>
              {
                etapaEscanear != 1
                ? <button
                    className='boton__blanco'
                    onClick={() => setEtapaEscanear(1)}
                  >
                    Regresar
                  </button>
              : <button 
                  className='boton__verde-oscuro' 
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
          </>
        : <div>
            <h4 className='titulos-2 titulos__blanco'>El scanner se desactivó temporalmente.</h4>
            <h4 className='titulos-2 titulos__blanco'>Se activará automaticamente cuando haya una clase activa.</h4>
          </div>
      }
      </div>
    </div>
  )
}

export default Scanner
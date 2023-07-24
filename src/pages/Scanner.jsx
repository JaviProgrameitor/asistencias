import '../assets/css/Scanner.css'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { TiDelete } from 'react-icons/ti'

import CampoContrasena from '../components/CampoContrasena/CampoContrasena';

import { initializeApp } from "firebase/app";
import { addDoc, collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

function Scanner(props) {
  const { scanner, setScanner, infoScanner, setInfoScanner, scannerAlumno, setScannerAlumno, setScannerTipo } = props
  
  const [ alumnos, setAlumnos ] = useState([])
  const [ fechaActual, setFechaActual ] = useState(calcularFechaActual())

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const navigate = useNavigate()

  function scanearAlumno(e) {
    e.preventDefault()

    const resultado = alumnos.filter((alumno) => alumno.claveEstudiante == infoScanner)
    setScannerAlumno(resultado)
    setScannerTipo('Presencial')

    navigate('/scanner-alumno')
  }

  function calcularFechaActual() {
    const date = new Date();
    const hora = date.getHours()//Saber la hora
    const minutos = date.getMinutes()//Saber los minutos
    const dia = date.getDay()//Saber el día de la semana

    let minutoExacto;
    
    let horaClase;

    //Todo: Calcular la hora de la asistencia
    if(minutos < 10) minutoExacto = `0${minutos}`
    else if(minutos >= 10) minutoExacto = `${minutos}`

    horaClase = parseInt(`${hora}${minutoExacto}`)

    if(dia == 1 || dia == 3 || dia == 5) {
      if(1330 <= horaClase && horaClase <= 1600) {
        return true
      }

      if(1630 <= horaClase && horaClase <= 1940) {
        return true
      }
    }

    if(dia == 2 || dia == 4) {
      if(1100 <= horaClase && horaClase <= 1430) {
        return true
      }

      else if(1630 <= horaClase && horaClase <= 1940) {
        return true
      }
    }

    if(dia == 6) {
      if(1230 <= horaClase && horaClase <= 1640) {
        return true
      }
    }

    return false
  }

  useEffect(() => {
    const actualizandoFecha = setInterval(() => {
      setFechaActual(calcularFechaActual())
    }, 60000);

    return () => clearInterval(actualizandoFecha);
  }, []);

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'alumnos'),(snapshot) => 
        setAlumnos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  return (
    <div className='container-qr-code'>
      <div className='container-qr-code__contenido'>
        <TiDelete className='foto-prueba__icon' onClick={() => {
          setScanner(!scanner)
        }} />
        {
          fechaActual ?
            <form onSubmit={scanearAlumno}>
              <CampoContrasena 
                className='campo-oscuro'
                titulo='Escanea el Codigo QR'
                placeholder='Escanea el cogigo'
                valor={infoScanner}
                cambiarValor={setInfoScanner}
                autoFocus={true}
              />
            </form>
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
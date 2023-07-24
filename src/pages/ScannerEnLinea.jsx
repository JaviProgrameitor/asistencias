import '../assets/css/ScannerEnLinea.css'

import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

import Html5QrcodePlugin from '../components/ScannerReader/ScannerReader';

function ScannerEnLinea(props) {
  const { infoScanner, setInfoScanner, scannerAlumno, setScannerAlumno, setScannerTipo } = props

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  
  const [alumnos, setAlumnos] = useState([])
  const [ fechaActual, setFechaActual ] = useState(calcularFechaActual())

  const navigate = useNavigate()

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

    if(dia === 1 || dia === 2 || dia === 3 || dia === 4) {
      if(1920 <= horaClase && horaClase <= 2125) {
        return true
      }
    }

    return false
  }

  function onNewScanResult(decodedText, decodedResult) {
    setInfoScanner(decodedText)
  };

  function scanearAlumno() {
    const resultado = alumnos.filter((alumno) => alumno.claveEstudiante == infoScanner)
    setScannerAlumno(resultado)
    setScannerTipo('En linea')

    navigate('/scanner-alumno')
  }

  useEffect(() => {
    const actualizandoFecha = setInterval(() => {
      console.log("Calculando")
      setFechaActual(calcularFechaActual())
    }, 60000);

    return () => clearInterval(actualizandoFecha);
  }, []);

  useEffect(() => {
    if(infoScanner != undefined) scanearAlumno()
  })

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'alumnos'),(snapshot) => 
        setAlumnos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      []
  )

  return (
    <div className='container-qr-code-en-linea'>
      <div className='contenedor__todo-principio'>
        <Link to={'/'}><FaArrowCircleLeft className='flecha-regresar__blanco icon-40' /></Link>
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
                  qrCodeSuccessCallback={onNewScanResult}
                />
              </div>
            </div>
          </div>
        : <div>
            <h4 className='titulos-2 titulos__blanco'>El scanner se desactivó temporalmente.</h4>
            <h4 className='titulos-2 titulos__blanco'>Se activará automaticamente cuando haya una clase activa.</h4>
          </div>
      }
    </div>
  );
};

export default ScannerEnLinea
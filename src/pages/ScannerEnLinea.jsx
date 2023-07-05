import '../assets/css/ScannerEnLinea.css'

import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

import Html5QrcodePlugin from '../components/ScannerReader/ScannerReader';

function ScannerEnLinea(props) {
  const { infoScanner, setInfoScanner, scannerAlumno, setScannerAlumno } = props

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  
  const [alumnos, setAlumnos] = useState([])

  const navigate = useNavigate()

  function onNewScanResult(decodedText, decodedResult) {
    setInfoScanner(decodedText)
};

  function scanearAlumno() {
    const resultado = alumnos.filter((alumno) => alumno.claveEstudiante == infoScanner)
    setScannerAlumno(resultado)

    navigate('/scanner-alumno')
  }

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
  );
};

export default ScannerEnLinea
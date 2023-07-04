import '../assets/css/Scanner.css'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { TiDelete } from 'react-icons/ti'

import CampoContrasena from '../components/CampoContrasena/CampoContrasena';

import { initializeApp } from "firebase/app";
import { addDoc, collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

function Scanner(props) {
  const { scanner, setScanner, infoScanner, setInfoScanner, scannerAlumno, setScannerAlumno } = props
  
  const [alumnos, setAlumnos] = useState([])

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const navigate = useNavigate()

  function scanearAlumno(e) {
    e.preventDefault()

    const resultado = alumnos.filter((alumno) => alumno.claveEstudiante == infoScanner)
    setScannerAlumno(resultado)

    navigate('/scanner-alumno')
  }

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'alumnos'),(snapshot) => 
        setAlumnos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      []
  )

  return (
    <div className='container-qr-code'>
      <div className='container-qr-code__contenido'>
        <TiDelete className='foto-prueba__icon' onClick={() => setScanner(!scanner)} />
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
      </div>
    </div>
  )
}

export default Scanner
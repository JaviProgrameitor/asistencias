import '../assets/css/Usuario.css'

import { useEffect, useState } from 'react';
import { Link, useResolvedPath, useNavigate, Routes, Route } from "react-router-dom"
import { Twirl } from 'hamburger-react'
import { FiPower } from 'react-icons/fi'

import { getAuth, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

import PerfilUsuario from "./PerfilUsuario"
import UsuarioJustificantes from './UsuarioJustificantes';
import UsuarioAsistencias from './UsuarioAsistencias';
import CrearJustificante from './CrearJustificante';

function Usuario(props) {
  const { datos, setUsuario } = props
  const { claveEstudiante } = props.datos[0]

  const auth = getAuth()
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const url = useResolvedPath("").pathname
  
  const navigate = useNavigate()

  const [ isOpen, setOpen ] = useState(false)
  const [ sesion, setSesion ] = useState(false)
  const [ justificantesEnEspera, setJustificantesEnEspera ] = useState([])
  const [ justificantesAceptados, setJustificantesAceptados ] = useState([])
  const [ justificantesRechazados, setJustificantesRechazados ] = useState([])

  function cerrarSesion() {
    signOut(auth).then(() => {
      // Sign-out successful.
      setSesion(true)
    }).catch((error) => {
      // An error happened.
    });
  }

  useEffect(() => {
    if(sesion) {
      setUsuario(false)
      navigate('/')
    }
  },[sesion])

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'justificantesEnEspera'),(snapshot) => 
        setJustificantesEnEspera(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'justificantesAceptados'),(snapshot) => 
      setJustificantesAceptados(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'justificantesRechazados'),(snapshot) => 
      setJustificantesRechazados(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  return (
    <div className='container-principal-usuario'>
      <div className='principal-usuario__botones'>
        <Twirl className='boton-navbar-usuario' toggled={isOpen} toggle={setOpen} color='#316327' />
        <div className='cerrar-sesion' onClick={cerrarSesion}>
          <FiPower className='logo-cerrar-sesion' />
          <span className='texto-cerrar-sesion'>Cerrar Sesión</span>
        </div>
      </div>

      {
        isOpen ? 
          <nav className='navbar-usuario'>
            <div className='list-links'>
              <Link className='link-usuario' to={'/perfil-alumno'} onClick={(e) => setOpen(false)}>Inicio</Link>
            </div>
            <div className='list-links'>
              <Link className='link-usuario' to={`${url}/usuario-asistencias`} onClick={(e) => setOpen(false)}>Asistencias</Link>
            </div>
            <div className='list-links'>
              <Link className='link-usuario' to={`${url}/usuario-justificantes`} onClick={(e) => setOpen(false)}>Justificantes</Link>
            </div>
          </nav> 
          : <></>
      }
      <Routes>
        <Route path='/' element={<PerfilUsuario datos={datos} />} />
        <Route 
          path='/usuario-justificantes/*' 
          element={<UsuarioJustificantes 
            datos={datos} 
            justificantesEnEspera={justificantesEnEspera.filter(justi => justi.claveEstudianteJustificante === claveEstudiante)}
            justificantesAceptados={justificantesAceptados.filter(justi => justi.claveEstudianteJustificante === claveEstudiante)}
            justificantesRechazados={justificantesRechazados.filter(justi => justi.claveEstudianteJustificante === claveEstudiante)}
          />} 
        />
        <Route 
          path='/usuario-asistencias/*'
          element={<UsuarioAsistencias datos={datos} />}
        />
        <Route path='/crear-justificante' element={<CrearJustificante datos={datos} />} />
      </Routes>
    </div>
  )
}

export default Usuario
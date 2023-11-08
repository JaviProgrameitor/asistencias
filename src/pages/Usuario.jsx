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
import Page404 from './Page404';

import Modal from '@mui/material/Modal';

import { Toaster, toast } from 'sonner'

import Logo from '../assets/img/logo.png'

function Usuario(props) {
  const { datos, setUsuario } = props

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
  const [ urlActual, setUrlActual ] = useState(window.location.pathname)

  function cerrarSesion() {
    signOut(auth).then(() => {
      // Sign-out successful.
      setSesion(true)
    }).catch((error) => {
      // An error happened.
    });
  }

  function notificarJustificanteEnviado() {
    toast.success('El Justificante ha sido enviado con exito.')
  }

  useEffect(() => {
    setUrlActual(window.location.pathname)
  })

  useEffect(() => {
    if(sesion) {
      setUsuario(false)
      navigate('/sistema-asistencias')
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
    datos ? 
      <div className='container-principal-usuario'>
        <Toaster 
          position="top-center"
          expand={false}
          richColors
        />
        <div className='principal-usuario__botones bg__verde-claro padd-x__20 padd-y__10'>
          <Twirl className='boton-navbar-usuario' toggled={isOpen} toggle={setOpen} color='#316327' />
          <div className='contenedor__centrado-vertical contenedor__usuario-logo'>
            <img className='usuario__logo' src={Logo} alt="" />
            <span className='usuario__logo-texto'>Centro de Idiomas</span>
          </div>
          <div className='cerrar-sesion' onClick={cerrarSesion}>
            <FiPower className='logo-cerrar-sesion' />
            <span className='texto-cerrar-sesion'>Cerrar Sesión</span>
          </div>
        </div>
        <Modal
          open={isOpen}
          onClose={() => setOpen(false)}
        >
          <nav className='navbar-usuario'>
            <div className='list-links'>
              <Link 
                className={`link-usuario ${urlActual == `/sistema-asistencias/perfil-alumno` ? "link-usuario__activo" : ""}`}
                to={'/sistema-asistencias/perfil-alumno'} 
                onClick={(e) => {
                  setOpen(false)
                }}
              >
                Inicio
              </Link>
            </div>
            <div className='list-links'>
              <Link 
                className={`link-usuario ${urlActual.includes(`${url}/usuario-asistencias`) ? "link-usuario__activo" : ""}`} 
                to={`${url}/usuario-asistencias`} 
                onClick={(e) => {
                  setOpen(false)
                }}
              >
                Asistencias
              </Link>
            </div>
            <div className='list-links'>
              <Link 
                className={`link-usuario ${urlActual.includes(`${url}/usuario-justificantes`) ? "link-usuario__activo" : ""}`}
                to={`${url}/usuario-justificantes`} 
                onClick={(e) => {
                  setOpen(false)
                }}
              >
                Justificantes
              </Link>
            </div>
          </nav> 
        </Modal>
              
        <Routes>
          <Route 
            path='/' 
            element={
              <PerfilUsuario 
                datos={datos} 
              />
            } 
          />
          <Route 
            path='/usuario-justificantes/*' 
            element={
              <UsuarioJustificantes 
                datos={datos} 
                urlActual={urlActual}
                justificantesEnEspera={
                  justificantesEnEspera.filter(justi => justi.claveEstudianteJustificante === datos[0].claveEstudiante)
                }
                justificantesAceptados={
                  justificantesAceptados.filter(justi => justi.claveEstudianteJustificante === datos[0].claveEstudiante)
                }
                justificantesRechazados={
                  justificantesRechazados.filter(justi => justi.claveEstudianteJustificante === datos[0].claveEstudiante)
                }
              />
            } 
          />
          <Route 
            path='/usuario-asistencias/*'
            element={
              <UsuarioAsistencias 
                datos={datos} 
              />
            }
          />
          <Route 
            path='/crear-justificante' 
            element={
              <CrearJustificante 
                datos={datos}
                notificarJustificanteEnviado={notificarJustificanteEnviado}
              />
            } 
          />
        </Routes>
      </div>
    : <Page404 />
  )
}

export default Usuario
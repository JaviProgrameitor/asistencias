import '../assets/css/PanelControl.css'
import { useState, useEffect } from 'react'
import { useNavigate, Link, Routes, Route, useResolvedPath } from "react-router-dom"

import { AiFillHome } from 'react-icons/ai'
import { BsFillPeopleFill, BsCalendarWeekFill } from 'react-icons/bs'
import { IoIosPaper } from 'react-icons/io'
import { GoGraph } from 'react-icons/go'
import { FiPower } from 'react-icons/fi'
import { MdAdminPanelSettings } from 'react-icons/md'
import { FaClipboardList } from 'react-icons/fa'

import { getAuth, signOut } from "firebase/auth";

import BarraNavegacion from '../components/BarraNavegacion/BarraNavegacion'

import Principal from './Principal'
import Horarios from './Horarios'
import Administradores from './Administradores'
import Alumnos from './Alumnos'
import Asistencias from './Asistencias'
import Justificantes from './Justificantes'
import Reportes from './Reportes'

import logo from '../assets/img/logo.png'
import Page404 from './Page404'

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore, orderBy, query } from "firebase/firestore";
import firebaseConfig from '../firebase';

function PanelControl(props) {
  const auth = getAuth()
  const navigate = useNavigate()
  
  const { admin, setAdmin, alumnos, administradores, clases, asistenciasEntrada, pagosMensualidades } = props

  const [ sesion, setSesion ] = useState(false)
  const [ estadoNavbar, setEstadoNavbar ] = useState(false)
  const [ urlActual, setUrlActual ] = useState(window.location.pathname)

  const [ idiomasImpartidos, setIdiomasImpartidos ] = useState([])
  const [ justificantesEnEspera, setJustificantesEnEspera ] = useState([])
  const [ justificantesRechazados, setJustificantesRechazados ] = useState([])
  const [ justificantesAceptados, setJustificantesAceptados ] = useState([])

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const url = useResolvedPath("").pathname
  const enlaces = [
    {
      titulo: 'Principal', 
      destino: '/sistema-asistencias/panel-control',
      icon: AiFillHome,
      elemento: Principal
    },
    {
      titulo: 'Administradores',
      destino: `${url}/administradores`,
      icon: MdAdminPanelSettings,
      elemento: Administradores
    },
    {
      titulo: 'Alumnos', 
      destino: `${url}/alumnos`,
      icon: BsFillPeopleFill,
      elemento: Alumnos
    },
    {
      titulo: 'Asistencias', 
      destino: `${url}/asistencias`,
      icon: FaClipboardList,
      elemento: Asistencias
    },
    {
      titulo: 'Justificantes', 
      destino: `${url}/justificantes`,
      icon: IoIosPaper,
      elemento: Justificantes
    },
    {
      titulo: 'Horarios', 
      destino: '/sistema-asistencias/panel-control/horarios',
      icon: BsCalendarWeekFill,
      elemento: Horarios
    },
    {
      titulo: 'Reportes', 
      destino: `${url}/reportes`,
      icon: GoGraph,
      elemento: Reportes
    }
  ]

  function comprobarUrl(urlAct, urlCom, index) {
    if(index === 0) {
      if(urlAct == urlCom) return true
      else return false
    }

    else {
      if(urlAct.includes(urlCom)) return true
      else return false
    }
  }
  
  function cerrarSesion() {
    signOut(auth).then(() => {
      // Sign-out successful.
      setAdmin(false)
      setSesion(true)
    }).catch((error) => {
      // An error happened.
    });
  }

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => {
      const collectionRef = collection(db, 'idiomas')
      const q = query(collectionRef, orderBy('nombre', 'asc'))

      onSnapshot(q,(snapshot) => 
        setIdiomasImpartidos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      )
    },[db]
  )

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
      onSnapshot(collection(db, 'justificantesRechazados'),(snapshot) => 
      setJustificantesRechazados(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
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
  
  useEffect(() => {
    setUrlActual(window.location.pathname)
  })

  useEffect(() => {
    if(sesion) {
      navigate('/sistema-asistencias')
    }
  }, [sesion])

  return (
    admin ? 
        <div className="container-panel-control">
          <BarraNavegacion
            estadoNavbar={estadoNavbar}
            setEstadoNavbar={setEstadoNavbar}
            datos={admin}
            enlaces={enlaces}
            urlActual={urlActual}
          />
          <section className="container-panel-control__central">
            <div className='central-caja-superior'>
              <div className='central-caja-superior__empresa'>
                <img className='empresa-logo' src={logo} alt="Logo del Centro De Idiomas" />
                <h3 className='empresa-titulo'>Centro De Idiomas</h3>
              </div>
              <div className='central-caja-superior__cerrar-sesion'>
                <div className='cerrar-sesion' onClick={cerrarSesion}>
                  <FiPower className='logo-cerrar-sesion' />
                  <span className='texto-cerrar-sesion'>Cerrar Sesión</span>
                </div>
              </div>
            </div>
            <div className='central-contenido'>
              <Routes>
                <Route 
                  path='/' 
                  element={
                    <Principal 
                      admin={admin} 
                    />
                  } 
                />
                <Route 
                  path='/administradores/*' 
                  element={
                    <Administradores 
                      puestoAdmin={admin[0].puesto}
                      administradores={administradores} 
                    />
                  } 
                />
                <Route 
                  path='/alumnos/*' 
                  element={
                    <Alumnos 
                      admin={admin}
                      puestoAdmin={admin[0].puesto}
                      alumnos={alumnos}
                      asistenciasEntrada={asistenciasEntrada}
                      idiomasImpartidos={idiomasImpartidos}
                      justificantesEnEspera={justificantesEnEspera}
                      justificantesRechazados={justificantesRechazados}
                      justificantesAceptados={justificantesAceptados}
                      pagosMensualidades={pagosMensualidades}
                    />
                  } 
                />
                <Route 
                  path='/asistencias/*' 
                  element={
                    <Asistencias 
                      clases={clases}
                      alumnos={alumnos}
                      asistenciasEntrada={asistenciasEntrada}
                      idiomasImpartidos={idiomasImpartidos}
                    />
                  } 
                />
                <Route 
                  path='/justificantes/*' 
                  element={
                    <Justificantes 
                      alumnos={alumnos}
                      justificantesEnEspera={justificantesEnEspera}
                      justificantesRechazados={justificantesRechazados}
                      justificantesAceptados={justificantesAceptados}
                    />
                  } 
                />
                <Route 
                  path='/horarios/*' 
                  element={
                    <Horarios 
                      clases={clases}
                      idiomasImpartidos={idiomasImpartidos}
                      puestoAdmin={admin[0].puesto}
                    />
                  } 
                />
                <Route 
                  path='/reportes/*' 
                  element={
                    <Reportes 
                      clases={clases}
                      idiomasImpartidos={idiomasImpartidos}
                      asistenciasEntrada={asistenciasEntrada}
                    />
                  } 
                />
              </Routes>
            </div>
          </section>
        </div> 
        : <Page404 />
  )
}

export default PanelControl
import '../assets/css/Usuario.css'

import { useEffect, useState } from 'react';
import { useResolvedPath, useNavigate, Routes, Route } from "react-router-dom"
import { FiPower } from 'react-icons/fi'

import { AiFillHome } from 'react-icons/ai'
import { IoIosPaper } from 'react-icons/io'
import { FaClipboardList } from 'react-icons/fa'
import { FaMoneyCheckDollar } from "react-icons/fa6";

import { getAuth, signOut } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { collection, onSnapshot, getFirestore, orderBy, query } from "firebase/firestore";
import firebaseConfig from '../firebase';

import BarraNavegacion from '../components/BarraNavegacion/BarraNavegacion';

import PerfilUsuario from "./PerfilUsuario"
import UsuarioJustificantes from './UsuarioJustificantes';
import UsuarioAsistencias from './UsuarioAsistencias';
import UsuarioPago from './UsuarioPago';
import CrearJustificante from './CrearJustificante';
import Page404 from './Page404';

import { Toaster, toast } from 'sonner'

import Logo from '../assets/img/logo.webp'

function Usuario(props) {
  const { datos, setUsuario, asistenciasEntrada, pagosMensualidades } = props

  const auth = getAuth()
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const url = useResolvedPath("").pathname
  
  const navigate = useNavigate()

  const [ estadoNavbar, setEstadoNavbar ] = useState(false)
  const [ sesion, setSesion ] = useState(false)
  const [ justificantes, setJustificantes ] = useState([])
  const [ urlActual, setUrlActual ] = useState(window.location.pathname)

  const enlaces = [
    {
      titulo: 'Inicio', 
      destino: '/sistema-asistencias/perfil-alumno',
      icon: AiFillHome,
      elemento: PerfilUsuario
    },
    {
      titulo: 'Asistencias', 
      destino: `${url}/usuario-asistencias`,
      icon: FaClipboardList,
      elemento: UsuarioAsistencias
    },
    {
      titulo: 'Justificantes', 
      destino: `${url}/usuario-justificantes`,
      icon: IoIosPaper,
      elemento: UsuarioJustificantes
    },
    {
      titulo: 'Pagos',
      destino: `${url}/pagos-mensualidades`,
      icon: FaMoneyCheckDollar,
      element: UsuarioPago
    }
  ]

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
    () => {
      const collectionRef = collection(db, 'justificantes')
      const q = query(collectionRef, orderBy('fechaEmisionJustificante', 'desc'))

      onSnapshot(q,(snapshot) => 
        setJustificantes(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      )
    },[db]
  )

  return (
    datos 
      ? <div className='container-principal-usuario'>
          <BarraNavegacion
            estadoNavbar={estadoNavbar}
            setEstadoNavbar={setEstadoNavbar}
            datos={datos}
            enlaces={enlaces}
            urlActual={urlActual}
          />
          <Toaster 
            position="top-center"
            expand={false}
            richColors
          />
          <div className='contenedor-usuario__contenido'>
            <div className='principal-usuario__botones bg__verde-claro padd-x__20 padd-y__10'>
              <div className='contenedor__centrado-vertical contenedor__usuario-logo'>
                <img className='usuario__logo' src={Logo} alt="Logo del Centro de Idiomas" />
                <span className='usuario__logo-texto'>Centro de Idiomas</span>
              </div>
              <div className='cerrar-sesion' onClick={cerrarSesion}>
                <FiPower className='logo-cerrar-sesion' />
                <span className='texto-cerrar-sesion'>Cerrar Sesión</span>
              </div>
            </div>
            <div className='usuario__contenido padd__20'>
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
                      urlActual={urlActual}
                      justificantesEnEspera={
                        justificantes.filter(justi => justi.claveEstudianteJustificante === datos[0].claveEstudiante && justi.estado == 'EnEspera')
                      }
                      justificantesAceptados={
                        justificantes.filter(justi => justi.claveEstudianteJustificante === datos[0].claveEstudiante && justi.estado == 'Aceptado')
                      }
                      justificantesRechazados={
                        justificantes.filter(justi => justi.claveEstudianteJustificante === datos[0].claveEstudiante && justi.estado == 'Rechazado')
                      }
                    />
                  } 
                />
                <Route 
                  path='/usuario-asistencias/*'
                  element={
                    <UsuarioAsistencias
                      asistenciasEntrada={
                        asistenciasEntrada.filter(asistencia => asistencia.claveEstudianteAsistenciaEntrada === datos[0].claveEstudiante)
                      }
                    />
                  }
                />
                <Route 
                  path='/pagos-mensualidades/*' 
                  element={
                    <UsuarioPago 
                      pagosMensualidades={
                        pagosMensualidades.filter(pago => pago.claveEstudiantePago === datos[0].claveEstudiante)
                      }
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
          </div>
        </div>
      : <Page404 />
  )
}

export default Usuario
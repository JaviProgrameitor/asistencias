import '../assets/css/PanelControl.css'
import { useState, useEffect } from 'react'
import { useNavigate, Link, Routes, Route, useResolvedPath } from "react-router-dom"

import { AiFillHome } from 'react-icons/ai'
import { BsFillPeopleFill, BsFillCalendarCheckFill } from 'react-icons/bs'
import { IoIosPaper } from 'react-icons/io'
import { GoGraph } from 'react-icons/go'
import { FiPower } from 'react-icons/fi'
import { MdAdminPanelSettings } from 'react-icons/md'

import { getAuth, signOut } from "firebase/auth";

import Principal from './Principal'
import Administradores from './Administradores'
import Alumnos from './Alumnos'
import Asistencias from './Asistencias'
import Justificantes from './Justificantes'
import Reportes from './Reportes'

import logo from '../assets/img/logo.png'
import portada from '../assets/img/portada.jpg'
import Page404 from './Page404'

function PanelControl(props) {
  const auth = getAuth()
  const navigate = useNavigate()
  
  const { admin, setAdmin } = props

  const [sesion, setSesion] = useState(false)

  const ubicacion = window.location.pathname;
  const url = useResolvedPath("").pathname
  const enlaces = [
    {
      titulo: 'Principal', 
      destino: '/panel-control',
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
      icon: BsFillCalendarCheckFill,
      elemento: Asistencias
    },
    {
      titulo: 'Justificantes', 
      destino: `${url}/justificantes`,
      icon: IoIosPaper,
      elemento: Justificantes
    },
    {
      titulo: 'Reportes', 
      destino: `${url}/reportes`,
      icon: GoGraph,
      elemento: Reportes
    }
  ]

  useEffect(() => {
    if(sesion) {
      navigate('/')
    }
  })

  function cerrarSesion() {
    signOut(auth).then(() => {
      // Sign-out successful.
      setAdmin(false)
      setSesion(true)
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    admin ? 
      
        <div className="container-panel-control">
          <aside className="container-panel-control__aside">
            <div className='perfil-admin'>
              <img className='foto-perfil-admin' src={admin[0].foto} alt="Foto de Perfil del Admin" />
              <h3 className='perfil-admin__nombre info-admin'>{admin[0].nombre}</h3>
              <p className='perfil-admin__correo info-admin'>{admin[0].correo}</p>
              <p className='perfil-admin__puesto info-admin'>{admin[0].puesto}</p>
            </div>
            <div className='panel-control__enlaces'>
              {
                enlaces.map((enlace, index) => {
                  return (
                    <Link className='enlaces' to={enlace.destino} key={index}>
                      <enlace.icon />
                      <span>{enlace.titulo}</span>
                    </Link>)
                })
              }
            </div>
          </aside>
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
                <Route path='/' element={<Principal admin={admin} />} />
                <Route path='/administradores/*' element={<Administradores puestoAdmin={admin[0].puesto} />} />
                <Route path='/alumnos/*' element={<Alumnos puestoAdmin={admin[0].puesto} />} />
                <Route path='/asistencias/*' element={<Asistencias />} />
                <Route path='/justificantes/*' element={<Justificantes />} />
                <Route path='/reportes/*' element={<Reportes />} />
              </Routes>
            </div>
          </section>
        </div> 
        : <Page404 />
  )
}

export default PanelControl
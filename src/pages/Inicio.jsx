import '../assets/css/Inicio.css'
import { useState } from "react"
import { FaArrowCircleLeft } from 'react-icons/fa'

import AuthAdmin from "../components/AuthAdmin/AuthAdmin"
import AuthAlumnos from "../components/AuthAlumnos/AuthAlumnos";
import Scanner from './Scanner';

import { Link } from 'react-router-dom'

import logo from '../assets/img/logo.png'
import banderas from '../assets/img/banderas.png'
import franja from '../assets/img/franja.png'

import Modal from '@mui/material/Modal';

const Inicio = (props) => {
  const { 
    alumnos,
    clases,
    administradores,
    setAdmin, 
    admin, 
    setUsuario, 
    usuario,
    setScannerAlumno, 
    setScannerModalidad 
  } = props
  const [ tipoFormulario, setTipoFormulario ] = useState(true)
  const [ activarScanner, setActivarScanner ] = useState(false)

  return (
    <section className='contenedor-principal'>
      <div className='contenedor_link-principio'>
        <Link to={'/'}><FaArrowCircleLeft className='flecha-regresar icon-80' /></Link>
      </div>
      <article className='contenedor-home'>
        <div className="contenedor-formularios">
          <div className='contenedor-formularios__negocio cajas'>
            <img className='logo' src={logo} alt="Logo del Centro de Idiomas" />
            <h2 className='contenedor-formularios__negocio-titulo'>Centro de Idiomas</h2>
            <h3 className='contenedor-formularios__negocio-eslogan'>Cambridge English Language Assessment</h3>
            <img className='franja' src={franja} alt="Franjas" />
            <p className='contenedor-formularios__negocio-informacion'>Cambridge Preparation & Examinations Authorised Venue Centre SUP2926</p>
            <img className='banderas' src={banderas} alt="Banderas del logo" />
          </div>
          <div className='contenedor-formularios__formulario cajas'>
            <button 
              className={`boton-formulario-tipos ${tipoFormulario ? 'boton-formulario-tipos_activo' : ''}`}
              onClick={() => setTipoFormulario(true)}
            >
              Alumnos
            </button>
            <button 
              className={`boton-formulario-tipos ${tipoFormulario === false ? 'boton-formulario-tipos_activo' : ''}`}
              onClick={() => setTipoFormulario(false)}
            >
              Administradores
            </button>
            {
              tipoFormulario === true ? 
                <AuthAlumnos
                  alumnos={alumnos}
                  setUsuario={setUsuario} 
                  usuario={usuario} 
                  activarScanner={activarScanner} 
                  setActivarScanner={setActivarScanner} 
                /> 
              : 
                <AuthAdmin 
                  administradores={administradores}
                  setAdmin={setAdmin} 
                  admin={admin} 
                  activarScanner={activarScanner} 
                  setActivarScanner={setActivarScanner} 
                /> 
            }
          </div>
        </div>
      </article>
      <Modal
        open={activarScanner}
        onClose={() => setActivarScanner(false)}
      >
        <>
          <Scanner 
            alumnos={alumnos}
            clases={clases}
            setScannerModalidad={setScannerModalidad} 
            activarScanner={activarScanner} 
            setActivarScanner={setActivarScanner}
            setScannerAlumno={setScannerAlumno} 
          /> 
        </>
      </Modal>
    </section>
  )
}

export default Inicio
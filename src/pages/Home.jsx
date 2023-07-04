import '../assets/css/Home.css'
import { useState } from "react"

import AuthAdmin from "../components/AuthAdmin/AuthAdmin"
import AuthAlumnos from "../components/AuthAlumnos/AuthAlumnos";
import Scanner from './Scanner';

import logo from '../assets/img/logo.png'
import banderas from '../assets/img/banderas.png'
import franja from '../assets/img/franja.png'

const Home = (props) => {
  const { setAdmin, admin, setUsuario, usuario, infoScanner, setInfoScanner, scannerAlumno, setScannerAlumno } = props
  const [tipoFormulario, setTipoFormulario] = useState(true)
  const [ scanner, setScanner ] = useState(false)

  return (
    <section className='contenedor-principal'>
      <article className='contenedor-home'>
        <main className="contenedor-formularios">
          <div className='contenedor-formularios__negocio cajas'>
            <img className='logo' src={logo} alt="Logo del Centro de Idiomas" />
            <h1 className='contenedor-formularios__negocio-titulo'>Centro de Idiomas</h1>
            <h3 className='contenedor-formularios__negocio-eslogan'>Cambridge English Language Assessment</h3>
            <img className='franja' src={franja} alt="Franjas" />
            <p className='contenedor-formularios__negocio-informacion'>Cambridge Preparation & Examinations Authorised Venue Centre SUP2926</p>
            <img className='banderas' src={banderas} alt="Banderas del logo" />
          </div>
          <div className='contenedor-formularios__formulario cajas'>
            <button className='contenedor-formularios__boton-alumnos boton-formulario-tipos' onClick={() => setTipoFormulario(true)}>Alumnos</button>
            <button className='contenedor-formularios__boton-docentes boton-formulario-tipos' onClick={() => setTipoFormulario(false)}>Administradores</button>
            {
              tipoFormulario === true ? <AuthAlumnos setUsuario={setUsuario} usuario={usuario} scanner={scanner} setScanner={setScanner} /> 
              : <AuthAdmin setAdmin={setAdmin} admin={admin} scanner={scanner} setScanner={setScanner} /> 
            }
          </div>
        </main>
      </article>
      {
        scanner ? <Scanner scanner={scanner} setScanner={setScanner} infoScanner={infoScanner} setInfoScanner={setInfoScanner} scannerAlumno={scannerAlumno} setScannerAlumno={setScannerAlumno} /> : <></>
      }
    </section>
  )
}

export default Home
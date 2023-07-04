import '../assets/css/UsuarioJustificantes.css'

import { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import { Link, useResolvedPath } from "react-router-dom"
import { TiDelete } from 'react-icons/ti'

import UsuarioJustificantesEnEspera from './UsuarioJustificantesEnEspera';
import UsuarioJustificantesAceptados from './UsuarioJustificantesAceptados';
import UsuarioJustificantesRechazados from './UsuarioJustificantesRechazados';

function UsuarioJustificantes(props) {
  const { justificantesEnEspera, justificantesAceptados, justificantesRechazados } = props

  const [ fotoPrueba, setFotoPrueba ] = useState(false)
  const [ mostrarFotoPrueba, setMostrarFotoPrueba ] = useState(false)

  const url = useResolvedPath("").pathname

  return (
    <div>
      <h3 className='titulos-1'>Justificantes</h3>
      <div className='contenedor__todo-final'>
        <Link to={`/perfil-alumno/crear-justificante`} className='boton__verde-oscuro' >
          <span className='agregar-alumnos__texto'>Crear Justificante</span>
        </Link>
        {
          fotoPrueba ? 
            <button className='boton__blanco' onClick={() => setMostrarFotoPrueba(true)}>Ver Prueba</button>
            
          : <></>
        }
      </div>
      <div className='container-botones-usuario-justificantes'>
        <div className='caja-links-usuario-justificantes'>
          <Link className='link-usuario-justificante' to={`${url}`} onClick={() => setFotoPrueba(false)}>Justificantes En Espera</Link>
        </div>
        <div className='caja-links-usuario-justificantes'>
          <Link className='link-usuario-justificante' to={`${url}/justificantes-aceptados`} onClick={() => setFotoPrueba(false)}>Justificantes Aceptados</Link>
        </div>
        <div className='caja-links-usuario-justificantes'>
          <Link className='link-usuario-justificante' to={`${url}/justificantes-rechazados`} onClick={() => setFotoPrueba(false)}>Justificantes Rechazados</Link>
        </div>
      </div>
      {
        mostrarFotoPrueba ? <div className='container-foto-prueba'>
          <div className='caja-foto-prueba'>
            <TiDelete className='foto-prueba__icon' onClick={() => setMostrarFotoPrueba(false)} />
            <img className='foto-prueba' src={fotoPrueba} alt="Foto prueba del justificante" />
          </div>
          </div> 
        : <></>
      }
      <div>
        <Routes>
          <Route
            path='/' 
            element={<UsuarioJustificantesEnEspera fotoPrueba={fotoPrueba} setFotoPrueba={setFotoPrueba} datos={justificantesEnEspera} />} 
          />
          <Route
            path='/justificantes-aceptados' 
            element={<UsuarioJustificantesAceptados fotoPrueba={fotoPrueba} setFotoPrueba={setFotoPrueba} datos={justificantesAceptados} />} 
          />
          <Route
            path='/justificantes-rechazados' 
            element={<UsuarioJustificantesRechazados fotoPrueba={fotoPrueba} setFotoPrueba={setFotoPrueba} datos={justificantesRechazados} />} 
          />
        </Routes>
      </div>
    </div>
  )
}

export default UsuarioJustificantes
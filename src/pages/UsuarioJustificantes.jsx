import '../assets/css/UsuarioJustificantes.css'

import { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import { Link, useResolvedPath } from "react-router-dom"

import UsuarioJustificantesEnEspera from './UsuarioJustificantesEnEspera';
import UsuarioJustificantesAceptados from './UsuarioJustificantesAceptados';
import UsuarioJustificantesRechazados from './UsuarioJustificantesRechazados';

import Modal from '@mui/material/Modal';

function UsuarioJustificantes(props) {
  const { justificantesEnEspera, justificantesAceptados, justificantesRechazados, urlActual } = props

  const [ fotoPrueba, setFotoPrueba ] = useState(false)
  const [ mostrarFotoPrueba, setMostrarFotoPrueba ] = useState(false)

  const url = useResolvedPath("").pathname

  return (
    <div className='padd-x__20 padd-top__20'>
      <h3 className='titulos-1'>Justificantes</h3>
      <div className='contenedor__todo-final contenedor__margin-ambos contenedor-usuario-justificantes'>
        <Link to={`/sistema-asistencias/perfil-alumno/crear-justificante`} className='boton__verde-oscuro'>
          <span className='agregar-alumnos__texto'>Crear Justificante</span>
        </Link>
        {
          fotoPrueba && (
            <button 
              className='boton__blanco' 
              onClick={() => setMostrarFotoPrueba(true)}
            >
              Ver Prueba
            </button>
          )
        }
      </div>
      <div className='container-botones-usuario-justificantes'>
          <Link 
            className={`link-usuario-justificantes ${urlActual == url ? "link-usuario-justificante_activo" : ""}`} 
            to={`${url}`} 
            onClick={() => {
              setFotoPrueba(false)
            }}
          >
            <span>Justificantes En Espera</span>
          </Link>
          <Link 
            className={`link-usuario-justificantes ${urlActual.includes(`${url}/justificantes-aceptados`) ? "link-usuario-justificante_activo" : ""}`} 
            to={`${url}/justificantes-aceptados`} 
            onClick={() => {
              setFotoPrueba(false)
            }}
          >
            <span>Justificantes Aceptados</span>
          </Link>
          <Link 
            className={`link-usuario-justificantes ${urlActual.includes(`${url}/justificantes-rechazados`) ? "link-usuario-justificante_activo" : ""}`} 
            to={`${url}/justificantes-rechazados`} 
            onClick={() => {
              setFotoPrueba(false)
            }}
          >
            <span>Justificantes Rechazados</span>
          </Link>
      </div>
      <Modal
        open={mostrarFotoPrueba}
        onClose={() => setMostrarFotoPrueba(false)}
        className='modal__superior'
      > 
        <img 
          className='foto-prueba centrar__contenido' 
          src={fotoPrueba} 
          alt="Foto prueba del justificante"
          onClick={() => setMostrarFotoPrueba(false)}
        />
      </Modal>
      <div>
        <Routes>
          <Route
            path='/' 
            element={
              <UsuarioJustificantesEnEspera 
                fotoPrueba={fotoPrueba} 
                setFotoPrueba={setFotoPrueba} 
                justificantes={justificantesEnEspera} 
              />
            } 
          />
          <Route
            path='/justificantes-aceptados' 
            element={
              <UsuarioJustificantesAceptados 
                fotoPrueba={fotoPrueba} 
                setFotoPrueba={setFotoPrueba} 
                justificantes={justificantesAceptados} 
              />
            } 
          />
          <Route
            path='/justificantes-rechazados' 
            element={
              <UsuarioJustificantesRechazados 
                fotoPrueba={fotoPrueba} 
                setFotoPrueba={setFotoPrueba} 
                justificantes={justificantesRechazados} 
              />
            } 
          />
        </Routes>
      </div>
    </div>
  )
}

export default UsuarioJustificantes
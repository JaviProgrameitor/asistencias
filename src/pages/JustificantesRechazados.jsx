
import { useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import FilasJustificantes from "../components/FilasJustificantes/FilasJustificantes"

import Modal from '@mui/material/Modal';

function JustificantesRechazados(props) {
  const { justificantesRechazados } = props

  const [ fotoPrueba, setFotoPrueba ] = useState(false)
  const [ modalEstado, setModalEstado ] = useState(false)

  function cambiarValor(justificante) {
    justificante != false ? setFotoPrueba(justificante) : setFotoPrueba(false)
  }

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/justificantes/alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <h5 className='titulos-2'>Justificantes Rechazados</h5>
      {
        fotoPrueba && (
          <div className='contenedor__todo-final'>
            <button 
              className='boton__verde-oscuro' 
              onClick={() => setModalEstado(true)}
            >
              Ver Prueba
            </button>
          </div>
        )
      }
      <div className="contenedor__tabla-scroll tamaño-tabla__250">
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
              <tr>
                <th colSpan='1'>Hora de Emisión</th>
                <th colSpan='1'>Fecha de Emisión</th>
                <th colSpan='1'>Fecha a Justificar</th>
                <th colSpan='1'>Motivo</th>
                <th colSpan='1'>Explicación</th>
              </tr>
          </thead>
          <tbody className="tabla-cuerpo">
            {
              justificantesRechazados.map((alumno, index) => 
                <FilasJustificantes 
                  datos={alumno} 
                  key={index}
                  posicion={index}
                  valor={fotoPrueba}
                  cambiarValor={cambiarValor}
                  personal
                />
              )
            }
          </tbody>
        </table>
      </div>
      <Modal
        className='modal__superior'
        open={modalEstado}
        onClose={() => setModalEstado(false)}
      >
        <img 
          className='foto-prueba centrar__contenido' 
          src={fotoPrueba} 
          alt="Imagen del justificante"
          onClick={() => setModalEstado(false)}
        />
      </Modal>
    </div>
  )
}

export default JustificantesRechazados
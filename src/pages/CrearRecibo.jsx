
import { useEffect, useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from "react-router-dom"
import { TiDelete } from 'react-icons/ti'

import Campo from '../components/Campo/Campo'
import CampoAutocompletar from '../components/CampoAutocompletar/CampoAutocompletar';
import ReciboPago from '../components/ReciboPago/ReciboPago';
import { Modal } from '@mui/material';

import { calcularMesPorNumero } from '../utils/functions/fechas';

function CrearRecibo({alumnos}) {
  const [ numeroReferencia, setNumeroReferencia ] = useState('')
  const [ personaPago, setPersonaPago ] = useState('')
  const [ lengua, setLengua ] = useState('')
  const [ modalidad, setModalidad ] = useState('')
  const [ cantidadPagadaNumero, setCantidadPagadaNumero ] = useState('')
  const [ cantidadPagadaEscrita, setCantidadPagadaEscrita ] = useState('')
  const [ alumnoPago, setAlumnoPago ] = useState(null)
  const [ listaAlumnosPago, setListaAlumnosPago ] = useState([])
  const [ fechaRecibo, setFechaRecibo ] = useState(agregarFecha())

  const [ estadoModalRecibo, setEstadoModalRecibo ] = useState(false)

  function listarAlumnos() {
    if(alumnoPago != null) setListaAlumnosPago([...listaAlumnosPago, alumnoPago])
  }

  function desListarAlumnos(index) {
    const nuevaLista = listaAlumnosPago.toSpliced(index, 1)

    setListaAlumnosPago(nuevaLista)
  }

  function agregarFecha () {
    const date = new Date()
    const month = date.getMonth()
    const fecha = date.getDate()
    const año = date.getFullYear()

    const nombreMes = calcularMesPorNumero(month)
    let fechaExacta;

    if((fecha + 1) < 10) fechaExacta = `0${fecha}`
    else if((fecha + 1) >= 10) fechaExacta = `${fecha}`

    return `${fechaExacta} - ${nombreMes} - ${año}`
  }

  useEffect(listarAlumnos, [alumnoPago])

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos/pagos-alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <div className='agregar-alumnos__formulario'>
        <div className='formulario'>
          <h4 className="formulario__titulo">Crear Recibo</h4>
          <Campo 
            titulo='Número de Referencia'
            placeholder='Ingresa el número de referencia'
            valor={numeroReferencia}
            cambiarValor={setNumeroReferencia}
          />
          <Campo 
            titulo='Entregada por'
            placeholder='Ingresa el nombre'
            valor={personaPago}
            cambiarValor={setPersonaPago}
          />
          <Campo 
            titulo='Lengua'
            placeholder='Ingresa la lengua'
            valor={lengua}
            cambiarValor={setLengua}
          />
          <Campo 
            titulo='Modalidad'
            placeholder='Ingresa la modalidad'
            valor={modalidad}
            cambiarValor={setModalidad}
          />
          <Campo 
            titulo='Cantidad Pagada (Número)'
            placeholder='Ingresa la cantidad (número)'
            valor={cantidadPagadaNumero}
            cambiarValor={setCantidadPagadaNumero}
          />
          <Campo 
            titulo='Cantidad Pagada (Escrita)'
            placeholder='Ingresa la cantidad (escrita)'
            valor={cantidadPagadaEscrita}
            cambiarValor={setCantidadPagadaEscrita}
          />
          <CampoAutocompletar
            titulo='Alumnos'
            placeholder='Selecciona los alumnos'
            valor={alumnoPago}
            cambiarValor={setAlumnoPago}
            opciones={alumnos}
          />
          <div>
              {
                listaAlumnosPago.length >= 1
                  ? <ul>
                      {
                        listaAlumnosPago.map((alumno, index) =>
                          <li 
                            className='contenedor__todo-principio-centrado'
                            key={index}
                          >
                            {alumno} 
                            <TiDelete
                              className='idioma__icon-delete pointer' 
                              onClick={e => desListarAlumnos(index)}
                            />
                          </li>
                        )
                      }
                    </ul>
                  : <p>No hay alumnos seleccionados</p>
              }
          </div>
          <button className='boton__azul' onClick={() => setEstadoModalRecibo(true)}>Descargar PDF</button>
        </div>
      </div>
      <Modal
        className='modal__superior contenedor__ambos-lados_centrado'
        open={estadoModalRecibo}
        onClose={() => setEstadoModalRecibo(false)}
      >
        <ReciboPago
          numeroReferencia={numeroReferencia}
          personaPago={personaPago}
          listaAlumnosPago={listaAlumnosPago}
          lengua={lengua}
          modalidad={modalidad}
          cantidadPagadaNumero={cantidadPagadaNumero}
          cantidadPagadaEscrita={cantidadPagadaEscrita}
          fechaRecibo={fechaRecibo}
        />
      </Modal>
    </div>
  )
}

export default CrearRecibo
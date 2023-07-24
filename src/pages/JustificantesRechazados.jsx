
import { useState } from 'react'
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { TiDelete } from 'react-icons/ti'
import ImageZoom from "react-image-zooom";

import FilasJustificantes from "../components/FilasJustificantes/FilasJustificantes"

function JustificantesRechazados(props) {
  const { justificantesRechazados } = props

  const [ fotoPrueba, setFotoPrueba ] = useState(false)
  const [ mostrarFotoPrueba, setMostrarFotoPrueba ] = useState(false)

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/panel-control/justificantes/alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
      </div>
      <h5 className='titulos-2'>Justificantes Rechazados</h5>
      {
        fotoPrueba ? <div className='contenedor__todo-final'>
            <button className='boton__verde-oscuro' onClick={() => setMostrarFotoPrueba(true)}>Ver Prueba</button>
          </div>
        : <></>
      }
      <div className="container-tabla">
        <table className='tabla-alumnos'>
          <thead className='tabla-cabecera'>
              <tr>
                <th colSpan='1'>Nombre</th>
                <th colSpan='1'>Apellido</th>
                <th colSpan='1'>Clave de Estudiante</th>
                <th colSpan='1'>Hora de Emisión</th>
                <th colSpan='1'>Fecha de Emisión</th>
                <th colSpan='1'>Fecha a Justificar</th>
                <th colSpan='1'>Motivo</th>
                <th colSpan='1'>Explicación</th>
              </tr>
          </thead>
          <tbody className="tabla-cuerpo">
            {
              justificantesRechazados ? justificantesRechazados.map((alumno, index) => <FilasJustificantes 
                datos={alumno} 
                key={index}
                posicion={index}
                valor={fotoPrueba}
                cambiarValor={setFotoPrueba}
                ultimaFila={false}
              />) 
              : <></>
            }
          </tbody>
        </table>
      </div>
      {
        mostrarFotoPrueba ? <div className='container-foto-prueba'>
        <div className='caja-foto-prueba'>
          <TiDelete className='foto-prueba__icon' onClick={() => setMostrarFotoPrueba(false)} />
          <ImageZoom src={fotoPrueba} width='100%' zoom='250' alt='Foto de la prueba del justificante' />
        </div>
      </div> 
      : <></>
      }
    </div>
  )
}

export default JustificantesRechazados
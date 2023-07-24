import '../assets/css/TablaJustificantes.css'

import { useState } from 'react'
import { Link, useResolvedPath } from "react-router-dom"
import { TiDelete } from 'react-icons/ti'
import ImageZoom from "react-image-zooom";

import FilasJustificantes from "../components/FilasJustificantes/FilasJustificantes"

function TablaJustificantes(props) {
  const url = useResolvedPath("").pathname

  const { Justificantes } = props

  const [ fotoPrueba, setFotoPrueba ] = useState(false)
  const [ mostrarFotoPrueba, setMostrarFotoPrueba ] = useState(false)

  function ToggleMostrarPrueba(mostrar) {
    document.querySelector('body').classList.toggle('body__pantalla-negra')
    setMostrarFotoPrueba(mostrar)
  }

  return (
    <div className='container-tabla-justificantes'>
      <h3 className='tabla-justificantes__titulo'>Justificantes en Espera</h3>
      <div className='contenedor__todo-final'>
        <Link to={`${url}/alumnos`} className='boton__verde-oscuro' >
          <span>Ver Todos Los Justificantes</span>
        </Link>
        {
          fotoPrueba ? 
            <button className='boton__blanco' onClick={() => ToggleMostrarPrueba(true)}>Ver Prueba</button>
            
          : <></>
        }
      </div>
      <div className='container-tabla'>
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
                <th colSpan='1'>Acciones</th>
              </tr>
            </thead>
            <tbody className="tabla-cuerpo">
            {
              Justificantes ? Justificantes.map((alumno, index) => <FilasJustificantes 
                datos={alumno} 
                key={index}
                posicion={index}
                valor={fotoPrueba}
                cambiarValor={setFotoPrueba}
                ultimaFila={true}
              />) 
              : <></>
            }
            </tbody>
        </table>
      </div>
      {
        mostrarFotoPrueba ? <div className='container-foto-prueba'>
        <div className='caja-foto-prueba'>
          <TiDelete className='foto-prueba__icon' onClick={() => ToggleMostrarPrueba(false)} />
          <ImageZoom src={fotoPrueba} width='100%' zoom='250' alt='Foto de la prueba del justificante' />
        </div>
      </div> 
      : <></>
      }
    </div>
  )
}

export default TablaJustificantes
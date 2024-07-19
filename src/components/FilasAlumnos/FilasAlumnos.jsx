
import '../../assets/css/components/Filas.css'

import { useEffect, useState, useRef } from 'react'

function FilasAlumnos(props) {
  const { 
    idAlumno, 
    actualizarDatos, 
    datos, 
    comprobarMensualidad = false, 
    getCoordinates,
    activo
  } = props
  const { 
    nombre, 
    apellido,
    claveEstudiante, 
    idiomaAprendizaje, 
    modalidadEstudio, 
    fechaPago, 
    estadoMensualidad,
    clasesMensualidad,
    id 
  } = datos

  const filaRef = useRef(null)

  return (
    <tr
      className={`fila ${activo} ${comprobarMensualidad ? clasesMensualidad.join(' ') : ''}`} 
      ref={filaRef}
      onClick={
        () => {
          getCoordinates(filaRef)
          activo === "activo"
            ? actualizarDatos(false)
            : actualizarDatos(datos)
        }
      }
    >
      <td className='td-admin'>{nombre}</td>
      <td className='td-admin'>{apellido}</td>
      <td className='td-admin'>{claveEstudiante}</td>
      {
        comprobarMensualidad && (
          <>
            <td className='td-admin td-mobil'>
              <ul>
                {
                  fechaPago.map((fecha, index) => <li key={index}>{fecha}</li>)
                }
              </ul>
            </td>
            <td className='td-admin td-mobil'>
              <ul>
                {
                  estadoMensualidad.map((estado, index) => 
                    <li key={index}>{estado}</li>
                  )
                }
              </ul>
            </td>
          </>
        )
      }
      <td className='td-admin'>
        <ul>
          {
            idiomaAprendizaje.map((idioma, index) => <li key={index}>{idioma}</li>)
          }
        </ul>
      </td>
      {
        comprobarMensualidad && (
          <>
            <td className='td-admin td-desktop'>
              <ul>
                {
                  fechaPago.map((fecha, index) => <li key={index}>{fecha}</li>)
                }
              </ul>
            </td>
      
            <td className='td-admin td-desktop'>
              <ul>
                {
                  estadoMensualidad.map((estado, index) => 
                    <li key={index}>{estado}</li>
                  )
                }
              </ul>
            </td>
          </>
        )
      }
    </tr>
  )
}

export default FilasAlumnos
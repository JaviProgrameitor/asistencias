
import { useState, useEffect } from "react"
import { Link, useResolvedPath } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import FilasAlumnos from '../components/FilasAlumnos/FilasAlumnos'
import BarraBusquedaTexto from '../components/BarraBusquedaTexto/BarraBusquedaTexto';

function TablaJustificantesAlumno(props) {
  const { alumnos, idAlumno, actualizarDatos } = props

  const [ palabraFiltrar, setPalabraFiltrar ] = useState('')
  const [ filtrarAlumnos, setFiltrarAlumnos ] = useState(alumnos)

  const url = useResolvedPath("").pathname

  //Todo: Función para buscar por medio de nombres o apellidos
  async function busqueda(valor) {
    if(!valor) {
      setFiltrarAlumnos(alumnos)
      return
    }

    let aux = []
    for(let i = 0; i < alumnos.length; i++) {
      try {
        if(alumnos[i].nombre.toLowerCase().includes(valor.toLowerCase()) || 
          alumnos[i].apellido.toLowerCase().includes(valor.toLowerCase()) ||
          alumnos[i].claveEstudiante.toLowerCase().includes(valor.toLowerCase())
        ) {
          aux.push(alumnos[i])
        }
      } catch {}
    }
    setFiltrarAlumnos(aux)
  }

  useEffect(() => {
    busqueda(palabraFiltrar)
  },[palabraFiltrar, alumnos])

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/justificantes'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <h4 className='titulos-2'>Selecciona un alumno para ver sus justificantes</h4>
      {
        idAlumno && (
          <div className='contenedor__todo-final'>
            <Link 
              to={`${url}/justificantes-aceptados`} 
              className='boton__verde-oscuro'
            >
              Justificantes Aceptados
            </Link>
            <Link 
              to={`${url}/justificantes-rechazados`} 
              className='boton__blanco'
            >
              Justificantes Rechazados
            </Link>
          </div>
        )
      }
      <BarraBusquedaTexto
        titulo='Buscar Alumno'
        placeholder='Por nombre, apellido o clave de estudiante'
        valor={palabraFiltrar}
        cambiarValor={setPalabraFiltrar}
      />
      <div className='contenedor__tabla-scroll tamaño-tabla__250'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Clave de Estudiante</th>
              <th colSpan='1'>Idioma de Aprendizaje</th>
            </tr>
          </thead>
          <tbody className="tabla-cuerpo">
            { 
              filtrarAlumnos.map((alumno, index) => 
                <FilasAlumnos 
                  datos={alumno} 
                  posicion={index} 
                  key={index} 
                  id={alumno.id}
                  actualizarDatos={actualizarDatos}
                  idAlumno={idAlumno}
                />
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaJustificantesAlumno
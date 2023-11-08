
import { useState, useEffect } from "react"
import { Link, useResolvedPath } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import FilasAlumnos from "../components/FilasAlumnos/FilasAlumnos"

import TextField from '@mui/material/TextField';

function TablaAsistenciasAlumnos(props) {
  const { alumnos, idAlumno, actualizarDatos } = props

  const [ filtrarAlumnos, setFiltrarAlumnos ] = useState(alumnos)
  const [ palabraFiltar, setPalabraFiltrar ] = useState('')

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
    busqueda(palabraFiltar)
  }, [palabraFiltar, alumnos])

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/asistencias'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
      </div>
      <h4 className="titulos-2">Selecciona el alumno para ver todas sus asistencias</h4>
      {
        idAlumno ? <div className="contenedor__todo-final">
          <Link to={`${url}/asistencias-personales`} className='boton__verde-oscuro'>Asistencias</Link>
          <Link to={`${url}/graficas-asistencias-personales`} className='boton__blanco'>Gráficas Asistencias</Link>
        </div> 
        : <></>
      }
      <TextField 
        id="filled-basic" 
        label="Buscar Alumno" 
        variant="filled"
        fullWidth
        color='success'
        placeholder='Por nombre, apellido o clave de estudiante'
        margin='dense'
        onChange={(e) => setPalabraFiltrar(e.target.value)}
      />
      <div className='contenedor__tabla-scroll tamaño-tabla__300'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Número Telefónico</th>
              <th colSpan='1'>Clave de Estudiante</th>
              <th colSpan='1'>Idioma de Aprendizaje</th>
              <th colSpan='1'>Modalidad de Estudio</th>
              <th colSpan='1'>Fecha de Pago</th>
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
                  idAlumno={idAlumno}
                  actualizarDatos={actualizarDatos}
                />
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TablaAsistenciasAlumnos
import '../assets/css/TablaAlumnos.css'

import { useState, useEffect } from 'react';
import { FcContacts, FcCurrencyExchange, FcCalendar } from "react-icons/fc";
import { AiFillDelete } from 'react-icons/ai'
import { BsPersonFillAdd } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { Link, useResolvedPath } from "react-router-dom"

import { deleteDatabase, deleteStorage } from '../firebase';

import FilasAlumnos from '../components/FilasAlumnos/FilasAlumnos'
import DemostracionColores from '../components/DemostracionColores/DemostracionColores'
import BarraBusquedaOpciones from '../components/BarraBusquedaOpciones/BarraBusquedaOpciones';
import BarraBusquedaTexto from '../components/BarraBusquedaTexto/BarraBusquedaTexto';
import Indicadores from '../components/Indicadores/Indicadores'
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';

import Modal from '@mui/material/Modal';

import { Toaster, toast } from 'sonner'

function TablaAlumnos(props) {
  const { 
    alumnos, 
    idAlumno, 
    setIdAlumno, 
    actualizarDatos, 
    puestoAdmin, 
    perfilAlumno, 
    asistenciasEntrada, 
    justificantesAceptados, 
    justificantesEnEspera, 
    justificantesRechazados,
    pagosMensualidades,
    idiomasImpartidos
  } = props

  const [ palabraBusqueda, setPalabraBusqueda ] = useState('')
  const [ idiomaSeleccionado, setIdiomaSeleccionado] = useState('General');
  const [ filtrarPorIdioma, setFiltrarPorIdioma ] = useState(alumnos)
  const [ filtrarAlumnos, setFiltrarAlumnos ] = useState(filtrarPorIdioma)
  const [ modalEliminarAlumno, setModalEliminarAlumno ] = useState(false)

  const url = useResolvedPath("").pathname

  const coloresAlumno = {
    colorFondoCercaPago: 'cerca-pago',
    colorFondoPago: 'dia-pago',
    colorFondoDeuda: 'deudas',
  }

  //Todo: Función para eliminar alumnos de la base de datos
  async function eliminarAlumnos(alumno) {
    const asistenciasAlumno = asistenciasEntrada.filter((asis) => asis.claveEstudianteAsistenciaEntrada == alumno.claveEstudiante)
    const justificantesEnEsperaAlumno = justificantesEnEspera.filter(justi => justi.claveEstudianteJustificante == alumno.claveEstudiante)
    const justificantesAceptadosAlumno = justificantesAceptados.filter(justi => justi.claveEstudianteJustificante == alumno.claveEstudiante)
    const justificantesRechazadosAlumno = justificantesRechazados.filter(justi => justi.claveEstudianteJustificante == alumno.claveEstudiante)
    const pagosMensualidadesAlumno = pagosMensualidades.filter(pago => pago.claveEstudiantePago == alumno.claveEstudiante)

    //Todo: Eliminar todas las asistencias del alumno
    if(asistenciasAlumno.length > 0) {
      for(let i = 0; i < asistenciasAlumno.length; i++) {
        deleteDatabase('asistenciasEntrada', asistenciasAlumno[i].id)
      }
    }

    //Todo: Eliminar justificantes en espera del alumno
    if(justificantesEnEsperaAlumno.length > 0) {
      for(let i = 0; i < justificantesEnEsperaAlumno.length; i++) {
        deleteDatabase('justificantesEnEspera', justificantesEnEsperaAlumno[i].id)
        deleteStorage(`justificantes/${justificantesEnEsperaAlumno[i].idFotoJustificante}`)
      }
    }

    //Todo: Eliminar justificantes aceptados del alumno
    if(justificantesAceptadosAlumno.length > 0) {
      for(let i = 0; i < justificantesAceptadosAlumno.length; i++) {
        deleteDatabase('justificantesAceptados', justificantesAceptadosAlumno[i].id)
        deleteStorage(`justificantes/${justificantesAceptadosAlumno[i].idFotoJustificante}`)
      }
    }

    //Todo: Eliminar justificantes rechazados del alumno
    if(justificantesRechazadosAlumno.length > 0) {
      for(let i = 0; i < justificantesRechazadosAlumno.length; i++) {
        deleteDatabase('justificantesRechazados', justificantesRechazadosAlumno[i].id)
        deleteStorage(`justificantes/${justificantesRechazadosAlumno[i].idFotoJustificante}`)
      }
    }

    //Todo: Eliminar los pagos mensuales del alumno
    if(pagosMensualidadesAlumno.length > 0) {
      for(let i = 0; i < pagosMensualidadesAlumno.length; i++) {
        deleteDatabase('pagosMensualidades', pagosMensualidadesAlumno[i].id)
        deleteStorage(`pagosMensualidades/${pagosMensualidadesAlumno[i].idComprobantePagoMensualidad}`)
      }
    }

    deleteStorage(`alumnos/${alumno.idFoto}`)

    deleteStorage(`documentos/${alumno.idActaNacimiento}`)

    deleteStorage(`documentos/${alumno.idIne}`)

    deleteStorage(`documentos/${alumno.idCurp}`)

    deleteStorage(`documentos/${alumno.idComprobantePagoInicial}`)

    deleteDatabase('alumnos', alumno.id)
    toast.success('El Alumno ha sido eliminado con exito')
    setIdAlumno(false)
  }

  //Todo: Función para buscar ALUMNOS por medio de nombres o apellidos
  async function busqueda(valor) {
    if(!valor) {
      setFiltrarAlumnos(filtrarPorIdioma)
      return
    }

    let aux = []
    for(let i = 0; i < filtrarPorIdioma.length; i++) {
      try {
        if(filtrarPorIdioma[i].nombre.toLowerCase().includes(valor.toLowerCase()) || 
          filtrarPorIdioma[i].apellido.toLowerCase().includes(valor.toLowerCase()) ||
          filtrarPorIdioma[i].claveEstudiante.toLowerCase().includes(valor.toLowerCase())
        ) {
          aux.push(filtrarPorIdioma[i])
        }
      } catch {}
    }
    setFiltrarAlumnos(aux)
  }

  function filtrarIdiomaAlumnos() {
    let alumnosFiltrados = []

    if(idiomaSeleccionado == 'General') {
      setFiltrarPorIdioma(alumnos)
      return
    }

    for(let i = 0; i < alumnos.length; i++) {
      if(alumnos[i].idiomaAprendizaje.includes(idiomaSeleccionado)) alumnosFiltrados.push(alumnos[i])
    }

    setFiltrarPorIdioma(alumnosFiltrados)
  }

  useEffect(() => {
    filtrarIdiomaAlumnos()
  },[idiomaSeleccionado, alumnos])

  useEffect(() => {
    busqueda(palabraBusqueda)
  },[filtrarPorIdioma, palabraBusqueda])

  return (
    <div>
      <Toaster position="top-center" richColors />
      <h2 className='titulos-2'>Tabla de Alumnos {idiomaSeleccionado}</h2>
      <div className="contenedor__todo-final">
        <Link to={`${url}/agregar-alumno`} className='boton__blanco' >
          <BsPersonFillAdd />
          <span>Agregar Alumno</span>
        </Link>
      </div>
      <BarraBusquedaOpciones
        titulo='Idioma'
        valor={idiomaSeleccionado}
        cambiarValor={setIdiomaSeleccionado}
        opciones={['General', ...idiomasImpartidos]}
      />
      <BarraBusquedaTexto
        titulo='Buscar Alumno'
        placeholder='Por nombre, apellido o clave de estudiante'
        valor={palabraBusqueda}
        cambiarValor={setPalabraBusqueda}
      />
      <div className={`${idAlumno === false ? 'contenedor__todo-principio' : 'contenedor__entre'} contenedor__padding-top contenedor__wrap gap-y__10 gap-x__25`}>
        <div className='contenedor__todo-principio'>
          <DemostracionColores 
            color={coloresAlumno.colorFondoPago}
            texto="Día de Pago"
          />
          <DemostracionColores 
            color={coloresAlumno.colorFondoCercaPago}
            texto="Proximo Pago"
          />
          <DemostracionColores 
            color={coloresAlumno.colorFondoDeuda}
            texto="No ha pagado"
          />
        </div>
        {
          idAlumno !== false && (
            <div>
              <Link to={`${url}/actividad-alumno`}>
                <FcCalendar className='alumno-completo icon-alumno' />
              </Link>
              <Link to={`${url}/pagos-alumnos`}>
                <FcCurrencyExchange className='alumno-completo icon-alumno' />
              </Link>
              <Link to={`${url}/perfil/${idAlumno}`}>
                <FcContacts className='alumno-completo icon-alumno' />
              </Link>
              <Link to={`${url}/editar-alumno`}>
                <FaEdit className="alumno-edit icon-alumno" />
              </Link>
              <AiFillDelete 
                className='alumno-delete icon-alumno'
                onClick={() => {
                  if(puestoAdmin === 'Director(a)') setModalEliminarAlumno(true)
                  else toast.error('No tienes acceso a esta función.')
                }}
              />
            </div>
          )
        }
      </div> 
      <div className='contenedor__tabla-scroll tamaño-tabla__250'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Clave de Estudiante</th>
              <th colSpan='1'>Idioma de Aprendizaje</th>
              <th colSpan='1'>Fecha de Pago</th>
              <th colSpan='1'>Estado Mensualidad</th>
            </tr>
          </thead>
          <tbody className='tabla-cuerpo'>
            {
              filtrarAlumnos.map((alumno, index) => 
                <FilasAlumnos 
                  datos={alumno}
                  key={index}
                  idAlumno={idAlumno}
                  actualizarDatos={actualizarDatos}
                  comprobarMensualidad={true}
                />
              )
            }
          </tbody>
        </table>
      </div>
      <Modal
        className='modal__superior'
        open={modalEliminarAlumno}
        onClose={() => setModalEliminarAlumno(false)}
      >
        <div className='modal__por-defecto modal__contenido scroll-personalizado'>
          <h4 className='advertencia__titulo'>¡ADVERTENCIA!</h4>
          <p className='advertencia__texto'>¿Estás seguro de que quieres eliminar al alumno?</p>
          <div className='contenedor__columna-centro'>
            <div>
              <Indicadores 
                titulo='Nombre'
                respuesta={perfilAlumno.nombre}
              />
              <Indicadores 
                titulo='Apellido'
                respuesta={perfilAlumno.apellido}
              />
              <Indicadores 
                titulo='Fecha de Nacimiento'
                respuesta={perfilAlumno.fechaNacimiento}
              />
              <Indicadores 
                titulo='Correo Electrónico'
                respuesta={perfilAlumno.correo}
              />
              <Indicadores 
                titulo='Número de Teléfono'
                respuesta={perfilAlumno.numeroTelefono}
              />
              <Indicadores 
                titulo='Nivel Académico'
                respuesta={perfilAlumno.nivelAcademico}
              />
              <Indicadores 
                titulo={'Clave del Estudiante'} 
                respuesta={perfilAlumno.claveEstudiante} 
              />
              <IndicadoresMultiples 
                titulo={'Idiomas de Aprendizaje'} 
                respuesta={perfilAlumno.idiomaAprendizaje} 
              />
              <IndicadoresMultiples 
                titulo={'Nivel MCERLC'} 
                respuesta={perfilAlumno.nivelIdioma} 
              />
              <IndicadoresMultiples 
                titulo={'Modalidad de Estudio'} 
                respuesta={perfilAlumno.modalidadEstudio} 
              />
              <IndicadoresMultiples 
                titulo={'Fecha de Ingreso'} 
                respuesta={perfilAlumno.fechaIngreso} 
              />
              <IndicadoresMultiples 
                titulo={'Fecha de Pago'} 
                respuesta={perfilAlumno.fechaPago} 
              />
            </div>
          </div>
          <div className='contenedor__centro-separacion'>
            <button 
              className='boton__verde-oscuro' 
              onClick={() => setModalEliminarAlumno(false)}
            >
              Cancelar
            </button>
            <button 
              className='boton__blanco' 
              onClick={() => {
                eliminarAlumnos(perfilAlumno)
                setModalEliminarAlumno(false)
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal> 
    </div>
  )
}

export default TablaAlumnos
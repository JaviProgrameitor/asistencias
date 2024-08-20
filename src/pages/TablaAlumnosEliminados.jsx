
import { Link, useResolvedPath } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { FcContacts, FcCurrencyExchange } from "react-icons/fc";
import { useState } from "react"
import TooltipComplete from "../components/TooltipComplete/TooltipComplete";
import { AiFillDelete } from 'react-icons/ai'
import { IoPersonAddSharp } from "react-icons/io5";
import Indicadores from '../components/Indicadores/Indicadores'
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';

import FilasAlumnosEliminados from "../components/FilasAlumnosEliminados/FilasAlumnosEliminados"

import { deleteStorage } from '../firebase';

import { deleteDatabase, alumnosURL, createDatabase, alumnosEliminadosURL } from '../services/service-db'

import Loader from '../components/Loader/Loader';

import Modal from '@mui/material/Modal';

import { Toaster, toast } from 'sonner'

function TablaAlumnosEliminados(props) {
  const { alumnosEliminados, idAlumno, setIdAlumno, alumnoSeleccionado, puestoAdmin } = props

  const [ estadoModal, setEstadoModal ] = useState(false)
  const [ accionAlumno, setAccionAlumno ] = useState(0)
  const [ activarLoader, setActivarLoader ] = useState(false)

  const url = useResolvedPath("").pathname

  function actualizarDatos(id) {
    if(id) {
      setIdAlumno(id)
    }

    else {
      setIdAlumno(null)
    }
  }

  //Todo: Función para eliminar alumnos de la base de datos
  async function eliminarAlumnos(alumno) {
    setActivarLoader(true)

    //Documentos
    await deleteStorage(`alumnos/${alumno.idFoto}`)
    await deleteStorage(`documentos/${alumno.idActaNacimiento}`)
    await deleteStorage(`documentos/${alumno.idIne}`)
    await deleteStorage(`documentos/${alumno.idCurp}`)
    await deleteStorage(`documentos/${alumno.idComprobantePagoInicial}`)

    await deleteDatabase(alumnosEliminadosURL, alumno.id)
    toast.success('El Alumno(a) en seguimiento ha sido eliminado correctamente')
    setIdAlumno(null)
    setActivarLoader(false)
  }

  async function reinscribirAlumno(alumno) {
    setActivarLoader(true)
    const datos = {
      foto: alumno.foto,
      actaNacimiento: alumno.actaNacimiento,
      ine: alumno.ine,
      curp: alumno.curp,
      comprobantePagoInicial: alumno.comprobantePagoInicial,
      idFoto: alumno.idFoto,
      idActaNacimiento: alumno.idActaNacimiento,
      idIne: alumno.idIne,
      idCurp: alumno.idCurp,
      idComprobantePagoInicial: alumno.idComprobantePagoInicial,
      nombre: alumno.nombre, 
      apellido: alumno.apellido, 
      fechaNacimiento: alumno.fechaNacimiento, 
      correo: alumno.correo, 
      numeroTelefono: alumno.numeroTelefono, 
      nivelAcademico: alumno.nivelAcademico,
      codigoPostal: alumno.codigoPostal,
      pais: alumno.pais,
      estado: alumno.estado,
      municipio: alumno.municipio,
      colonia: alumno.colonia,
      calle: alumno.calle,
      numeroExterior: alumno.numeroExterior,
      claveEstudiante: alumno.claveEstudiante,
      idiomaAprendizaje: alumno.idiomaAprendizaje,
      nivelIdioma: alumno.nivelIdioma,
      modalidadEstudio: alumno.modalidadEstudio,
      fechaIngreso: alumno.fechaIngreso,
      fechaPago: alumno.fechaPago
    }

    const datosAuth = {
      email: alumno.correo,
      password: 'MX098CIs',
      photoURL: alumno.foto,
      displayName: `${alumno.nombre} ${alumno.apellido}`
    }

    await deleteDatabase(`${alumnosEliminadosURL}/parcial`, alumno.id)
    await createDatabase(`${alumnosURL}/reinscribir`, {datosAuth, datos})
    toast.success('El Alumno(a) en seguimiento ha sido reinscrito correctamente')
    setIdAlumno(null)
    setActivarLoader(false)
  }

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <h2 className='titulos-2'>Tabla de Alumnos En Seguimiento</h2>
      {
        idAlumno !== null && (
          <div className="justify-end">
            <TooltipComplete 
              titulo='Perfil'
              body={
                <Link to={`${url}/perfil/${idAlumno}`}>
                  <FcContacts 
                    className='alumno-completo icon-alumno' 
                  />
                </Link>
              }
            />
            <TooltipComplete 
              titulo='Reinscribir'
              body={
                <span>
                  <IoPersonAddSharp 
                    className="alumno-readd icon-alumno"
                    onClick={() => {
                      if(puestoAdmin === 'Director(a)') {
                        setAccionAlumno(0)
                        setEstadoModal(true)
                      }
                      else toast.error('No tienes acceso a esta función.')
                      
                    }}
                  />
                </span>
              }
            />
            <TooltipComplete 
              titulo='Eliminar'
              body={
                <span>
                  <AiFillDelete 
                    className='alumno-delete icon-alumno'
                    onClick={() => {
                      if(puestoAdmin === 'Director(a)') {
                        setAccionAlumno(1)
                        setEstadoModal(true)
                      }
                      else toast.error('No tienes acceso a esta función.')
                      
                    }}
                  />
                </span>
              }
            />
          </div>
        )
      }
      <div className='contenedor__tabla-scroll tamaño-tabla_250-400'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Clave de Estudiante</th>
              <th colSpan='1'>Fecha Eliminación</th>
              <th colSpan='1'>Motivo Eliminación</th>
            </tr>
          </thead>
          <tbody className='tabla-cuerpo'>
            {
              alumnosEliminados.map((alumno, index) => 
                <FilasAlumnosEliminados 
                  datos={alumno}
                  key={index}
                  idAlumno={idAlumno}
                  actualizarDatos={actualizarDatos}
                />
              )
            } 
          </tbody>
        </table>
      </div>
      <Modal
        open={estadoModal}
        onClose={() => setEstadoModal(false)}
      >
        <div className='modal__por-defecto modal__contenido scroll-personalizado'>
          {
            estadoModal && (
              <>
                <h4 className='advertencia__titulo'>¡ADVERTENCIA!</h4>
                <p className='advertencia__texto'>
                  ¿Estás seguro de que quieres <strong>{accionAlumno == 0 ? 'reinscribir' : 'eliminar'}</strong> al alumno en seguimiento?
                </p>
                <div className='contenedor__columna-centro'>
                  <div>
                    <Indicadores 
                      titulo='Nombre'
                      respuesta={alumnoSeleccionado.nombre}
                    />
                    <Indicadores 
                      titulo='Apellido'
                      respuesta={alumnoSeleccionado.apellido}
                    />
                    <Indicadores 
                      titulo='Fecha de Nacimiento'
                      respuesta={alumnoSeleccionado.fechaNacimiento}
                    />
                    <Indicadores 
                      titulo='Correo Electrónico'
                      respuesta={alumnoSeleccionado.correo}
                    />
                    <Indicadores 
                      titulo='Número de Teléfono'
                      respuesta={alumnoSeleccionado.numeroTelefono}
                    />
                    <Indicadores 
                      titulo='Nivel Académico'
                      respuesta={alumnoSeleccionado.nivelAcademico}
                    />
                    <Indicadores 
                      titulo={'Clave del Estudiante'} 
                      respuesta={alumnoSeleccionado.claveEstudiante} 
                    />
                    <IndicadoresMultiples 
                      titulo={'Idiomas de Aprendizaje'} 
                      respuesta={alumnoSeleccionado.idiomaAprendizaje} 
                    />
                    <IndicadoresMultiples 
                      titulo={'Nivel MCERLC'} 
                      respuesta={alumnoSeleccionado.nivelIdioma} 
                    />
                    <IndicadoresMultiples 
                      titulo={'Modalidad de Estudio'} 
                      respuesta={alumnoSeleccionado.modalidadEstudio} 
                    />
                    <IndicadoresMultiples 
                      titulo={'Fecha de Ingreso'} 
                      respuesta={alumnoSeleccionado.fechaIngreso} 
                    />
                    <IndicadoresMultiples 
                      titulo={'Fecha de Pago'} 
                      respuesta={alumnoSeleccionado.fechaPago} 
                    />
                  </div>
                </div>
                <div className='contenedor__centro-separacion'>
                  <button 
                    className='boton__verde-oscuro' 
                    onClick={() => setEstadoModal(false)}
                  >
                    Cancelar
                  </button>
                  <button 
                    className='boton__blanco' 
                    onClick={() => {
                      setEstadoModal(false)
                      accionAlumno == 0 
                        ? reinscribirAlumno(alumnoSeleccionado)
                        : eliminarAlumnos(alumnoSeleccionado)
                    }}
                  >
                    {
                      accionAlumno == 0 
                        ? 'Reinscribir' 
                        : 'Eliminar'
                    }
                  </button>
                </div>
              </>
            )
          }
        </div>
      </Modal>
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default TablaAlumnosEliminados
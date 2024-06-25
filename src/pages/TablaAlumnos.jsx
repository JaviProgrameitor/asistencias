import '../assets/css/TablaAlumnos.css'

import { useState, useEffect, useRef } from 'react';
import { FcContacts, FcCurrencyExchange, FcCalendar } from "react-icons/fc";
import { AiFillDelete } from 'react-icons/ai'
import { BsPersonFillAdd } from 'react-icons/bs'
import { IoMdLocate } from "react-icons/io";
import { FaEdit } from 'react-icons/fa'
import { Link, useResolvedPath } from "react-router-dom"

import { deleteStorage } from '../firebase';

import { deleteDatabase, alumnosURL, asistenciasURL, justificantesURL, pagosMensualidadURL, createDatabase, alumnosEliminadosURL } from '../services/service-db'

import FilasAlumnos from '../components/FilasAlumnos/FilasAlumnos'
import DemostracionColores from '../components/DemostracionColores/DemostracionColores'
import BarraBusquedaOpciones from '../components/BarraBusquedaOpciones/BarraBusquedaOpciones';
import BarraBusquedaTexto from '../components/BarraBusquedaTexto/BarraBusquedaTexto';
import Indicadores from '../components/Indicadores/Indicadores'
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';
import CampoFecha from '../components/CampoFecha/CampoFecha';
import TextArea from '../components/TextArea/TextArea';

import Modal from '@mui/material/Modal';

import dayjs from 'dayjs';

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
    justificantes,
    pagosMensualidades,
    idiomasImpartidos,
    coordenadasAlumno,
    setCoordenadasAlumno
  } = props

  const contenedorTablaAlumnos = useRef(null);

  const [ paso, setPaso ] = useState(0)
  const [ motivoBaja, setMotivoBaja ] = useState('')
  const [ fechaBaja, setFechaBaja ] = useState('')

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
    const asistenciasAlumno = asistenciasEntrada.filter((asis) => asis.idPropietario == alumno.id)
    const justificantesEnEsperaAlumno = justificantes.filter(justi => justi.idPropietario == alumno.id)
    const pagosMensualidadesAlumno = pagosMensualidades.filter(pago => pago.idPropietario == alumno.id)

    //Documentos
    // deleteStorage(`alumnos/${alumno.idFoto}`)
    // deleteStorage(`documentos/${alumno.idActaNacimiento}`)
    // deleteStorage(`documentos/${alumno.idIne}`)
    // deleteStorage(`documentos/${alumno.idCurp}`)
    // deleteStorage(`documentos/${alumno.idComprobantePagoInicial}`)

    //Todo: Eliminar todas las asistencias del alumno
    if(asistenciasAlumno.length > 0) {
      for(let i = 0; i < asistenciasAlumno.length; i++) {
        await deleteDatabase(asistenciasURL, asistenciasAlumno[i].id)
      }
    }

    //Todo: Eliminar justificantes en espera del alumno
    if(justificantesEnEsperaAlumno.length > 0) {
      for(let i = 0; i < justificantesEnEsperaAlumno.length; i++) {
        await deleteDatabase(justificantesURL, justificantesEnEsperaAlumno[i].id)
        await deleteStorage(`justificantes/${justificantesEnEsperaAlumno[i].idFotoJustificante}`)
      }
    }

    //Todo: Eliminar los pagos mensuales del alumno
    if(pagosMensualidadesAlumno.length > 0) {
      for(let i = 0; i < pagosMensualidadesAlumno.length; i++) {
        await deleteDatabase(pagosMensualidadURL, pagosMensualidadesAlumno[i].id)
        await deleteStorage(`pagosMensualidades/${pagosMensualidadesAlumno[i].idComprobantePagoMensualidad}`)
      }
    }

    const fechaEliminacion = new Date(dayjs(fechaBaja).$d).getTime()

    const datos = {
      foto: perfilAlumno.foto,
      actaNacimiento: perfilAlumno.actaNacimiento,
      ine: perfilAlumno.ine,
      curp: perfilAlumno.curp,
      comprobantePagoInicial: perfilAlumno.comprobantePagoInicial,
      idFoto: perfilAlumno.idFoto,
      idActaNacimiento: perfilAlumno.idActaNacimiento,
      idIne: perfilAlumno.idIne,
      idCurp: perfilAlumno.idCurp,
      idComprobantePagoInicial: perfilAlumno.idComprobantePagoInicial,
      nombre: perfilAlumno.nombre, 
      apellido: perfilAlumno.apellido, 
      fechaNacimiento: perfilAlumno.fechaNacimiento, 
      correo: perfilAlumno.correo, 
      numeroTelefono: perfilAlumno.numeroTelefono, 
      nivelAcademico: perfilAlumno.nivelAcademico,
      codigoPostal: perfilAlumno.codigoPostal,
      pais: perfilAlumno.pais,
      estado: perfilAlumno.estado,
      municipio: perfilAlumno.municipio,
      colonia: perfilAlumno.colonia,
      calle: perfilAlumno.calle,
      numeroExterior: perfilAlumno.numeroExterior,
      claveEstudiante: perfilAlumno.claveEstudiante,
      idiomaAprendizaje: perfilAlumno.idiomaAprendizaje,
      nivelIdioma: perfilAlumno.nivelIdioma,
      modalidadEstudio: perfilAlumno.modalidadEstudio,
      fechaIngreso: perfilAlumno.fechaIngreso,
      fechaPago: perfilAlumno.fechaPago,
      fechaEliminacion,
      motivoEliminacion: motivoBaja
    }

    await createDatabase(alumnosEliminadosURL, {datos})

    await deleteDatabase(alumnosURL, alumno.id)
    toast.success('El Alumno ha sido eliminado correctamente')
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

  function scrollearAlumno(top, left) {
    if (contenedorTablaAlumnos.current) {
      contenedorTablaAlumnos.current.scroll({
        top: top,
        left: left,
        behavior: 'smooth'
      });
    }
  }

  const getCoordinates = (targetRef) => {
    if (contenedorTablaAlumnos.current && targetRef.current) {
      const tablaRef = contenedorTablaAlumnos.current.children[0]
      const headerRef = tablaRef.children[0]

      const containerRect = contenedorTablaAlumnos.current.getBoundingClientRect();
      const targetRect = targetRef.current.getBoundingClientRect();

      const top = ((targetRect.top - containerRect.top + contenedorTablaAlumnos.current.scrollTop) - targetRef.current.clientHeight) - headerRef.clientHeight;

      setCoordenadasAlumno(top)
    }
  };

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
        <Link to={`${url}/alumnos-eliminados`} className='boton__verde-oscuro'>
          Alumnos En Seguimiento
        </Link>
      </div>
      <p className='titulos-4 titulos__izquierda'><strong>Cantidad total de Alumnos:</strong> {alumnos.length} alumnos</p>
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
      <div
        className={`align-center max-content pointer mt-10 ${idAlumno === false  ? 'hidden' : ''}`}
        onClick={() => scrollearAlumno(coordenadasAlumno, 0)}
      >
        <IoMdLocate />
        Ir Alumno
      </div>
      <div className='contenedor__tabla-scroll tamaño-tabla_250-400' ref={contenedorTablaAlumnos}>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Clave de Estudiante</th>
              <th className='tr-mobil' colSpan='1'>Fecha de Pago</th>
              <th className='tr-mobil' colSpan='1'>Estado Mensualidad</th>
              <th colSpan='1'>Idioma de Aprendizaje</th>
              <th className='tr-desktop' colSpan='1'>Fecha de Pago</th>
              <th className='tr-desktop' colSpan='1'>Estado Mensualidad</th>
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
                  getCoordinates={getCoordinates}
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
          {
            paso === 0
              ? <>
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
                      onClick={() => setPaso(1)}
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              : <>
                  <p className='advertencia__texto'>LLena la siguiente información</p>
                  <form>
                    <CampoFecha 
                      titulo='Fecha de Eliminación'
                      valor={fechaBaja}
                      cambiarValor={setFechaBaja}
                      className='campo-verde-claro'
                    />
                    <TextArea 
                      titulo='Motivo de la Eliminación'
                      placeholder='Escribe el motivo de la eliminación del alumno'
                      valor={motivoBaja}
                      cambiarValor={setMotivoBaja}
                      className='campo-verde-claro'
                    />
                  </form>
                  <div className='contenedor__centro-separacion'>
                    <button 
                      className='boton__verde-oscuro' 
                      onClick={() => setPaso(0)}
                    >
                      Regresar
                    </button>
                    <button 
                      className='boton__blanco' 
                      onClick={() => {
                        eliminarAlumnos(perfilAlumno)
                        setModalEliminarAlumno(false)
                      }}
                    >
                      Confirmar
                    </button>
                  </div>
                </>
          }
        </div>
      </Modal> 
    </div>
  )
}

export default TablaAlumnos
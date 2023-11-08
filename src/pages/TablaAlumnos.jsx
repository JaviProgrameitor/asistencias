import '../assets/css/TablaAlumnos.css'

import { useState, useEffect } from 'react';
import { FcContacts, FcCurrencyExchange, FcCalendar } from "react-icons/fc";
import { AiFillDelete } from 'react-icons/ai'
import { BsPersonFillAdd } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { Link, useResolvedPath } from "react-router-dom"

import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from 'firebase/storage'
import firebaseConfig from '../firebase';

import FilasAlumnos from '../components/FilasAlumnos/FilasAlumnos'
import DemostracionColores from '../components/DemostracionColores/DemostracionColores'

import TextField from '@mui/material/TextField';

import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const st = getStorage(app);

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
        const docRef = doc(db, 'asistenciasEntrada', asistenciasAlumno[i].id)
        await deleteDoc(docRef)
      }
    }

    //Todo: Eliminar justificantes en espera del alumno
    if(justificantesEnEsperaAlumno.length > 0) {
      for(let i = 0; i < justificantesEnEsperaAlumno.length; i++) {
        const docRef = doc(db, 'justificantesEnEspera', justificantesEnEsperaAlumno[i].id)
        await deleteDoc(docRef)
  
        const desertRef = ref(st, `justificantes/${justificantesEnEsperaAlumno[i].idFotoJustificante}`);
        await deleteObject(desertRef)
      }
    }

    //Todo: Eliminar justificantes aceptados del alumno
    if(justificantesAceptadosAlumno.length > 0) {
      for(let i = 0; i < justificantesAceptadosAlumno.length; i++) {
        const docRef = doc(db, 'justificantesAceptados', justificantesAceptadosAlumno[i].id)
        await deleteDoc(docRef)
  
        const desertRef = ref(st, `justificantes/${justificantesAceptadosAlumno[i].idFotoJustificante}`);
        await deleteObject(desertRef)
      }
    }

    //Todo: Eliminar justificantes rechazados del alumno
    if(justificantesRechazadosAlumno.length > 0) {
      for(let i = 0; i < justificantesRechazadosAlumno.length; i++) {
        const docRef = doc(db, 'justificantesRechazados', justificantesRechazadosAlumno[i].id)
        await deleteDoc(docRef)
  
        const desertRef = ref(st, `justificantes/${justificantesRechazadosAlumno[i].idFotoJustificante}`);
        await deleteObject(desertRef)
      }
    }

    //Todo: Eliminar los pagos mensuales del alumno
    if(pagosMensualidadesAlumno.length > 0) {
      for(let i = 0; i < pagosMensualidadesAlumno.length; i++) {
        const docRef = doc(db, 'pagosMensualidades', pagosMensualidadesAlumno[i].id)
        await deleteDoc(docRef)
      }
    }

    const desertRef = ref(st, `alumnos/${alumno.idFoto}`);
    await deleteObject(desertRef)

    const desertRef2 = ref(st, `documentos/${alumno.idActaNacimiento}`);
    await deleteObject(desertRef2)

    const desertRef3 = ref(st, `documentos/${alumno.idIne}`);
    await deleteObject(desertRef3)

    const desertRef4 = ref(st, `documentos/${alumno.idCurp}`);
    await deleteObject(desertRef4)

    const desertRef5 = ref(st, `documentos/${alumno.idComprobantePagoInicial}`);
    await deleteObject(desertRef5)

    const docRef = doc(db, 'alumnos', alumno.id)
    await deleteDoc(docRef)
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
      <FormControl margin='dense' fullWidth variant='filled' color='success'>
        <InputLabel id="demo-simple-select-label">Idioma</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={idiomaSeleccionado}
          label="Age"
          onChange={(e) => setIdiomaSeleccionado(e.target.value)}
        >
          <MenuItem value={'General'}>General</MenuItem>
          {
            idiomasImpartidos.map((idioma, index) => 
              <MenuItem key={index} value={`${idioma}`}>{idioma}</MenuItem>
            )
          }
        </Select>
      </FormControl>
      <TextField 
        id="filled-basic" 
        label="Buscar Alumno" 
        variant="filled"
        fullWidth
        color='success'
        placeholder='Por nombre, apellido o clave de estudiante'
        margin='dense'
        value={palabraBusqueda}
        onChange={(e) => setPalabraBusqueda(e.target.value)}
      />
      <div className={`${idAlumno === false ? 'contenedor__todo-principio' : 'contenedor__entre'} contenedor__padding-top`}>
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
          idAlumno !== false ?
            <div>
              <Link to={`${url}/actividad-alumno`}><FcCalendar className='alumno-completo icon-alumno' /></Link>
              <Link to={`${url}/pagos-alumnos`}><FcCurrencyExchange className='alumno-completo icon-alumno' /></Link>
              <Link to={`${url}/perfil/${idAlumno}`}><FcContacts className='alumno-completo icon-alumno' /></Link>
              <Link to={`${url}/editar-alumno`}><FaEdit className="alumno-edit icon-alumno" /></Link>
              <AiFillDelete 
                className='alumno-delete icon-alumno'
                onClick={() => {
                  if(puestoAdmin === 'Director') setModalEliminarAlumno(true)
                  else toast.error('No tienes acceso a eliminar alumnos.')
                }}
              />
            </div>
          : <></>
        }
      </div> 
      <div className='contenedor__tabla-scroll tamaño-tabla__250'>
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
        open={modalEliminarAlumno}
        onClose={() => setModalEliminarAlumno(false)}
      >
        <div className='modal__por-defecto advertencia__eliminar-alumno'>
          <h4 className='advertencia__titulo'>!ADVERTENCIA!</h4>
          <p className='advertencia__texto'>¿Estás seguro de que quieres eliminar al alumno 
            <span className='advertencia__resaltar'>{` ${perfilAlumno.nombre}`}</span>
            ?
          </p>
          <div className='contenedor__centro-separacion'>
            <button className='boton__verde-oscuro' onClick={() => setModalEliminarAlumno(false)}>Cancelar Eliminación</button>
            <button className='boton__blanco' 
              onClick={() => {
                eliminarAlumnos(perfilAlumno)
                setModalEliminarAlumno(false)
              }}
            >
              Eliminar Alumno
            </button>
          </div>
        </div>
      </Modal> 
    </div>
  )
}

export default TablaAlumnos
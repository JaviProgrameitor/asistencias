import '../assets/css/TablaAlumnos.css'

import { useState } from 'react';
import { FcContacts } from "react-icons/fc";
import { AiFillDelete } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'
import { BsPersonFillAdd } from 'react-icons/bs'
import { FaEdit } from 'react-icons/fa'
import { Link, useResolvedPath } from "react-router-dom"

import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, deleteObject } from 'firebase/storage'
import firebaseConfig from '../firebase';

import FilasAlumnos from '../components/FilasAlumnos/FilasAlumnos'

import TextField from '@mui/material/TextField';

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
      justificantesRechazados 
    } = props
  const [ filtrarAlumnos, setFiltrarAlumnos ] = useState(false)
  const [ modalEliminarAlumno, setModalEliminarAlumno ] = useState(false)

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const st = getStorage(app);

  const url = useResolvedPath("").pathname

  //Todo: Función para eliminar alumnos de la base de datos
  async function eliminarAlumnos(alumno) {
    const asistenciasAlumno = asistenciasEntrada.filter((asis) => asis.claveEstudianteAsistenciaEntrada == alumno.claveEstudiante)
    const justificantesEnEsperaAlumno = justificantesEnEspera.filter(justi => justi.claveEstudianteJustificante == alumno.claveEstudiante)
    const justificantesAceptadosAlumno = justificantesAceptados.filter(justi => justi.claveEstudianteJustificante == alumno.claveEstudiante)
    const justificantesRechazadosAlumno = justificantesRechazados.filter(justi => justi.claveEstudianteJustificante == alumno.claveEstudiante)

    if(asistenciasAlumno.length > 0) {
      for(let i = 0; i < asistenciasAlumno.length; i++) {
        const docRef = doc(db, 'asistenciasEntrada', asistenciasAlumno[i].id)
        await deleteDoc(docRef)
      }
    }

    if(justificantesEnEsperaAlumno.length > 0) {
      for(let i = 0; i < justificantesEnEsperaAlumno.length; i++) {
        const docRef = doc(db, 'justificantesEnEspera', justificantesEnEsperaAlumno[i].id)
        await deleteDoc(docRef)
  
        const desertRef = ref(st, `justificantes/${justificantesEnEsperaAlumno[i].idFotoJustificante}`);
        await deleteObject(desertRef)
      }
    }

    if(justificantesAceptadosAlumno.length > 0) {
      for(let i = 0; i < justificantesAceptadosAlumno.length; i++) {
        const docRef = doc(db, 'justificantesAceptados', justificantesAceptadosAlumno[i].id)
        await deleteDoc(docRef)
  
        const desertRef = ref(st, `justificantes/${justificantesAceptadosAlumno[i].idFotoJustificante}`);
        await deleteObject(desertRef)
      }
    }

    if(justificantesRechazadosAlumno.length > 0) {
      for(let i = 0; i < justificantesRechazadosAlumno.length; i++) {
        const docRef = doc(db, 'justificantesRechazados', justificantesRechazadosAlumno[i].id)
        await deleteDoc(docRef)
  
        const desertRef = ref(st, `justificantes/${justificantesRechazadosAlumno[i].idFotoJustificante}`);
        await deleteObject(desertRef)
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

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className="contenedor__todo-final">
        <Link to={`${url}/agregar-alumno`} className='boton__blanco' >
          <BsPersonFillAdd />
          <span>Agregar Alumno</span>
        </Link>
      </div>
      <TextField 
        id="filled-basic" 
        label="Buscar Alumno" 
        variant="filled"
        fullWidth
        color='success'
        placeholder='Por nombre, apellido o clave de estudiante'
        margin='dense'
        onChange={(e) => busqueda(e.target.value)}
      />
      {
        idAlumno !== false ? 
          <div className='contenedor__todo-final'>
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
      <div className='container-alumnos__table'>
        <table className='tabla-alumnos'>
          <thead className='tabla-cabecera'>
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
          <tbody className='tabla-cuerpo'>
            {
              filtrarAlumnos === false ? 
                alumnos.map((alumno, index) => 
                  <FilasAlumnos 
                    datos={alumno} 
                    posicion={index} 
                    key={index} 
                    id={alumno.id}
                    idAlumno={idAlumno}
                    setIdAlumno={setIdAlumno}
                    actualizarDatos={actualizarDatos}
                  />
                )
              : filtrarAlumnos.map((alumno, index) => 
                  <FilasAlumnos 
                    datos={alumno} 
                    posicion={index} 
                    key={index} 
                    id={alumno.id}
                    idAlumno={idAlumno}
                    setIdAlumno={setIdAlumno}
                    actualizarDatos={actualizarDatos}
                  />
                )
            }
          </tbody>
        </table>
      </div>
      {
        modalEliminarAlumno ? <div className='container-modal__fondo-oscuro'>
        <div className='modal'>
          <TiDelete className='modal__icon-salir' onClick={() => setModalEliminarAlumno(false)} />
          <div className='advertencia__eliminar-alumno'>
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
                }}>Eliminar Alumno
              </button>
            </div>
          </div>
        </div>
      </div> 
      : <></>
      }
    </div>
  )
}

export default TablaAlumnos
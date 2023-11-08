import '../assets/css/TablaAlumnos.css'

import { useState } from "react";
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link, useResolvedPath } from "react-router-dom"
import { AiFillDelete } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'
import { FcStackOfPhotos } from 'react-icons/fc'

import FilasPagos from "../components/FilasPagos/FilasPagos";

import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase';

import Modal from '@mui/material/Modal';

import { Toaster, toast } from 'sonner'

function TablaPagoAlumno(props) {
  const { pagosMensualidades, pagoSeleccionado, setPagoSeleccionado, puestoAdmin } = props

  const [ modalEliminarEstado, setmodalEliminarEstado ] = useState(false)
  const [ modalFotoEstado, setModalFotoEstado ] = useState(false)

  const url = useResolvedPath("").pathname

  const app = initializeApp(firebaseConfig)
  const st = getStorage(app);
  const db = getFirestore(app);

  async function eliminarPago() {
    const desertRef = ref(st, `pagosMensualidades/${pagoSeleccionado.idComprobantePagoMensualidad}`);
    await deleteObject(desertRef)

    const docRef = doc(db, 'pagosMensualidades', pagoSeleccionado.id)
    await deleteDoc(docRef)
    toast.success('El Pago ha sido eliminado con exito')
    setPagoSeleccionado(false)
  }

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
      </div>
      <h5 className="titulos-2">Pagos Alumnos</h5>
      <div className="contenedor__todo-final">
        <Link className="boton__verde-oscuro" to={`${url}/crear-pago`}>
          <span>Crear Pago</span>
        </Link>
      </div>
      {
        pagoSeleccionado !== false ?
          <div className='contenedor__todo-final contenedor__padding-top'>
            <FcStackOfPhotos
              className='alumno-delete icon-alumno'
              onClick={() => setModalFotoEstado(true)}
            />
            <AiFillDelete 
              className='alumno-delete icon-alumno'
              onClick={() => {
                  if(puestoAdmin == 'Director') setmodalEliminarEstado(true)
                  else toast.error('No tienes acceso a eliminar alumnos.')
                }
              }
            />
          </div>
        : <></>
      }
      <div className='contenedor__tabla-scroll tamaño-tabla__350'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Clave de Estudiante</th>
              <th colSpan='1'>Idioma Pagado</th>
              <th colSpan='1'>Fecha que Pagó</th>
              <th colSpan='1'>Fecha Mensualidad</th>
            </tr>
          </thead>
          <tbody className='tabla-cuerpo'>
            {
              pagosMensualidades.map((pago, index) => 
              <FilasPagos 
                datos={pago} 
                posicion={index} 
                key={index} 
                pagoSeleccionado={pagoSeleccionado}
                setPagoSeleccionado={setPagoSeleccionado}
              />
            )
            }
          </tbody>
        </table>
      </div>
      <Modal
        open={modalEliminarEstado}
        onClose={() => setmodalEliminarEstado(false)}
      >
        <div className='modal'>
          <TiDelete className='modal__icon-salir' onClick={() => setmodalEliminarEstado(false)} />
          <div className='advertencia__eliminar-alumno'>
            <h4 className='advertencia__titulo'>!ADVERTENCIA!</h4>
            <p className='advertencia__texto'>¿Estás seguro de que quieres eliminar al alumno 
              <span className='advertencia__resaltar'>{` ${"hola"}`}</span>
              ?
            </p>
            <div className='contenedor__centro-separacion'>
              <button className='boton__verde-oscuro' onClick={() => setmodalEliminarEstado(false)}>Cancelar Eliminación</button>
              <button className='boton__blanco' 
                onClick={() => {
                  eliminarPago()
                  setmodalEliminarEstado(false)
                }}>Eliminar Pago
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        open={modalFotoEstado}
        onClose={() => setModalFotoEstado(false)}
      >
        <div className='caja-foto-prueba'>
          <TiDelete className='foto-prueba__icon' onClick={() => setModalFotoEstado(false)} />
          <img className='foto-prueba' src={pagoSeleccionado.comprobantePagoMensualidad} alt='Foto de la prueba del justificante' />
        </div>
      </Modal>
    </div>
  )
}

export default TablaPagoAlumno
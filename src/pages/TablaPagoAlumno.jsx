import '../assets/css/TablaAlumnos.css'

import { useState } from "react";
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link, useResolvedPath } from "react-router-dom"
import { AiFillDelete } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'
import { FcStackOfPhotos } from 'react-icons/fc'

import FilasPagos from "../components/FilasPagos/FilasPagos";

import { deleteDatabase, deleteStorage } from '../firebase';

import Modal from '@mui/material/Modal';

import { Toaster, toast } from 'sonner'

function TablaPagoAlumno(props) {
  const { pagosMensualidades, pagoSeleccionado, setPagoSeleccionado, puestoAdmin } = props

  const [ modalEliminarEstado, setmodalEliminarEstado ] = useState(false)
  const [ modalFotoEstado, setModalFotoEstado ] = useState(false)

  const url = useResolvedPath("").pathname

  async function eliminarPago() {
    await deleteStorage(`pagosMensualidades/${pagoSeleccionado.idComprobantePagoMensualidad}`)
    await deleteDatabase('pagosMensualidades', pagoSeleccionado.id)
    toast.success('El Pago ha sido eliminado con exito')
    setPagoSeleccionado(false)
  }

  return (
    <div>
      <Toaster position="top-center" richColors />
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
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
        className='modal__superior'
        open={modalEliminarEstado}
        onClose={() => setmodalEliminarEstado(false)}
      >
        <div className='modal__por-defecto modal__contenido'>
          <h4 className='advertencia__titulo'>!ADVERTENCIA!</h4>
          <p className='advertencia__texto'>¿Estás seguro de que quieres eliminar al alumno 
            <span className='advertencia__resaltar'>{` ${"hola"}`}</span>
            ?
          </p>
          <div className='contenedor__centro-separacion'>
            <button 
              className='boton__verde-oscuro' 
              onClick={() => setmodalEliminarEstado(false)}
            >
              Cancelar
            </button>
            <button className='boton__blanco' 
              onClick={() => {
                eliminarPago()
                setmodalEliminarEstado(false)
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        className='modal__superior'
        open={modalFotoEstado}
        onClose={() => setModalFotoEstado(false)}
      >
        <img 
          className='foto-prueba centrar__contenido' 
          src={pagoSeleccionado.comprobantePagoMensualidad} 
          alt='Foto de la prueba del justificante'
          onClick={() => setModalFotoEstado(false)}
        />
      </Modal>
    </div>
  )
}

export default TablaPagoAlumno
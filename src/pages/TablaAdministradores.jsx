
import { useState } from 'react';
import { Link, useResolvedPath } from "react-router-dom"
import { BsPersonFillAdd } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'

import FilasAdministradores from '../components/FilasAdministradors/FilasAdministradores';
import Indicadores from '../components/Indicadores/Indicadores'

import { deleteDatabase, deleteStorage } from '../firebase';

import { Toaster, toast } from 'sonner'

import Modal from '@mui/material/Modal';

function TablaAdministradors(props) {
  const { administradores, perfilAdministrador, idAdministrador, setIdAdministrador, actualizarDatos, puestoAdmin } = props

  const [ modalEliminarAdministrador, setModalEliminarAdministrador ] = useState(false)

  const url = useResolvedPath("").pathname

  //Todo: Función para eliminar alumnos de la base de datos
  async function eliminarAdministrador(id) {
    await deleteDatabase('administradores', id)
    await deleteStorage(`administradores/${perfilAdministrador.idFoto}`)
    setIdAdministrador(false)
  }

  return(
    <div>
      <Toaster position="top-center" richColors />
      <div className="contenedor__todo-final">
        <Link to={`${url}/agregar-administrador`} className='boton__blanco' >
          <BsPersonFillAdd />
          <span>Agregar Administrador</span>
        </Link>
      </div>
      {
        idAdministrador !== false 
          ? <div className='contenedor__todo-final'>
              <AiFillDelete 
                className='alumno-delete icon-alumno'
                onClick={() => {
                  puestoAdmin === 'Director' 
                    ? setModalEliminarAdministrador(true) 
                    : toast.error('No tienes acceso a eliminar alumnos.')
                }}
              />
            </div> 
          : <></>
      }
      <div className='contenedor__tabla-scroll tamaño-tabla__400'>
        <table className='tabla'>
          <thead className='tabla-cabecera'>
            <tr>
              <th colSpan='1'>Nombre</th>
              <th colSpan='1'>Apellido</th>
              <th colSpan='1'>Correo</th>
              <th colSpan='1'>Puesto</th>
            </tr>
          </thead>
          <tbody className='tabla-cuerpo'>
            {
              administradores.map((admin, index) => 
                <FilasAdministradores 
                  datos={admin} 
                  key={index}
                  posicion={index}
                  id={admin.id}
                  idAdministrador={idAdministrador}
                  actualizarDatos={actualizarDatos}
                />
              )
            }
          </tbody>
        </table>
      </div>
      <Modal
        className='modal__superior'
        open={modalEliminarAdministrador}
        onClose={() => setModalEliminarAdministrador(false)}
      >
        {
          modalEliminarAdministrador 
            ? <div className='modal__por-defecto modal__contenido scroll-personalizado'>
                <h4 className='advertencia__titulo'>¡ADVERTENCIA!</h4>
                <p className='advertencia__texto'>¿Estás seguro de que quieres eliminar al administrador?</p>
                <div className='contenedor__columna-centro'>
                  <div>
                    <Indicadores
                      titulo="Nombre"
                      respuesta={perfilAdministrador.nombre}
                    />
                    <Indicadores
                      titulo="Apellido"
                      respuesta={perfilAdministrador.apellido}
                    />
                    <Indicadores
                      titulo="Correo"
                      respuesta={perfilAdministrador.correo}
                    />
                    <Indicadores
                      titulo="Puesto"
                      respuesta={perfilAdministrador.puesto}
                    />
                  </div>
                </div>
                <div className='contenedor__centro-separacion'>
                  <button 
                    className='boton__verde-oscuro' 
                    onClick={() => setModalEliminarAdministrador(false)}
                  >
                    Cancelar
                  </button>
                  <button className='boton__blanco' 
                    onClick={() => {
                      eliminarAdministrador(idAdministrador)
                      setModalEliminarAdministrador(false)
                    }}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            : <></>
        }
      </Modal>
    </div>
  )
}

export default TablaAdministradors

import { useState } from 'react';
import { Link, useResolvedPath } from "react-router-dom"
import { BsPersonFillAdd } from 'react-icons/bs'
import { AiFillDelete } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

import FilasAdministradores from '../components/FilasAdministradors/FilasAdministradores'

import { doc, deleteDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase';

import { Toaster, toast } from 'sonner'

function TablaAdministradors(props) {
  const { administradores, perfilAdministrador, idAdministrador, setIdAdministrador, actualizarDatos, puestoAdmin } = props

  const [ modalEliminarAdministrador, setModalEliminarAdministrador ] = useState(false)

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const url = useResolvedPath("").pathname

    //Todo: Función para eliminar alumnos de la base de datos
    async function eliminarAdministrador(id) {
      const docRef = doc(db, 'administradores', id)
      await deleteDoc(docRef)
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
        idAdministrador !== false ? 
          <div className='contenedor__todo-final'>
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
      {
        modalEliminarAdministrador 
          ? <div className='container-modal__fondo-oscuro'>
              <div className='modal'>
                <TiDelete className='modal__icon-salir' onClick={() => setModalEliminarAdministrador(false)} />
                <div className='advertencia__eliminar-alumno'>
                  <h4 className='advertencia__titulo'>!ADVERTENCIA!</h4>
                  <p className='advertencia__texto'>¿Estás seguro de que quieres eliminar al administrador 
                  <span className='advertencia__resaltar'>{` ${perfilAdministrador.nombre}`}</span>
                  ?
                  </p>
                  <div className='contenedor__centro-separacion'>
                    <button 
                      className='boton__verde-oscuro' 
                      onClick={() => setModalEliminarAdministrador(false)}
                    >
                      Cancelar Eliminación
                    </button>
                    <button className='boton__blanco' 
                      onClick={() => {
                        eliminarAdministrador(idAdministrador)
                        setModalEliminarAdministrador(false)
                      }}
                    >
                      Eliminar Administrador
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

export default TablaAdministradors
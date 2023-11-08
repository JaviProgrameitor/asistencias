import { useState, useEffect } from 'react';

import FilasIdiomas from '../components/FilasIdiomas/FilasIdiomas'
import Campo from '../components/Campo/Campo'

import { initializeApp } from "firebase/app";
import { doc, deleteDoc, addDoc, collection, getFirestore  } from "firebase/firestore";
import firebaseConfig from '../firebase';

import Modal from '@mui/material/Modal';

import { Toaster, toast } from 'sonner'

function Idiomas(props) {
  const { idiomasImpartidos, puestoAdmin } = props

  const [open, setOpen] = useState(false);
  const [ openIdioma, setOpenIdioma ] = useState(false)
  const [ idiomaSeleccionado, setIdiomaSeleccionado ] = useState({})
  
  //Todo: Estados Agregar Idioma
  const [ nombreIdioma, setNombreIdioma ] = useState('')

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  //Todo: Funciones para abrir y cerrar el modal
  const handleOpen = (variable) => variable(true);
  const handleClose = (variable) => variable(false);

  function resetearIdioma() {
    setNombreIdioma('')
  }

  //Todo: Función para notificar al eliminar un elemento
  function notificarEliminacion(objeto) {
    toast.success(`El ${objeto} ha sido eliminado con exito`)
  }

  //Todo: Función para eliminar idiomas
  async function eliminarIdioma() {
    const docRef = doc(db, 'idiomas', idiomaSeleccionado.id)
    await deleteDoc(docRef)
    notificarEliminacion('Idioma')
  }

  //Todo: Función para agregar idiomas
  async function agregarIdioma() {
    const datos = {
      nombre: nombreIdioma
    }

    const collectionRef = collection(db, 'idiomas')
    const docRef = await addDoc(collectionRef, datos)
    toast.success('El Idioma ha sido agregado con exito')
  }

  function accesoDenegado() {
    toast.error('No tienes acceso a esta función.')
  }
  
  return (
    <div>
      <div className='caja-tabla-idiomas'>
        <h3 className='titulos-2'>Idiomas</h3>
        <div className='contenedor__todo-final'>
          <button 
            className='boton__verde-oscuro' 
            onClick={() => {
              puestoAdmin == 'Director' 
              ? handleOpen(setOpen) 
              : accesoDenegado()
            }}
          >
            Agregar Idioma
          </button>
        </div>
        <div className='container-alumnos__table tabla-idiomas'>
          <table className='tabla'>
            <thead className='tabla-cabecera'>
              <tr>
                <th colSpan='1'>Número</th>
                <th colSpan='1'>Idioma</th>
                <th colSpan='1'>Acciones</th>
              </tr>
            </thead>
            <tbody className='tabla-cuerpo'>
              {
                idiomasImpartidos.map((idioma, index) => 
                  <FilasIdiomas 
                    key={index} 
                    posicion={index + 1} 
                    nombre={idioma.nombre} 
                    id={idioma.id}
                    seleccionarIdioma={setIdiomaSeleccionado}
                    handleOpen={handleOpen}
                    variable={setOpenIdioma}
                    puestoAdmin={puestoAdmin}
                    accesoDenegado={accesoDenegado}
                  />
                )
              }
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        open={open}
        onClose={() => {
          resetearIdioma()
          handleClose(setOpen)
        }}
      >
      <div className='modal__por-defecto modal__contenido'>
        <h4 className='titulos-3'>Agregar Idioma</h4>
        <div>
          <Campo 
            className='campo-verde-claro'
            titulo='Idioma'
            placeholder='Ingresa el nombre del Idioma'
            cambiarValor={setNombreIdioma}
            valor={nombreIdioma}
          />
        </div>
        <div className='contenedor__centrado-separacion'>
          <button 
            className='boton__blanco' 
            onClick={() => {
              resetearIdioma()
              handleClose(setOpen)
            }}
          >
            Cancelar
          </button>
          <button 
            className='boton__verde-oscuro'
            onClick={() => {
              if(nombreIdioma != '') {
                agregarIdioma()
                resetearIdioma('')
                handleClose(setOpen)
              }
              
              else toast.error('Agregue un idioma')
            }}
          >
            Agregar
          </button>
        </div>
        </div>
      </Modal>
      <Modal
        open={openIdioma}
        onClose={() => {
          setIdiomaSeleccionado({})
          handleClose(setOpenIdioma)
        }}
      >
        <div className='modal__por-defecto modal__contenido'>
          <h4 className='titulos-3'>Elimiinar Idioma</h4>
          <p className='advertencia__texto'>¿Seguro qué quieres eliminar el idioma <strong>{idiomaSeleccionado.nombre}</strong>?</p>
          <div className='contenedor__centrado-separacion'>
            <button 
              className='boton__blanco' 
              onClick={() => {
                setIdiomaSeleccionado({})
                handleClose(setOpenIdioma)
              }}
            >
              Cancelar
            </button>
            <button 
              className='boton__verde-oscuro'
              onClick={() => {
                eliminarIdioma()
                setIdiomaSeleccionado({})
                handleClose(setOpenIdioma)
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
      />
    </div>
  )
}

export default Idiomas
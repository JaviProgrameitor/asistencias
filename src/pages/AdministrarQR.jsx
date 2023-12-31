
import { useEffect, useState } from "react";
import { AiFillDelete } from 'react-icons/ai'

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import firebaseConfig from '../firebase';

import Campo from '../components/Campo/Campo'
import FilasCodigosQR from "../components/FilasCodigosQR/FilasCodigosQR";
import Indicadores from '../components/Indicadores/Indicadores';

import { Toaster, toast } from 'sonner'

import Modal from '@mui/material/Modal';

function AdministrarQR() {
  const [ alumnosCodigos, setAlumnosCodigos ] = useState([])
  const [ abrirModal, setAbrirModal ] = useState(false)
  const [ abrirModalEliminar, setAbrirModalEliminar ] = useState(false)
  const [ codigoSeleccionado, setCodigoSelecionado ] = useState({})
  
  const [ nombreCompletoAlumno, setNombreCompletoAlumno ] = useState('')
  const [ codigoQRAlumno, setCodigoQRAlumno ] = useState('')

  console.log(codigoSeleccionado)

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  async function agregarCodigoQr(e) {
    e.preventDefault()

    const datos = {
      nombreCompleto: nombreCompletoAlumno,
      codigoQR: codigoQRAlumno
    }

    const collectionRef = collection(db, 'codigosQR')
    const docRef = await addDoc(collectionRef, datos)
    toast.success('El Código QR ha sido creado con exito')
  }

  async function eliminarCodigo(id) {
    const docRef = doc(db, 'codigosQR', id)
    await deleteDoc(docRef)
    toast.success('El Código QR ha sido eliminado con exito')
  }

    //Todo: Función para leer los datos de la base de datos
    useEffect(
      () => 
      {
        onSnapshot(collection(db, 'codigosQR'),(snapshot) => 
          setAlumnosCodigos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
        )
      },[db]
    )

  return (
    <div>
      <h2 className="titulos-2">Administrar Códigos QR</h2>
      <div className="contenedor__todo-final padd-x__20">
        <button className="boton__blanco" onClick={() => setAbrirModal(true)}>Nuevo Codigo QR</button>
      </div>
      <div className='contenedor__tabla-scroll tamaño-tabla__250'>
        <table className='tabla'>
          <thead className='tabla-cabecera tabla-cabecera__tabla-scroll'>
            <tr>
              <th colSpan='1'>Número</th>
              <th colSpan='1'>Nombre Completo</th>
              <th colSpan='1'>Código QR</th>
            </tr>
          </thead>
          <tbody className='tabla-cuerpo'>
            {
              alumnosCodigos.map((codigo, index) => 
                <FilasCodigosQR
                  key={index}
                  datos={{...codigo, posicion: index + 1}}
                  codigoSeleccionado={codigoSeleccionado}
                  setCodigoSelecionado={setCodigoSelecionado}
                />
              )
            }
          </tbody>
        </table>
      </div>
      <Modal
        open={abrirModal}
        onClose={() => setAbrirModal(false)}
      >
        <div className='modal__por-defecto modal__contenido'>
          <h3 className="titulos-2">Agrega un Código QR</h3>
          <form onSubmit={agregarCodigoQr}>
            <Campo 
              titulo='Nombre Completo' 
              placeholder='Ingresa el nombre completo del alumno' 
              cambiarValor={setNombreCompletoAlumno} 
              valor={nombreCompletoAlumno} 
            />
            <Campo 
              titulo='Código QR' 
              placeholder='Ingresa el Código QR del alumno' 
              cambiarValor={setCodigoQRAlumno} 
              valor={codigoQRAlumno} 
            />
            <button className="boton__verde-oscuro">Agregar</button>
          </form>
        </div>
      </Modal>
      <Modal
        open={abrirModalEliminar}
        onClose={setAbrirModalEliminar}
      >
        <div className='modal__por-defecto modal__contenido'>
          <h3 className="titulos-2">¿Seguro qué lo quieres eliminar?</h3>
          <Indicadores titulo={'Nombre Completo'} respuesta={codigoSeleccionado.nombreCompleto} />
        </div>
      </Modal>
    </div>
  )
}

export default AdministrarQR
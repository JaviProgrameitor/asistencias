
import { useState, useEffect } from "react"
import { AiFillCheckCircle } from 'react-icons/ai'
import { TiDelete } from 'react-icons/ti'

import { doc, deleteDoc, getFirestore, addDoc, collection } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebase';

import emailjs from '@emailjs/browser';

import { Toaster, toast } from 'sonner'

function FilasJustificantes(props) {
  const { posicion, valor, cambiarValor, ultimaFila } = props

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const { nombreJustificante, apellidoJustificante, claveEstudianteJustificante, numeroTelefonoJustificante, fechaEmisionJustificante,
    horaEmisionJustificante, fechaJustificante, motivoJustificante, explicacionJustificante, fotoJustificante, id,
    correoJustificante } = props.datos
  const [tipo, setTipo] = useState()
  const [activo, setActivo] = useState()

  const [ nombre, setNombre ] = useState(nombreJustificante)
  const [ apellido, setApellido ] = useState(apellidoJustificante)
  const [ claveEstudiante, setClaveEstudiante ] = useState(claveEstudianteJustificante)
  const [ numeroTelefono, setNumeroTelefono ] = useState(numeroTelefonoJustificante)
  const [ fechaEmision, setFechaEmision ] = useState(fechaEmisionJustificante)
  const [ horaEmision, setHoraEmision ] = useState(horaEmisionJustificante)
  const [ fecha, setFecha ] = useState(fechaJustificante)
  const [ motivo, setMotivo ] = useState(motivoJustificante)
  const [ explicacion, setExplicacion ] = useState(explicacionJustificante)
  const [ foto, setFoto ] = useState(fotoJustificante)

  //Todo: Función para eliminar alumnos de la base de datos
  async function eliminarAlumnos(id) {
    const docRef = doc(db, 'justificantesEnEspera', id)
    await deleteDoc(docRef)
  }

  async function aceptarJustificacion() {
    const docRef = doc(db, 'justificantesEnEspera', id)
    await deleteDoc(docRef)
    const nombreJustificante = nombre
    const apellidoJustificante = apellido
    const claveEstudianteJustificante = claveEstudiante
    const numeroTelefonoJustificante = numeroTelefono
    const fechaEmisionJustificante = fechaEmision
    const horaEmisionJustificante = horaEmision
    const fechaJustificante = fecha
    const motivoJustificante = motivo
    const explicacionJustificante = explicacion
    const fotoJustificante = foto
    const datosMensaje = {
      nombre__alumno: `${nombre} ${apellido}`,
      from_name: correoJustificante,
      estatus: 'ha sido aprobado.',
      fecha__emision: fechaEmisionJustificante,
      hora__emision: horaEmisionJustificante,
      fecha__justificar: fechaJustificante,
      motivo__justificante: motivoJustificante,
      explicacion__justificante: explicacionJustificante
    }

    let serviceId;

    const datos = {
      nombreJustificante, 
      apellidoJustificante,
      claveEstudianteJustificante,
      numeroTelefonoJustificante,
      fechaEmisionJustificante,
      horaEmisionJustificante,
      fechaJustificante,
      motivoJustificante,
      explicacionJustificante,
      fotoJustificante
    }

    if(correoJustificante.includes('@hotmail.com')) serviceId = 'service_s03txqx'

    else if(correoJustificante.includes('@gmail.com')) serviceId = 'service_c3doz7i'

    emailjs.send(serviceId, 'template_tje7ak6', datosMensaje, 'EjqKxLfA5pfR3G7aa')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    const collectionRef = collection(db, 'justificantesAceptados')
    const docRefAdd = await addDoc(collectionRef, datos)
    toast.success('El Justificante ha sido aceptado con exito.')
  }

  async function rechazarJustificacion() {
    const docRef = doc(db, 'justificantesEnEspera', id)
    await deleteDoc(docRef)

    const nombreJustificante = nombre
    const apellidoJustificante = apellido
    const claveEstudianteJustificante = claveEstudiante
    const numeroTelefonoJustificante = numeroTelefono
    const fechaEmisionJustificante = fechaEmision
    const horaEmisionJustificante = horaEmision
    const fechaJustificante = fecha
    const motivoJustificante = motivo
    const explicacionJustificante = explicacion
    const fotoJustificante = foto
    const datosMensaje = {
      nombre__alumno: `${nombre} ${apellido}`,
      from_name: correoJustificante,
      estatus: 'ha sido rechazado.',
      fecha__emision: fechaEmisionJustificante,
      hora__emision: horaEmisionJustificante,
      fecha__justificar: fechaJustificante,
      motivo__justificante: motivoJustificante,
      explicacion__justificante: explicacionJustificante
    }

    let serviceId;

    const datos = {
      nombreJustificante, 
      apellidoJustificante,
      claveEstudianteJustificante,
      numeroTelefonoJustificante,
      fechaEmisionJustificante,
      horaEmisionJustificante,
      fechaJustificante,
      motivoJustificante,
      explicacionJustificante,
      fotoJustificante
    }

    if(correoJustificante.includes('@hotmail.com')) serviceId = 'service_s03txqx'

    else if(correoJustificante.includes('@gmail.com')) serviceId = 'service_c3doz7i'

    emailjs.send(serviceId, 'template_tje7ak6', datosMensaje, 'EjqKxLfA5pfR3G7aa')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

    const collectionRef = collection(db, 'justificantesRechazados')
    const docRefAdd = await addDoc(collectionRef, datos)
    toast.success('El Justificante ha sido rechazado con exito.')
  }

  useEffect(() => {
    if(posicion === 0 || posicion % 2 === 0) setTipo('elemento-par')
    else setTipo('elemento-impar')

    if(valor === fotoJustificante) setActivo('activo')
    else setActivo('inactivo')
  })

  return (
    <tr className={`fila fila-administrador ${tipo} ${activo}`} onClick={() => cambiarValor(fotoJustificante)}>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
      />
      <td className='td-admin'>{nombreJustificante}</td>
      <td className='td-admin'>{apellidoJustificante}</td>
      <td className='td-admin'>{claveEstudianteJustificante}</td>
      <td className='td-admin'>{horaEmisionJustificante}</td>
      <td className='td-admin'>{fechaEmisionJustificante}</td>
      <td className='td-admin'>{fechaJustificante}</td>
      <td className='td-admin'>{motivoJustificante}</td>
      <td className='td-admin'>{explicacionJustificante}</td>
      {
        ultimaFila ? 
          <td className='td-admin ultima-td-admin'>
            <AiFillCheckCircle className="icon-justificante icon-aceptar" onClick={aceptarJustificacion} /> 
            <TiDelete className="icon-justificante icon-rechazar" onClick={rechazarJustificacion} />
          </td>
        : <></>
      }
    </tr>
  )
}

export default FilasJustificantes
import '../assets/css/CrearJustificante.css'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft } from 'react-icons/fa'

import CampoFecha from "../components/CampoFecha/CampoFecha"
import ListaOpciones from "../components/ListaOpciones/ListaOpciones"
import FotoAlumno from "../components/FotoAlumno/FotoAlumno"
import TextArea from '../components/TextArea/TextArea';

import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore  } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import firebaseConfig from '../firebase';

import { v4 as uuid } from 'uuid';

function CrearJustificante(props) {
  const { notificarJustificanteEnviado } = props
  const { nombre, apellido, numeroTelefono, claveEstudiante, correo } = props.datos[0]

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const st = getStorage(app);
  const navigate = useNavigate()

  const [ fechaJustificar, setFechaJustificar ] = useState('')
  const [ motivo, setMotivo ] = useState('')
  const [ explicacion, setExplicacion ] = useState('')
  const [ fotoPrueba, setFotoPrueba ] = useState('')

  const [ nombreAlumno, setNombreAlumno ] = useState(nombre)
  const [ apellidoAlumno, setApellidoAlumno ] = useState(apellido)
  const [ numeroTelefonoAlumno, setNumeroTelefonoAlumno ] = useState(numeroTelefono)
  const [ claveEstudianteAlumno, setClaveEstudianteAlumno ] = useState(claveEstudiante)

  const [ fotoApoyo, setFotoApoyo ] = useState(false)

  const opcionesMotivos = [
    'Tardanza',
    'Falta'
  ]

  async function enviarDatos(e) {
    e.preventDefault()

    const date = new Date();
    const año = date.getFullYear()//Saber el año
    const mes = date.getMonth()//Saber el mes
    const fecha = date.getDate()//Saber la fecha
    const hora = date.getHours()//Saber la hora
    const minutos = date.getMinutes()//Saber los minutos

    const identificadorAleatorio = uuid()
    let metadata = {contentType: fotoPrueba.type}

    const storageRef = ref(st, `justificantes/${identificadorAleatorio}`)
    await uploadBytesResumable(storageRef, fotoPrueba, metadata)

    const nombreJustificante = nombreAlumno
    const apellidoJustificante = apellidoAlumno
    const claveEstudianteJustificante = claveEstudianteAlumno
    const numeroTelefonoJustificante = numeroTelefonoAlumno
    const correoJustificante = correo
    let fechaEmisionJustificante;
    const horaEmisionJustificante = `${hora}:${minutos}`
    const fechaJustificante = fechaJustificar
    const motivoJustificante = motivo
    const explicacionJustificante = explicacion
    const fotoJustificante = await getDownloadURL(storageRef)
    const idFotoJustificante = identificadorAleatorio

    if((mes + 1) < 10) fechaEmisionJustificante = `${año}-0${mes + 1}-${fecha}`
    else if((mes + 1) >= 10) fechaEmisionJustificante = `${año}-${mes + 1}-${fecha}`

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
      fotoJustificante,
      correoJustificante,
      idFotoJustificante
    }

    const collectionRef = collection(db, 'justificantesEnEspera')
    const docRef = await addDoc(collectionRef, datos)
    notificarJustificanteEnviado()
    navigate('/sistema-asistencias/perfil-alumno/usuario-justificantes')
  }

  return (
    <div className='container-principal__perfil-usuario'>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/perfil-alumno/usuario-justificantes'}>
          <FaArrowCircleLeft className='flecha-regresar icon-40' />
        </Link>
      </div>
      <div className='agregar-alumnos__formulario'>
        <form className='formulario' onSubmit={enviarDatos}>
          <h2 className='formulario__titulo'>Crear Justificante</h2>
          <CampoFecha 
            titulo='Fecha a Justificar'
            placeholder='Selecciona la fecha a justificar'
            valor={fechaJustificar}
            cambiarValor={setFechaJustificar}
          />
          <ListaOpciones 
            titulo='Motivo'
            placeholder='Selecciona el motivo'
            valor={motivo}
            cambiarValor={setMotivo}
            opciones={opcionesMotivos}
          />
          <TextArea 
            titulo='Explicación'
            placeholder='Agrega una breve explicación.'
            valor={explicacion}
            cambiarValor={setExplicacion}
          />
          <FotoAlumno
            className='foto-explicacion'
            titulo='Pruebas'
            valor={fotoPrueba}
            cambiarValor={setFotoPrueba}
            tipo={false}
            foto={fotoApoyo}
            setFoto={setFotoApoyo}
            required={true}
            classInput='imagen__comprobante-justificante'
          />
          <button className='boton__azul contenedor__margin-top'>Enviar</button>
        </form>
      </div>
    </div>
  )
}

export default CrearJustificante
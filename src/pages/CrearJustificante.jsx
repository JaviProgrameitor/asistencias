import '../assets/css/CrearJustificante.css'

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowCircleLeft } from 'react-icons/fa'

import CampoFechaMUI from '../components/CampoFechaMUI/CampoFechaMUI';
import ListaOpciones from "../components/ListaOpciones/ListaOpciones"
import FotoAlumno from "../components/FotoAlumno/FotoAlumno"
import TextArea from '../components/TextArea/TextArea';
import Loader from '../components/Loader/Loader';

import { createDatabase, createStorage, getURLStorage } from '../firebase';

import { v4 as uuid } from 'uuid';

import dayjs from 'dayjs';

function CrearJustificante(props) {
  const { notificarJustificanteEnviado } = props
  const { nombre, apellido, numeroTelefono, claveEstudiante, correo, id } = props.datos[0]

  const navigate = useNavigate()
  const actual = new Date()

  const [ fechaJustificar, setFechaJustificar ] = useState(dayjs(`${actual.getFullYear()}-${actual.getMonth() + 1}-${actual.getDate()}`))
  const [ motivo, setMotivo ] = useState('')
  const [ explicacion, setExplicacion ] = useState('')
  const [ fotoPrueba, setFotoPrueba ] = useState('')

  const [ fotoApoyo, setFotoApoyo ] = useState(false)
  const [ activarLoader, setActivarLoader ] = useState(false)

  const opcionesMotivos = [
    'Tardanza',
    'Falta'
  ]

  async function enviarDatos(e) {
    e.preventDefault()

    setActivarLoader(true)

    const date = new Date();

    const identificadorAleatorio = uuid()
    const storageRef = `justificantes/${identificadorAleatorio}`
    await createStorage(storageRef, fotoPrueba,)

    const nombreJustificante = nombre
    const apellidoJustificante = apellido
    const claveEstudianteJustificante = claveEstudiante
    const numeroTelefonoJustificante = numeroTelefono
    const correoJustificante = correo
    let fechaInternaJustificante;
    const fechaEmisionJustificante = date.getTime()
    const fechaJustificante = new Date(fechaJustificar.$d).getTime()
    const motivoJustificante = motivo
    const explicacionJustificante = explicacion
    const fotoJustificante = await getURLStorage(storageRef)
    const idFotoJustificante = identificadorAleatorio
    const estado = 'EnEspera'

    let fechaFinalJustificar;
    let mesFinalJustificar;

    if((fechaJustificar.$M + 1) < 10) mesFinalJustificar = `0${fechaJustificar.$M + 1}`
    else if((fechaJustificar.$M + 1) >= 10) mesFinalJustificar = `${fechaJustificar.$M + 1}`

    if((fechaJustificar.$D + 1) < 10) fechaFinalJustificar = `0${fechaJustificar.$D}`
    else if((fechaJustificar.$D+ 1) >= 10) fechaFinalJustificar = `${fechaJustificar.$D}`

    fechaInternaJustificante = `${fechaJustificar.$y}-${mesFinalJustificar}-${fechaFinalJustificar}`
    const datos = {
      idPropietario: id,
      nombreJustificante, 
      apellidoJustificante,
      claveEstudianteJustificante,
      numeroTelefonoJustificante,
      fechaInternaJustificante,
      fechaEmisionJustificante,
      fechaJustificante,
      motivoJustificante,
      explicacionJustificante,
      fotoJustificante,
      correoJustificante,
      idFotoJustificante,
      estado
    }

    await createDatabase('justificantes', datos)
    setActivarLoader(false)
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
          <CampoFechaMUI
            className='input-MUI__blanco'
            titulo='Ingresa la fecha'
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
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default CrearJustificante
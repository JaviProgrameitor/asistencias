
import { useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

import Campo from '../components/Campo/Campo'
import CampoEmail from '../components/CampoEmail/CampoEmail'
import ListaOpciones from '../components/ListaOpciones/ListaOpciones'
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'
import CampoContrasena from '../components/CampoContrasena/CampoContrasena'
import Loader from '../components/Loader/Loader'

import { createStorage, getURLStorage } from '../firebase'

import { createDatabase, adminsURL } from '../services/service-db'

import { Toaster, toast } from 'sonner'

import { v4 as uuid } from 'uuid';

function AgregarAdministrador(props) {
  const { administradores } = props

  const [ fotoPerfilAdministrador, setFotoPerfilAdministrador ] = useState()
  const [ nombreAdministrador, setNombreAdministrador ] = useState('')
  const [ apellidoAdministrador, setApellidoAdministrador ] = useState('')
  const [ correoAdministrador, setCorreoAdministrador ] = useState('')
  const [ contrasenaAdministrador, setContraenaAdministrador ] = useState('')
  const [ puestoAdministrador, setPuestoAdministrador ] = useState('')
  const [ clavePersonalAdministrador, setClavePersonalAdministrador ] = useState('')

  const [ fotoApoyo, setFotoApoyo ] = useState(false)
  const [ activarLoader, setActivarLoader ] = useState(false)

  const opcionesPuestos = [
    'Director(a)',
    'Administrador(a)'
  ]

  async function agregarAdmin(e) {
    e.preventDefault()

    const adminIns = administradores.filter((ad) => ad.correo === correoAdministrador)

    if(adminIns.length <= 0) {
      setActivarLoader(true)

      const identificadorAleatorio = uuid()
      const storageRef = `administradores/${identificadorAleatorio}`
      await createStorage(storageRef, fotoPerfilAdministrador)
  
      const foto = await getURLStorage(storageRef)
      const idFoto = identificadorAleatorio;
      const nombre = nombreAdministrador
      const apellido = apellidoAdministrador
      const correo = correoAdministrador
      const contrasena = contrasenaAdministrador
      const puesto = puestoAdministrador
      const clavePersonal = clavePersonalAdministrador
  
      const datos = {
        foto,
        idFoto,
        nombre,
        apellido,
        correo,
        puesto,
        clavePersonal
      }

      const datosAuth = {
        email: correo,
        password: contrasena,
        photoURL: foto,
        displayName: `${nombre} ${apellido}`
      }

      createDatabase(adminsURL, {datosAuth, datos})
      .then(() => {
        setActivarLoader(false)
        reiniciarDatos()
        toast.success('Administrador(a) creado correctamente.')
      })
    }

    else toast.error('El correo electrónico ya ha sido utilizado.')
  }

  function reiniciarDatos() {
    setFotoPerfilAdministrador()
    setNombreAdministrador('')
    setApellidoAdministrador('')
    setCorreoAdministrador('')
    setContraenaAdministrador('')
    setPuestoAdministrador('')
    setClavePersonalAdministrador('')
    setFotoApoyo(false)
  }

  return (
    <div>
      <div className="container-agregar-administrador">
        <Toaster 
          position="top-center"
          expand={false}
          richColors
        />
        <div className='perfil-alumno__icons'>
          <Link to={'/sistema-asistencias/panel-control/administradores'}>
            <FaArrowCircleLeft className='flecha-regresar icon-40' />
          </Link>
        </div>
        <div className='agregar-alumnos__formulario'>
          <form className='formulario' onSubmit={agregarAdmin}>
            <h3 className='formulario__titulo'>Agregar Administrador(a)</h3>
            <FotoAlumno 
              titulo='Foto Perfil Administrador(a)'
              valor={fotoPerfilAdministrador}
              cambiarValor={setFotoPerfilAdministrador}
              tipo={false}
              foto={fotoApoyo}
              setFoto={setFotoApoyo}
              required={true}
              classInput='imagen__foto-perfil-administrador'
            />
            <Campo 
              titulo='Nombre'
              placeholder='Ingresa el nombre del administrador'
              cambiarValor={setNombreAdministrador}
              valor={nombreAdministrador}
            />
            <Campo 
              titulo='Apellido'
              placeholder='Ingresa el apellido del administrador'
              cambiarValor={setApellidoAdministrador}
              valor={apellidoAdministrador}
            />
            <CampoEmail 
              titulo='Correo Electrónico'
              placeholder='Ingresa el correo electrónico del administrador'
              cambiarValor={setCorreoAdministrador}
              valor={correoAdministrador}
            />
            <CampoContrasena 
              titulo='Contraseña'
              placeholder='Ingresa la contraseña del administrador'
              valor={contrasenaAdministrador}
              cambiarValor={setContraenaAdministrador}
            />
            <Campo 
              titulo='Clave del Personal'
              placeholder='Ingresa el apellido del administrador'
              cambiarValor={setClavePersonalAdministrador}
              valor={clavePersonalAdministrador}
            />
            <ListaOpciones 
              titulo='Puesto'
              placeholder='Selecciona el puesto del administrador'
              valor={puestoAdministrador}
              cambiarValor={setPuestoAdministrador}
              opciones={opcionesPuestos}
            />
            <button className='boton__azul' >Agregar Administrador(a)</button>
          </form>
        </div>
      </div>
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default AgregarAdministrador
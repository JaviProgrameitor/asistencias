
import { useState } from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import Campo from '../components/Campo/Campo'
import CampoEmail from '../components/CampoEmail/CampoEmail'
import FotoAlumno from '../components/FotoAlumno/FotoAlumno'
import Loader from '../components/Loader/Loader'

import { updateDatabase, createStorage, deleteStorage, getURLStorage } from '../firebase'

import { Toaster, toast } from 'sonner'

function ActualizarAdministrador(props) {
  const { nombre, apellido, correo, foto, contrasena, idFoto, puesto, id, clavePersonal } = props.adminActivo[0]

  const [ fotoPerfilAdministrador, setFotoPerfilAdministrador ] = useState(foto)
  const [ nombreAdministrador, setNombreAdministrador ] = useState(nombre)
  const [ apellidoAdministrador, setApellidoAdministrador ] = useState(apellido)
  const [ correoAdministrador, setCorreoAdministrador ] = useState(correo)
  const [ contrasenaAdministrador, setContraenaAdministrador ] = useState(contrasena)
  const [ puestoAdministrador, setPuestoAdministrador ] = useState(puesto)
  
  const [ clavePersonalAdministrador, setClavePersonalAdministrador ] = useState(clavePersonal)

  const [ idFotoPerfil, setIdFotoPerfil ] = useState(idFoto)
  const [ fotoApoyo, setFotoApoyo ] = useState(false)
  const [ activarLoader, setActivarLoader ] = useState(false)
  
  const navigate = useNavigate()

  const actualizarAdmin = async e => {
    e.preventDefault()

    setActivarLoader(true)

    let foto;
    let idFoto;

    if(fotoApoyo) {
      const storageRef = `administradores/${idFotoPerfil}`
      await deleteStorage(storageRef)
      await createStorage(storageRef, fotoPerfilAdministrador)

      foto = await getURLStorage(storageRef)
      idFoto = idFotoPerfil
    }

    else {
      foto = fotoPerfilAdministrador
      idFoto = idFotoPerfil
    }

    const nombre = nombreAdministrador
    const apellido = apellidoAdministrador
    const correo = correoAdministrador
    const contrasena = contrasenaAdministrador
    const puesto = puestoAdministrador

    const datos = {
      foto,
      idFoto,
      nombre,
      apellido,
      correo,
      contrasena,
      puesto
    }

    await updateDatabase('administradores', id, datos)
    setActivarLoader(false)
    toast.success('El Administrador(a) ha sido actualizado(a) con exito')

    setTimeout(() => {
      navigate('/sistema-asistencias/panel-control/administradores/perfil-administrador')
    }, 2000);
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
          <Link to={'/sistema-asistencias/panel-control/administradores/perfil-administrador'}>
            <FaArrowCircleLeft className='flecha-regresar icon-40' />
          </Link>
        </div>
        <div className='agregar-alumnos__formulario'>
          <form className='formulario' onSubmit={actualizarAdmin}>
            <h3 className='formulario__titulo'>Actualizar Administrador(a)</h3>
            <FotoAlumno 
              titulo='Foto Perfil Administrador(a)'
              valor={fotoPerfilAdministrador}
              cambiarValor={setFotoPerfilAdministrador}
              tipo={true}
              foto={fotoApoyo}
              setFoto={setFotoApoyo}
              required={false}
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
            <Campo 
              titulo='Clave del Personal'
              placeholder='Ingresa el apellido del administrador'
              cambiarValor={setClavePersonalAdministrador}
              valor={clavePersonalAdministrador}
            />
            <button className='boton__azul' >Actualizar Administrador(a)</button>
          </form>
        </div>
      </div>
      <Loader
        activarLoader={activarLoader}
      />
    </div>
  )
}

export default ActualizarAdministrador
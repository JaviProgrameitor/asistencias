import  '../../assets/css/components/Auth.css'

import { useState, useEffect } from 'react'
import { useNavigate, Link, useResolvedPath } from "react-router-dom"
import { BsQrCodeScan } from 'react-icons/bs'

import Campo from '../Campo/Campo';
import CampoContrasena from '../CampoContrasena/CampoContrasena'

import { Toaster, toast } from 'sonner'

import bcrypt from 'bcryptjs'

function AuthAlumnos(props) {

  const navigate = useNavigate()

  const url = useResolvedPath("").pathname
  
  const { alumnos, setUsuario, usuario, activarScanner, setActivarScanner } = props

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ sesion, setSesion ] = useState(false)

  //Todo: Función para iniciar sesión
  const iniciar = async() => {
    const nuevoAlumno = alumnos.filter((ad) => ad.correo === email)

    if(nuevoAlumno.length > 0) {
      bcrypt.compare(password, nuevoAlumno[0].contrasena, async(error, match) => {
        if(match) {
          await setUsuario(nuevoAlumno)
          setSesion(true)
        }
        else if(!match) toast.error('La contraseña es incorrecta')
      })
    } else toast.error('No tiene una cuenta de alumno')
  }

  useEffect(() => {
    if(usuario.length > 0 && sesion) {
      navigate(`${url}/perfil-alumno`)
    }
  })

  function formulario(e) {
    e.preventDefault()
  }

  return (
    <div className="login-box">
      <Toaster position="top-center" richColors />
      <h2 className='login-box__titulo'>Bienvenidos Alumnos</h2>
      <p className='login-box__subtitulo'>Iniciar Sesión</p>
      <form onSubmit={formulario}>
      <Campo 
          className='campo-oscuro'
          titulo='Correo Electrónico'
          placeholder='Ingresa el correo electrónico'
          valor={email}
          cambiarValor={setEmail}
        />
        <CampoContrasena 
          className='campo-oscuro'
          titulo='Contraseña'
          placeholder='Ingresa la contraseña'
          valor={password}
          cambiarValor={setPassword}
        />
        <button className='boton__azul' onClick={() => iniciar()} >Iniciar Sesión</button>
      </form>
      <div className='contenedor__centrado-separacion caja-enlace-scanner'>
        <div className='cajas-qr'>
          <BsQrCodeScan className='scanner' onClick={() => setActivarScanner(!activarScanner)}/>
          <span className='span-qr'>Presencial</span>
        </div>
        <div className='cajas-qr'>
          <Link to={`${url}/scanner-en-linea`}><BsQrCodeScan className='scanner' /></Link>
          <span className='span-qr'>En Línea</span>
        </div>
      </div>
    </div>
  )
}

export default AuthAlumnos
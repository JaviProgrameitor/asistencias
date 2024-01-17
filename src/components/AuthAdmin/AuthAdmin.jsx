import  '../../assets/css/components/Auth.css'

import { useState, useEffect } from 'react'
import { useNavigate, Link, useResolvedPath } from "react-router-dom"
import { BsQrCodeScan } from 'react-icons/bs'

import Campo from '../Campo/Campo';
import CampoContrasena from '../CampoContrasena/CampoContrasena'

import { Toaster, toast } from 'sonner'

import bcrypt from 'bcryptjs'

function AuthAdmin(props) {
  const navigate = useNavigate()

  const url = useResolvedPath("").pathname

  const { administradores, setAdmin, admin, activarScanner, setActivarScanner } = props

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ sesion, setSesion ] = useState(false)

  //Todo: Función para iniciar sesión
  async function iniciar() {
    const nuevoAdmin = administradores.filter((ad) => ad.correo === email)
    
    if(nuevoAdmin.length > 0) {
      bcrypt.compare(password, nuevoAdmin[0].contrasena, async(error, match) => {
        if(match) {
          await setAdmin(nuevoAdmin[0].id)
          setSesion(true)
        }
        else if(!match) toast.error('La contraseña es incorrecta')
      })
    } else toast.error('No tiene una cuenta de administrador')
  }

  function formulario(e) {
    e.preventDefault()
  }

  useEffect(() => {
    if(admin.length > 0 && sesion) {
      navigate(`${url}/panel-control`)
    }
  },[sesion])

  return (
    <div className="login-box">
      <Toaster position="top-center" richColors />
      <h2 className='login-box__titulo'>Bienvenidos Administradores</h2>
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

export default AuthAdmin
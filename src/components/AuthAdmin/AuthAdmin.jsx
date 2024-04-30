import  '../../assets/css/components/Auth.css'

import { useState, useEffect } from 'react'
import { useNavigate, Link, useResolvedPath } from "react-router-dom"
import { BsQrCodeScan } from 'react-icons/bs'

import CampoEmail from '../CampoEmail/CampoEmail';
import CampoContrasena from '../CampoContrasena/CampoContrasena'

import { loginUsuario } from '../../firebase'

import { Toaster, toast } from 'sonner'

function AuthAdmin(props) {
  const navigate = useNavigate()

  const url = useResolvedPath("").pathname

  const { administradores, setAdmin, admin, activarScanner, setActivarScanner } = props

  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ sesion, setSesion ] = useState(false)

  const [ errorPassword, setErrorPasword ] = useState(false)
  const [ procesoIniciado, setProcesoIniciado ] = useState(false)

  //Todo: Función para iniciar sesión
  async function iniciar() {
    setProcesoIniciado(true)
    const verificarAdmin = administradores.filter((ad) => ad.correo === email)

    if(verificarAdmin.length > 0) {
      loginUsuario(email, password)
      .then(async ({uid}) => {
        await setAdmin(uid)
        setProcesoIniciado(false)
        setErrorPasword(false)
        setSesion(true)
      })
      .catch(err => {
        if(err == "Error: Firebase: Error (auth/wrong-password).") {
          setProcesoIniciado(false)
          setErrorPasword(true)
        }
      })
    } 
    
    else {
      setProcesoIniciado(false)
      toast.error('No tiene una cuenta de alumno')
    }
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
      <p className='login-box__subtitulo'>Iniciar Sesión</p>
      <form onSubmit={formulario}>
        <CampoEmail 
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
        <p className={`text-red ${!errorPassword && 'hidden'}`}>Contraseña incorrecta.</p>
        <button 
          className='boton__azul' 
          onClick={iniciar} 
        >
          {
            !procesoIniciado
              ? 'Iniciar Sesión'
              : <span className="element-loader"></span>
          }
        </button>
      </form>
      <div className='justify-center'>
        <Link 
          className='text-white decoration-none mt-10 text-center' 
          to={`${url}/cuenta/recuperar-cuenta/`}
        >
          ¿Has olvidado tu contraseña?
        </Link>
      </div>
      <div className='contenedor__centrado-separacion caja-enlace-scanner contenedor__wrap gap-y__25'>
        <div className='cajas-qr'>
          <BsQrCodeScan className='scanner' onClick={() => setActivarScanner(!activarScanner)}/>
          <span className='span-qr'>Presencial</span>
        </div>
        <div className='cajas-qr'>
          <Link to={`${url}/scanner-en-linea`}>
            <BsQrCodeScan className='scanner' />
          </Link>
          <span className='span-qr'>En Línea</span>
        </div>
      </div>
    </div>
  )
}

export default AuthAdmin
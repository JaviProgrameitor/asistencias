import  '../../assets/css/components/Auth.css'

import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom"
import { BsQrCodeScan } from 'react-icons/bs'

import { initializeApp } from "firebase/app";
import firebaseConfig from '../../firebase';
import { collection, onSnapshot, getFirestore  } from "firebase/firestore";

import Campo from '../Campo/Campo';
import CampoContrasena from '../CampoContrasena/CampoContrasena'

import { Toaster, toast } from 'sonner'

function AuthAlumnos(props) {
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const navigate = useNavigate()
  
  const { setUsuario, usuario, scanner, setScanner } = props

  const [ totalAlumnos, setTotalAlumnos ] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [ sesion, setSesion ] = useState(false)

  //Todo: Función para iniciar sesión
  const iniciar = async() => {
    const nuevoAlumno = totalAlumnos.filter((ad) => ad.correo === email)
    setUsuario(nuevoAlumno)

    if(nuevoAlumno.length > 0) {
      if(nuevoAlumno[0].correo == email && nuevoAlumno[0].contrasena == password) setSesion(true)
      else toast.error('Su contraseña está incorrecta')
    } else toast.error('No tiene una cuenta de alumno')
  }

  useEffect(() => {
    if(usuario.length > 0 && sesion) {
      navigate('/perfil-alumno')
    }
  })

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'alumnos'),(snapshot) => 
        setTotalAlumnos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

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
          <BsQrCodeScan className='scanner' onClick={() => setScanner(!scanner)}/>
          <span className='span-qr'>Presencial</span>
        </div>
        <div className='cajas-qr'>
          <Link to={'/scanner-en-linea'}><BsQrCodeScan className='scanner' /></Link>
          <span className='span-qr'>En Línea</span>
        </div>
      </div>
    </div>
  )
}

export default AuthAlumnos
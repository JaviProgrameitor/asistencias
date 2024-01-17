import '../assets/css/PerfilAlumno.css'

import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { MdOutlineUpdate } from "react-icons/md";


import Indicadores from '../components/Indicadores/Indicadores';

function PerfilAdministrador(props) {
  const { nombre, apellido, foto, puesto, correo, clavePersonal } = props.adminActivo[0]

  const informacionPersonal = [
    {
      titulo: 'Nombre Completo',
      respuesta: `${nombre} ${apellido}`
    },
    {
      titulo: 'Correo Electrónico',
      respuesta: correo
    }
  ]

  const informacionTrabajo = [
    {
      titulo: 'Clave del Personal',
      respuesta: clavePersonal
    },
    {
      titulo: 'Puesto',
      respuesta: puesto
    }
  ]

  return (
    <div>
      <div className='container-perfil-alumno'>
        <div className='contenedor__entre padd-b__10'>
          <Link to={'/sistema-asistencias/panel-control/administradores'}>
            <FaArrowCircleLeft className='flecha-regresar icon-40' />
          </Link>
          <Link to={'/sistema-asistencias/panel-control/administradores/actualizar-administrador'} className='boton__blanco'>
            <MdOutlineUpdate />
            Actualizar Perfil
          </Link>
        </div>
        <div className='perfil-alumno__personal'>
          <div className='contenedor-_foto-alumno'>
            <div className='personal__fondo'>
              <img className='perfil-foto-alumno' src={foto} alt="Foto de Perfil del Alumno" />
            </div>
          </div>
          <h2 className='titulos-2'>Información Personal</h2>
          <div>
            {
              informacionPersonal.map((info, index) => 
                <Indicadores 
                  titulo={info.titulo} 
                  respuesta={info.respuesta} 
                  key={index} 
                />
              )
            }
          </div>
        </div>
        <div className='perfil-alumno__centro-idiomas'>
          <h2 className='titulos-2'>Información Centro de Idiomas</h2>
          <div>
            {
              informacionTrabajo.map((info, index) => 
                <Indicadores 
                  titulo={info.titulo} 
                  respuesta={info.respuesta} 
                  key={index} 
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilAdministrador
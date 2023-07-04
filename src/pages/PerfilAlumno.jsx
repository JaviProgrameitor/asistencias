import '../assets/css/PerfilAlumno.css'

import { useState } from 'react';
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import Indicadores from '../components/Indicadores/Indicadores';
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';

function PerfilAlumno(props) {
  const { foto, 
    nombre, 
    apellido, 
    numeroTelefono,
    codigoPostal,
    estado,
    municipio,
    colonia,
    calle,
    numeroExterior,
    claveEstudiante, 
    idiomaAprendizaje, 
    modalidadEstudio, 
    fechaPago, 
    id, 
    fechaNacimiento, 
    correo, 
    nivelAcademico, 
    nivelIdioma, 
    fechaIngreso 
  } = props.datos

  const informacionAlumno = [
    {
      titulo: 'Nombre Completo',
      valor: `${nombre} ${apellido}`
    },
    {
      titulo: 'Fecha de Nacimiento',
      valor: fechaNacimiento
    },
    {
      titulo: 'Correo',
      valor: correo
    },
    {
      titulo: 'Número Telefónico',
      valor: numeroTelefono
    },
    {
      titulo: 'Nivel Academico',
      valor: nivelAcademico
    },
    {
      titulo: 'Codigo Postal',
      valor: codigoPostal
    },
    {
      titulo: 'Estado',
      valor: estado
    },
    {
      titulo: 'Municipio o Alcaldía',
      valor: municipio
    },
    {
      titulo: 'Colonia',
      valor: colonia
    },
    {
      titulo: 'Calle',
      valor: calle
    },
    {
      titulo: 'Número Exterior',
      valor: numeroExterior
    }
  ]

  return (
    <div>
      <div className='container-perfil-alumno'>
        <div className='contenedor__todo-principio'>
          <Link to={'/panel-control/alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
        </div>
        <div className='perfil-alumno__personal'>
          <div className='contenedor-_foto-alumno'>
            <div className='personal__fondo'>
              <img className='perfil-foto-alumno' src={foto} alt="Foto de Perfil del Alumno" />
            </div>
          </div>
          <h2 className='perfil-titulo'>Información Personal</h2>
          {
            informacionAlumno.map((info, index) => <Indicadores titulo={info.titulo} respuesta={info.valor} key={index} />)
          }
        </div>
        <div className='perfil-alumno__centro-idiomas'>
          <h2 className='perfil-titulo'>Información Centro de Idiomas</h2>
          <Indicadores titulo={'Clave del Estudiante'} respuesta={claveEstudiante} />
          <IndicadoresMultiples titulo={'Idiomas de Aprendizaje'} respuesta={idiomaAprendizaje} />
          <IndicadoresMultiples titulo={'Nivel MCERLC'} respuesta={nivelIdioma} />
          <IndicadoresMultiples titulo={'Modalidad de Estudio'} respuesta={modalidadEstudio} />
          <IndicadoresMultiples titulo={'Fecha de Ingreso'} respuesta={fechaIngreso} />
          <IndicadoresMultiples titulo={'Fecha de Pago'} respuesta={fechaPago} />
        </div>
      </div>
    </div>
  )
}

export default PerfilAlumno
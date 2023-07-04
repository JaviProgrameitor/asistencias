import '../assets/css/PerfilAlumno.css'

import { useEffect, useState } from 'react';
import { Link, useResolvedPath } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'
import { FcPlanner } from 'react-icons/fc'

import Indicadores from '../components/Indicadores/Indicadores';
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';

function PerfilUsuario(props) {
  const url = useResolvedPath("").pathname

  const { datos } = props
  const { foto, nombre, apellido, numeroTelefono, claveEstudiante, idiomaAprendizaje, modalidadEstudio, fechaPago, id, fechaNacimiento, correo, nivelAcademico, nivelIdioma, fechaIngreso } = props.datos[0]
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
    }
  ]

  return (
    <div className='container-principal-perfil-alumno'>
      <div className='container-perfil-alumno'>
        <div className='perfil-alumno__personal'>
          <div className='personal__fondo'>
            <img className='perfil-foto-alumno' src={foto} alt="Foto de Perfil del Alumno" />
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

export default PerfilUsuario
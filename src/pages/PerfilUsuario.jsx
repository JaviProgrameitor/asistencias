import '../assets/css/PerfilAlumno.css'

import Indicadores from '../components/Indicadores/Indicadores';
import IndicadoresMultiples from '../components/IndicadoresMultiples/IndicadoresMultiples';

function PerfilUsuario(props) {
  const { 
    foto, 
    nombre, 
    apellido, 
    numeroTelefono, 
    claveEstudiante, 
    idiomaAprendizaje, 
    modalidadEstudio, 
    fechaPago, 
    id, 
    fechaNacimiento, 
    correo, 
    nivelAcademico, 
    nivelIdioma, 
    fechaIngreso,
    clasesMensualidad,
    estadoMensualidad
  } = props.datos[0]
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
          <div className='contenedor__centrado-separacion center contenedor__wrap gap-x__25 gap-y__10'>
            {
              idiomaAprendizaje.map((idioma, index) => 
                <span 
                  className={`comprobante-mensualidad padd__20 b-2px-black ${clasesMensualidad[index]}`} 
                  key={index}
                >
                  {`Mensualidad del Idioma ${idioma}: ${estadoMensualidad[index]}`} 
                </span>
              )
            }
          </div>
          <h2 className='perfil-titulo titulos-2'>Información Personal</h2>
          <div>
            {
              informacionAlumno.map((info, index) => 
                <Indicadores 
                  titulo={info.titulo} 
                  respuesta={info.valor} 
                  key={index}
                />
              )
            }
          </div>
        </div>
        <div className='perfil-alumno__centro-idiomas'>
          <h2 className='perfil-titulo titulos-2'>Información Centro de Idiomas</h2>
          <div>
            <Indicadores titulo={'Clave del Estudiante'} respuesta={claveEstudiante} />
            <IndicadoresMultiples titulo={'Idiomas de Aprendizaje'} respuesta={idiomaAprendizaje} />
            <IndicadoresMultiples titulo={'Nivel MCERLC'} respuesta={nivelIdioma} />
            <IndicadoresMultiples titulo={'Modalidad de Estudio'} respuesta={modalidadEstudio} />
            <IndicadoresMultiples titulo={'Fecha de Ingreso'} respuesta={fechaIngreso} />
            <IndicadoresMultiples titulo={'Fecha de Pago'} respuesta={fechaPago} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfilUsuario
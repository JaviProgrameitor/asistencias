import '../../assets/css/components/Metodologia.css'

import ImagenGrupo from '../../assets/img/grupo.webp'
import ImagenManos from '../../assets/img/manos.webp'
import ImagenEquipo from '../../assets/img/equipo.webp'
import ImagenMetodologia from '../../assets/img/metodología.webp'

function Metodologia() {
  return (
    <div className='caja-metodologia cajas__promocionales'>
      <div className='metodologia__contenedor-titulo'>
        <h3 id='nuestros-servicios' className='titulos__promocionales'>Exclusiva Metodología</h3>
      </div>
      <div className="caja-metodologia__contenido parent">
        <div className="metodologia-introduccion div1" data-aos="fade-right">
          <p>
            Nuestro método “Multiprofesores en Simultáneo” manifiesta un enfoque de educación que implica 
            a varios profesores trabajando juntos para proporcionar instrucción y apoyo a los alumnos en tiempo real.
          </p>
          <p>
            Este sistema puede adoptar diversas formas, según el contexto, las necesidades específicas de los 
            alumnos y los objetivos educativos estipulados para el éxito lingüistico.
          </p>
        </div>
        <div className="metodologia-ejemplos" data-aos="fade-left">
          <div className='ejemplo'>
            <img className='ejemplo__imagen' src={ImagenGrupo} alt="Imagen de un grupo social" />
            <p className='ejemplo__texto'>
              Juntos en la misma aula física o virtual, compartiendo las responsabilidades de 
              enseñar diferentes aspectos del plan de estudios.
            </p>
          </div>
          <div className='ejemplo'>
            <img className='ejemplo__imagen' src={ImagenManos} alt="Imagen de unas manos" />
            <p className='ejemplo__texto'>
              Permite una diversidad de estilos de enseñanza, experiencia y perspectivas, 
              lo que beneficia a los estudiantes al proporcionarles una experiencia de aprendizaje más enriquecedora.
            </p>
          </div>
          <div className='ejemplo'>
            <img className='ejemplo__imagen' src={ImagenEquipo} alt="Imagen de un equipo" />
            <p className='ejemplo__texto'>
              Apoyo individualizado a nuestros pupilos en función de sus necesidades y estilo de aprendizaje.
              <br />
              Cuando ellos necesitan ayuda adicional o adaptaciones en la explicación requerida: 
              el tener varios profesores permite una atención altamente personalizada; lo que deriva en un 
              aprendizaje más significativo.
            </p>
          </div>
        </div>
        <div className="metodologia-demostracion div3" data-aos="fade-right">
          <img className='demostracion__imagen' src={ImagenMetodologia} alt="Imagen de la metodología del Centro de Idiomas" />
        </div>
      </div>
    </div>
  )
}

export default Metodologia
import '../../assets/css/components/Indicadores.css'

function Indicadores(props) {
  const { titulo, respuesta, claseExtra } = props

  return (
    <div className={`numero-telefonico__alumno informacion-personal ${claseExtra != undefined ? claseExtra : 'sin-clase-extra'}`}>
      <h3 className='informacion-personal__indicador'>{titulo}</h3>
      <p className='informacion-personal__respuesta'>{respuesta}</p>
    </div>
  )
}

export default Indicadores
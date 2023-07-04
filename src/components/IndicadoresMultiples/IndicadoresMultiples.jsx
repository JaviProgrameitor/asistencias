import '../../assets/css/components/Indicadores.css'

function IndicadoresMultiples(props) {
  const { titulo, respuesta } = props

  return (
    <div className='numero-telefonico__alumno informacion-personal'>
      <h3 className='informacion-personal__indicador'>{titulo}</h3>
      <ul>
        {
          respuesta.map((idioma, index) => <li key={index}>{idioma}</li>)
        }
      </ul>
    </div>
  )
}

export default IndicadoresMultiples
import '../../assets/css/components/Campo.css'

function CampoFecha(props) {
  const { titulo, valor, cambiarValor, className='', variable, funcion, indice } = props

  return (
    <div className={`campo ${className}`}>
      <label>{titulo}</label>
      <input type="date" required value={valor} onChange={(e) => cambiarValor(e.target.value, indice, variable, funcion)} />
    </div>
  )
}

export default CampoFecha
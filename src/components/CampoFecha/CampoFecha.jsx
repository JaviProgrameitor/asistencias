import '../../assets/css/components/CampoFecha.css'

function CampoFecha(props) {
  const { titulo, valor, cambiarValor, variable, funcion, indice } = props

  return (
    <div className='campo'>
      <label>{titulo}</label>
      <input type="date" required value={valor} onChange={(e) => cambiarValor(e.target.value, indice, variable, funcion)} />
    </div>
  )
}

export default CampoFecha
import '../../assets/css/components/ListaOpciones.css'

function ListaOpciones(props) {
  const { titulo, placeholder, valor, cambiarValor, opciones, indice, variable, funcion, className } = props

  return (
    <div className={`lista-opciones ${className}`}>
      <label>{titulo}</label>
      <select required value={valor} onChange={(e) => cambiarValor(e.target.value, indice, variable, funcion)} >
        <option value="" disabled defaultValue="" hidden>{placeholder}</option>
        {
          opciones.map((opcion, index) => {
            return <option key={index} value={opcion}>{opcion}</option>
          })
        }
      </select>
    </div>
  )
}

export default ListaOpciones
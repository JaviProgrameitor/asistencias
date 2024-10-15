import '../../assets/css/components/Campo.css'

function Campo(props) {
  const { titulo, placeholder, valor, cambiarValor, className, required = false } = props

  return (
    <div className={`campo ${className}`}>
      <label>{titulo}</label>
      <input 
        type="text" 
        required={required} 
        placeholder={placeholder} 
        value={valor} 
        onChange={(e) => cambiarValor(e.target.value)} 
      />
    </div>
  )
}

export default Campo
import '../../assets/css/components/Campo.css'

function CampoEmail(props) {
  const { titulo, placeholder, valor, cambiarValor, className='' } = props

  return (
    <div className={`campo ${className}`}>
      <label>{titulo}</label>
      <input 
        type="email" 
        required 
        placeholder={placeholder} 
        value={valor} 
        onChange={(e) => cambiarValor(e.target.value)} 
      />
    </div>
  )
}

export default CampoEmail
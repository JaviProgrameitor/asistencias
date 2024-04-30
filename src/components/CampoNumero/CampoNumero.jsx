import '../../assets/css/components/Campo.css'

function CampoNumero(props) {
  const { className='', titulo, placeholder, valor, cambiarValor } = props

  return (
    <div className={`campo ${className}`}>
      <label htmlFor="">{titulo}</label>
      <input 
        type="number" 
        required 
        placeholder={placeholder} 
        value={valor} 
        onChange={(e) => cambiarValor(e.target.value)} 
      />
    </div>
  )
}

export default CampoNumero
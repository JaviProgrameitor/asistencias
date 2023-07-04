import '../../assets/css/components/Campo.css'

function Campo(props) {
  const { titulo, placeholder, valor, cambiarValor, className } = props

  return (
    <div className={`campo ${className}`}>
      <label htmlFor="">{titulo}</label>
      <input type="text" required placeholder={placeholder} value={valor} onChange={(e) => cambiarValor(e.target.value)} />
    </div>
  )
}

export default Campo
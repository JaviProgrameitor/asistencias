
function CampoEmail(props) {
  const { titulo, placeholder, valor, cambiarValor } = props

  return (
    <div className='campo'>
      <label>{titulo}</label>
      <input type="email" required placeholder={placeholder} value={valor} onChange={(e) => cambiarValor(e.target.value)} />
    </div>
  )
}

export default CampoEmail
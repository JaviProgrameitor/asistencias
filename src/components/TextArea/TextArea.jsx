import '../../assets/css/components/TextArea.css'

function TextArea(props) {
  const { titulo, placeholder, valor, cambiarValor } = props

  return (
    <div className='campo'>
      <label htmlFor="">{titulo}</label>
      <textarea className="text-area" value={valor} placeholder={placeholder} maxLength="100" required name="" id="" cols="30" rows="10" onChange={(e) => cambiarValor(e.target.value)}></textarea>
    </div>
  )
}

export default TextArea
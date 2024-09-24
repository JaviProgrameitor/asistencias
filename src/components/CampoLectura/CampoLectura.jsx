
import '../../assets/css/components/Campo.css'

function CampoLectura(props) {
  const { className='', titulo, valor, placeholder='' } = props

  return (
    <div className={`campo campo-disabled`}>
      <label htmlFor="">{titulo}</label>
      <input 
        type="text" 
        value={valor} 
        placeholder={placeholder}
        disabled 
      />
    </div>
  )
}

export default CampoLectura
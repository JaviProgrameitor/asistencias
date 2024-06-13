import '../../assets/css/components/TextArea.css'
import '../../assets/css/components/Campo.css'

function TextArea(props) {
  const { titulo, placeholder, valor, cambiarValor, className = '' } = props

  return (
    <div className={`campo ${className}`}>
      <label htmlFor="">{titulo}</label>
      <textarea 
        className='text-area'
        value={valor} 
        placeholder={placeholder} 
        maxLength="300" 
        required 
        name="" 
        id="" 
        cols="30" 
        rows="10" 
        onChange={(e) => cambiarValor(e.target.value)}
      >
        
      </textarea>
    </div>
  )
}

export default TextArea
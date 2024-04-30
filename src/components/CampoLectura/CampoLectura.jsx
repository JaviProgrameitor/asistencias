
import '../../assets/css/components/Campo.css'

function CampoLectura(props) {
  const { className='', titulo, valor } = props

  return (
    <div className={`campo campo-disabled`}>
      <label htmlFor="">{titulo}</label>
      <input type="text" value={valor} disabled />
    </div>
  )
}

export default CampoLectura
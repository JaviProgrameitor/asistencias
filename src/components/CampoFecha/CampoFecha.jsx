import '../../assets/css/components/Campo.css'

import { iso8601 } from "@formkit/tempo"
import { Toaster, toast } from 'sonner'

function CampoFecha(props) {
  const { titulo, valor, cambiarValor, className = '', variable, funcion, indice, required = false } = props

  return (
    <div className={`campo ${className}`}>
      <Toaster 
        position="top-center"
        expand={false}
        richColors
      />
      <label>{titulo}</label>
      <input 
        type="date" 
        required={required}
        value={valor} 
        onChange={
          (e) => {
            if(iso8601(e.target.value) || e.target.value === '') cambiarValor(e.target.value, indice, variable, funcion)
            else {
              cambiarValor('', indice, variable, funcion)
              toast.error('Fecha invalida')
            }
          } 
        } 
      />
    </div>
  )
}

export default CampoFecha
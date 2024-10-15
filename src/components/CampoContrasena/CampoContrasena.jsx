import { useState } from 'react'

import '../../assets/css/components/Campo.css'
import '../../assets/css/components/CampoContrasena.css'

import { IoIosCheckbox, IoIosCheckboxOutline } from 'react-icons/io'

function CampoContrasena(props) {
  const { titulo, placeholder, valor, cambiarValor, className, autoFocus, required = false } = props

  const [ tipo, setTipo ] = useState(false)

  return (
    <div className={`campo ${className}`}>
      <label>{titulo}</label>
      {
        tipo 
          ? <input 
              type="text" 
              placeholder={placeholder} 
              autoFocus={autoFocus} 
              required={required}
              name="" 
              id="" 
              value={valor}
              onChange={(e) => cambiarValor(e.target.value)} 
            /> 
          : <input 
              type="password" 
              placeholder={placeholder} 
              autoFocus={autoFocus} 
              required={required} 
              name="" 
              id="" 
              value={valor}
              onChange={(e) => cambiarValor(e.target.value)} 
            /> 
      }
      <div className='mostrar-contraseña'>
        {
          tipo 
            ? <IoIosCheckbox 
                className='icon-mostrar-contraseña icon-mostrar' 
                onClick={() => setTipo(false)} 
              />
            : <IoIosCheckboxOutline 
                className='icon-mostrar-contraseña icon-esconder' 
                onClick={() => setTipo(true)} 
              />
        }
        <span className='texto-mostrar-contraseña'>Mostrar contraseña</span>
      </div>
    </div>
  )
}

export default CampoContrasena
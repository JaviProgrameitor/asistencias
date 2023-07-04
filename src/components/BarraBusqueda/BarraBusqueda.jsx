import '../../assets/css/components/BarraBusqueda.css'

import { IoSearchCircle } from 'react-icons/io5'

function BarraBusqueda(props) {
  const { busqueda, placeholder } = props

  return (
    <div className='container-barra-busqueda'>
      <label htmlFor="buscador" className='barra-busqueda__label'><IoSearchCircle className='barra-busqueda__icono' /></label>
      <input 
        type='search' 
        className='barra-busqueda__input' 
        placeholder={placeholder} 
        id='buscador'
        onChange={(e) => busqueda(e.target.value)}
      />
    </div>
  )
}

export default BarraBusqueda
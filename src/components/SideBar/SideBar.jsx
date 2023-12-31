import '../../assets/css/components/SideBar.css'

import { Link } from 'react-router-dom'

function SideBar(props) {
  const { estado, cambiarEstado } = props

  const cambiarValor = () => {
    cambiarEstado(!estado)
  }

  return (
    <>
      {
        estado && (<div className='sideBar__fondo-oscuro' onClick={cambiarValor}></div>)
      }
      <aside className={`sideBar ${estado && ('sidebar__activo')}`}>
        <Link to={'./sistema-asistencias'} >Sistema</Link>
      </aside>
    </>
  )
}

export default SideBar
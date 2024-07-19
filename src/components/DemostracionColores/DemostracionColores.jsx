import '../..//assets/css/components/DemostracionColores.css'

function DemostracionColores(props) {
  const { color, texto, estadoMensualidadSeleccionado, setEstadoMensualidadSeleccionado } = props

  return (
    <div 
      className={`container-demostracion-color contenedor__columna-centro pointer text-center ${color == estadoMensualidadSeleccionado && 'color-activo'}`}
      onClick={() => {
        color == estadoMensualidadSeleccionado
          ? setEstadoMensualidadSeleccionado('sin-estado')
          : setEstadoMensualidadSeleccionado(color)
      }}
    >
      <div className={`container-demostracion-color__caja-color contenedor__ambos-lados_centrado ${color}`}>
        <span>A</span>
      </div>
      <span className='container-demostracion-color__caja-texto'>{texto}</span>
    </div>
  )
}

export default DemostracionColores
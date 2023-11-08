import '../..//assets/css/components/DemostracionColores.css'

function DemostracionColores(props) {
  const { color, texto } = props

  

  return (
    <div className='container-demostracion-color contenedor__columna-centro'>
      <div className={`container-demostracion-color__caja-color contenedor__ambos-lados_centrado ${color}`}>
        <span>A</span>
      </div>
      <span className='container-demostracion-color__caja-texto'>{texto}</span>
    </div>
  )
}

export default DemostracionColores

function Principal(props) {
  const { nombre } = props.admin[0]

  return (
    <div className="container-alumnos">
      <div className="contenedor__titulos-1">
        <h3 className="titulos-1">Página Principal</h3>
      </div>
      <div>
        <span>!Buenos Días {nombre}!</span>
      </div>
    </div>
  )
}

export default Principal
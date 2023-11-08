import '../../assets/css/components/TablaDatos.css'

import FilasClases from '../FilasClases/FilasClases'

function TablaDatos(props) {
  const { idioma, encabezados, contenidos, seleccionarClase, handleOpen, variable, accesoDenegado, puestoAdmin } = props

  return (
    <div className='contenedor-tabla__2'>
      <h3 className='titulos-3'>{idioma}</h3>
      <table className='tabla-alumnos'>
        <thead className='tabla-cabecera'>
          <tr>
            {
              encabezados.map((encabezado, index) => 
                <th colSpan='1' key={index}>{encabezado}</th>
              )
            }
          </tr>
        </thead>
        <tbody className='tabla-cuerpo'>
          {
            contenidos.map((contenido, index) => 
                <FilasClases
                  key={index}
                  numero={index + 1}
                  datos={contenido}
                  seleccionarClase={seleccionarClase}
                  handleOpen={handleOpen}
                  variable={variable}
                  accesoDenegado={accesoDenegado}
                  puestoAdmin={puestoAdmin}
                />
              )
          }
        </tbody>
      </table>
    </div>
  )
}

export default TablaDatos

import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import esLocale from '@fullcalendar/core/locales/es';

function ActividadAlumno(props) {
  const { pagosMensualidades, asistenciasEntrada, justificantesAceptados, justificantesEnEspera, justificantesRechazados } = props

  function recolectarEventos() {
    const pagos = pagosMensualidades.map(pago => {
      const objeto = {
        title: `Pago Mensualidad ${pago.idiomaPago}`,
        date: pago.fechaInternaDiaPago,
        backgroundColor: '#B21EDE'
      }

      return objeto
    })

    const asistencias = asistenciasEntrada.map(asistencia => {
      const objeto = {
        title: `Asistencia ${asistencia.idiomaAsistenciaEntrada}`,
        date: asistencia.fechaInternaAsistenciaEntrada,
        backgroundColor: '#DE7E1E'
      }

      return objeto
    })

    const justiAcep = justificantesAceptados.map(justificante => {
      const objeto = {
        title: 'Justificante Aceptado',
        date: justificante.fechaInternaJustificante,
        backgroundColor: '#DE1E81'
      }

      return objeto
    })

    const justiEspera = justificantesEnEspera.map(justificante => {
      const objeto = {
        title: 'Justificante En Espera',
        date: justificante.fechaInternaJustificante,
        backgroundColor: '#DE1E81'
      }

      return objeto
    })

    const justiRecha = justificantesRechazados.map(justificante => {
      const objeto = {
        title: 'Justificante Rechazado',
        date: justificante.fechaInternaJustificante,
        backgroundColor: '#DE1E81'
      }

      return objeto
    })

    const eventosFinal = [...pagos, ...asistencias, ...justiAcep, ...justiEspera, ...justiRecha]

    return eventosFinal
  }

  return (
    <div>
      <div className='contenedor__todo-principio'>
        <Link to={'/sistema-asistencias/panel-control/alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
      </div>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        locale={esLocale}
        initialView="dayGridMonth"
        headerToolbar={
          {
            start: '', // will normally be on the left. if RTL, will be on the right
            center: 'title',
            end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
          }
        }
        events={recolectarEventos()}
      />
    </div>
  )
}

export default ActividadAlumno
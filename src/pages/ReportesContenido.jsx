import '../assets/css/ReportesContenido.css'

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import GraficoLinea from "../components/GraficoLinea/GraficoLinea"
import ListaOpciones from "../components/ListaOpciones/ListaOpciones"
import CampoNumero from "../components/CampoNumero/CampoNumero";
import BarraBusquedaOpciones from '../components/BarraBusquedaOpciones/BarraBusquedaOpciones';

function ReportesContenido(props) {
  const { asistencias, flechaRegresar, nombreAlumno, clases, idiomasImpartidos } = props

  const [ idiomaSeleccionado, setIdiomaSeleccionado] = useState('General');
  const [ clasesFiltradasPresencial, setClasesFiltradasPresencial ] = useState(clases.filter(clase => clase.modalidadClase == 'Presencial'))
  const [ clasesFiltradasEnLinea, setClasesFiltradasEnLinea ] = useState(clases.filter(clase => clase.modalidadClase == 'En linea'))

  //Todo: Estados primera gráfica
  const [ añoPorMes, setAñoPorMes ] = useState(new Date().getFullYear())
  const [ asistenciasTotalesMes, setAsistenciasTotalesMes ] = useState([])

  const [ añoSegundoPorMes, setAñoSegundoPorMes ] = useState(new Date().getFullYear() - 1)
  const [ asistenciasTotalesSegundoMes, setAsistenciasTotalesSegundoMes ] = useState([])

  //Todo: Estados segunda gráfica
  const [ añoPorClase, setAñoPorClase ] = useState(new Date().getFullYear())
  const [ mesPorClase, setMesPorClase ] = useState(calcularMesPorNumero(new Date().getMonth()))
  const [ numeroMesPorClase, setNumeroMesPorClase ] = useState(calcularNumeroPorMes(mesPorClase))
  const [ asistenciasClases, setAsistenciasClases ] = useState([])

  const [ añoSegundoPorClase, setAñoSegundoPorClase ] = useState(new Date().getFullYear() - 1)
  const [ mesSegundoPorClase, setMesSegundoPorClase ] = useState(calcularMesPorNumero(new Date().getMonth()))
  const [ numeroMesSegundoPorClase, setNumeroMesSegundoPorClase ] = useState()
  const [ asistenciasSegundoClases, setAsistenciasSegundoClases ] = useState([])

  //Todo: Estados tercera gráfica
  const [ añoPorclaseEnLinea, setAñoPorClaseEnLinea ] = useState(new Date().getFullYear())
  const [ mesPorClaseEnLinea, setMesPorClaseEnLinea ] = useState(calcularMesPorNumero(new Date().getMonth()))
  const [ numeroMesPorClaseEnLinea, setNumeroMesPorClaseEnLinea ] = useState(calcularNumeroPorMes(mesPorClaseEnLinea))
  const [ asistenciasClasesEnLinea, setAsistenciasClasesEnLInea ] = useState([])

  const [ añoSegundoPorclaseEnLinea, setAñoSegundoPorClaseEnLinea ] = useState(new Date().getFullYear() - 1)
  const [ mesSegundoPorClaseEnLinea, setMesSegundoPorClaseEnLinea ] = useState(calcularMesPorNumero(new Date().getMonth()))
  const [ numeroMesSegundoPorClaseEnLinea, setNumeroMesSegundoPorClaseEnLinea ] = useState()
  const [ asistenciasSegundoClasesEnLinea, setAsistenciasSegundoClasesEnLInea ] = useState([])
  
  let meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];

  function handleChange(event) {
    setIdiomaSeleccionado(event.target.value);
  };

  function filtrarIdioma() {
    let presenciales = []
    let enLinea = []

    if(idiomaSeleccionado == 'General') {
      setClasesFiltradasPresencial(clases.filter(clase => clase.modalidadClase == 'Presencial'))
      setClasesFiltradasEnLinea(clases.filter(clase => clase.modalidadClase == 'En linea'))

      return
    }

    else {
      for(let i = 0; i < clases.length; i++) {
        if(clases[i].idiomaClase == idiomaSeleccionado && clases[i].modalidadClase == 'Presencial') {
          presenciales.push(clases[i])
        }
      }

      for(let i = 0; i < clases.length; i++) {
        if(clases[i].idiomaClase == idiomaSeleccionado && clases[i].modalidadClase == 'En linea') {
          enLinea.push(clases[i])
        }
      }
    }

    setClasesFiltradasPresencial(presenciales)
    setClasesFiltradasEnLinea(enLinea)
  }

  function valorMes(valor) {
    setMesPorClase(valor)

    setNumeroMesPorClase(calcularNumeroPorMes(valor))
  }

  function valorMesSegundo(valor) {
    setMesSegundoPorClase(valor)

    setNumeroMesSegundoPorClase(calcularNumeroPorMes(valor))
  }

  function valorMesEnLinea(valor) {
    setMesPorClaseEnLinea(valor)

    setNumeroMesPorClaseEnLinea(calcularNumeroPorMes(valor))
  }

  function valorMesSegundoEnLinea(valor) {
    setMesSegundoPorClaseEnLinea(valor)

    setNumeroMesSegundoPorClaseEnLinea(calcularNumeroPorMes(valor))
  }

  function calcularNumeroPorMes(valor) {
    if(valor === 'Enero') return 0
    else if(valor === 'Febrero') return 1
    else if(valor === 'Marzo') return 2
    else if(valor === 'Abril') return 3
    else if(valor === 'Mayo') return 4
    else if(valor === 'Junio') return 5
    else if(valor === 'Julio') return 6
    else if(valor === 'Agosto') return 7
    else if(valor === 'Septiembre') return 8
    else if(valor === 'Octubre') return 9
    else if(valor === 'Noviembre') return 10
    else if(valor === 'Diciembre') return 11
  }

  function calcularMesPorNumero(valor) {
    if(0 === valor) return 'Enero'
    else if(1 === valor) return 'Febrero'
    else if(2 === valor) return 'Marzo'
    else if(3 === valor) return 'Abril'
    else if(4 === valor) return 'Mayo'
    else if(5 === valor) return 'Junio'
    else if(6 === valor) return 'Julio'
    else if(7 === valor) return 'Agosto'
    else if(8 === valor) return 'Septiembre'
    else if(9 === valor) return 'Octubre'
    else if(10 === valor) return 'Noviembre'
    else if(11 === valor) return 'Diciembre'
  }

  //Todo: Funciones primera Grafica
  function asistenciasPorMes() {
    let nuevosDatos = []

    if(idiomaSeleccionado == 'General') {
      for(let i = 0; i < meses.length; i++) {
        let datos = 
          asistencias.filter(
            (a) => 
            new Date(a.fechaAsistenciaEntrada).getMonth() == calcularNumeroPorMes(meses[i]) && 
            new Date(a.fechaAsistenciaEntrada).getFullYear() == añoPorMes
          )
        nuevosDatos.push(datos.length)
      }
    }

    else {
      for(let i = 0; i < meses.length; i++) {
        let datos = 
          asistencias.filter(
            (a) => 
            new Date(a.fechaAsistenciaEntrada).getMonth() == calcularNumeroPorMes(meses[i]) && 
            new Date(a.fechaAsistenciaEntrada).getFullYear() == añoPorMes && 
            a.idiomaAsistenciaEntrada == idiomaSeleccionado
          )
        nuevosDatos.push(datos.length)
      }
    }

    setAsistenciasTotalesMes(nuevosDatos)
  }

  function asistenciasSegundoPorMes() {
    let nuevosDatos = []

    if(idiomaSeleccionado == 'General') {
      for(let i = 0; i < meses.length; i++) {
        let datos = 
          asistencias.filter(
            (a) => 
            new Date(a.fechaAsistenciaEntrada).getMonth() == calcularNumeroPorMes(meses[i]) && 
            new Date(a.fechaAsistenciaEntrada).getFullYear() == añoSegundoPorMes
          )
        nuevosDatos.push(datos.length)
      }
    }

    else {
      for(let i = 0; i < meses.length; i++) {
        let datos = 
          asistencias.filter(
            (a) => 
            new Date(a.fechaAsistenciaEntrada).getMonth() == calcularNumeroPorMes(meses[i]) && 
            new Date(a.fechaAsistenciaEntrada).getFullYear() == añoSegundoPorMes &&
            a.idiomaAsistenciaEntrada == idiomaSeleccionado
          )
        nuevosDatos.push(datos.length)
      }
    }

    setAsistenciasTotalesSegundoMes(nuevosDatos)
  }

  //Todo: Funciones segunda gráfica
  function asistenciasPorClase() {
    let nuevosDatos = []

    for(let i = 0; i < clasesFiltradasPresencial.length; i++) {
      let filtrando = 
        asistencias.filter(
          (a) => 
          a.claveHorario == clasesFiltradasPresencial[i].claveClase && 
          new Date(a.fechaAsistenciaEntrada).getMonth() == numeroMesPorClase && 
          new Date(a.fechaAsistenciaEntrada).getFullYear() == añoPorClase && 
          a.modalidadClase == 'Presencial'
        )
      nuevosDatos.push(filtrando.length)
    }

    setAsistenciasClases(nuevosDatos)
  }

  function asistenciasSegundoPorClase() {
    let nuevosDatos = []

    for(let i = 0; i < clasesFiltradasPresencial.length; i++) {
      let filtrando = 
        asistencias.filter(
          (a) => 
          a.claveHorario == clasesFiltradasPresencial[i].claveClase && 
          new Date(a.fechaAsistenciaEntrada).getMonth() == numeroMesSegundoPorClase && 
          new Date(a.fechaAsistenciaEntrada).getFullYear() == añoSegundoPorClase && 
          a.modalidadClase == 'Presencial'
        )
      nuevosDatos.push(filtrando.length)
    }

    setAsistenciasSegundoClases(nuevosDatos)
  }

  //Todo: Funciones tercera gráfica
  function asistenciasPorClaseEnLinea() {
    let nuevosDatos = []

    for(let i = 0; i < clasesFiltradasEnLinea.length; i++) {
      let filtrando = 
        asistencias.filter(
          (a) => 
          a.claveHorario == clasesFiltradasEnLinea[i].claveClase && 
          new Date(a.fechaAsistenciaEntrada).getMonth() == numeroMesPorClaseEnLinea && 
          new Date(a.fechaAsistenciaEntrada).getFullYear() == añoPorclaseEnLinea && 
          a.modalidadClase == 'En linea'
        )
      nuevosDatos.push(filtrando.length)
    }

    setAsistenciasClasesEnLInea(nuevosDatos)
  }

  function asistenciasSegundoPorClaseEnLinea() {
    let nuevosDatos = []

    for(let i = 0; i < clasesFiltradasEnLinea.length; i++) {
      let filtrando = 
        asistencias.filter(
          (a) => 
          a.claveHorario == clasesFiltradasEnLinea[i].claveClase && 
          new Date(a.fechaAsistenciaEntrada).getMonth() == numeroMesSegundoPorClaseEnLinea && 
          new Date(a.fechaAsistenciaEntrada).getFullYear() == añoSegundoPorclaseEnLinea && 
          a.modalidadClase == 'En linea'
        )
      nuevosDatos.push(filtrando.length)
    }

    setAsistenciasSegundoClasesEnLInea(nuevosDatos)
  }

  function actualizarClases() {
    setClasesFiltradasPresencial(clases.filter(clase => clase.modalidadClase == 'Presencial'))
    setClasesFiltradasEnLinea(clases.filter(clase => clase.modalidadClase == 'En linea'))
  }

  //Todo: Total de asistencias por mes
  useEffect(() => {
    asistenciasPorMes()
  }, [añoPorMes, idiomaSeleccionado])

  useEffect(() => {
    asistenciasSegundoPorMes()
  }, [añoSegundoPorMes, idiomaSeleccionado])

  //Todo: Asistencias presenciales por clase de la fecha numero 1
  useEffect(() => {
    asistenciasPorClase()
  },[mesPorClase, añoPorClase, clasesFiltradasPresencial])

  //Todo: Asistencias presenciales por clase de la fecha numero 2
  useEffect(() => {
    asistenciasSegundoPorClase()
  },[mesSegundoPorClase, añoSegundoPorClase, clasesFiltradasPresencial])

  //Todo: Asistencias en linea por clase de la fecha numero 1
  useEffect(() => {
    asistenciasPorClaseEnLinea()
  },[mesPorClaseEnLinea, añoPorclaseEnLinea, clasesFiltradasEnLinea])

  //Todo: Asistencias en linea por clase de la fecha numero 2
  useEffect(() => {
    asistenciasSegundoPorClaseEnLinea()
  },[mesSegundoPorClaseEnLinea, añoSegundoPorclaseEnLinea, clasesFiltradasEnLinea])

  useEffect(() => {
    filtrarIdioma()
  }, [idiomaSeleccionado])

  useEffect(() => {
    actualizarClases()
  }, [clases])

  return ( 
    <div className='container-reportes'>
      {
        flechaRegresar 
          ? <div className='contenedor__todo-principio'>
              <Link 
                to={'/sistema-asistencias/panel-control/asistencias/alumnos'}
              >
                <FaArrowCircleLeft className='flecha-regresar icon-40' />
              </Link>
            </div>
          : <></>
      }
      {
        nombreAlumno ? <h2 className="titulos-2 titulos__verde-oscuro">Asistencias de {nombreAlumno}</h2> : <></>
      }
      <div>
        <h3 className='titulos-2'>Asistencias {idiomaSeleccionado}</h3>
        <BarraBusquedaOpciones
          titulo='Idioma'
          valor={idiomaSeleccionado}
          cambiarValor={setIdiomaSeleccionado}
          opciones={['General', ...idiomasImpartidos]}
        />
      </div>
      <div className='primera-grafica'>
        <h3 className='titulos-2'>Total de Asistencias Por Mes</h3>
        <div className='graficas__campos'>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Primera Fecha</h4>
            <div>
              <CampoNumero
                className='input-MUI__verde'
                titulo='El año'
                valor={añoPorMes}
                cambiarValor={setAñoPorMes}
              />
            </div>
          </div>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Segunda Fecha</h4>
            <div>
              <CampoNumero
                className='input-MUI__verde'
                titulo='El año'
                valor={añoSegundoPorMes}
                cambiarValor={setAñoSegundoPorMes}
              />
            </div>
          </div>
        </div>
        <GraficoLinea 
          nombresDatos={meses} 
          primerosDatos={asistenciasTotalesMes}
          segundosDatos={asistenciasTotalesSegundoMes}
          labelPrimeroDatos={`Asistencias ${añoPorMes}`}
          labelSegundosDatos={`Asistencias ${añoSegundoPorMes}`}
        />
      </div>
      <div className='segunda-grafica'>
        <h3 className='titulos-2'>Asistencias Presenciales Por Clase</h3>
        <div className='graficas__campos'>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Primera Fecha</h4>
            <div>
              <ListaOpciones 
                titulo='Mes del Año'
                placeholder='Selecciona el mes del año'
                valor={mesPorClase}
                cambiarValor={valorMes}
                opciones={meses}
                className='lista-opciones__verde-claro'
              />
              <CampoNumero
                className='input-MUI__verde'
                titulo='El año'
                valor={añoPorClase}
                cambiarValor={setAñoPorClase}
              />
            </div>
          </div>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Segunda Fecha</h4>
            <div>
              <ListaOpciones 
                titulo='Mes del Año'
                placeholder='Selecciona el mes del año'
                valor={mesSegundoPorClase}
                cambiarValor={valorMesSegundo}
                opciones={meses}
                className='lista-opciones__verde-claro'
              />
              <CampoNumero
                className='input-MUI__verde'
                titulo='El año'
                valor={añoSegundoPorClase}
                cambiarValor={setAñoSegundoPorClase}
              />
            </div>
          </div>
        </div>
        <GraficoLinea 
          titulo='Asistencias Por Clase' 
          nombresDatos={clasesFiltradasPresencial.map(clase => {if(clase.modalidadClase == 'Presencial') return clase.nombreClase}).filter(clase => clase != undefined)} 
          primerosDatos={asistenciasClases}
          segundosDatos={asistenciasSegundoClases}
          labelPrimeroDatos={`Asistencias ${mesPorClase} ${añoPorClase}`}
          labelSegundosDatos={`Asistencias ${mesSegundoPorClase} ${añoSegundoPorClase}`}
        />
      </div>
      <div className='segunda-grafica'>
        <h3 className='titulos-2'>Asistencias En Línea Por Clase</h3>
        <div className='graficas__campos'>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Primera Fecha</h4>
            <div>
              <ListaOpciones 
                titulo='Mes del Año'
                placeholder='Selecciona el mes del año'
                valor={mesPorClaseEnLinea}
                cambiarValor={valorMesEnLinea}
                opciones={meses}
                className='lista-opciones__verde-claro'
              />
              <CampoNumero
                className='input-MUI__verde'
                titulo='El año'
                valor={añoPorclaseEnLinea}
                cambiarValor={setAñoPorClaseEnLinea}
              />
            </div>
          </div>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Segunda Fecha</h4>
            <div>
              <ListaOpciones 
                titulo='Mes del Año'
                placeholder='Selecciona el mes del año'
                valor={mesSegundoPorClaseEnLinea}
                cambiarValor={valorMesSegundoEnLinea}
                opciones={meses}
                className='lista-opciones__verde-claro'
              />
              <CampoNumero
                className='input-MUI__verde'
                titulo='El año'
                valor={añoSegundoPorclaseEnLinea}
                cambiarValor={setAñoSegundoPorClaseEnLinea}
              />
            </div>
          </div>
        </div>
        <GraficoLinea 
          titulo='Asistencias Por Clase' 
          nombresDatos={clasesFiltradasEnLinea.map(clase => {if(clase.modalidadClase == 'En linea') return clase.nombreClase}).filter(clase => clase != undefined)} 
          primerosDatos={asistenciasClasesEnLinea}
          segundosDatos={asistenciasSegundoClasesEnLinea}
          labelPrimeroDatos={`Asistencias ${mesPorClaseEnLinea} ${añoPorclaseEnLinea}`}
          labelSegundosDatos={`Asistencias ${mesSegundoPorClaseEnLinea} ${añoSegundoPorclaseEnLinea}`}
        />
      </div>
    </div>
  )
}

export default ReportesContenido
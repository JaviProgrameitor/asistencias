import '../assets/css/ReportesContenido.css'

import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { FaArrowCircleLeft } from 'react-icons/fa'

import GraficoLinea from "../components/GraficoLinea/GraficoLinea"
import CampoAutocompletar from '../components/CampoAutocompletar/CampoAutocompletar'
import CampoNumero from "../components/CampoNumero/CampoNumero";

function ReportesContenido(props) {
  const { asistencias, flechaRegresar, nombreAlumno } = props

  const [ añoPorMes, setAñoPorMes ] = useState(new Date().getFullYear())
  const [ asistenciasTotalesMes, setAsistenciasTotalesMes ] = useState([])

  const [ añoSegundoPorMes, setAñoSegundoPorMes ] = useState(new Date().getFullYear() - 1)
  const [ asistenciasTotalesSegundoMes, setAsistenciasTotalesSegundoMes ] = useState([])

  const [ añoPorClase, setAñoPorClase ] = useState(new Date().getFullYear())
  const [ mesPorClase, setMesPorClase ] = useState(calcularMesPorNumero(new Date().getMonth()))
  const [ numeroMesPorClase, setNumeroMesPorClase ] = useState(calcularNumeroPorMes(mesPorClase))
  const [ asistenciasClases, setAsistenciasClases ] = useState([])

  const [ añoSegundoPorClase, setAñoSegundoPorClase ] = useState(new Date().getFullYear())
  const [ mesSegundoPorClase, setMesSegundoPorClase ] = useState("")
  const [ numeroMesSegundoPorClase, setNumeroMesSegundoPorClase ] = useState()
  const [ asistenciasSegundoClases, setAsistenciasSegundoClases ] = useState([])

  const [ añoPorclaseEnLinea, setAñoPorClaseEnLinea ] = useState(new Date().getFullYear())
  const [ mesPorClaseEnLinea, setMesPorClaseEnLinea ] = useState(calcularMesPorNumero(new Date().getMonth()))
  const [ numeroMesPorClaseEnLinea, setNumeroMesPorClaseEnLinea ] = useState(calcularNumeroPorMes(mesPorClaseEnLinea))
  const [ asistenciasClasesEnLinea, setAsistenciasClasesEnLInea ] = useState([])

  const [ añoSegundoPorclaseEnLinea, setAñoSegundoPorClaseEnLinea ] = useState(new Date().getFullYear())
  const [ mesSegundoPorClaseEnLinea, setMesSegundoPorClaseEnLinea ] = useState('')
  const [ numeroMesSegundoPorClaseEnLinea, setNumeroMesSegundoPorClaseEnLinea ] = useState()
  const [ asistenciasSegundoClasesEnLinea, setAsistenciasSegundoClasesEnLInea ] = useState([])
  
  let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  let clases = ["MatuLuMiVi200320", "VesLuMi500700", "MatuMaJu1130130", "VesMaJu500700", "Saba100400"]
  let clasesEnLinea = ['NocLuMaMiJu740915']

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

  function asistenciasPorMes() {
    const enero = asistencias.filter((a) => a.mesAsistenciaEntrada == 0 && a.añoAsistenciaEntrada == añoPorMes)
    const febrero = asistencias.filter((a) => a.mesAsistenciaEntrada == 1 && a.añoAsistenciaEntrada == añoPorMes)
    const marzo = asistencias.filter((a) => a.mesAsistenciaEntrada == 2 && a.añoAsistenciaEntrada == añoPorMes)
    const abril = asistencias.filter((a) => a.mesAsistenciaEntrada == 3 && a.añoAsistenciaEntrada == añoPorMes)
    const mayo = asistencias.filter((a) => a.mesAsistenciaEntrada == 4 && a.añoAsistenciaEntrada == añoPorMes)
    const junio = asistencias.filter((a) => a.mesAsistenciaEntrada == 5 && a.añoAsistenciaEntrada == añoPorMes)
    const julio = asistencias.filter((a) => a.mesAsistenciaEntrada == 6 && a.añoAsistenciaEntrada == añoPorMes)
    const agosto = asistencias.filter((a) => a.mesAsistenciaEntrada == 7 && a.añoAsistenciaEntrada == añoPorMes)
    const septiembre = asistencias.filter((a) => a.mesAsistenciaEntrada == 8 && a.añoAsistenciaEntrada == añoPorMes)
    const octubre = asistencias.filter((a) => a.mesAsistenciaEntrada == 9 && a.añoAsistenciaEntrada == añoPorMes)
    const noviembre = asistencias.filter((a) => a.mesAsistenciaEntrada == 10 && a.añoAsistenciaEntrada == añoPorMes)
    const diciembre = asistencias.filter((a) => a.mesAsistenciaEntrada == 11 && a.añoAsistenciaEntrada == añoPorMes)

    const nuevosDatos = [enero.length, febrero.length, marzo.length, abril.length, mayo.length, junio.length, julio.length, agosto.length, septiembre.length, octubre.length, noviembre.length, diciembre.length]
    setAsistenciasTotalesMes(nuevosDatos)
  }

  function asistenciasSegundoPorMes() {
    const enero = asistencias.filter((a) => a.mesAsistenciaEntrada == 0 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const febrero = asistencias.filter((a) => a.mesAsistenciaEntrada == 1 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const marzo = asistencias.filter((a) => a.mesAsistenciaEntrada == 2 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const abril = asistencias.filter((a) => a.mesAsistenciaEntrada == 3 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const mayo = asistencias.filter((a) => a.mesAsistenciaEntrada == 4 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const junio = asistencias.filter((a) => a.mesAsistenciaEntrada == 5 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const julio = asistencias.filter((a) => a.mesAsistenciaEntrada == 6 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const agosto = asistencias.filter((a) => a.mesAsistenciaEntrada == 7 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const septiembre = asistencias.filter((a) => a.mesAsistenciaEntrada == 8 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const octubre = asistencias.filter((a) => a.mesAsistenciaEntrada == 9 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const noviembre = asistencias.filter((a) => a.mesAsistenciaEntrada == 10 && a.añoAsistenciaEntrada == añoSegundoPorMes)
    const diciembre = asistencias.filter((a) => a.mesAsistenciaEntrada == 11 && a.añoAsistenciaEntrada == añoSegundoPorMes)

    const nuevosDatos = [enero.length, febrero.length, marzo.length, abril.length, mayo.length, junio.length, julio.length, agosto.length, septiembre.length, octubre.length, noviembre.length, diciembre.length]
    setAsistenciasTotalesSegundoMes(nuevosDatos)
  }

  function asistenciasPorClase() {
    const MatuLuMiVi200320 = asistencias.filter((a) => a.claveHorario == 'MatuLuMiVi200320' && a.mesAsistenciaEntrada == numeroMesPorClase && a.añoAsistenciaEntrada == añoPorClase && a.modalidadClase == 'Presencial')
    const VesLuMi500700 = asistencias.filter((a) => a.claveHorario == 'VesLuMi500700' && a.mesAsistenciaEntrada == numeroMesPorClase && a.añoAsistenciaEntrada == añoPorClase && a.modalidadClase == 'Presencial')
    const MatuMaJu1130130 = asistencias.filter((a) => a.claveHorario == 'MatuMaJu1130130' && a.mesAsistenciaEntrada == numeroMesPorClase && a.añoAsistenciaEntrada == añoPorClase && a.modalidadClase == 'Presencial')
    const VesMaJu500700 = asistencias.filter((a) => a.claveHorario == 'VesMaJu500700' && a.mesAsistenciaEntrada == numeroMesPorClase && a.añoAsistenciaEntrada == añoPorClase && a.modalidadClase == 'Presencial')
    const Saba100400 = asistencias.filter((a) => a.claveHorario == 'Saba100400' && a.mesAsistenciaEntrada == numeroMesPorClase && a.añoAsistenciaEntrada == añoPorClase && a.modalidadClase == 'Presencial')

    const nuevosDatos = [MatuLuMiVi200320.length, VesLuMi500700.length, MatuMaJu1130130.length, VesMaJu500700.length, Saba100400.length]
    setAsistenciasClases(nuevosDatos)
  }

  function asistenciasSegundoPorClase() {
    const MatuLuMiVi200320 = asistencias.filter((a) => a.claveHorario == 'MatuLuMiVi200320' && a.mesAsistenciaEntrada == numeroMesSegundoPorClase && a.añoAsistenciaEntrada == añoSegundoPorClase && a.modalidadClase == 'Presencial')
    const VesLuMi500700 = asistencias.filter((a) => a.claveHorario == 'VesLuMi500700' && a.mesAsistenciaEntrada == numeroMesSegundoPorClase && a.añoAsistenciaEntrada == añoSegundoPorClase && a.modalidadClase == 'Presencial')
    const MatuMaJu1130130 = asistencias.filter((a) => a.claveHorario == 'MatuMaJu1130130' && a.mesAsistenciaEntrada == numeroMesSegundoPorClase && a.añoAsistenciaEntrada == añoSegundoPorClase && a.modalidadClase == 'Presencial')
    const VesMaJu500700 = asistencias.filter((a) => a.claveHorario == 'VesMaJu500700' && a.mesAsistenciaEntrada == numeroMesSegundoPorClase && a.añoAsistenciaEntrada == añoSegundoPorClase && a.modalidadClase == 'Presencial')
    const Saba100400 = asistencias.filter((a) => a.claveHorario == 'Saba100400' && a.mesAsistenciaEntrada == numeroMesSegundoPorClase && a.añoAsistenciaEntrada == añoSegundoPorClase && a.modalidadClase == 'Presencial')

    const nuevosDatos = [MatuLuMiVi200320.length, VesLuMi500700.length, MatuMaJu1130130.length, VesMaJu500700.length, Saba100400.length]
    setAsistenciasSegundoClases(nuevosDatos)
  }

  function asistenciasPorClaseEnLinea() {
    const NocLuMaMiJu740915 = asistencias.filter((a) => a.claveHorario == 'NocLuMaMiJu740915' && a.mesAsistenciaEntrada == numeroMesPorClaseEnLinea && a.añoAsistenciaEntrada == añoPorclaseEnLinea && a.modalidadClase == 'En linea')

    const nuevosDatos = [NocLuMaMiJu740915.length]
    setAsistenciasClasesEnLInea(nuevosDatos)
  }

  function asistenciasSegundoPorClaseEnLinea() {
    const NocLuMaMiJu740915 = asistencias.filter((a) => a.claveHorario == 'NocLuMaMiJu740915' && a.mesAsistenciaEntrada == numeroMesSegundoPorClaseEnLinea && a.añoAsistenciaEntrada == añoSegundoPorclaseEnLinea && a.modalidadClase == 'En linea')

    const nuevosDatos = [NocLuMaMiJu740915.length]
    setAsistenciasClasesEnLInea(nuevosDatos)
  }

  //Todo: Total de asistencias por mes
  useEffect(() => {
    asistenciasPorMes()
  }, [añoPorMes])

  useEffect(() => {
    asistenciasSegundoPorMes()
  }, [añoSegundoPorMes])

  //Todo: Asistencias presenciales por clase numero 1 de la fecha numero 1
  useEffect(() => {
    asistenciasPorClase()
  },[mesPorClase])

  useEffect(() => {
    asistenciasPorClase()
  },[añoPorClase])

  //Todo: Asistencias presenciales por clase numero 1 de la fecha numero 2
  useEffect(() => {
    asistenciasSegundoPorClase()
  },[mesSegundoPorClase])

  useEffect(() => {
    asistenciasSegundoPorClase()
  },[añoSegundoPorClase])

  //Todo: Asistencias en linea por clase numero 1 de la fecha numero 1
  useEffect(() => {
    asistenciasPorClaseEnLinea()
  },[mesPorClaseEnLinea])

  useEffect(() => {
    asistenciasPorClaseEnLinea()
  },[añoPorclaseEnLinea])

  //Todo: Asistencias en linea por clase numero 1 de la fecha numero 2
  useEffect(() => {
    asistenciasSegundoPorClaseEnLinea()
  },[mesSegundoPorClaseEnLinea])

  useEffect(() => {
    asistenciasSegundoPorClaseEnLinea()
  },[añoSegundoPorclaseEnLinea])

  return ( 
    <div className='container-reportes'>
      {
        flechaRegresar ? <div className='contenedor__todo-principio'>
          <Link to={'/panel-control/asistencias/alumnos'}><FaArrowCircleLeft className='flecha-regresar icon-40' /></Link>
          </div>
        : <></>
      }
      {
        nombreAlumno ? <h2 className="titulos-2 titulos__verde-oscuro">Asistencias de {nombreAlumno}</h2> : <></>
      }
      <div className='primera-grafica'>
        <h3 className='titulos-2'>Total de Asistencias Por Mes</h3>
        <div className='graficas__campos'>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Primera Fecha</h4>
            <div>
              <CampoNumero
                titulo='Selecciona el año'
                valor={añoPorMes}
                cambiarValor={setAñoPorMes}
              />
            </div>
          </div>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Primera Fecha</h4>
            <div>
              <CampoNumero
                titulo='Selecciona el año'
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
              <CampoAutocompletar
                titulo='Mes del Año'
                placeholder='Selecciona el mes del año'
                opciones={meses}
                valor={mesPorClase}
                cambiarValor={valorMes}
              />
              <CampoNumero
                titulo='Selecciona el mes del año'
                valor={añoPorClase}
                cambiarValor={setAñoPorClase}
              />
            </div>
          </div>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Segunda Fecha</h4>
            <div>
              <CampoAutocompletar
                titulo='Mes del Año'
                placeholder='Selecciona el mes del año'
                opciones={meses}
                valor={mesSegundoPorClase}
                cambiarValor={valorMesSegundo}
              />
              <CampoNumero
                titulo='Selecciona el mes del año'
                valor={añoSegundoPorClase}
                cambiarValor={setAñoSegundoPorClase}
              />
            </div>
          </div>
        </div>
        <GraficoLinea 
          titulo='Asistencias Por Clase' 
          nombresDatos={clases} 
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
              <CampoAutocompletar
                titulo='Mes del Año'
                placeholder='Selecciona el mes del año'
                opciones={meses}
                valor={mesPorClaseEnLinea}
                cambiarValor={valorMesEnLinea}
              />
              <CampoNumero
                titulo='Selecciona el mes del año'
                valor={añoPorclaseEnLinea}
                cambiarValor={setAñoPorClaseEnLinea}
              />
            </div>
          </div>
          <div className='campos-grafica'>
            <h4 className='titulos-3'>Segunda Fecha</h4>
            <div>
              <CampoAutocompletar
                titulo='Mes del Año'
                placeholder='Selecciona el mes del año'
                opciones={meses}
                valor={mesSegundoPorClaseEnLinea}
                cambiarValor={valorMesSegundoEnLinea}
              />
              <CampoNumero
                titulo='Selecciona el mes del año'
                valor={añoSegundoPorclaseEnLinea}
                cambiarValor={setAñoSegundoPorClaseEnLinea}
              />
            </div>
          </div>
        </div>
        <GraficoLinea 
          titulo='Asistencias Por Clase' 
          nombresDatos={clasesEnLinea} 
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
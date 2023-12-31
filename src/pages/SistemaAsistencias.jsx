import { useState, useEffect } from 'react';

import Inicio from './Inicio'
import Page404 from './Page404'
import PanelControl from './PanelControl';
import Usuario from './Usuario';
import ScannerAlumno from './ScannerAlumno';
import ScannerEnLinea from './ScannerEnLinea'
import AdministrarQR from './AdministrarQR';

import { initializeApp } from "firebase/app";
import { collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import firebaseConfig from '../firebase';

import { Routes, Route } from 'react-router-dom'

function SistemaAsistencias(props) {
  const [ admin, setAdmin ] = useState(false)
  const [ usuario, setUsuario ] = useState(false)
  const [ scannerAlumno, setScannerAlumno ] = useState()
  const [ scannerClase, setScannerClase ] = useState()

  const [ alumnos, setAlumnos ] = useState([])
  const [ alumnosCompleto, setAlumnosCompleto ] = useState([])
  const [ administradores, setAdministradores ] = useState([])
  const [ asistenciasEntrada, setAsistenciasEntrada ] = useState([])
  const [ clases, setClases ] = useState([])
  const [ pagosMensualidades, setPagosMensualidades ] = useState([])

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);

  const diasMeses = {
    "Enero" : 31,
    "Febrero" : 28,
    "FebreroBisiesto" : 29,
    "Marzo" : 31,
    "Abril" : 30,
    "Mayo" : 31,
    "Junio" : 30,
    "Julio" : 31,
    "Agosto" : 31,
    "Septiembre" : 30,
    "Octubre" : 31,
    "Noviembre" : 30,
    "Diciembre" : 31
  }
  const diaMilisegundos = 86400000;
  const coloresAlumno = {
    colorFondoCercaPago: 'cerca-pago',
    colorFondoPago: 'dia-pago',
    colorFondoDeuda: 'deudas',
    colorFondoSinDeudas: 'sin-deudas'
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

  function calcularFinMensualidad(tipoRespuesta, fecha, mes, año) {
    let mesFinal;
    let añoFinal;
    let fechaFinal;

    if(12 == (mes + 1)) {
      mesFinal = 'Enero'
      añoFinal = año + 1;

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(1 == (mes + 1)) {
      mesFinal = 'Febrero'
      añoFinal = año

      if(año % 4 == 0) {
        if(parseInt(fecha) > diasMeses["FebreroBisiesto"]) fechaFinal = diasMeses["FebreroBisiesto"]
        else fechaFinal = fecha
      }

      else {
        if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
        else fechaFinal = fecha
      }
    }

    else if(2 == (mes + 1)) {
      mesFinal = 'Marzo'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(3 == (mes + 1)) {
      mesFinal = 'Abril'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(4 == (mes + 1)) {
      mesFinal = 'Mayo'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(5 == (mes + 1)) {
      mesFinal = 'Junio'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(6 == (mes + 1)) {
      mesFinal = 'Julio'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(7 == (mes + 1)) {
      mesFinal = 'Agosto'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    
    else if(8 == (mes + 1)) {
      mesFinal = 'Septiembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(9 == (mes + 1)) {
      mesFinal = 'Octubre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(10 == (mes + 1)) {
      mesFinal = 'Noviembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(11 == (mes + 1)) {
      mesFinal = 'Diciembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    if(tipoRespuesta == "string") return `${fechaFinal}/${mesFinal}/${añoFinal}`
    else if(tipoRespuesta == "objeto") return [fechaFinal, calcularNumeroPorMes(mesFinal), añoFinal]
  }

  function calcularAnteriorMensualidad(tipoRespuesta, fecha, mes, año) {
    let mesFinal;
    let añoFinal;
    let fechaFinal;

    if(0 == (mes - 1)) {
      mesFinal = 'Enero'
      añoFinal = año;

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(1 == (mes - 1)) {
      mesFinal = 'Febrero'
      añoFinal = año

      if(año % 4 == 0) {
        if(parseInt(fecha) > diasMeses["FebreroBisiesto"]) fechaFinal = diasMeses["FebreroBisiesto"]
        else fechaFinal = fecha
      }

      else {
        if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
        else fechaFinal = fecha
      }
    }

    else if(2 == (mes - 1)) {
      mesFinal = 'Marzo'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(3 == (mes - 1)) {
      mesFinal = 'Abril'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(4 == (mes - 1)) {
      mesFinal = 'Mayo'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(5 == (mes - 1)) {
      mesFinal = 'Junio'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    else if(6 == (mes - 1)) {
      mesFinal = 'Julio'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(7 == (mes - 1)) {
      mesFinal = 'Agosto'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }
    
    else if(8 == (mes - 1)) {
      mesFinal = 'Septiembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(9 == (mes - 1)) {
      mesFinal = 'Octubre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(10 == (mes - 1)) {
      mesFinal = 'Noviembre'
      añoFinal = año

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    else if(-1 == (mes - 1)) {
      mesFinal = 'Diciembre'
      añoFinal = año - 1

      if(parseInt(fecha) > diasMeses[mesFinal]) fechaFinal = diasMeses[mesFinal]
      else fechaFinal = fecha
    }

    if(tipoRespuesta == "string") return `${fechaFinal}/${mesFinal}/${añoFinal}`
    else if(tipoRespuesta == "objeto") return [fechaFinal, calcularNumeroPorMes(mesFinal), añoFinal]
  }

  function comprobarMensualidad(idioma, idiomaFecha, claveEstudiante) {
    const date = new Date()
    const año = date.getFullYear()
    const mes = date.getMonth()
    const fecha = date.getDate()

    const [ fechaAnterior, mesAnterior, añoAnterior ] = calcularAnteriorMensualidad("objeto", idiomaFecha, mes, año)
    const [ fechaProximo, mesProximo, añoProximo ] = calcularFinMensualidad("objeto", idiomaFecha, mes, año)

    const pagoAnterior = 
      pagosMensualidades.filter(
        pago => 
        new Date(pago.finalMensualidad).getFullYear() == año && 
        new Date(pago.finalMensualidad).getMonth() == mes && 
        pago.idiomaPago == idioma && 
        pago.claveEstudiantePago == claveEstudiante
      )
    const pago = 
      pagosMensualidades.filter(
        pago => 
        new Date(pago.inicioMensualidad).getFullYear() == año && 
        new Date(pago.inicioMensualidad).getMonth() == mes && 
        pago.idiomaPago == idioma && 
        pago.claveEstudiantePago == claveEstudiante
      )
    const pagoProximo = 
      pagosMensualidades.filter(
        pago => 
        new Date(pago.inicioMensualidad).getFullYear() == añoProximo && 
        new Date(pago.inicioMensualidad).getMonth() == mesProximo && 
        pago.idiomaPago == idioma && 
        pago.claveEstudiantePago == claveEstudiante
      )

    //console.log(pagoAnterior, pago, pagoProximo)

    if(pagoAnterior.length <= 0) {
      const hoyMili = new Date(`${mes + 1} ${fecha}, ${año}`)
      const pagoMili = new Date(`${mesAnterior + 1} ${fechaAnterior}, ${añoAnterior}`)
      const resto = Math.round((hoyMili - pagoMili) / diaMilisegundos)

      return `Retraso de ${resto} días`

    }

    else if(pago.length > 0) {
      if(pagoProximo.length > 0) {
        return "Sin deudas"
      }
      
      else {
        const hoyMili = new Date(`${mes + 1} ${fecha}, ${año}`)
        const pagoMili = new Date(`${mesProximo + 1} ${fechaProximo}, ${añoProximo}`)
        const resto = Math.round((pagoMili - hoyMili) / diaMilisegundos)

        if(resto <= 7) {
          return `Faltan ${resto} días`
        }

        return "Sin Deudas"
      }
    }

    else {
      const hoyMili = new Date(`${mes + 1} ${fecha}, ${año}`)
      const pagoMili = new Date(`${mes + 1} ${idiomaFecha}, ${año}`)

      if(idiomaFecha == fecha) {
        return "Día de Pago"
      }

      else if(pagoMili > hoyMili) {
        const resto = Math.round((pagoMili - hoyMili) / diaMilisegundos)

        if(resto <= 7) {
          return `Faltan ${resto} días`
        }

        return "Sin Deudas"
      }

      else {
        const resto = Math.round((hoyMili - pagoMili) / diaMilisegundos)

        return `Retraso de ${resto} días`
      }
    }
  }

  function asignarClaseMensualidad(estado) {
    if(estado.includes('Retraso')) return coloresAlumno.colorFondoDeuda
    else if(estado.includes('Día de Pago')) return coloresAlumno.colorFondoPago
    else if(estado.includes('Faltan')) return coloresAlumno.colorFondoCercaPago
    else if(estado.includes('Sin Deudas')) return coloresAlumno.colorFondoSinDeudas
  }

  function nuevosAlumnos() {
    let alumnosCopia = [...alumnos]
    let nuevos = alumnosCopia.map((alumno,index) => {
      let estadoMensualidad = []
      let clasesMensualidad = []
      for(let i = 0; i < alumno.idiomaAprendizaje.length; i++) {
        estadoMensualidad.push(comprobarMensualidad(alumno.idiomaAprendizaje[i], alumno.fechaPago[i], alumno.claveEstudiante))
        clasesMensualidad.push(asignarClaseMensualidad(estadoMensualidad[i]))
      }

      return {...alumno, estadoMensualidad, clasesMensualidad}
    })

    setAlumnosCompleto(nuevos)
  }

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => {
      const collectionRef = collection(db, 'asistenciasEntrada')
      const q = query(collectionRef, orderBy('fechaAsistenciaEntrada', 'desc'))

      onSnapshot(q,(snapshot) => 
        setAsistenciasEntrada(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      )
    },[db]
  )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => 
      onSnapshot(collection(db, 'clases'),(snapshot) => 
        setClases(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      ),
      [db]
  )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => {
      const collectionRef = collection(db, 'alumnos')
      const q = query(collectionRef, orderBy('nombre', 'asc'))

      onSnapshot(q,(snapshot) => 
        setAlumnos(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      )
    },[db]
  )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => {
      const collectionRef = collection(db, 'administradores')
      const q = query(collectionRef, orderBy('nombre', 'asc'))

      onSnapshot(q,(snapshot) => 
        setAdministradores(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      )
    },[db]
  )

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => {
      const collectionRef = collection(db, 'pagosMensualidades')
      const q = query(collectionRef, orderBy('inicioMensualidad', 'desc'))

      onSnapshot(q,(snapshot) => 
        setPagosMensualidades(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      )
    },
      [db]
  )

  useEffect(() => {
    nuevosAlumnos()
  }, [pagosMensualidades, alumnos])

  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <Inicio
            alumnos={alumnos}
            clases={clases.filter(clase => clase.modalidadClase == 'Presencial')}
            administradores={administradores}
            setAdmin={setAdmin} 
            admin={admin} 
            setUsuario={setUsuario} 
            usuario={usuario}
            setScannerAlumno={setScannerAlumno}
            setScannerClase={setScannerClase}
          />
        } 
      />
      <Route 
        path='/panel-control/*' 
        element={
          <PanelControl 
            admin={admin} 
            setAdmin={setAdmin}
            alumnos={alumnosCompleto}
            administradores={administradores}
            clases={clases}
            asistenciasEntrada={asistenciasEntrada}
            pagosMensualidades={pagosMensualidades}
          />
        } 
      />
      <Route 
        path='/perfil-alumno/*' 
        element={
          <Usuario 
            datos={usuario} 
            setUsuario={setUsuario} 
            asistenciasEntrada={asistenciasEntrada}
            pagosMensualidades={pagosMensualidades}
          />
        } 
      />
      <Route 
        path='/scanner-en-linea' 
        element={
          <ScannerEnLinea 
            alumnos={alumnos}
            clases={clases.filter(clase => clase.modalidadClase == 'En linea')}
            setScannerAlumno={setScannerAlumno}
            setScannerClase={setScannerClase}
          />
        } 
      /> 
      <Route 
        path='/scanner-alumno' 
        element={
          <ScannerAlumno 
            asistenciasEntrada={asistenciasEntrada}
            scannerAlumno={scannerAlumno} 
            setScannerAlumno={setScannerAlumno}
            clases={clases}
            pagosMensualidades={pagosMensualidades}
            scannerClase={scannerClase}
            setScannerClase={setScannerClase}
          />
        }
      />
      <Route
        path='/administrar-qr'
        element={<AdministrarQR />}
      />
      <Route 
        path='*' 
        element={
          <Page404 />
        }
      />
    </Routes>
  )
}

export default SistemaAsistencias
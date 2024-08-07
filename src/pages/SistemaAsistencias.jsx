import { useState, useEffect } from 'react';

import Inicio from './Inicio'
import Page404 from './Page404'
import PanelControl from './PanelControl';
import Usuario from './Usuario';
import ScannerAlumno from './ScannerAlumno';
import ScannerEnLinea from './ScannerEnLinea'
import AdministrarQR from './AdministrarQR';
import AccionesCuenta from './AccionesCuenta';

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db, observadorAuth } from '../firebase';

import { coloresAlumno, calcularFinMensualidad, calcularAnteriorMensualidad } from '../utils/functions/mensualidades';
import { diaMilisegundos, diasMeses, calcularMesPorNumero } from '../utils/functions/fechas';

import { Routes, Route } from 'react-router-dom'

function SistemaAsistencias() {
  const [ admin, setAdmin ] = useState(false)
  const [ observadorUsuario, setObservadorUsuario ] = useState(false)
  const [ idUsuario, setIdUsuario ] = useState(false)
  const [ scannerAlumno, setScannerAlumno ] = useState()
  const [ scannerClase, setScannerClase ] = useState()

  const [ alumnos, setAlumnos ] = useState([])
  const [ alumnosCompleto, setAlumnosCompleto ] = useState([])
  const [ administradores, setAdministradores ] = useState([])
  const [ asistenciasEntrada, setAsistenciasEntrada ] = useState([])
  const [ clases, setClases ] = useState([])
  const [ pagosMensualidades, setPagosMensualidades ] = useState([])
  const [ pagosMensualidadesCompleto, setPagosMensualidadesCompleto ] = useState([])
  const [ alumnosEliminados, setAlumnosEliminados ] = useState([])

  function comprobarMensualidad(idioma, idiomaFecha, fechaIngreso, idAlumno) {
    //Variables generales
    const cantidadDiasProximoPago = 3

    //Variables del día actual
    const date = new Date()
    const año = date.getFullYear()
    const mes = date.getMonth()
    const fecha = date.getDate()
    const hoyMili = new Date(`${mes + 1}/${fecha}/${año}`)

    //Variables de la fecha de este mes
    const mesActualNombre = calcularMesPorNumero(mes)
    const fechaPagoMes = diasMeses[mesActualNombre] >= idiomaFecha ? idiomaFecha : diasMeses[mesActualNombre]

    //Variables fecha de ingreso
    const fechaIngresoMilisegundos = new Date(fechaIngreso).getTime() + diaMilisegundos

    //Variables de la fecha de la mensualidad anterior
    const [ fechaAnterior, mesAnterior, añoAnterior ] = calcularAnteriorMensualidad("objeto", idiomaFecha, (mes + 1), año)

    //Variables de la próxima fecha de la mensualidad
    const [ fechaProximo, mesProximo, añoProximo ] = calcularFinMensualidad("objeto", idiomaFecha, (mes + 1), año)

    //Pagos del alumno
    const pagoAnterior = 
      pagosMensualidades.filter(
        pago => 
        new Date(pago.finalMensualidad).getFullYear() == año && 
        new Date(pago.finalMensualidad).getMonth() == mes && 
        pago.idiomaPago == idioma && 
        pago.idPropietario == idAlumno
      )
    const pago = 
      pagosMensualidades.filter(
        pago => 
        new Date(pago.inicioMensualidad).getFullYear() == año && 
        new Date(pago.inicioMensualidad).getMonth() == mes && 
        pago.idiomaPago == idioma && 
        pago.idPropietario == idAlumno
      )
    const pagoProximo = 
      pagosMensualidades.filter(
        pago => 
        new Date(pago.inicioMensualidad).getFullYear() == añoProximo && 
        new Date(pago.inicioMensualidad).getMonth() == mesProximo && 
        pago.idiomaPago == idioma && 
        pago.idPropietario == idAlumno
      )

    //Comprobar pago del mes anterior
    let anterior = new Date(`${mesAnterior + 1}/${fechaAnterior}/${añoAnterior}`).getTime()
    let proximo = new Date(`${mesProximo + 1}/${fechaProximo}/${añoProximo}`).getTime()

    if(pagoAnterior.length <= 0 && anterior > fechaIngresoMilisegundos) {
      const pagoMili = new Date(anterior).getTime()
      const resto = Math.round((hoyMili - pagoMili) / diaMilisegundos)

      return `Retraso de ${resto} días`

    }

    else if(pago.length > 0) {
      if(pagoProximo.length > 0) {
        return "Sin deudas"
      }
      
      else {
        const pagoMili = new Date(proximo).getTime()
        const resto = Math.round((pagoMili - hoyMili) / diaMilisegundos)

        if(resto <= cantidadDiasProximoPago) {
          return `Faltan ${resto} días`
        }

        return "Sin Deudas"
      }
    }

    else {
      const pagoMili = new Date(`${mes + 1}/${fechaPagoMes}/${año}`).getTime()

      if(fechaPagoMes == fecha) {
        return "Día de Pago"
      }

      else if(pagoMili > hoyMili) {
        const resto = Math.round((pagoMili - hoyMili) / diaMilisegundos)

        if(resto <= cantidadDiasProximoPago) {
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
        estadoMensualidad.push(comprobarMensualidad(alumno.idiomaAprendizaje[i], alumno.fechaPago[i], alumno.fechaIngreso[i], alumno.id))
        clasesMensualidad.push(asignarClaseMensualidad(estadoMensualidad[i]))
      }

      return {...alumno, estadoMensualidad, clasesMensualidad}
    })

    setAlumnosCompleto(nuevos)
  }

  function similitud(arrayElementos) {
    const nuevaArray = []
    arrayElementos.map(elemento => {
      const alumnoEncontrado = alumnos.find(alumno => alumno.id === elemento.idPropietario)
      //if(alumnoEncontrado !== undefined) console.log(elemento)
      if(alumnoEncontrado !== undefined) 
      {nuevaArray.push(
        {
          ...elemento, 
          nombre: alumnoEncontrado.nombre, 
          apellido: alumnoEncontrado.apellido, 
          claveEstudiante: alumnoEncontrado.claveEstudiante
        }
      )}
    })

    return nuevaArray
  }

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => {
      const collectionRef = collection(db, 'asistencias')
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

  //Todo: Función para leer los datos de la base de datos
  useEffect(
    () => {
      const collectionRef = collection(db, 'alumnosEliminados')
      const q = query(collectionRef, orderBy('nombre', 'asc'))

      onSnapshot(q,(snapshot) => 
        setAlumnosEliminados(snapshot.docs.map((doc) => ({...doc.data(), id: doc.id})))
      )
    },[db]
  )

  useEffect(() => {
    nuevosAlumnos()
    setPagosMensualidadesCompleto(similitud(pagosMensualidades))
  }, [pagosMensualidades, alumnos])

  return (
    <Routes>
      <Route 
        path='/' 
        element={
          <Inicio
            alumnos={alumnosCompleto}
            clases={clases.filter(clase => clase.modalidadClase == 'Presencial')}
            administradores={administradores}
            setAdmin={setAdmin} 
            admin={admin} 
            setIdUsuario={setIdUsuario} 
            idUsuario={idUsuario}
            setScannerAlumno={setScannerAlumno}
            setScannerClase={setScannerClase}
          />
        } 
      />
      <Route 
        path='/panel-control/*' 
        element={
          <PanelControl 
            admin={admin === false ? false : administradores.filter(administrador => administrador.id == admin)}
            setAdmin={setAdmin}
            alumnos={alumnosCompleto}
            administradores={administradores}
            clases={clases}
            asistenciasEntrada={asistenciasEntrada}
            pagosMensualidades={pagosMensualidadesCompleto}
            alumnosEliminados={alumnosEliminados}
          />
        } 
      />
      <Route 
        path='/perfil-alumno/*' 
        element={
          <Usuario 
            datos={idUsuario === false ? false : alumnosCompleto.filter(alumno => alumno.id == idUsuario)} 
            setUsuario={setIdUsuario} 
            asistenciasEntrada={asistenciasEntrada}
            pagosMensualidades={pagosMensualidadesCompleto}
          />
        } 
      />
      <Route 
        path='/scanner-en-linea' 
        element={
          <ScannerEnLinea 
            alumnos={alumnosCompleto}
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
            pagosMensualidades={pagosMensualidadesCompleto}
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
        path='/cuenta/*'
        element={<AccionesCuenta />}
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
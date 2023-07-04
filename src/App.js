import { useState, useEffect } from 'react';
import './assets/css/base/base.css'

import Home from './pages/Home'
import Page404 from './pages/Page404'
import PanelControl from './pages/PanelControl';
import Usuario from './pages/Usuario';
import ScannerAlumno from './pages/ScannerAlumno';
// import ScannerEnLinea from './pages/ScannerEnLinea'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const [ admin, setAdmin ] = useState(false)
  const [ usuario, setUsuario ] = useState(false)
  const [ infoScanner, setInfoScanner ] = useState()
  const [ scannerAlumno, setScannerAlumno ] = useState()

  function dia() {
    const fecha = new Date()
    console.log(fecha.getFullYear())//Saber el año
    console.log(fecha.getMonth())//Saber el mes
    console.log(fecha.getDate())//Saber la fecha
    console.log(fecha.getHours())//Saber la hora
    console.log(fecha.getMinutes())//Saber los minutos
    console.log(fecha.getDay())//Saber el día de la semana
    console.log(`${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDate()}`)
    console.log(`${fecha.getHours()}:${fecha.getMinutes()}`)
  }

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home setAdmin={setAdmin} admin={admin} setUsuario={setUsuario} usuario={usuario} infoScanner={infoScanner} setInfoScanner={setInfoScanner} scannerAlumno={scannerAlumno} setScannerAlumno={setScannerAlumno} />} />
          <Route path='/panel-control/*' element={<PanelControl admin={admin} setAdmin={setAdmin} />} />
          <Route path='/perfil-alumno/*' element={<Usuario datos={usuario} setUsuario={setUsuario} />} />
          {/* <Route path='/scanner-en-linea' element={<ScannerEnLinea scannerAlumno={scannerAlumno} setScannerAlumno={setScannerAlumno} infoScanner={infoScanner} setInfoScanner={setInfoScanner} />} /> */}
          <Route path='/scanner-alumno' element={<ScannerAlumno infoScanner={infoScanner} setInfoScanner={setInfoScanner} scannerAlumno={scannerAlumno} setScannerAlumno={setScannerAlumno} />}/>
          <Route path='*' element={<Page404 />}/>
        </Routes>
    </Router>
    </div>
  );
}

export default App;

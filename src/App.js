import './assets/css/base/base.css'

import Home from './pages/Home'
import SistemaAsistencias from './pages/SistemaAsistencias'
import Page404 from './pages/Page404'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route 
            path='/' 
            element={<Home />} 
          />
          <Route 
            path='/sistema-asistencias/*' 
            element={<SistemaAsistencias />} 
          />
          <Route 
            path='*' 
            element={
              <Page404 />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

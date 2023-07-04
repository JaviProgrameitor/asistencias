import '../assets/css/Page404.css'

import { Link } from 'react-router-dom'

function Page404() {
  return (
    <section className="page_404">
      <h2 className="text-center ">404</h2>
      <div className="four_zero_four_bg">
        
      </div>
        
      <div className="contant_box_404">
        <h3>OOPS!</h3>
        
        <p>Esta página no existe o no has iniciado sesión todavía!</p>
        
        <Link to={'/'} className="link_404">Ir a Página Principal</Link>
      </div>
    </section>
  )
}

export default Page404
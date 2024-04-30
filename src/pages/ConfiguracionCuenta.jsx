
import { useEffect, useState } from "react";
import NuevaContrasena from "../components/NuevaContrasena/NuevaContrasena";

function ConfiguracionCuenta(props) {

  const [ mode, setMode ] = useState('')
  const [ actionCode, setActionCode ] = useState('')

  function conseguirParametros() {
    // Supongamos que la URL es: http://ejemplo.com/?parametro1=valor1&parametro2=valor2
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    const actionCode = urlParams.get('oobCode');

    setMode(mode)
    setActionCode(actionCode)
  }

  useEffect(() => conseguirParametros(), [])

  return (
    <>
      {
        mode == 'resetPassword' && (
          <NuevaContrasena 
            actionCode={actionCode}
          />
        )
      }
    </>
  )
}

export default ConfiguracionCuenta
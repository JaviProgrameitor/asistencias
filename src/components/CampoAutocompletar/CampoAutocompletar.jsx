import '../../assets/css/components/CampoMUI.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function CampoAutocompletar(props) {
  const { className='', titulo, placeholder, opciones, valor, cambiarValor } = props

  return (
    <div className='input-MUI input-MUI__fondo-blanco'>
      <label className='titulo-autocompletar'>{titulo}</label>
      <Autocomplete
        className={`${className}`}
        disablePortal
        fullWidth
        value={valor}
        onChange={(event, newValue) => {
          cambiarValor(newValue);
        }}
        options={opciones}
        renderInput={(params) => <TextField {...params} required fullWidth placeholder={placeholder} color="success" />}
      />
    </div>
  )
}

export default CampoAutocompletar
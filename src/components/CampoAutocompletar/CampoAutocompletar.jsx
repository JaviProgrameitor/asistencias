import '../../assets/css/components/CampoAutocompletar.css'

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function CampoAutocompletar(props) {
  const { titulo, placeholder, opciones, valor, cambiarValor } = props

  return (
    <div className='container-autocompletar'>
      <label className='titulo-autocompletar'>{titulo}</label>
      <Autocomplete
        disablePortal
        fullWidth
        value={valor}
        onChange={(event, newValue) => {
          cambiarValor(newValue);
        }}
        options={opciones}
        renderInput={(params) => <TextField {...params} required fullWidth placeholder={placeholder} color='secondary' />}
      />
    </div>
  )
}

export default CampoAutocompletar
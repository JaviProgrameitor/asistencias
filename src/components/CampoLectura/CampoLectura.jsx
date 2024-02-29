
import '../../assets/css/components/CampoMUI.css'

import TextField from '@mui/material/TextField';

function CampoLectura(props) {
  const { className='', titulo, valor } = props

  return (
    <div className={`${className}`}>
      <label>{titulo}</label>
      <TextField
        id="outlined-read-only-input"
        color="success"
        fullWidth
        defaultValue={valor}
        InputProps={{
          readOnly: true,
        }}
      />
    </div>
  )
}

export default CampoLectura
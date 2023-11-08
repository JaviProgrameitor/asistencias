import '../../assets/css/components/CampoLectura.css'

import TextField from '@mui/material/TextField';

function CampoLectura(props) {
  const { titulo, valor } = props

  return (
    <div className='campo-lectura'>
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

import TextField from '@mui/material/TextField';

function CampoNumero(props) {
  const { titulo, valor, cambiarValor } = props

  return (
    <div className='container-autocompletar'>
      <label className='titulo-autocompletar'>{titulo}</label>
      <TextField
        id="outlined-number"
        color="success"
        type="number"
        fullWidth
        value={valor} 
        onChange={(e) => cambiarValor(e.target.value)}
        InputLabelProps={{
          shrink: true
        }}
      />
    </div>
  )
}

export default CampoNumero
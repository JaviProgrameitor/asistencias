import '../../assets/css/components/CampoMUI.css'
import TextField from '@mui/material/TextField';

function CampoNumero(props) {
  const { className='', titulo, valor, cambiarValor } = props

  return (
    <div className='container-autocompletar'>
      <label className='titulo-autocompletar'>{titulo}</label>
      <TextField
        className={`${className}`}
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

import TextField from '@mui/material/TextField';

function BarraBusquedaTexto(props) {
  const { titulo, placeholder, valor, cambiarValor } = props
  return (
    <TextField 
      id="filled-basic" 
      label={`${titulo}`}
      variant="filled"
      fullWidth
      color='success'
      placeholder={`${placeholder}`}
      margin='dense'
      value={valor}
      onChange={(e) => cambiarValor(e.target.value)}
    />
  )
}

export default BarraBusquedaTexto
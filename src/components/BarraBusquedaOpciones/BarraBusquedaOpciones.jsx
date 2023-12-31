import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BarraBusquedaOpciones(props) {
  const { titulo, valor, cambiarValor, opciones } = props

  return (
    <FormControl margin='dense' fullWidth variant='filled' color='success'>
      <InputLabel id="demo-simple-select-label">{titulo}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={valor}
        label="Age"
        onChange={(e) => cambiarValor(e.target.value)}
      >
        {
          opciones.map((opcion, index) => 
            <MenuItem key={index} value={`${opcion}`}>{opcion}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}

export default BarraBusquedaOpciones

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { themeAutocomplete } from '../../Themes/MuiAutocomplete'

import { ThemeProvider } from '@mui/material/styles';

function CampoAutocompletar(props) {
  const { titulo, placeholder, opciones, valor, cambiarValor, variante } = props

  return (
    <div className='campoMUI'>
      <label className='label'>{titulo}</label>
        <Autocomplete
          disablePortal
          fullWidth
          value={valor}
          onChange={(event, newValue) => {
            cambiarValor(newValue);
          }}
          options={opciones}
          renderInput={(params) => 
            <ThemeProvider 
              theme={themeAutocomplete}
            >
              <TextField 
                {...params} 
                variant={variante} 
                required 
                fullWidth 
                placeholder={placeholder} 
                aria-expanded={false}
              />
            </ThemeProvider>
          }
        />
      
    </div>
  )
}

export default CampoAutocompletar
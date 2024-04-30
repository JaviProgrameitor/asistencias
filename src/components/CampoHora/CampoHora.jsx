
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';

import { themeMobileTimePicker } from '../../Themes/MuiMobileTimePicker'
import { themeAutocomplete } from '../../Themes/MuiAutocomplete'

import { TextField } from '@mui/material';

function CampoHora({titulo, valor, cambiarValor}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='campoMUI'>
        <label>{titulo}</label>
        <ThemeProvider theme={themeMobileTimePicker}>
          <MobileTimePicker
            value={valor} 
            onChange={cambiarValor}
            slots={<TextField variant='standard' />}
          />
        </ThemeProvider>
      </div>
    </LocalizationProvider>
  )
}

export default CampoHora
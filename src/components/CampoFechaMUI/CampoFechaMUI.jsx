import '../../assets/css/components/CampoFechaMUI.css'

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { esES } from '@mui/x-date-pickers/locales';

function CampoFechaMUI({className='', valor, cambiarValor, titulo}) {

  return (
    <div>
      <span className='label-fecha'>{titulo}</span>
      <LocalizationProvider 
        dateAdapter={AdapterDayjs}
      >
        <MobileDatePicker
          className={`${className}`}
          value={valor}
          onChange={cambiarValor}
          format='DD/MM/YY'
          localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
        />
      </LocalizationProvider>
    </div>
    
  )
}

export default CampoFechaMUI
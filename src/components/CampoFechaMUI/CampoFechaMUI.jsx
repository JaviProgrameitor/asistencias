import '../../assets/css/components/CampoFechaMUI.css'

import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { esES } from '@mui/x-date-pickers/locales';

import 'dayjs/locale/es-mx';
import dayjs from 'dayjs';


function CampoFechaMUI({className='', valor, cambiarValor, titulo}) {

  dayjs.locale('es-mx');

  return (
    <div>
      <span className='label-fecha'>{titulo}</span>
      <LocalizationProvider 
        dateAdapter={AdapterDayjs}
        localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}
      >
        <MobileDatePicker
          className={`${className}`}
          value={valor}
          onChange={cambiarValor}
          format='DD/MM/YY'
        />
      </LocalizationProvider>
    </div>
    
  )
}

export default CampoFechaMUI
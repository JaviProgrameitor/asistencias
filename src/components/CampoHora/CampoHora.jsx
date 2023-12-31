import '../../assets/css/components/CampoMUI.css'

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function CampoHora({className='', titulo, valor, cambiarValor}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label={`${titulo}`}>
        <MobileTimePicker className={className} value={valor} onChange={cambiarValor} />
      </DemoItem>
    </LocalizationProvider>
  )
}

export default CampoHora
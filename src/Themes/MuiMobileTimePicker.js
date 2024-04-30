import { createTheme } from '@mui/material/styles';

export const themeMobileTimePicker = createTheme({
  typography: {
    fontFamily: [
      'Poppins'
    ]
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: 'Poppins',
          '& .MuiInput-underline:before': {
            // Estilos personalizados para la línea inferior antes de enfocar
            display: 'none'
          },
          '& .MuiInput-underline:after': {
            // Estilos personalizados para la línea inferior después de enfocar
            display: 'none'
          },
        }
      },
      variants: [
        {
          props: { variant: 'standard' },
          style: {
            height: '62px',
            boxSizing: 'border-box',
            backgroundColor: '#c3f6c0',
            fontSize: '15px',
          },
        },
      ],
    },
  },
});
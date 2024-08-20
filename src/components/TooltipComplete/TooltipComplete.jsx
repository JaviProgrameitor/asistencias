import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const TooltipStyled = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontFamily: 'Poppins, sans-serif'
  },
}));

function TooltipComplete({titulo, body}) {
  return (
    <TooltipStyled 
      title={titulo} 
      placement='top'
      TransitionComponent={Zoom}
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 15],
              },
            },
          ],
        },
      }}
    >
      {body}
    </TooltipStyled>
  )
}

export default TooltipComplete
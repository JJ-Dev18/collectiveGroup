// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, SvgIconTypeMap, Theme, Typography, useTheme } from '@mui/material';
import { FC } from 'react';
import InventoryIcon from '@mui/icons-material/Inventory';
import { OverridableComponent } from '@mui/material/OverridableComponent';

// utils
// import { fShortenNumber } from '../../../utils/formatNumber';
// components
// import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  border: '1px solid #fff'
}));

// ----------------------------------------------------------------------


type Props = {
  title : string
  total : number;
  color? : string
  sx?: object  
  Icon? : OverridableComponent<SvgIconTypeMap>
}
const AppWidgetSummary:FC<Props> = ({ title, total, Icon, color = 'primary', sx , ...other }) => {
 
  // const IconWidget = () => {
  //   return <Icon/>
  // }
  return (
    <Card
      content='dashboard'
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        // bgcolor :  theme.palette.background,/
        color: '#fff',
        fontWeight : 800,
        bgcolor: (theme:any) => theme.palette[color].light,
        ...sx,
        // cursor:'pointer'
      }}
      {...other}
    >
      <StyledIcon
       
        sx={{
          color: (theme:any) => theme.palette[color].dark,
          fontWeight : 800,
          backgroundImage: (theme:any) =>
            `linear-gradient(200deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
      {
        Icon  && <Icon  sx={{ color: (theme:any) => theme.palette[color].dark,fontSize:"24px"}}/>
      }
       {/* <InventoryIcon/> */}
      </StyledIcon>

      <Typography variant="h1">{total}</Typography>

      <Typography variant="subtitle2">
        {title}
      </Typography>
    </Card>
  );
}

export default AppWidgetSummary
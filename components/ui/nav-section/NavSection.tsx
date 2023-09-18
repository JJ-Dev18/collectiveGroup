import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { FC } from 'react';

// ----------------------------------------------------------------------
export interface Page{
  title : string
  path : string
  icon : React.ReactNode
  info? : string
}

type Props = {
  data : Page[]
}

const NavSection:FC<Props> = ({ data = [], ...other }) => {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

type PropsNavItem = {
  item : Page
}
const  NavItem:FC<PropsNavItem> = ({ item }) =>  {

  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}

export default NavSection;
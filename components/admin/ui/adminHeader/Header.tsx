// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { FC } from 'react';
// utils
import MenuIcon from '@mui/icons-material/Menu';

import { bgBlur } from '../../../../utils/cssStyles';
import AccountPopover from './AccountPopover';
import DarkModeToggle from 'fleed/components/ui/DarkModeToggle';
import Searchbar from './Searchbar';
import LanguagePopover from './LanguagePopover';
// // components
// import Iconify from '../../../components/iconify';
// //
// import Searchbar from './Searchbar';
// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import NotificationsPopover from './NotificationsPopover';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const HEADER_MOBILE = 64;

const HEADER_DESKTOP = 92;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  // ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${NAV_WIDTH + 1}px)`,
  },
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

// ----------------------------------------------------------------------



type Props ={
    onOpenNav : () => void
    logout : ()=> void
}

const Header:FC<Props> = ( { onOpenNav ,logout}) => {
  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' },
          }}
        >
          <MenuIcon  />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <LanguagePopover />
          
          {/* <NotificationsPopover />   */}
          <DarkModeToggle/>
          <AccountPopover logout={logout}/>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}

export default Header;
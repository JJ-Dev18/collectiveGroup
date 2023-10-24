import { FC, useContext, useState } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@mui/material';
import useResponsive from 'fleed/hooks/useResponsive';
import ScrollBar from '../admin/ui/scrollbar/ScrollBar';
import { Outlet } from 'react-router-dom';
import Header from '../admin/ui/adminHeader/Header';
import Image from 'next/image';
import NextLink from 'next/link';
import { AuthContext } from 'fleed/context/auth';
import FaceIcon from '@mui/icons-material/Face';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NavSection from '../admin/ui/nav-section/NavSection';
import { IUser } from 'fleed/interfaces';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
export const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard',
    icon: <DashboardIcon/>,
  },
  {
    title: 'users',
    path: '/admin/users',
    icon: <FaceIcon/>,
  },
  {
    title: 'products',
    path: '/admin/products',
    icon: <ShoppingBagIcon/>,
  },
  {
    title: 'packages',
    path: '/admin/packages',
    icon: <InventoryIcon/>,
  },
  {
    title: 'sales',
    path: '/admin/sales',
    icon: <AttachMoneyIcon/>,
  },
  
];


interface Props {
    title: string;
    children : React.ReactNode
}
const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

type PropsNav ={
    openNav: boolean
    onCloseNav : ()=> void,
    user : IUser | undefined
}

export  const Nav:FC<PropsNav> = ({ openNav, onCloseNav ,user}) => {

  const isDesktop = useResponsive('up', 'lg');
 

  const renderContent = (
    <ScrollBar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
      <NextLink href='/' passHref legacyBehavior>
          <Link>
          <Image src='/logo.svg' width={180} height={100} alt="logo" className="mr-10 text-white" priority/>
          </Link>
      </NextLink>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar  alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {user?.name}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
               {user?.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
        <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
          

       
        </Stack>
      </Box>
    </ScrollBar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

 const AdminLayout: FC<Props> = ({ children, title  }) => {

  const [openNav, setopenNav] = useState(false)  
  const { user, logout }  = useContext(AuthContext)
  
  return (
    <StyledRoot>
      <Head>
        <title>{ title }</title>
      </Head>
      <Header onOpenNav={() => setopenNav(true)} logout={logout}/>

      <Nav openNav={openNav} onCloseNav={() => setopenNav(false)} user={user}/>

      <Main>
        {children}
      </Main>
    </StyledRoot>
  )
}

export default AdminLayout;
// @mui


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------


import { Box, Fab, List,Collapse,ListItemButton,ListItemIcon,ListItemText, Paper, Container, Grid } from "@mui/material";
import Head from "next/head";
import React, { FC, useState } from "react";
import ResponsiveAppBar from "../ui/Appbar";
import Footer from "../ui/Footer";
import LanguagePopover from "../admin/ui/adminHeader/LanguagePopover";
import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FaceIcon from '@mui/icons-material/Face';
import InventoryIcon from '@mui/icons-material/Inventory';
import { useTranslation } from 'next-i18next'

interface Props {
  title?: string;
  children?: React.ReactNode;
}
const drawerWidth = 240;


const UserLayout: FC<Props> = ({ title = "User", children }) => {
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = useState(true);
  const { t } = useTranslation("common")
  const theme = useTheme();
  const router = useRouter()

  
  const menus = [
    { label: t('account.menu.profile'),path:'/user/my-account', icon : <FaceIcon/> },
    { label:  t('account.menu.purchase'), path: '/user/my-purchase',icon : <InventoryIcon/>,  },
    { label:  t('account.menu.subscription'), path: '/user/my-subscription',icon : <InventoryIcon/>,  },
    
  ];

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };
  return (
    <Box
      sx={{
        // backgroundColor:'red',
       
        backgroundImage: (t) =>
          t.palette.mode === "light" ? `url(/background.svg)` : "none",
        backgroundRepeat: "repeat",

        backgroundSize: "cover",
      }}
    >
      <Head>
        <title>{`Collective Intelligence | ${title} `}</title>
      </Head>
      <ResponsiveAppBar color="inherit" />
     
      <Fab
        
        color="secondary"
        aria-label="edit"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
        }}
      >
        <LanguagePopover/> 
      </Fab>
      <Container maxWidth="xl" sx={{ overflowX: "hidden"  }} className="my-28">
      <Grid container >
        <Grid item xs={12} md={4} sx={{ height: 'auto', width: "100%" }}>
        <List component="nav" aria-label="main mailbox folders">
        <ListItemButton onClick={()=> setOpen(!open)}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary={ t('account.menu.title')} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {
          menus.map( (menu,index) => (
          <ListItemButton key={index} sx={{ pl: 4 }} 
          selected={router.asPath === menu.path}
          onClick={(event) => {
            handleListItemClick(event, index)
            router.push(menu.path)
          } }>
            <ListItemIcon>
              {menu.icon}
            </ListItemIcon>
            <ListItemText primary={menu.label} />
          </ListItemButton>

          ))
        }
        </List>
      </Collapse>
        </List>
        </Grid>
        <Grid item xs={12} md={8}>
        <Paper component="div" variant="elevation" className="flex  flex-col"  >
            
            {children}
      
            
            </Paper>
        </Grid>
      </Grid>
    </Container>
     
      <Footer />
    </Box>
  );
};

export default UserLayout;

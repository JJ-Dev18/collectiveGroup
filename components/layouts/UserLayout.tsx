import { Box, Drawer, Fab, List,ListItem,Toolbar,Collapse,ListItemButton,ListItemIcon,ListItemText, Paper } from "@mui/material";
import Head from "next/head";
import React, { FC, useEffect, useState } from "react";
import ResponsiveAppBar from "../ui/Appbar";
import Footer from "../ui/Footer";
import { CarouselComponent } from "../ui/Carousel";
import LanguagePopover from "../admin/ui/adminHeader/LanguagePopover";
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import { useRouter } from "next/router";
import { useTheme } from "styled-components";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FaceIcon from '@mui/icons-material/Face';
import InventoryIcon from '@mui/icons-material/Inventory';
interface Props {
  title?: string;
  children?: React.ReactNode;
}
const drawerWidth = 240;


const UserLayout: FC<Props> = ({ title = "User", children }) => {
  
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const router = useRouter()

  
  const menus = [
    { label: "Profile",path:'/user/my-account', icon : <FaceIcon/> },
    { label: "My Purchase", path: '/user/my-purchase',icon : <InventoryIcon/>,  },
    
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
        <LanguagePopover />
      </Fab>
      
      <div
        
        className="flex  min-h-screen mx-auto max-w-7xl my-28 relative"
        //  style={{backgroundImage: `url(/background2.svg)`,backgroundRepeat:'no-repeat',backgroundPosition:'top',backgroundSize:'contain'}}
      >
      
        <Box flex={1}  sx={{padding : '10px'}}  >
        <List component="nav" aria-label="main mailbox folders">
        <ListItemButton onClick={()=> setOpen(!open)}>
        <ListItemIcon>
          <ManageAccountsIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {
          menus.map( (menu,index) => (
          <ListItemButton sx={{ pl: 4 }} 
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
        </Box>

        <Box  flex={3} sx={{padding:'10px'}}>
        
          <Paper component="div" variant="elevation" className="flex  flex-col " >
            
            {children}
      
            
            </Paper>
        </Box>
      </div>
      <Footer />
    </Box>
  );
};

export default UserLayout;

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import NextLink from 'next/link';
import AdbIcon from "@mui/icons-material/Adb";
import { useRouter } from "next/router";
import DarkModeToggle from "./DarkModeToggle";
import { AuthContext } from "fleed/context/auth";
import Image from "next/image";

import { Badge, Link } from '@mui/material';
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useShoppingCart } from "use-shopping-cart";
// import { AuthContext } from "@/context";

 const pages = ["Login", "Register"];
;

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { user, isLoggedIn, logout } = React.useContext(AuthContext);
  const { cartCount  } = useShoppingCart();
  const router = useRouter();

  
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = [
    { label: "My Account", action: handleCloseUserMenu },
    { label: "My Purchase", action: handleCloseUserMenu },
    { label: "Logout", action: logout },
  ];
  // const pages = [
  //   { label: "Login", action: handleCloseUserMenu },
  //   { label: "Loggout", action: handleCloseUserMenu },
  //   // { label: "Dashboard", action: handleCloseUserMenu },
  //   // { label: "Cerrar Sesion", action: logout },
  // ];

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const navegar = (page: string) => {
    router.push(`/auth/${page.toLocaleLowerCase()}`);
  };

  return (
    <AppBar position="static" color="inherit">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          
          {
            !isLoggedIn &&  <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={() => navegar(page)}>
                  <Typography textAlign="center" color="secondary">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          }
         
          <NextLink href='/' passHref legacyBehavior>
          <Link>
          <Image src='/logo.svg' width={100} height={100} alt="logo" className="mr-10 text-white" priority/>
          </Link>
          </NextLink>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } , justifyContent:'center'}}>
            {!isLoggedIn && pages.map((page) => (
              <Button
                key={page}
                onClick={() => navegar(page)}
                color="primary"
                // variant="outlined"
                sx={{ my: 2, fontWeight:'400' ,textTransform :'none'}}
              >
                {page}
              </Button>
            ))}
            
          </Box>

          <Box sx={{ flexGrow: 0, display: "flex", alignItems:'center', justifyContent:"space-between", width: isLoggedIn ? '200px' : '100px'}}>
            <DarkModeToggle />
            <NextLink href={cartCount === 0 ? '/cart/empty' : '/cart'} passHref legacyBehavior className="mr-1">
                <Link>
                <Tooltip title="View Shopping cart">
                    <IconButton>
                        <Badge badgeContent={ cartCount?.toString() } color="secondary" >
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Tooltip>
                </Link>
            </NextLink>
            {
              isLoggedIn && 
              <>
              <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp"  />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.action}>
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
              </>
            }
           
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

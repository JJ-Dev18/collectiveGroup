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
import NextLink from "next/link";
import AdbIcon from "@mui/icons-material/Adb";
import { useRouter } from "next/router";
import DarkModeToggle from "./DarkModeToggle";
import { AuthContext } from "fleed/context/auth";
import Image from "next/image";

import { Badge, Divider, Link, Popover, PropTypes } from "@mui/material";
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useShoppingCart } from "use-shopping-cart";
import { stringAvatar } from "fleed/utils/avatar";
import LanguagePopover from "../admin/ui/adminHeader/LanguagePopover";
// import { AuthContext } from "@/context";
import { useTranslation } from 'next-i18next'

const pages = ["Login", "Register"];

function ResponsiveAppBar({color = "transparent"}:{color? : PropTypes.Color | 'transparent'}) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { user, isLoggedIn, logout } = React.useContext(AuthContext);
  const { cartCount } = useShoppingCart();
  const router = useRouter();
  const { t } = useTranslation("common")

  console.log(user,"uiser")
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = [
    { label: t('menu.home'), action: () => router.push('/') },
    { label:  t('menu.account'), action: () => router.push('/user/my-account') },
    { label:  t('menu.purchase'), action:() => router.push({
      pathname : '/user/my-purchase',
    }) },
    { label:  t('menu.subscription'), action:() => router.push({
      pathname : '/user/my-subscription',
    }) },
    { label: t('menu.logout'), action: logout },
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
    <AppBar
      position="absolute"
      // sx={{ background-color: 'hsla(0,0%,100%,.11);' }}
      color={color}
      sx={{ boxShadow: "none", outline: "none",
      // backgroundColor: 'hsla(0,0%,100%,.11)',backdropFilter:'blur(50px);'
     }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {!isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "white" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                keepMounted
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                // anchorOrigin={{
                //   vertical: "bottom",
                //   horizontal: "left",
                // }}
                // transformOrigin={{
                //   vertical: "top",
                //   horizontal: "left",
                // }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={() => navegar(page)}>
                    <Typography textAlign="center" color="secondary">
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          <NextLink href="/" passHref legacyBehavior>
            <Link>
              <Image
                src="/logo.svg"
                width={180}
                height={100}
                alt="logo"
                className="mr-10 text-white"
                priority
              />
            </Link>
          </NextLink>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            {!isLoggedIn &&
              pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => navegar(page)}
                  // color="primary"
                  // variant="outlined"
                  sx={{
                    my: 2,
                    fontWeight: "700",
                    textTransform: "none",
                    color: "white",
                  }}
                >
                  {page}
                </Button>
              ))}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              width: isLoggedIn ? "200px" : "100px",
            }}
          >
           
            <DarkModeToggle />
            <NextLink
              href={cartCount === 0 ? "/cart/empty" : "/cart"}
              passHref
              legacyBehavior
              className="mr-1"
            >
              <Link>
                <Tooltip title={t('button-cart')}>
                  <IconButton>
                    <Badge
                      badgeContent={cartCount?.toString()}
                      color="secondary"
                    >
                      <ShoppingCartOutlined color="primary" />
                    </Badge>
                  </IconButton>
                </Tooltip>
              </Link>
            </NextLink>
            {isLoggedIn && (
              <>
                <Tooltip title={t('button-profile')}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    { !user?.image ? <Avatar alt="Remy Sharp"  {...stringAvatar(user?.name || 'New Client')} /> : <Avatar alt="Remy Sharp"  src={user.image}/> }
                  </IconButton>
                </Tooltip>
                <Popover
                
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  PaperProps={{
                    sx: {
                      p: 0,
                      mt: 1.5,
                      ml: 0.75,
                      width: 180,
                      '& .MuiMenuItem-root': {
                        typography: 'body2',
                        borderRadius: 0.75,
                      },
                    },
                  }}
                  onClose={handleCloseUserMenu}
                >
                  <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="subtitle2" noWrap>
                      {user?.name} - {user?.role}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      noWrap
                    >
                      {user?.email}
                    </Typography>
                  </Box>
                   <Divider sx={{ borderStyle: 'dashed' }} />
                   {
                    user?.role === 'ADMIN' && 
                    <MenuItem  onClick={() => router.push('/admin/dashboard')}>
                    <Typography textAlign="center">
                     {t('menu.dashboard')}
                    </Typography>
                  </MenuItem>
                  }
                  {settings.map((setting) => (
                    <MenuItem key={setting.label} onClick={setting.action}>
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                    
                  ))}
                 
                  
                </Popover>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

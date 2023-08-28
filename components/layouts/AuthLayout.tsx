import { FC } from 'react';
import Head from 'next/head';
import { Box, Grid, Paper } from '@mui/material';
import DarkModeToggle from '../ui/DarkModeToggle';
import Image from 'next/image';


interface Props {
    title: string;
    children : React.ReactNode
}

export const AuthLayout: FC<Props> = ({ children, title  }) => {
  return (
    <>
        <Head>
            <title>{ title }</title>
        </Head>

        <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(/bg-auth.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{display:"flex", justifyContent:'center', alignItems :'center'}}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
           
            }}
          >
            <Image src="/logo.svg"  width={200} height={200} alt='logo'/>
            {children}
          </Box>
          </Grid>

          </Grid>
    
    </>
  )
}
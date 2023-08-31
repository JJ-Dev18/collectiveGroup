import { FC } from 'react';
import Head from 'next/head';
import { Box, Grid, Paper } from '@mui/material';
import DarkModeToggle from '../ui/DarkModeToggle';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel'

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

        <Grid container component="main" >
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
           height:'100%'
          }}
        >
           <Carousel height="100vh" navButtonsAlwaysVisible={false}  duration={10} navButtonsAlwaysInvisible={true} indicators={false}> 
            <Image src="/fleet/fleet-4-1024x673.jpg"  layout='fill'
    objectFit='cover' alt='logo'/>
            
      <Image src="/fleet/fleet-5-1024x673.jpg" layout='fill'
    objectFit='cover' alt='logo'/>
    <Image src="/forklift/forklift-2-1024x673.jpg"  layout='fill'
    objectFit='cover' alt='logo'/>
      <Image src="/forklift/forklift-4-1024x673.jpg"  layout='fill'
    objectFit='cover' alt='logo'/>
    <Image src="/forklift/forklift-5-1024x673.jpg"  layout='fill'
    objectFit='cover' alt='logo'/>
    <Image src="/forklift/forklift-6-1024x673.jpg"  layout='fill'
    objectFit='cover' alt='logo'/>

            </Carousel>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{display:"flex", justifyContent:'center', alignItems :'center'}}>
          <Box
            sx={{
              my: 0,
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
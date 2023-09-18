import { Box, Grid, Typography, useTheme } from "@mui/material";
import useResponsive from "fleed/hooks/useResponsive";
import Image from "next/image";
import React from "react";
import Carousel from "react-material-ui-carousel";

export const CarouselComponent = () => {
  const theme = useTheme()
  const isPhone = useResponsive('down', 'md');

  
  return (
    <Carousel  sx={{width:'100vw',position:'relative', height: {xs:'350px',  md : '500px', lg:'700px',xl :'1000px'}, marginTop : { xs : '80px',lg :"0"}}}> 

         
           {/* <Box
         
         
         sx={{
            height:'100%',
            width:'100%',
           backgroundImage: 'url(/auth/1.webp)',
           backgroundRepeat: 'no-repeat',
           backgroundColor: (t) =>
             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       />
        
       <Box 
          sx={{
            height:'100%',
            width:'100%',
            backgroundImage: 'url(/auth/2.webp)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        /> */}
        <Image src={ (theme.palette.mode === 'light') ? '/carousel/light.jpg' : '/carousel/dark.jpg'} alt="d" fill style={{ objectFit: (isPhone) ? 'contain' : 'cover'}} />
         {/* <Box
         
         
         sx={{
          position : 'relative',
            height:'100%',
            width:'100%',
           backgroundImage: (t) =>
           t.palette.mode === 'light' ?'url(/carousel/light.jpg)': 'url(/carousel/dark.jpg)',
           backgroundRepeat: 'no-repeat',
           backgroundColor: (t) =>
             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       > */}
        {/* <Box  sx={{position:'absolute',right : {sx : '70%' , md : '50%'},bottom : '40%', width:"530px"}}>
          <Typography variant="h2" color="primary" sx={{letterSpacing:'3px'}}>TOLLINTELIGENCE COLLECTIVE INTELLIGENCE GROUP</Typography>
          <br />
          <Typography variant="h4" color="white" component="span">
            Improve</Typography>
           
           <br />
                 
        <Typography variant="h2" color="white" 
        > "Our mission is to integrate information technology with human activities to make better workplaces"</Typography>
        </Box> */}
       {/* </Box> */}
       
 
        

        
      {/* <Image
        src="/Fleet/fleet-3-1024x673.jpg"
        layout="fill"
        objectFit="cover"
        alt="logo"
      />
      <Image
        src="/Fleet/fleet-2-1024x673.jpg"
        layout="fill"
        objectFit="cover"
        alt="logo"
      />
      <Image
        src="/Fleet/fleet-1-1024x673.jpg"
        layout="fill"
        objectFit="cover"
        alt="logo"
      />
      <Image
        src="/Fleet/fleet-5-1024x673.jpg"
        layout="fill"
        objectFit="cover"
        alt="logo"
      /> */}
    </Carousel>
  );
};

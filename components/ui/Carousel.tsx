import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import Carousel from "react-material-ui-carousel";

export const CarouselComponent = () => {
  return (
    <Carousel height="673px" sx={{width:'100vw',position:'relative'}}> 

         
           <Box
         
         
         sx={{
            height:'100%',
            width:'100%',
           backgroundImage: 'url(/Fleet/fleet-3-1024x673.jpg)',
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
            backgroundImage: 'url(/Fleet/fleet-4-1024x673.jpg)',
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
           backgroundImage: 'url(/Fleet/fleet-2-1024x673.jpg)',
           backgroundRepeat: 'no-repeat',
           backgroundColor: (t) =>
             t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
           backgroundSize: 'cover',
           backgroundPosition: 'center',
         }}
       />
       
 
        

        
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

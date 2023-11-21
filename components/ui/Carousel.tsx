import {  useTheme } from "@mui/material";
import useResponsive from "fleed/hooks/useResponsive";
import Image, { ImageLoader, ImageLoaderProps } from "next/image";
import React from "react";
import Carousel from "react-material-ui-carousel";


const contentfulImageLoader: ImageLoader = ({ src, width }: ImageLoaderProps) => {
  return `${src}?w=${width}`
}
const CarouselComponent = () => {
  const theme = useTheme()
  const isPhone = useResponsive('down', 'md');

  
  return (
    <Carousel  sx={{width:'100vw',position:'relative', height: {xs:'350px',  md : '500px', lg:'700px',xl :'1000px'}, marginTop : { xs : '80px',lg :"0"}}}>     
        <Image 
        fill
        quality={100}
        // loader={contentfulImageLoader}
        sizes="100vw" priority={false} src={ (theme.palette.mode === 'light') ? '/carousel/light.webp' : '/carousel/dark.webp'} alt="Carousel Image"  style={{ objectFit: (isPhone) ? 'contain' : 'cover'}} />
    </Carousel>
  );
};

export default CarouselComponent
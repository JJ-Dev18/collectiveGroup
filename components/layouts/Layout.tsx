import { Box } from "@mui/material"
import Head from "next/head"
import React, { FC, useEffect } from "react";
import ResponsiveAppBar from "../ui/Appbar";
import Footer from "../ui/Footer";

interface Props { 
  title?: string;
  children?: React.ReactNode
}

const Layout:FC<Props> = ({title = "Shop",children}) => {
  

  
  return (
    <Box sx={{ flexFlow: 1}}>
     <Head>
        <title>{ `Collective Intelligence | ${title} `}</title>
     </Head>

     <Box >
      <ResponsiveAppBar/>
      <Box sx={{marginTop: '20px'}} justifyContent="center" alignItems="center" display="flex" flexDirection="column">
         <Box sx={{maxWidth:'1200px'}}>
           {children}
           
         </Box>
      </Box>
     <Footer/>
     </Box>
    </Box>
  )
}

export default Layout
import { Box } from "@mui/material"
import Head from "next/head"
import { FC } from "react";
import ResponsiveAppBar from "./Appbar";

interface Props { 
  title?: string;
  children?: React.ReactNode
}

const Layout:FC<Props> = ({title = "Competencias",children}) => {
  return (
    <Box sx={{ flexFlow: 1}}>
     <Head>
        <title>{ `Bmx - ${title} `}</title>
     </Head>

     <Box sx={{ padding : '10px'}} >
      <ResponsiveAppBar/>
      <Box sx={{marginTop: '20px'}}  display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {children}
      </Box>
     </Box>
    </Box>
  )
}

export default Layout
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
        <title>{ `Collective Intelligence | ${title} `}</title>
     </Head>

     <Box  >
      <ResponsiveAppBar/>
      <Box sx={{marginTop: '20px'}}  >
        {children}
      </Box>
     </Box>
    </Box>
  )
}

export default Layout
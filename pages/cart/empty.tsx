import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import Layout from 'fleed/components/layouts/Layout';


const EmptyPage = () => {
  return (
    <Layout title="Carrito vació" >
         <Box 
            display='flex' 
            justifyContent='center' 
            alignItems='center' 
            height='calc(100vh - 200px)'
            sx={{ flexDirection: { xs: 'column', sm: 'row' }}}
        >
            <RemoveShoppingCartOutlined sx={{ fontSize: 100 }} />
            <Box display='flex' flexDirection='column' alignItems='center'>
                <Typography>Su carrito está vació</Typography>
                <NextLink href='/' passHref legacyBehavior>
                    <Link typography="h5" color='secondary'>
                        Regresar
                    </Link>
                </NextLink>
            </Box>


        </Box>
    </Layout>
  )
}

export default EmptyPage
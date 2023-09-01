import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import Layout from 'fleed/components/layouts/Layout';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCheckout } from '../../hooks/useCheckout';

const EmptyPage = () => {
    const router = useRouter();
    // // const { cartCount  } = useShoppingCart()
    // const { loading, errorMessage , handleCheckout, cartCount } = useCheckout()
    const [loadCard, setLoadCard] = useState(false)
    const [cantCard, setCantCard] = useState(0)
  
    useEffect(() => {
      const cookieProducts = localStorage.getItem('persist:root') ? JSON.parse( localStorage.getItem('persist:root')! ): []
      setLoadCard(true)
      setCantCard(cookieProducts.cartCount || 0)
    }, [])
   
  
    useEffect(() => {
     if(loadCard && cantCard > 0 ){
           router.push('/cart')
     }
    }, [loadCard])
  
    if ( !loadCard || cantCard === 0 ) {
        return (<></>);
    }
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
                <Typography>You Cart is empty</Typography>
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
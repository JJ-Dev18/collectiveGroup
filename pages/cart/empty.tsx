import NextLink from 'next/link';

import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { Box, Link, Typography } from "@mui/material"
import Layout from 'fleed/components/layouts/Layout';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next'

const EmptyPage = () => {
    const router = useRouter();
    // // const { cartCount  } = useShoppingCart()
    const { t } = useTranslation("common")
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
    }, [loadCard,cantCard,router])
  
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
                <Typography>{t('cart-empty')}</Typography>
                <NextLink href='/' passHref legacyBehavior prefetch={false}>
                    <Link typography="h5" color='secondary'>
                       {t("back")}
                    </Link>
                </NextLink>
            </Box>


        </Box>
    </Layout>
  )
}

export default EmptyPage


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps,InferGetStaticPropsType ,InferGetServerSidePropsType } from 'next'

export const getStaticProps:GetStaticProps = async ({ locale }) => {

  
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
       
      ])),
      // Will be passed to the page component as props
    },
  }
}
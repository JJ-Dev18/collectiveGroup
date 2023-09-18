import { Button, Card, Box,CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import {  IProduct, ItemInterface } from 'fleed/interfaces'
import React, { FC ,useContext,useEffect} from 'react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Services } from './Services';
import { useCheckout } from 'fleed/hooks/useCheckout';
import {  ToastContainer, toast } from 'react-toastify';
import { UiContext } from 'fleed/context/ui';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
type Props = {
  handleCheckoutSubscribe  : (packagetoAdd:ItemInterface) => void 
  loading : boolean
  packageInfo : ItemInterface
  isLoggedIn : boolean
  
}

export const Package:FC<Props> = React.memo(({handleCheckoutSubscribe,packageInfo,loading,isLoggedIn}) => {
  const { addItem, removeItem ,cartDetails, redirectToCheckout,clearCart,} = useShoppingCart();
  const router = useRouter()
  const packageToAdd :ItemInterface= { ... packageInfo , 
     id : packageInfo.id.toString() ,
      price : Number(packageInfo.price),
     }


  const buyNow =  () => {
    if(!isLoggedIn){
      router.replace('/auth/login')
    }else{
      clearCart()
      handleCheckoutSubscribe(packageToAdd)
    }
  }
   
  
  

  return (
    <Card component={motion.div}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ ease: "easeOut", duration: 2 }}
    variant="elevation" className='mb-5 sm:mr-5 xl:w-3/12' >
        <CardHeader
        sx={{color: 'secondary'}}
        title={packageInfo.name}
        subheader={packageInfo.description}
      />
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
           <Typography variant="h1" color="secondary">
            {packageInfo.price /100} USD
           </Typography>
           <Typography variant="subtitle1" color="primary">
            Per truck/month
           </Typography>
        </Box>
        <CardContent>
            <ul className=' d-flex flex-column '>
            {
                packageInfo.services?.map( service => (
                    <Services key={service.service.id} {...service.service} />
                ))
            }
          </ul>
        {packageInfo.comments}
        </CardContent>
        <CardActions className='flex justify-center'>

        <Button variant='contained' color='secondary' sx={{fontWeight:'600'}} onClick={buyNow} disabled={loading}>
          Subscribe
        </Button>
      </CardActions>
     
    </Card>
  ) 
},
() => false
)

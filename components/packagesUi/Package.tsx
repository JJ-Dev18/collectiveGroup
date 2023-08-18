import { Button, Card, Box,CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import {  IProduct, ItemInterface } from 'fleed/interfaces'
import React, { FC ,useEffect} from 'react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Services } from './Services';
import { useCheckout } from 'fleed/hooks/useCheckout';

type Props = {
  handleCheckout  : (packagetoAdd:ItemInterface) => void 
  packageInfo : ItemInterface
}

export const Package:FC<Props> = React.memo(({handleCheckout,packageInfo}) => {
  const { addItem, removeItem ,cartDetails, redirectToCheckout,clearCart,} = useShoppingCart();
  
  const packageToAdd :ItemInterface= { ... packageInfo , 
     id :'package000'+ packageInfo.id.toString() ,
      price : Number(packageInfo.price),
     }


  useEffect(() => {
   
  }, [])

  const buyNow:React.MouseEventHandler<HTMLButtonElement> = async (event) => {
     clearCart()
    //  addItem(packageToAdd)
     handleCheckout(packageToAdd)
  }
   
  
  

  return (
    <Card variant="elevation" className='mb-5 sm:mr-5 xl:w-3/12' >
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
        
        <Button variant='outlined' color="primary" sx={{fontWeight:'600'}}  onClick={() => addItem(packageToAdd)} >
          Add To Cart
        </Button>
        <Button variant='contained' color='secondary' sx={{fontWeight:'600'}} onClick={buyNow}>
          Buy Now
        </Button>
      </CardActions>

    </Card>
  ) 
},
() => true
)

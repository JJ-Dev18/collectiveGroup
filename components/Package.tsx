import { Button, Card, Box,CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import {  IProduct, ItemInterface } from 'fleed/interfaces'
import React, { FC ,useEffect} from 'react'
import { useShoppingCart, formatCurrencyString } from 'use-shopping-cart';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Services } from './Services';
import { useCheckout } from 'fleed/hooks/useCheckout';

export const Package:FC<ItemInterface> = React.memo((props) => {
  const { addItem, removeItem ,cartDetails, redirectToCheckout,clearCart,} = useShoppingCart();
  const packageToAdd :ItemInterface= { ... props , 
     id :'package000'+ props.id.toString() ,
      price : Number(props.price),
     }
  const { handleCheckout } = useCheckout(packageToAdd)  

  useEffect(() => {
   
  }, [])

  const buyNow:React.MouseEventHandler<HTMLButtonElement> = async (event) => {
     clearCart()
    //  addItem(packageToAdd)
     handleCheckout(event)
  }
   
  
  

  return (
    <Card variant="outlined" className='mb-5 sm:mr-5 xl:w-3/12' >
        <CardHeader
        sx={{color: 'secondary'}}
        title={props.name}
        subheader={props.description}
      />
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
           <Typography variant="h1" color="secondary">
            {props.price /100} USD
           </Typography>
           <Typography variant="subtitle1" color="primary">
            Per truck/month
           </Typography>
        </Box>
        <CardContent>
            <ul className=' d-flex flex-column '>
            {
                props.services?.map( service => (
                    <Services key={service.service.id} {...service.service} />
                ))
            }
          </ul>
        {props.comments}
        </CardContent>
        <CardActions>
        
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

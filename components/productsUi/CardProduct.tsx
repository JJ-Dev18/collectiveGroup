import { Card, CardHeader, Avatar, Typography, CardContent, CardActions, Button } from '@mui/material';
import { IProduct, ItemInterface } from 'fleed/interfaces'
import React, { FC } from 'react'
import { useShoppingCart } from 'use-shopping-cart';

type Props = {
    product : ItemInterface,
    handleCheckout : (productToAdd:ItemInterface) => void
}
export const CardProduct:FC<Props> = ({product,handleCheckout}) => {
  
   const { addItem, clearCart } = useShoppingCart()
   const productToAdd:ItemInterface = { ... product , 
     id :'product000'+ product.id.toString() ,
     price : Number(product.price),
    }

    const toBuy = () => {
    clearCart()
    handleCheckout(productToAdd)
  }
  return (
    <Card content="product" >
        <CardHeader
          title={product.name}        
          subheader={`${product.price} USD `}
        />
        <CardActions className='flex justify-center'>
            <Button variant="outlined" color="primary" size='small' onClick={()=> addItem(productToAdd)}>
                 Add  to cart
            </Button>
            <Button variant="contained" color="secondary"  size='small' onClick={toBuy}>
                 Buy now
            </Button>
        </CardActions>
    </Card>
  )
}

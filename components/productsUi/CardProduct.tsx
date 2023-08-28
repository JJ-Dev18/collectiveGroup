import { Card, CardHeader, Avatar, Typography, CardContent, CardActions, Button } from '@mui/material';
import { UiContext } from 'fleed/context/ui';
import { IProduct, ItemInterface } from 'fleed/interfaces'
import React, { FC, useContext } from 'react'
import { useShoppingCart } from 'use-shopping-cart';

type Props = {
    product : ItemInterface,
    handleCheckout : (productToAdd:ItemInterface) => void
    loading : boolean
}
export const CardProduct:FC<Props> = ({product,handleCheckout,loading}) => {
   
   const { showSuccessAlert } = useContext(UiContext)
   const { addItem, clearCart } = useShoppingCart()
   const productToAdd:ItemInterface = { ... product , 
     id :'product000'+ product.id.toString() ,
     price :  Number(product.price * 100),
    }

    const toBuy =  () => {
     clearCart()
     handleCheckout(productToAdd)
  }
  return (
    <Card content="product" >
        <CardHeader
          title={product.name}        
          subheader={`${product.price/ 100} USD `}
        />
        <CardActions className='flex justify-center'>
            <Button variant="outlined" color="primary" size='small' onClick={() => {
             addItem(productToAdd)
             showSuccessAlert("Product Add to cart")
          }}>
                 Add  to cart
            </Button>
            <Button variant="contained" color="secondary"  size='small' onClick={toBuy} disabled={loading}>
                 Buy now
            </Button>
        </CardActions>
    </Card>
  )
}

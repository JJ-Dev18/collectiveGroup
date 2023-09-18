import { FC, useEffect } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Divider, Grid, Link, Typography } from '@mui/material';
import { useShoppingCart } from 'use-shopping-cart';
import { ItemCounter } from '../ui/ItemCounter';
import { CartEntry } from 'use-shopping-cart/core';
import { useRouter } from 'next/router';
import { ItemCart } from './ItemCart';
import { ItemInterface } from 'fleed/interfaces';





interface Props {
    handleCheckout  : (productToAdd :ItemInterface | undefined | CartEntry) => void
}

export const CartList: FC<Props> = ({handleCheckout}) => {
  
  const { addItem, removeItem ,cartDetails,cartCount  } = useShoppingCart();
  const router = useRouter();
 
  const productsInCart:CartEntry[] = Object.values(cartDetails as CartEntry)
  

  return (
    <Box  sx={{ flexDirection: { xs: 'column', sm: 'row' }}}>
           
        {
            productsInCart.map( product => (
                  <Grid item xs={12} key={product.id}>
                    { 
                         <>
                        <ItemCart product={product} handleCheckout={handleCheckout}/>
                         <Divider/>
                         </>
                    }
                  </Grid>
                    
                    ))
                }
                
    </Box>
  )
}
import { FC } from 'react';
import { Box, Divider, Grid } from '@mui/material';
import { useShoppingCart } from 'use-shopping-cart';
import { CartEntry } from 'use-shopping-cart/core';
import { useRouter } from 'next/router';
import { ItemCart } from './ItemCart';
import { ItemInterface } from 'fleed/interfaces';





interface Props {
    handleCheckout  : (productToAdd :ItemInterface | undefined | CartEntry) => void
}

export const CartList: FC<Props> = ({handleCheckout}) => {
  
  const { addItem, removeItem ,cartDetails,cartCount  } = useShoppingCart();
 
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
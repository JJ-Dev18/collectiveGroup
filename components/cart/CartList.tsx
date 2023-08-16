import { FC } from 'react';
import NextLink from 'next/link';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import { useShoppingCart } from 'use-shopping-cart';
import { ItemCounter } from '../ui/ItemCounter';
import { CartEntry } from 'use-shopping-cart/core';





interface Props {
    editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  
  const { addItem, removeItem ,cartDetails  } = useShoppingCart();

  const productsInCart:CartEntry[] = Object.values(cartDetails as any)

  console.log(cartDetails)
  return (
    <>
        {
            productsInCart.map( product => (
                <Grid container spacing={2} key={ product.id } sx={{ mb:1 }}>
                  
                    <Grid item xs={7}>
                        <Box display='flex' flexDirection='column'>
                            <Typography variant='body1'>{ product.name }</Typography>
                     
                            <Typography variant='body1'>{product.description}</Typography>

                            {
                                editable 
                                ? <ItemCounter id={product.id} quantity={product.quantity}/>
                                : <Typography variant='h5'>{product.quantity} items</Typography>
                            }
                            
                        </Box>
                    </Grid>
                    <Grid item xs={2} display='flex' alignItems='center' flexDirection='column'>
                        <Typography variant='subtitle1'>{ `${ product.formattedValue }` }</Typography>
                        
                        {
                            editable && (
                                <Button variant='text' color='secondary' onClick={()=> removeItem(product.id)} >
                                    Remover
                                </Button>
                            )
                        }
                    </Grid>
                </Grid>
            ))
        }
    </>
  )
}
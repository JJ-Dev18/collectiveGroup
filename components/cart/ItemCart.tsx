import { Box, Grid, Paper, Stack, Typography, Button, IconButton } from "@mui/material";
import { ItemInterface } from "fleed/interfaces";
import React, { FC } from "react";
import { useShoppingCart } from "use-shopping-cart";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { CartEntry } from "use-shopping-cart/core";



interface Props {
  product : CartEntry
  handleCheckout : (productToAdd:ItemInterface | CartEntry | undefined) => void
}

export const ItemCart: FC<Props> = ({product,handleCheckout}) => {
    const { incrementItem , decrementItem,removeItem , clearCart} = useShoppingCart()
    
    const buyNow =  () => {
        // clearCart()
        handleCheckout(product)
     }
  return (
    
      <Grid container spacing={2} display="flex" justifyContent="center" alignItems="center" padding={2}>
        <Grid item xs={12} md={4} display="flex"  justifyContent="center">
          <Stack display="flex" direction="column">
            <Box>
              <Typography variant="h2" color="primary" textAlign="center">
                {product.name}
              </Typography>
              {product.description && (
                <Typography variant="caption" color="primary">
                  {product.description}
                </Typography>
              )}
            </Box>
            <Box display="flex" justifyContent="space-around">
              <Button variant="text" color="primary" onClick={()=> removeItem(product.id)}>
                Delete
              </Button>
              <Button variant="text" color="secondary" onClick={buyNow}>
                Buy Now
              </Button>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
           <Box display="flex" justifyContent="space-between" alignItems="center" sx={{border: '1px solid gray',width:'150px'}}>
           
            <IconButton onClick={()=> decrementItem(product.id)} >
             <RemoveRoundedIcon/>
            </IconButton>
            
           <Typography variant="caption" color="primary">{product.quantity}</Typography>
         
           <IconButton onClick={()=> incrementItem(product.id)} >
             <AddOutlinedIcon/>
             </IconButton>

           </Box>
        </Grid>
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
           <Typography variant="h1" color="inherit">{product.formattedValue}</Typography>
        </Grid>
      </Grid>
    
  );
};

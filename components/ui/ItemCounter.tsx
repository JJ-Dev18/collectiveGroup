import { FC } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { useShoppingCart } from 'use-shopping-cart';


interface Props {
  id:number
  quantity : number
}

export const ItemCounter:FC<Props> = ({id,quantity}) => {
    const { incrementItem , decrementItem, } = useShoppingCart()

    console.log(id)
  return (
    <Box display='flex' alignItems='center'>
        <IconButton onClick={()=> decrementItem(id)}>
            <RemoveCircleOutline />
        </IconButton>
        <Typography sx={{ width: 40, textAlign:'center' }}> {quantity} </Typography>
        <IconButton onClick={()=> incrementItem(id)}>
            <AddCircleOutline />
        </IconButton>
    </Box>
  )
}
import { Card, CardHeader, Avatar, Typography, CardContent, CardActions, Button, CardMedia, Box } from '@mui/material';
import { UiContext } from 'fleed/context/ui';
import { IProduct, ItemInterface } from 'fleed/interfaces'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useContext, useRef } from 'react'
import { useShoppingCart } from 'use-shopping-cart';

type Props = {
    product : ItemInterface,
    handleCheckout : (productToAdd:ItemInterface) => void
    loading : boolean
    isLoggedIn : boolean
    showSuccessAlert :(msg:string)=> void
}
export const CardProduct:FC<Props> = ({product,handleCheckout,loading,isLoggedIn,showSuccessAlert}) => {
   

   const { addItem, clearCart } = useShoppingCart()
   const router = useRouter()
   const productToAdd:ItemInterface = { ... product , 
     id :'product000'+ product.id.toString() ,
     price :  Number(product.price * 100),
    }
   const imageLocation =product.name.split(" ")[0]
  
    const toBuy =  () => { 
        if(!isLoggedIn){
          router.replace('/auth/login')
        }else{
          clearCart()
          handleCheckout(productToAdd)
        }
  }
  return (
    <Card content="product" >
      <CardHeader 
       title={product.name}
      
      />
      <Box  sx={{
            // borderRadius :"20px",
            width:'100%',
            height:'200px',
            backgroundImage: `url(/${imageLocation}/${imageLocation}-5-1024x673.jpg)`,
            backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundAttachment : 'initial',
            backgroundPosition: 'center',
          }}/>
       {/* <CardMedia
        sx={{ height: 80}}
        image={`/${product.name}/logo.png`}
        title="logo product"
      /> */}
       <CardContent>
         <Typography variant="h5" color="secondary">{product.price /100} USD</Typography>
       </CardContent>
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

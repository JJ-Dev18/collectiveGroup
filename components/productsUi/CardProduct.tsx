import { Card, Typography, CardContent, CardActions, Button, CardMedia, Box, Skeleton } from '@mui/material';
import { IProduct, ItemInterface } from 'fleed/interfaces'
import { useRouter } from 'next/router';
import React, { FC, useMemo, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import { motion } from "framer-motion"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next'
import { Product } from 'use-shopping-cart/core';
import dynamic from 'next/dynamic';
import Image from 'next/image';
// import Fleet from 'fleed/public/Fleet/fleet-5-1024x673.jpg'
// import Forklift from 'fleed/public/Forklift/forklift-5-1024x673.jpg'


const CardHeader = dynamic(() => import('@mui/material/CardHeader'), {
  loading: ()=> <Skeleton
  variant="rectangular"
  height="200px"
  width="200px"
/>
})


type Props = {
    product : ItemInterface,
    handleCheckout : (productToAdd:ItemInterface) => void
    loading : boolean
    isLoggedIn : boolean
    showSuccessAlert :(msg:string)=> void
}
export const CardProduct:FC<Props> = ({product,handleCheckout,loading,isLoggedIn,showSuccessAlert}) => {
   
   const { addItem, clearCart } = useShoppingCart()
   const [hover, sethover] = useState(false)
   const { t } = useTranslation('common')
   const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
   const open = Boolean(anchorEl);
   const imageLocation =product.name.split(" ")[0]
  //  const [image, setimage] = useState(`/${imageLocation}/${imageLocation}-5-1024x673.jpg`)
   const image = useMemo(() =>
   imageLocation === 'Fleet' 
   ? '/fleet/fleet-5-1024x673.jpg'
   : (imageLocation === 'Forklift' )
   ? '/forklift/forklift-5-1024x673.jpg'
   :'/coming.jpg', [imageLocation])
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     setAnchorEl(event.currentTarget);
    };
   const handleClose = () => {
     setAnchorEl(null);
    
   };
  console.log(image)
   const router = useRouter()
   const productToAdd:ItemInterface | IProduct = { ... product , 
     id :product.id.toString() ,
     price :  Number(product.price * 100),
    }
  
    const toBuy =  () => { 
        if(!isLoggedIn){
          router.replace('/auth/login')
        }else{
          clearCart()
          handleCheckout(productToAdd)
        }
  }
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delayChildren: 0.5
      }
    }
  }
  const info = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
  }
  return (
    

    <Card component={motion.div} content="product"  
    initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
    transition={{ ease: "easeOut", duration: 2 }}
    >
      <CardHeader 
       title={product.name}
       action={
        <Tooltip title="Options">
        <IconButton aria-label="settings" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        </Tooltip>
      } 
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=> window.open(product.brochure, '_blank', 'noreferrer')}  >Brochure</MenuItem>
       
      </Menu>
        
        <Image 
        height={200}
        width={300}
        src={image}   
        loading='lazy'
        // loader={ () =>  <Skeleton/> }
        alt="Image product"/>
      
     
       <CardContent 
       >
      <Box className="content"  component={motion.div}
           variants={info}
           initial="hidden"
           animate="show"
          //  whileHover={ { rotateY : 180} }
           sx={{display: hover ? 'block' : 'none',}}

        >
        <p>Esta es la info </p>
      </Box>
     
      
         <Typography variant="h1" color="secondary">{product.price /100} USD</Typography>
       </CardContent>
        <CardActions className='flex justify-center'>
            <Button variant="outlined" color="primary" size='small' onClick={() => {
             addItem(productToAdd as Product)
             showSuccessAlert(t('product-add'))
          }}>
                 {t('button-add')}
            </Button>
            <Button variant="contained" color="secondary"  size='small' onClick={toBuy} disabled={loading}>
            {t('button-buy')}
            </Button>
        </CardActions>
    </Card>
   
  )
}

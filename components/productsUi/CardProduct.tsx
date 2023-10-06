import { Card, CardHeader, Avatar, Typography, CardContent, CardActions, Button, CardMedia, Box } from '@mui/material';
import { UiContext } from 'fleed/context/ui';
import { IProduct, ItemInterface } from 'fleed/interfaces'
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useContext, useRef, useState } from 'react'
import { useShoppingCart } from 'use-shopping-cart';
import { motion, transform } from "framer-motion"
import MoreVertIcon from '@mui/icons-material/MoreVert'
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'next-i18next'


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
   const [image, setimage] = useState(`/${imageLocation}/${imageLocation}-5-1024x673.jpg`)
   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
     setAnchorEl(event.currentTarget);
    };
   const handleClose = () => {
     setAnchorEl(null);
    
   };
   const router = useRouter()
   const productToAdd:ItemInterface = { ... product , 
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
    
    // animate={hover ? "hoverCard" : "closed"}
    // variants={variants}
    // transform: translate(-3.5rem, -3.5rem);
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
        
      <CardMedia
        component="img"
        height="200px"
        width="200px"
        image={image}
        onError={(e)=> setimage('/coming.jpg')}
        alt="Image product"
      />
     
       {/* <CardMedia
        sx={{ height: 80}}
        image={`/${product.name}/logo.png`}
        title="logo product"
      /> */}
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
     
       {/* <Box  
         
          sx={{
            // borderRadius :"20px",
            display: hover ? 'none' : 'block',
            width:'100%',
            height:'200px',
            backgroundImage: `url(/${imageLocation}/${imageLocation}-5-1024x673.jpg)`,
            backgroundRepeat: 'no-repeat',
            // backgroundColor: (t) =>
            //   t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundAttachment : 'initial',
            backgroundPosition: 'center',
          }}/> */}
         <Typography variant="h1" color="secondary">{product.price /100} USD</Typography>
       </CardContent>
        <CardActions className='flex justify-center'>
            <Button variant="outlined" color="primary" size='small' onClick={() => {
             addItem(productToAdd)
             showSuccessAlert("Product Add to cart")
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

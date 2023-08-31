import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { CartList } from "fleed/components/cart/CartList";
import { OrderSummary } from "fleed/components/cart/OrderSummary";

import Layout from "fleed/components/layouts/Layout";
import { AuthContext } from "fleed/context/auth";
import { useCheckout } from "fleed/hooks/useCheckout";
import { fetchPostJSON } from "fleed/utils/api-helpers";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { DebugCart, useShoppingCart } from "use-shopping-cart";



const CartPage = () => {
  const router = useRouter();
  // const { cartCount  } = useShoppingCart()
  const { loading, errorMessage , handleCheckout, cartCount } = useCheckout()
  const [loadCard, setLoadCard] = useState(false)
  const [cantCard, setCantCard] = useState(0)
  const { user,isLoggedIn }  = useContext(AuthContext)
  useEffect(() => {
    const cookieProducts = localStorage.getItem('persist:root') ? JSON.parse( localStorage.getItem('persist:root')! ): []
    setLoadCard(true)
    setCantCard(cookieProducts.cartCount || 0)
  }, [cartCount])
  
  const checkout = () => {
    if(!isLoggedIn){
      router.replace('/auth/login?p=/cart')
    }else{
      handleCheckout(undefined)
    }
  }
  
  useEffect(() => {
   if(loadCard && cantCard == 0 || loadCard && cartCount == 0){
         router.replace('/cart/empty')
   }
  }, [loadCard,cartCount])

  if ( !loadCard || cartCount === 0 ) {
      return (<></>);
  }
  return (
    <Layout title="Carrito - ">
      <Typography variant="h1" color="inherit" textAlign="center">Shopping Cart</Typography>
      <Grid container> 
      <Grid item xs={12} md={7}>
      <CartList handleCheckout={handleCheckout}/>
      </Grid>
      <Grid item xs={12} md={5}  sx={{ display:'flex', justifyContent:{ xs : 'center' , }}}>
      <Card sx={{ marginTop: {xs : '20px', md: '0'},marginLeft : { xs : '0', md : '20px'}, height:'220px'}}  >
            <CardContent>
              <Typography variant="h2">Purchase</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box >
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  disabled={loading}
                  onClick={checkout}
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
      </Grid>
      </Grid>
    </Layout>
  );
};

export default CartPage;

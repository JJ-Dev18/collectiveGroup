import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { CartList } from "fleed/components/cart/CartList";
import { OrderSummary } from "fleed/components/cart/OrderSummary";

import Layout from "fleed/components/layouts/Layout";
import { useCheckout } from "fleed/hooks/useCheckout";
import { fetchPostJSON } from "fleed/utils/api-helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DebugCart, useShoppingCart } from "use-shopping-cart";


const CartPage = () => {
  const router = useRouter();
  // const { cartCount  } = useShoppingCart()
  const { loading, errorMessage , handleCheckout, cartCount } = useCheckout()
  const [loadCard, setLoadCard] = useState(false)
  const [cantCard, setCantCard] = useState(0)

  useEffect(() => {
    const cookieProducts = localStorage.getItem('persist:root') ? JSON.parse( localStorage.getItem('persist:root')! ): []
    setLoadCard(true)
    setCantCard(cookieProducts.cartCount || 0)
  }, [cartCount])
 

  useEffect(() => {
   if(loadCard && cantCard == 0 || loadCard && cartCount == 0){
         router.replace('/cart/empty')
   }
  }, [loadCard,cartCount])
  
  
//   useEffect(() => setCartEmpty(!cartCount), [cartCount]);
  
  


  if ( !loadCard || cartCount === 0 ) {
      return (<></>);
  }
  return (
    <Layout title="Carrito - 3">
      <Typography variant="h1" component="h1">
        Cart
      </Typography>
     
      <Grid container height="100vh">
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          {errorMessage ? (
            <p style={{ color: "red" }}>Error: {errorMessage}</p>
          ) : null}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Purchase</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  disabled={loading}
                  onClick={()=> handleCheckout(undefined)}
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

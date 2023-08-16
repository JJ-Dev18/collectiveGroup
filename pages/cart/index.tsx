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
import { fetchPostJSON } from "fleed/utils/api-helpers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { DebugCart, useShoppingCart } from "use-shopping-cart";


const CartPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadCard, setLoadCard] = useState(false)
  const [cantCard, setCantCard] = useState(0)
  const {
    formattedTotalPrice,
    cartCount,
    clearCart,
    cartDetails,
    redirectToCheckout,
    checkoutSingleItem
  } = useShoppingCart();

  useEffect(() => {
    const cookieProducts = localStorage.getItem('persist:root') ? JSON.parse( localStorage.getItem('persist:root')! ): []
    // cartCount = cookieProducts.cartCount
    setLoadCard(true)
    setCantCard(cookieProducts.cartCount)
  }, [cartCount])
 

  useEffect(() => {
   if(loadCard && cantCard == 0 || loadCard && cartCount == 0){
         router.replace('/cart/empty')
   }
  }, [loadCard,cartCount])
  
  
//   useEffect(() => setCartEmpty(!cartCount), [cartCount]);
  
  const handleCheckout: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const response = await fetchPostJSON(
      "/api/checkout_sessions/cart",
      cartDetails
    );

    if (response.statusCode > 399) {
      console.error(response.message);
      setErrorMessage(response.message);
      setLoading(false);
      return;
    }

    console.log(response, "response");
    redirectToCheckout(response.id);
  };


  // if ( !isLoaded || cartCount === 0 ) {
  //     return (<></>);
  // }
  return (
    <Layout title="Carrito - 3">
      <Typography variant="h1" component="h1">
        Carrito
      </Typography>
     
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          {errorMessage ? (
            <p style={{ color: "red" }}>Error: {errorMessage}</p>
          ) : null}
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />

              <OrderSummary />

              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  disabled={loading}
                  onClick={handleCheckout}
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

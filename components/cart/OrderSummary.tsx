import { Grid, Typography } from "@mui/material"
import { useShoppingCart } from "use-shopping-cart";


export const OrderSummary = () => {

  const { addItem, removeItem ,cartDetails ,cartCount ,formattedTotalPrice } = useShoppingCart();

  return (
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>No. Products</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{cartCount} items</Typography>
        </Grid>

        {/* <Grid item xs={6}>
            <Typography>SubTotal</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ `$${ 155.36 }` }</Typography>
        </Grid>

        <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display='flex' justifyContent='end'>
            <Typography>{ `$${ 35.34 }` }</Typography>
        </Grid> */}

        <Grid item xs={6} sx={{ mt:2 }}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} sx={{ mt:2 }} display='flex' justifyContent='end'>
            <Typography variant="subtitle1">{ `${ formattedTotalPrice }` }</Typography>
        </Grid>

    </Grid>
  )
}
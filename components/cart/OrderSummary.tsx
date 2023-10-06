import { Grid, Typography } from "@mui/material"
import { useShoppingCart } from "use-shopping-cart";
import { useTranslation } from 'next-i18next'


export const OrderSummary = () => {

  const { addItem, removeItem ,cartDetails ,cartCount ,formattedTotalPrice } = useShoppingCart();
  const { t } = useTranslation("common")
  return (
    <Grid container>
        
        <Grid item xs={6}>
            <Typography>{t('cart-page.purchase.amount')}</Typography>
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
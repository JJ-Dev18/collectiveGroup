import AdminLayout from 'fleed/components/layouts/AdminLayout'
import React from 'react'

// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// sections
import {
  AppWidgetSummary,

} from '../../components/admin/dashboard/app';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import PeopleIcon from '@mui/icons-material/People';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import InventoryIcon from '@mui/icons-material/Inventory';
const dashboard = () => {
  return (
    <AdminLayout title='admin'>
    <Container maxWidth="xl" sx={{overflowX: 'hidden'}}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Weekly Sales" total={120}  Icon={ShoppingBasketIcon}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="New Users" total={10} color="info" Icon={PeopleIcon} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Products" total={3} color="warning" Icon={ShoppingBagIcon}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Packages" total={4} color="error"  Icon={InventoryIcon}/>
          </Grid>

          
        </Grid> 
      </Container>
    </AdminLayout>
  )
}



export default dashboard
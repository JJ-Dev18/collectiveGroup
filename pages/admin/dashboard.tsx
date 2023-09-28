import AdminLayout from "fleed/components/layouts/AdminLayout";
import React, { useState, useEffect } from "react";

// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
// sections
import { AppWidgetSummary } from "../../components/admin/dashboard/app";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PeopleIcon from "@mui/icons-material/People";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InventoryIcon from "@mui/icons-material/Inventory";
import { IDashboard } from "fleed/interfaces";
import useSWR from "swr";
import { fetchGetJSON } from "fleed/utils/api-helpers";

const dashboard = () => {
  const { data, error } = useSWR<IDashboard>(
    "/api/admin/dashboard",
    {
      fetcher : fetchGetJSON,
      refreshInterval: 30 * 1000, // 30 segundos
    }
  );

  const [refreshIn, setRefreshIn] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Tick");
      setRefreshIn((refreshIn) => (refreshIn > 0 ? refreshIn - 1 : 30));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <Typography>Error al cargar la información</Typography>;
  }

  const {
    numberOfOrders,
    numberOfPackages,
    numberOfClients,
    numberOfProducts,
  } = data!;

  return (
    <AdminLayout title="Admin Dashboard">
      <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Sales"
              total={numberOfOrders}
              Icon={ShoppingBasketIcon}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Clients"
              total={numberOfClients}
              color="info"
              Icon={PeopleIcon}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Products"
              total={numberOfProducts}
              color="warning"
              Icon={ShoppingBagIcon}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Packages"
              total={numberOfPackages}
              color="error"
              Icon={InventoryIcon}
            />
          </Grid>
        </Grid>
      </Container>
    </AdminLayout>
  );
};

export default dashboard;

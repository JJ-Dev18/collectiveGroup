import React, { useState, useEffect, useContext } from "react";
import { Grid, Container, Typography, Chip, Box } from "@mui/material";
import useSWR from "swr";
import { IPackage, ISales, SaleProduct } from "fleed/interfaces";
import { GridActionsCellItem, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AdminLayout from "fleed/components/layouts/AdminLayout";
import { fetchGetJSON } from "fleed/utils/api-helpers";
import { UiContext } from "fleed/context/ui";
import DeleteIcon from '@mui/icons-material/Delete';
import ScrollBar from "fleed/components/admin/ui/scrollbar/ScrollBar";
import { DataGridCustom } from "fleed/components/admin/ui/datagrid/DataGridCustom";

const Sales = () => {


  const { data, error, isLoading } = useSWR<ISubscription[]>("/api/admin/subscriptions", fetchGetJSON);

  const [subscriptions , setSubscriptions ] = useState<ISubscription[]>([]);

  const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)
  
  useEffect(() => {
    if (data) {
        setSubscriptions(data);
        console.log(data)
    }
  }, [data]);
 
 
  const deleteSubscription = async ( subId: number) => {
    const previosSubs = subscriptions.map((sub) => ({ ...sub }));
      const newSub = subscriptions.filter(sub => sub.id != subId)
      

      
      try {
          const data = await fleedShopApi.delete("/admin/subscriptions", {data:{
              id: subId
          } })
          if(data.data.error){
            showErrorAlert(data.data.error)
          }else{
            showSuccessAlert(data.data.message)
            setSubscriptions(newSub)
          }
      } catch (error) {
     
        setSubscriptions(previosSubs);
        showErrorAlert("error")
      } 
  
  }

 

  const columns: GridColDef[] = [
    { field: "isPaid", headerName: "Is paid ? ", width:80},
    { field: "user", headerName: "User",width:200  },
    { 
        field: 'package', 
        headerName: 'Package', 
        width:300 ,
        renderCell: ({row}: GridRenderCellParams<any, number>) => {
            return (
               <ScrollBar sx={{
                height: 1,
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
               }}>
               <Box sx={{overflowX:'scroll'}} >
                 {
                  row.packages.map(( packaged:SubscriptionPackage) => (
                  
                    <Chip  key={packaged.id} label={packaged.package.name} size='small'/>
                  ))
                 }
               </Box>
               </ScrollBar>
            )
        }
    },

    
    {
        field: 'actions',
        // type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        renderCell: ({ row }: GridRenderCellParams<any, number>) => {
            return(
                <GridActionsCellItem
                icon={<DeleteIcon />}
                label="Delete"
                onClick={()=> deleteSubscription(Number(row.id))}
                color="error"
              />
            )
        }
      },
  ];

  const rows = subscriptions.map((sub) => ({
    id: sub.id,
    isPaid: sub.isPaid ? 'Yes' : 'No',
    user: sub.user.email,
    packages : sub.subscriptionPackage
  }));

 

  return (
    <AdminLayout title="Sales">
        <Typography variant="h4" sx={{mb:3}}  textAlign="center">
          Subscriptions
        </Typography>
    <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
      <Grid container >
        <Grid item xs={12} sx={{ height: 'auto', width: "100%" }}>
          <DataGridCustom
            rows={rows}
            columns={columns}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
    </Container>
    </AdminLayout>
  );
};

export default Sales;

import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps } from 'next'
import fleedShopApi from "fleed/api/fleedShopApi";
import { ISubscription, SubscriptionPackage } from "fleed/interfaces/subscriptions";

export const getStaticProps:GetStaticProps = async ({ locale }) => {

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
       
      ])),
      // Will be passed to the page component as props
    },
  }
}
import React, { useState, useEffect, useContext } from "react";
import { Grid, Container, Typography, Select, MenuItem, Chip, Box, Stack } from "@mui/material";
import fleedShopApi from "fleed/api/fleedShopApi";
import useSWR from "swr";
import { PeopleOutline } from "@mui/icons-material";
import { ISales, IUser, SaleProduct } from "fleed/interfaces";
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import AdminLayout from "fleed/components/layouts/AdminLayout";
import { fetchGetJSON } from "fleed/utils/api-helpers";
import { UiContext } from "fleed/context/ui";
import DeleteIcon from '@mui/icons-material/Delete';
import ScrollBar from "fleed/components/admin/ui/scrollbar/ScrollBar";
import { StyledDataGrid } from "../../components/admin/ui/datagrid/styles";
import LinearProgress from '@mui/material/LinearProgress';
import { DataGridCustom } from "fleed/components/admin/ui/datagrid/DataGridCustom";

const Sales = () => {


  const { data, error, isLoading } = useSWR<ISales[]>("/api/admin/sales", fetchGetJSON);

  const [sales, setSales] = useState<ISales[]>([]);

  const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)

  useEffect(() => {
    if (data) {
        setSales(data);
    }
  }, [data]);
  console.log(data,"Data")
 
  const deleteUser = async ( userId: number) => {
    // const previosUsers = users.map((user) => ({ ...user }));
    // const newUsers = users.filter(user => user.id != userId)
    // setSales(newUsers)
    // console.log(userId, " id del user ")
    // try {
    //     const data = await fleedShopApi.delete("/admin/users", {data:{
    //         id: userId
    //     } })
    //     showSuccessAlert(data.data.message)
    // } catch (error) {
    //     setUsers(previosUsers);
    //     console.log(error,"error");
    //     showErrorAlert("error")
    // } 

   
  }

 

  const columns: GridColDef[] = [
    { field: "transactionId", headerName: "Transaction", width:150 },
    { field: "isPaid", headerName: "Is paid ? ", width:50},
    { field: "user", headerName: "User",width:200  },
    { field: "city", headerName: "City",width:200  },
    { field: "country", headerName: "Country",width:200  },


    { 
        field: 'products', 
        headerName: 'Products', 
        width:300 ,
        renderCell: ({row}: GridRenderCellParams<any, number>) => {
            return (
               <ScrollBar sx={{
                height: 1,
                '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
               }}>
               <Box sx={{overflowX:'scroll'}} >
                 {
                  row.products.map(( product:SaleProduct) => (
                    <Chip  key={product.id} label={product.product.name} size='small'/>
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
                onClick={()=> deleteUser(Number(row.id))}
                color="error"
              />
            )
        }
      },
  ];

  const rows = sales.map((sales) => ({
    id: sales.id,
    transactionId : sales.transactionId,
    isPaid: sales.isPaid ? 'Yes' : 'No',
    user: sales.user.email,
    city: sales.city,
    countr : sales.country,
    products : sales.saleProducts
  }));

  console.log(rows,"rows de sale ")

  return (
    <AdminLayout title="Sales">
        <Typography variant="h4" sx={{mb:3}}  textAlign="center">
          Sales
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
import { GetStaticProps,InferGetStaticPropsType ,InferGetServerSidePropsType } from 'next'

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
import React, { useState, useEffect, useContext } from "react";
import { Grid, Container, Typography, Select, MenuItem, Chip, Box } from "@mui/material";
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
import { StyledDataGrid } from "./styles";

const users = () => {


  const { data, error } = useSWR<ISales[]>("/api/admin/sales", fetchGetJSON);

  const [sales, setSales] = useState<ISales[]>([]);

  const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)

  useEffect(() => {
    if (data) {
        setSales(data);
    }
  }, [data]);
  console.log(users,"Data")
 
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
    { field: "transactionId", headerName: "Transaction", flex: 1 },
    { field: "isPaid", headerName: "isPaid", flex : 1 },
    { field: "user", headerName: "User", flex: 1  },
    { field: "shippingaddress", headerName: "Adress", flex :1  },

    { 
        field: 'products', 
        headerName: 'Products', 
        flex: 3 ,
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
    isPaid: sales.isPaid,
    user: sales.user.email,
    shippingaddress: sales.shippingAddress,
    products : sales.saleProducts
  }));


  return (
    <AdminLayout title="Sales">
        <Typography variant="h4" sx={{mb:3}}  textAlign="center">
          Sales
        </Typography>
    <Container maxWidth="xl" sx={{ overflowX: "hidden" }}>
      <Grid container >
        <Grid item xs={12} sx={{ height: 'auto', width: "100%" }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            // paginationModel={{ page: 1 , pageSize: 10 }}
            pageSizeOptions={[10]}
          />
        </Grid>
      </Grid>
    </Container>
    </AdminLayout>
  );
};

export default users;

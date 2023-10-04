import UserLayout from 'fleed/components/layouts/UserLayout'
import React, { useContext,useState, useEffect, FC } from 'react'
import { Divider, CardContent, CardHeader,Box ,Chip, Stack} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridActionsCellItem, GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { ISales, IUser, SaleProduct } from "fleed/interfaces";
import { fetchGetJSON } from "fleed/utils/api-helpers";
import { UiContext } from "fleed/context/ui";
import DeleteIcon from '@mui/icons-material/Delete';
import ScrollBar from "fleed/components/admin/ui/scrollbar/ScrollBar";
import { StyledDataGrid } from '../admin/styles';
import { useRouter } from 'next/router';
import { AuthContext } from 'fleed/context/auth';

const drawerWidth = 240;



   
const MyPurchase:FC = () => {

    const { user } = useContext(AuthContext)
    const { data , error } = useSWR<ISales[]>(`/api/user/sales/${user?.id}`,fetchGetJSON);
     const [sales, setSales] = useState<ISales[]>([]);
    
   
    const router = useRouter()
    
    useEffect(() => {
        if (data) {
            setSales(data);
        }
      }, [data]);

  const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)

 

    const columns: GridColDef[] = [
        { field: "transactionId", headerName: "Transaction", flex: 1 },
        { field: "isPaid", headerName: "Is paid? ", flex : 1 },
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
    
        
       
      ];
    
      const rows = sales?.map((sales) => ({
        id: sales.id,
        isPaid: sales.isPaid ? 'Yes' : 'No',
        user: sales.user.email,
        shippingaddress: sales.shippingAddress,
        products : sales.saleProducts
      }));
    
 
  return (
    <UserLayout title='User Account'>
        <CardHeader
          sx={{textAlign:'left'}}
          action={
            <IconButton aria-label="">
              
            </IconButton>
          }
          title="My Purchase"
          
        />
        <Divider/>
        <CardContent sx={{}}>
        <DataGrid
            rows={rows}
            columns={columns}
            slots={{
              noRowsOverlay : () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  No rows 
                </Stack>
              ),
            }}
           
            // paginationModel={{ page: 1 , pageSize: 10 }}
           
          />
            
          

        </CardContent>
    </UserLayout>
  )
}

export default MyPurchase



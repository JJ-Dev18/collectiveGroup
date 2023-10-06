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
import { useTranslation } from 'next-i18next'


const drawerWidth = 240;



   
const MyPurchase:FC = () => {

    const { user } = useContext(AuthContext)
    const { data , error, isLoading } = useSWR<ISales[]>(`/api/user/sales/${user?.id}`,fetchGetJSON);
     const [sales, setSales] = useState<ISales[]>([]);
  const {  t  } = useTranslation("common")
    
   
    const router = useRouter()
    
    useEffect(() => {
        if (data) {
            setSales(data);
        }
      }, [data]);

  const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)

 

    const columns: GridColDef[] = [
        { field: "createdAt", headerName: t('purchase.date'), width:300 },
        { field: "isPaid", headerName: t('purchase.paid'), width : 100},
       
       
    
        { 
            field: 'products', 
            headerName:t('purchase.products'), 
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
        { field: "totalPrice", headerName: "Total ", width : 80},
    
        
       
      ];
    
      const rows = sales?.map((sales) => ({
        id: sales.id,
        createdAt : sales.createdAt,
        isPaid: sales.isPaid ? 'Yes' : 'No',
        products : sales.saleProducts,
        totalPrice : sales.totalPrice
     
      }));
    
 
  return (
    <UserLayout title='User Account'>
        <CardHeader
          sx={{textAlign:'left'}}
          action={
            <IconButton aria-label="">
              
            </IconButton>
          }
          title={t('purchase.title')}
          
        />
        <Divider/>
        <CardContent sx={{}}>
        <DataGridCustom
            rows={rows}
            columns={columns}
            isLoading={isLoading}
           
           
          />
            
          

        </CardContent>
    </UserLayout>
  )
}

export default MyPurchase


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticProps,InferGetStaticPropsType ,InferGetServerSidePropsType } from 'next'
import { DataGridCustom } from 'fleed/components/admin/ui/datagrid/DataGridCustom';

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
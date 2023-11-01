import UserLayout from 'fleed/components/layouts/UserLayout'
import React, { useState, useEffect, FC } from 'react'
import { Divider, CardContent, CardHeader,Box ,Chip, Stack} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import {  GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { fetchGetJSON } from "fleed/utils/api-helpers";
import ScrollBar from "fleed/components/admin/ui/scrollbar/ScrollBar";
import { useTranslation } from 'next-i18next'
import { DataGridCustom } from 'fleed/components/admin/ui/datagrid/DataGridCustom';



const drawerWidth = 240;


type Props = {
  id : string 
}
   
const MySubscription:FC<Props> = ({id}) => {

 
    const { data , error, isLoading } = useSWR<ISubscription[]>(`/api/user/subscriptions/${id}`,fetchGetJSON);
     const [subscriptions, setSubscriptions] = useState<ISubscription[]>([]);
    const {  t  } = useTranslation("common")
    
 
    
    useEffect(() => {
        if (data) {
            setSubscriptions(data);
        }
      }, [data]);


 

    const columns: GridColDef[] = [
        { field: "createdAt", headerName: t('purchase.date'), width:300 },
        { field: "isPaid", headerName: t('purchase.paid'), width : 100},
       
       
    
        { 
            field: 'packages', 
            headerName:t('purchase.packages'), 
            width: 300 ,
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
        { field: "totalPrice", headerName: "Total ", width : 80},
    
        
       
      ];
    
      const rows = subscriptions.map((subscription) => ({
        id: subscription.id,
        createdAt : subscription.createdAt,
        isPaid: subscription.isPaid ? 'Yes' : 'No',
        packages : subscription.subscriptionPackage,
        totalPrice : subscription.subscriptionPackage[0].subtotal
     
      }));
    
  
 
  return (
    <UserLayout title='User Account'>
        <CardHeader
          sx={{textAlign:'left'}}
          action={
            <IconButton aria-label="">
              
            </IconButton>
          }
          title={t('subscriptions.title')}
          
        />
        <Divider/>
        <CardContent sx={{height:'350px'}}>
        <DataGridCustom
            rows={rows}
            columns={columns}
            isLoading={isLoading}
           
           
          />
            
          

        </CardContent>
    </UserLayout>
  )
}

export default MySubscription


import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import { ISubscription, SubscriptionPackage } from 'fleed/interfaces/subscriptions';

export const getServerSideProps:GetServerSideProps = async ({ locale,req }) => {

   const cookies = req.cookies
  return {
    props: {
      id : cookies.user,
      ...(await serverSideTranslations(locale ?? 'en', [
        'common',
       
      ])),
      // Will be passed to the page component as props
    },
  }
}
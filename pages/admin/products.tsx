import NextLink from 'next/link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Chip, Grid, Link, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams, GridActionsCellItem } from '@mui/x-data-grid';
import useSWR from 'swr';
import React, { useState, useEffect, useContext } from "react";
import AdminLayout from 'fleed/components/layouts/AdminLayout';
import { IProduct } from 'fleed/interfaces';
import { fetchGetJSON } from 'fleed/utils/api-helpers';
import { Benefit, Benefits } from '../../interfaces/benefit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UiContext } from 'fleed/context/ui';
import fleedShopApi from 'fleed/api/fleedShopApi';
import ScrollBar from 'fleed/components/admin/ui/scrollbar/ScrollBar';
import { StyledDataGrid } from '../../components/admin/ui/datagrid/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGridCustom } from 'fleed/components/admin/ui/datagrid/DataGridCustom';






const ProductsPage = () => {

    const { data, error ,isLoading} = useSWR<IProduct[]>('/api/admin/products',fetchGetJSON);

    const [products, setProducts] = useState<IProduct[]>([]);

    const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)
   
    // if ( !data && !error ) return (<></>);
    
    useEffect(() => {
      if (data) {
        setProducts(data);
      }
    }, [data]);

    const rows = products!.map( product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        brochure : product.brochure,
        benefits : product.benefits
    }));
  
   
  //   if (!data && !error) return <></>;
   
    const deleteProduct = async ( productId: number) => {
      const previosProduct = products.map((user) => ({ ...user }));
      const newProduct = products.filter(user => user.id != productId)
      
      setProducts(newProduct)

      console.log(productId, " id del product ")
      try {
          const data = await fleedShopApi.delete("/admin/products", {data:{
              id: productId
          } })
          showSuccessAlert(data.data.message)
      } catch (error) {
        setProducts(previosProduct);
          console.log(error,"error");
          showErrorAlert("error")
      } 
  
     
    }

    const columns:GridColDef[] = [
    
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 200,
         
            renderCell: ({row}: GridRenderCellParams<any, number>) => {
                return (
                    <NextLink href={`/admin/products/${ row.id }`} passHref>
                        <Link underline='always'>
                            { row.name}
                        </Link>
                    </NextLink>
                )
            }
        },
        { field: 'price', headerName: 'Precio', width: 100, },
        { field: 'brochure', headerName: 'Brochure' ,width: 200, },

        { 
            field: 'benefits', 
            headerName: 'Benefits', 
            width:400,
            // flex: 3 ,
            renderCell: ({row}: GridRenderCellParams<any, number>) => {
                return (
                   <ScrollBar sx={{
                    height: 1,
                    '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
                   }}>
                   <Box sx={{overflowX:'scroll'}} >
                     {
                      row.benefits.map(( benefit:Benefits) => (
                        <Chip  key={benefit.benefit.id} label={benefit.benefit.name} size='small'/>
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
            // flex: .5,
            width: 100,
            cellClassName: 'actions',
            renderCell: ({ row }: GridRenderCellParams<any, number>) => {
                return(
                    <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={()=> deleteProduct(Number(row.id))}
                    color="error"
                  />
                )
            }
          },
        
    
    ];

  return (
    <AdminLayout 
        title={`Productos (${ data?.length })`} 
        
    >
        <Typography variant="h4" sx={{mb : 3}} textAlign="center" >
          Products
        </Typography>
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
                href="/admin/products/new"
            >
                Create Product
            </Button>
        </Box>

         <Grid container className='fadeIn' sx={{ overflowX :'hidden'}}>
            <Grid item xs={12} sx={{ height:'auto', width: '100%' }}>
                <DataGridCustom 
                 
                    isLoading={isLoading}
                 
                    rows={ rows }
                    columns={ columns }
                    // pageSizeOptions={[10]}

                />

            </Grid>
        </Grid>
        
    </AdminLayout>
  )
}

export default ProductsPage;
import NextLink from 'next/link';
import { AddOutlined, CategoryOutlined } from '@mui/icons-material';
import { Box, Button, CardMedia, Chip, Grid, Link, Stack, Typography } from '@mui/material'
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams, GridActionsCellItem } from '@mui/x-data-grid';
import useSWR from 'swr';
import React, { useState, useEffect, useContext } from "react";
import AdminLayout from 'fleed/components/layouts/AdminLayout';
import { IPackage, IProduct, ItemInterface, Services } from 'fleed/interfaces';
import { fetchGetJSON } from 'fleed/utils/api-helpers';
import { Benefit, Benefits } from '../../interfaces/benefit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UiContext } from 'fleed/context/ui';
import fleedShopApi from 'fleed/api/fleedShopApi';
import ScrollBar from 'fleed/components/admin/ui/scrollbar/ScrollBar';
import { StyledDataGrid } from './styles';
import LinearProgress from '@mui/material/LinearProgress';
import { DataGridCustom } from 'fleed/components/admin/ui/datagrid/DataGridCustom';







const ProductsPage = () => {

    const { data, error , isLoading} = useSWR<IPackage[]>('/api/admin/packages',fetchGetJSON);

    const [packages , setPackages] = useState<IPackage[]>([]);

    const {  showErrorAlert, showSuccessAlert} = useContext(UiContext)
   
    // if ( !data && !error ) return (<></>);
    
    useEffect(() => {
      if (data) {
        setPackages(data);
      }
    }, [data]);

    const rows = packages!.map( packaged => ({
        id: packaged.id,
        description: packaged.description,
        name: packaged.name,
        price: packaged.price,
        comments : packaged.comments,
        services : packaged.services
    }));
  
   
  //   if (!data && !error) return <></>;
   
    const deletePackage = async ( packageId: number) => {
      const previousPackage = packages.map((packaged) => ({ ...packaged }));
      const newPackage = packages.filter(packaged => packaged.id != packageId)
      
      setPackages(newPackage)

 
      try {
          const data = await fleedShopApi.delete("/admin/packages", {data:{
              id: packageId
          } })
          showSuccessAlert(data.data.message)
      } catch (error) {
        setPackages(previousPackage);
          console.log(error,"error");
          showErrorAlert("error")
      } 
  
     
    }

    const columns:GridColDef[] = [
    
        { 
            field: 'name', 
            headerName: 'Name', 
            width: 100 ,
            renderCell: ({row}: GridRenderCellParams<any, number>) => {
                return (
                    <NextLink href={`/admin/packages/${ row.id }`} passHref>
                        <Link underline='always'>
                            { row.name}
                        </Link>
                    </NextLink>
                )
            }
        },
        { field: 'price', headerName: 'Precio',  width: 100 , },
        { field: 'description', headerName: 'Description',   width: 200, },
        { field: 'comments', headerName: 'Comments',  width: 200,  },


        // { field: 'brochure', headerName: 'Brochure',  flex: 1 , },

        { 
            field: 'services', 
            headerName: 'Services', 
            width: 300,
            renderCell: ({row}: GridRenderCellParams<any, number>) => {
                return (
                   <ScrollBar sx={{
                    height: 1,
                    '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
                   }}>
                   <Box sx={{overflowX:'scroll'}} >
                     {
                      row.services.map(( service:Services) => (
                        <Chip  key={service.service.id} label={service.service.name} size='small'/>
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
                    onClick={()=> deletePackage(Number(row.id))}
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
          Packages
        </Typography>
        <Box display='flex' justifyContent='end' sx={{ mb: 2 }}>
            <Button
                startIcon={ <AddOutlined /> }
                color="secondary"
                href="/admin/packages/new"
            >
               Create Package
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
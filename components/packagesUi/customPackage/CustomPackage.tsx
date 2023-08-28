import { Box, CardHeader, Avatar, IconButton, Typography, Button,Card, CardContent } from '@mui/material'
import { useRouter } from 'next/router';
import React from 'react'
import {useState} from 'react';

export const CustomPackage = () => {

 const router = useRouter()
  return (
    <Card variant='elevation' className='mb-5 sm:mr-5  xl:w-3/12' >
        <CardHeader
          title="SELF DRIVING"
          subheader="TAILOR MADE FOR ME"         
        />
       
        <Box display="flex" justifyContent="space-around" flexDirection="column" alignItems="center">
           <Typography variant="subtitle2" color="secondary" textAlign="center" fontWeight={600}>
            PRICING VARIES BASED ON SERVICES
           </Typography>
           <Button variant="contained" color="secondary" className='mt-5' onClick={()=> router.push('/custom-package')}>
             Build your Service Package
           </Button>
        </Box>
        
    </Card>
  )
}

import { Box, CardHeader, Avatar, IconButton, Typography, Button,Card, CardContent } from '@mui/material'
import React from 'react'

export const CustomPackage = () => {
  return (
    <Card className='mb-5 sm:mr-5  xl:w-3/12' >
        <CardHeader
          title="SELF DRIVING"
          subheader="TAILOR MADE FOR ME"         
        />
        <Box display="flex" justifyContent="space-around" flexDirection="column" alignItems="center">
           <Typography variant="subtitle2" color="secondary" textAlign="center" fontWeight={600}>
            PRICING VARIES BASED ON SERVICES
           </Typography>
           <Button variant="contained" color="secondary" className='mt-5' >
             Build your Service Package
           </Button>
        </Box>
        
    </Card>
  )
}

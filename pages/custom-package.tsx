import { Box, Typography } from '@mui/material'
import Layout from 'fleed/components/layouts/Layout'
import { CreateBoard } from 'fleed/components/packagesUi/customPackage/CreateBoard'
import { useCheckout } from 'fleed/hooks/useCheckout'
import { useServices } from 'fleed/hooks/useServices'
import { fetchGetJSON } from 'fleed/utils/api-helpers'
import { motion } from 'framer-motion'
import React from 'react'

const CustomPage = () => {

  const { services , isLoading, isError} = useServices('/services',{fetcher : fetchGetJSON})
  const { handleCheckout, loading } = useCheckout()
  
  return (
    <Layout title="Create Custom Package">
        <Box sx={{ display : 'flex', flexDirection: 'column',justifyContent: 'center',alignItems :'center',width: '100%',marginTop:'120px',marginBottom:"10px"}} >
            <Typography component={motion.h1} animate={{scale : [1,1.3,1]}} variant="h1" color="inherit"  about="title">Drag and drop services you want</Typography>
            <CreateBoard services={services} handleCheckout={handleCheckout} loading={loading}/>
        </Box>
    </Layout>
  )
}

export default CustomPage
import { Box, Typography } from '@mui/material'
import Layout from 'fleed/components/layouts/Layout'
import { CreateBoard } from 'fleed/components/packagesUi/customPackage/CreateBoard'
import { useCheckout } from 'fleed/hooks/useCheckout'
import { useServices } from 'fleed/hooks/useServices'
import { fetchGetJSON } from 'fleed/utils/api-helpers'
import { motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'

import React from 'react'

const CustomPage = () => {

  const { services , isLoading, isError} = useServices('/services',{fetcher : fetchGetJSON})
  const { handleCheckout, loading } = useCheckout()
  const { t  } = useTranslation("common")
  
  return (
    <Layout title="Create Custom Package">
        <Box sx={{ display : 'flex', flexDirection: 'column',justifyContent: 'center',alignItems :'center',width: '100%',marginTop:'120px',marginBottom:"10px"}} >
            <Typography component={motion.h1} animate={{scale : [1,1.3,1]}} variant="h1" color="inherit"  about="title">{t("custom-package.title")}</Typography>
            <CreateBoard services={services} handleCheckout={handleCheckout} loading={loading}/>
        </Box>
    </Layout>
  )
}

export default CustomPage

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
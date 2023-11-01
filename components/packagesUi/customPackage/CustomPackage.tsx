import { Box, CardHeader, Typography, Button,Card } from '@mui/material'
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import React from 'react'
import { useTranslation } from 'next-i18next'

export const CustomPackage = () => {

 const router = useRouter()
 const { t } = useTranslation('common')
 
  return (
    <Card 
    component={motion.div}
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ ease: "easeOut", duration: 2 }}
    variant='elevation' className='mb-5 sm:mr-5  xl:w-3/12' >
        <CardHeader
          title="SELF DRIVING"
          subheader="TAILOR MADE FOR ME"         
        />
       
        <Box display="flex" justifyContent="space-around" flexDirection="column" alignItems="center">
           <Typography variant="subtitle2" color="secondary" textAlign="center" fontWeight={600}>
            {t('package-custom.text')}
           </Typography>
           <Button variant="contained" color="secondary" className='mt-5' onClick={()=> router.push('/custom-package')}>
           {t('package-custom.button')}

           </Button>
        </Box>
        
    </Card>
  )
}

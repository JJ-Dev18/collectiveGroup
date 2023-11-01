import React from 'react'
import Typography from '@mui/material/Typography'
import { Card, Link } from '@mui/material'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import NextLink from 'next/link';
import { useTranslation } from 'next-i18next'

export const PurchaseSuccess = () => {
  const { t } = useTranslation('common')
  return (
    <Card  className='bg-primary w-96 h-96 flex justify-evenly flex-col p-10 items-center '>
          <div className="rounded-full bg-primary w-28 h-28 flex justify-center items-center relative">
            <LocalMallIcon fontSize="large" color='inherit'/>
            <CheckCircleOutlineIcon color="success" fontSize='large' sx={{position:'absolute',bottom: 10,right: 0}}/>
          </div>
         <Typography variant="h2" color="inherit">
            {t('result-shop.msg')}
         </Typography>
          <Typography variant="caption" color="inherit" >
          {t('result-shop.info')}
          </Typography>
          <NextLink href='/' passHref legacyBehavior>
          <Link>
          {t('result-shop.bttn')}
          </Link>
          </NextLink>
    </Card>
  )
}

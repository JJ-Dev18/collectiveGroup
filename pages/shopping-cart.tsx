import dynamic from 'next/dynamic'
import { NextPage } from 'next'
import { AuthContext } from 'fleed/context/auth'
import { useContext, useMemo} from 'react';
import Layout from 'fleed/components/layouts/Layout'
import { fetchGetJSON } from 'fleed/utils/api-helpers';
import { Package } from 'fleed/components/packagesUi/Package';
import { Grid, Skeleton, Typography } from '@mui/material';
import { useCheckout } from 'fleed/hooks/useCheckout';
import  TableProducts  from 'fleed/components/productsUi/TableProducts';
import { CustomPackage } from 'fleed/components/packagesUi/customPackage/CustomPackage';
import { useData } from 'fleed/hooks/useData';
import { UiContext } from 'fleed/context/ui';

// import { CarouselComponent } from 'fleed/components/ui/Carousel';
import { motion } from "framer-motion"
import { useSubscribe } from 'fleed/hooks/useSubscribe';
import { useTranslation } from 'next-i18next'

const CarouselComponent = dynamic(() => import('fleed/components/ui/Carousel'), {
  loading: ()=> <Skeleton
  variant="rectangular"
  width="100vw"
  sx={{ height: {xs:'350px',  md : '500px', lg:'700px',xl :'1000px'}, bgcolor: 'grey.900'}}
/>
})
const TableProductsss = dynamic(() => import('fleed/components/productsUi/TableProducts'), {
  loading: ()=> <Skeleton
  variant="rectangular"
  width="100vw"
  sx={{ height: {xs:'350px',  md : '500px', lg:'700px',xl :'1000px'}, bgcolor: 'grey.900'}}
/>
})

const DonatePage: NextPage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {

  // const { products, isLoading : isLoadinProducts } = useProducts('/products',{
  //   fetcher : fetchGetJSON
  // });

  // const { packages, isLoading : isLoadingPackages} = usePackages('/packages',{
  //   fetcher : fetchGetJSON
  // });

  // const { benefits, isLoading : isLoadingBenefits} = useBenefits('/benefits',{
  //   fetcher : fetchGetJSON
  // });
  const { t ,i18n} = useTranslation('common')

  const { benefits ,products , packages , services } = useData({
    fetcher : fetchGetJSON
  })
  const { handleCheckoutSubscribe,loading }  = useSubscribe()
  // const { showInfoAlert , showSuccessAlert} = useContext(UiContext)
  const { isLoggedIn } = useContext(AuthContext)
  
  const columns =  useMemo(() => {
  
    const data = benefits.map( benefit => {
      let object :any = {}
      object.benefit= benefit.name
       products.map( product => {
         object[product.name] = false
          product.benefits?.map( benefitProduc => {
              if( benefitProduc.benefit.id === benefit.id){
                  object[product.name]= true
                  return
              }
            
          })
         return null 
       })
       return object
  })

  return data
  }, [benefits,products])
 
  const { handleCheckout } = useCheckout()
  
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example" >
         <CarouselComponent/>
         <Typography
         initial={{ x: -1000 }}
         animate={{ x: 0 }}
         transition={{
          type: "tween",
          duration: 2,
          delay: 1
      }}

         component={motion.h1} textAlign="center" color="inherit" marginTop={14}  about='title'>{t('title-products')} </Typography>
        
         <Grid container  alignItems="center" justifyContent="center" marginTop={6}>     
              <TableProducts loading={loading} columns={columns} products={products} handleCheckout={handleCheckout}/>            
         </Grid> 
            <Typography 
             initial={{ x: -1000 }}
             transition={{
              type: "tween",
              duration: 2,
              delay: 1
            }}
             
            animate={{ x: 0 }}
             // animate={{x: 20, y: -20}} 
            component={motion.h1}
            variant="h1" textAlign="center" color="inherit" about="title">{t('title-packages')} </Typography>
          <Grid container  alignItems="center" justifyContent="center" marginTop={6} >
          { packages.map(pack => {
             if(pack.id != "4") {
              return <Package isLoggedIn={isLoggedIn}  loading={loading} key={pack.id} handleCheckoutSubscribe={handleCheckoutSubscribe} packageInfo={pack}  />
             } else{
               return  <CustomPackage key={pack.id}/>
             }
          }   
          )}
          </Grid>
    
    </Layout>
  )
}

export default DonatePage

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
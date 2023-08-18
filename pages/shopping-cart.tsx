import { NextPage } from 'next'

import { AuthContext } from 'fleed/context/auth'
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Layout from 'fleed/components/layouts/Layout'
import axios from 'axios'
import { fleetshopApi } from 'fleed/api'
import { IProduct } from 'fleed/interfaces/product';
import useSWR from 'swr'
import { fetchGetJSON } from 'fleed/utils/api-helpers';
import { useProducts } from 'fleed/hooks/useProducts';
import { usePackages } from 'fleed/hooks/usePackages';
import { Package } from 'fleed/components/packagesUi/Package';
import Button from '@mui/material/Button'
import { Grid } from '@mui/material';
import { CustomPackage } from 'fleed/components/packagesUi/CustomPackage';
import { DebugCart } from 'use-shopping-cart';
import CartProviderComponent from '../components/cart/CartProvider';
import { useCheckout } from 'fleed/hooks/useCheckout';
import { TableProducts } from 'fleed/components/productsUi/TableProducts';
import { useBenefits } from 'fleed/hooks/useBenefits';
import { ItemInterface } from 'fleed/interfaces';

const DonatePage: NextPage = () => {

  const { products, isLoading : isLoadinProducts } = useProducts('/products',{
    fetcher : fetchGetJSON
  });

  const { packages, isLoading : isLoadingPackages} = usePackages('/packages',{
    fetcher : fetchGetJSON
  });

  const { benefits, isLoading : isLoadingBenefits} = useBenefits('/benefits',{
    fetcher : fetchGetJSON
  });

  const columns =  useMemo(() => {
    console.log("funcion de columns ejecutada")
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
      
         <Grid container  alignItems="center" justifyContent="center" >
          
              <TableProducts columns={columns} products={products} handleCheckout={handleCheckout}/>
               
         </Grid> 

          <Grid container  alignItems="center" justifyContent="center"  >
          { packages.map(pack => (   
              <Package key={pack.id} handleCheckout={handleCheckout} packageInfo={pack} />
          ))}
          <CustomPackage/>
          </Grid>
    
    </Layout>
  )
}

export default DonatePage


import { NextPage } from 'next'

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import { AuthContext } from 'fleed/context/auth'
import { useContext, useEffect, useRef, useState } from 'react';
import Layout from 'fleed/components/layouts/Layout'
import axios from 'axios'
import { fleetshopApi } from 'fleed/api'
import { IProduct } from 'fleed/interfaces/product';
import { FormEmail } from 'fleed/components/FormEmail';
import useSWR from 'swr'
import { fetchGetJSON } from 'fleed/utils/api-helpers';
import { useProducts } from 'fleed/hooks/useProducts';
import { usePackages } from 'fleed/hooks/usePackages';
import { Package } from 'fleed/components/Package';
import Button from '@mui/material/Button'
import { Grid } from '@mui/material';
import { CustomPackage } from 'fleed/components/CustomPackage';
import { DebugCart } from 'use-shopping-cart';

const DonatePage: NextPage = () => {

  const { products, isLoading : isLoadinProducts } = useProducts('/products',{
    fetcher : fetchGetJSON
  });

  const { packages, isLoading : isLoadingPackages} = usePackages('/packages',{
    fetcher : fetchGetJSON
  });


  
  
  
  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example" >
      
        <Cart>
          <Grid container  alignItems="center" justifyContent="center">
          { packages.map(pack => (   
              <Package key={pack.id} {...pack} />
          ))}
          <CustomPackage/>
          </Grid>

          {/* <DebugCart /> */}
        </Cart>
        
     
    </Layout>
  )
}

export default DonatePage


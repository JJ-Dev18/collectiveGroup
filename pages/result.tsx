import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useContext, useEffect} from 'react'
import PrintObject from '../components/PrintObject'
import Cart from '../components/cart/CartProvider'

import { fetchGetJSON } from '../utils/api-helpers'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'

type Props={
  session_id : string ,
  sale_id : string 
}

const ResultPage: FC <Props>= ({session_id,sale_id}) => {
  // const router = useRouter()
  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const { clearCart } = useShoppingCart()
  const { data, error } = useSWR(
    session_id
      ? `/api/checkout_sessions/${session_id}`
      : null,
    fetchGetJSON
  )

  useEffect(() => {
    const sendEmail = async() =>{
      if(data?.payment_intent.status === 'succeeded'){
        try {

           const {data :saleData} = await fleedShopApi.put('/sales-product',
           { 
            id : Number(data.metadata.sale_id),
            paymentResult :data?.payment_intent.status  ,
            isPaid : true,
            paidAt : data?.payment_method_types[0],
            transactionId : data.id,
            city : data.shipping_details.address.city,
            country : data.shipping_details.address.country


          })
          console.log(saleData,"se actualizo la venta")
           const postsend =  await fleedShopApi.post('/send', {...saleData,email : user?.email} )
          console.log(postsend, "Asdfasd ")     
          clearCart()    
        } catch (error) {
          console.log(error)
          
        }
      }
    }
    sendEmail()
  }, [data])
  

  if (error) return <div>failed to load</div>

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <Box sx={{ display : 'flex', flexDirection: 'column',justifyContent: 'center',alignItems :'center'}} >
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
         {
          (data?.payment_intent.status === 'succeeded') && <PurchaseSuccess/>
         }
      </Box>
    </Layout>
  )
}

export default ResultPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import Layout from 'fleed/components/layouts/Layout'
import { PurchaseSuccess } from 'fleed/components/ui/PurchaseSuccess'
import { Box, Container } from '@mui/material'
import fleedShopApi from 'fleed/api/fleedShopApi'
import { AuthContext } from 'fleed/context/auth'
import { useShoppingCart } from 'use-shopping-cart'

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  console.log(query)

  return {
    props: {
      session_id : query.session_id || '',
      sale_id : query.saleId || ''
    }
  }
}
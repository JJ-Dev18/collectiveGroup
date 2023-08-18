import { NextPage } from 'next'
import { useRouter } from 'next/router'

import PrintObject from '../components/PrintObject'
import Cart from '../components/cart/CartProvider'
import ClearCart from '../components/ClearCart'

import { fetchGetJSON } from '../utils/api-helpers'
import useSWR from 'swr'
import { useSearchParams } from 'next/navigation'

type Props={
  session_id : string 
}

const ResultPage: FC <Props>= ({session_id}) => {
  console.log(session_id,"props")
  // const router = useRouter()
  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    session_id
      ? `/api/checkout_sessions/${session_id}`
      : null,
    fetchGetJSON
  )

  if (error) return <div>failed to load</div>

  return (
    <Layout title="Checkout Payment Result | Next.js + TypeScript Example">
      <div className="page-container">
        <h1>Checkout Payment Result</h1>
        <h2>Status: {data?.payment_intent?.status ?? 'loading...'}</h2>
        <h3>CheckoutSession response:</h3>
        <PrintObject content={data ?? 'loading...'} />
        <Cart>
          <ClearCart />
        </Cart>
      </div>
    </Layout>
  )
}

export default ResultPage

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'
import { FC } from 'react'
import Layout from 'fleed/components/layouts/Layout'

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  console.log(query)

  return {
    props: {
      session_id : query.session_id || ''
    }
  }
}
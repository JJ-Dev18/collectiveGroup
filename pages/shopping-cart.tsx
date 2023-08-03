import { NextPage } from 'next'

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import Products from '../components/Products'
import { AuthContext } from 'fleed/context/auth'
import { useContext } from 'react'
import Layout from 'fleed/components/layouts/Layout'

const DonatePage: NextPage = () => {

  return (
    <Layout title="Shopping Cart | Next.js + TypeScript Example" >
      <div className="page-container">
        <h1>Shopping Cart</h1>
        <p>
          Powered by the{' '}
          <a href="https://useshoppingcart.com">use-shopping-cart</a> React
          hooks library.
        </p>
        <Cart>
          <CartSummary />
          <Products />
        </Cart>
      </div>
    </Layout>
  )
}

export default DonatePage
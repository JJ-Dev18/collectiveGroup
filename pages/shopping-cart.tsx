import { NextPage } from 'next'

import Cart from '../components/Cart'
import CartSummary from '../components/CartSummary'
import { AuthContext } from 'fleed/context/auth'
import { useContext, useEffect, useState } from 'react';
import Layout from 'fleed/components/layouts/Layout'
import axios from 'axios'
import { fleetshopApi } from 'fleed/api'
import { IProduct } from 'fleed/interfaces/product';

const DonatePage: NextPage = () => {

  const [products, setProducts] = useState<IProduct[]>([])

  useEffect(() => {
    const getProducts = async () => {
      const data = await fleetshopApi.get('/products')
      setProducts(data.data)

    }
    getProducts()
    
  }, [])
  
  console.log(products)
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
          {
              products.map( prod => (
                <div key={prod.id}>
                     <h1>{prod.product.name}</h1>
                </div>
              ))
          }
        </Cart>
      </div>
    </Layout>
  )
}

export default DonatePage
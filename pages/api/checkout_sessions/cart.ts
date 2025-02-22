import { dbProducts } from 'fleed/db'
import {  ItemInterface } from 'fleed/interfaces'
import { formatAmountForStripe } from 'fleed/utils/stripe-helpers'
import { NextApiRequest, NextApiResponse } from 'next'

import Stripe from 'stripe'
import { CartEntry } from 'use-shopping-cart/core'
import { Product } from 'use-shopping-cart/core'
// @ts-ignore
import { validateCartItems } from 'use-shopping-cart/utilities'
/*
 * Product data can be loaded from anywhere. In this case, we’re loading it from
 * a local JSON file, but this could also come from an async call to your
 * inventory management service, a database query, or some other API call.
 *
 * The important thing is that the product info is loaded from somewhere trusted
 * so you know the pricing information is accurate.
 */


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2022-11-15',
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const inventory = await dbProducts.getInventory() as Product[]
      const saleId: string = req.query.saleId as string
      const { products , user } = req.body 
      let customer;
      const {data} = await stripe.customers.search({
        query: `email:\'${user.email}\'`,
      });
     
      if(data.length > 0 ){
        customer = data[0]
      }
      else{
         customer =  await stripe.customers.create({
          email: user.email,
          name : user.name
        });
      }
      // Validate the cart details that were sent from the client.
      const  line_items = validateCartItems(inventory , products)
   
    
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        // submit_type: 'pay',
        customer : customer.id,
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        metadata:{ sale_id : saleId},
        line_items,
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/shopping-cart`,
        mode: 'payment',
      }
   
      
      // Pass the appearance object to the Elements instance
    
      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params)
      res.status(200).json(checkoutSession)
    } catch (err) {
      (err)
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
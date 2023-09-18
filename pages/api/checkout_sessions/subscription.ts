import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// data needed for checkout
export interface CheckoutSubscriptionBody {
  name : string;
  amount : number;
  customerId?: string;
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2022-11-15",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body as CheckoutSubscriptionBody;
  const subscriptionId: string = req.query.subscriptionId as string;
  // if user is logged in, redirect to thank you page, otherwise redirect to signup page.
  if (req.method === 'POST') {
    const query = `metadata[\'name\']:\'${body.name}\'`
    const price = await stripe.prices.search({
      query: query
    });
   
  try {
    //   const checkoutSession: Stripe.Checkout.Session =
    //   await stripe.checkout.sessions.create(params)
    // res.status(200).json(checkoutSession)
    const params: Stripe.Checkout.SessionCreateParams = {
      // submit_type: 'pay',
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      customer: body.customerId,
      metadata: { subscriptionId: subscriptionId },
      line_items: [
        // generate inline price and product
        {
          price: price.data[0].id,
          // price_data: {
          //   id :' price_1NpGT0CkEgyNPbHoP0ryEgmh',
          //   currency: "usd",
          //   recurring: {
          //     interval: body.interval,
          //   },
          //   unit_amount: body.amount,
          //   product_data: {
          //     name: body.plan,
          //     description: body.planDescription,
          //   },
          // },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/result-subscription?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/shopping-cart`,
      mode: "subscription",
    };

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(params);
    res.status(200).json(checkoutSession);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      return res.status(200).json({ message,status: error.statusCode });
    }
  }
}else {
  res.setHeader('Allow', 'POST')
  res.status(405).end('Method Not Allowed')
}
}

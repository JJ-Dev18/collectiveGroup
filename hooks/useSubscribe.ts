import { RedirectToCheckoutOptions, loadStripe } from "@stripe/stripe-js";
import { fleetshopApi } from "fleed/api";
import { AuthContext } from "fleed/context/auth";
import { UiContext } from "fleed/context/ui";
import { ItemInterface } from "fleed/interfaces";
import { fetchPostJSON } from "fleed/utils/api-helpers";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CartDetails, CartEntry } from "use-shopping-cart/core";

export const useSubscribe = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { showErrorAlert , showPromiseAlert} = useContext(UiContext)
  const { user } = useContext(AuthContext)

 
  

  const handleCheckoutSubscribe = async (
    cartEntry: ItemInterface | undefined | CartEntry
  ) => {
    try {
        setLoading(true);
        setErrorMessage("");
        const ID_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
        const STRIPE_PK = process.env.STRIPE_SECRET_KEY
        (STRIPE_PK)
        const stripe = await loadStripe(`${ID_PK}`) ;
        const appearance = {
          theme: 'night',
          labels: 'floating'
        };
        const elements = stripe?.elements({clientSecret : STRIPE_PK, appearance : { theme : 'night', labels : 'floating'}});
        // interface CheckoutSubscriptionBody {
        //     plan: string;
        //     planDescription: string;
        //     amount: number;
        //     interval: "month" | "year";
        //     customerId?: string;
        //   }
        const body ={
            name : cartEntry?.name,
            amount : cartEntry?.price,
            user
            // customerId : user?.id
        }
        const { data : subscriptionCreate } = await fleetshopApi.post('/subscriptions',{clienteId : user?.id ,packageSub : cartEntry})
        
        const response = await fetchPostJSON(`/api/checkout_sessions/subscription?subscriptionId=${subscriptionCreate.id}`,body);
        (response,"response de usesuscribe")
        if (response.statusCode > 399) {
          console.error(response.message);
          setErrorMessage(response.message);
          setLoading(false);
          showErrorAlert("Ops somethings is wrong... Please try later")

          return;
        }
       

        // (saleCreate)
         
         showPromiseAlert( stripe?.redirectToCheckout({ sessionId: response.id }))
    } catch (error) {
        (error)
        showErrorAlert("Ops somethings is wrong... Please try later")
    }
   
  };



  return {
    handleCheckoutSubscribe,
    loading,
    errorMessage,
  };
};

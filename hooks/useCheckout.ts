import { RedirectToCheckoutOptions } from "@stripe/stripe-js";
import { fleetshopApi } from "fleed/api";
import { AuthContext } from "fleed/context/auth";
import { UiContext } from "fleed/context/ui";
import { ItemInterface } from "fleed/interfaces";
import { fetchPostJSON } from "fleed/utils/api-helpers";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CartDetails, CartEntry } from "use-shopping-cart/core";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { cartDetails, cartCount, redirectToCheckout ,totalPrice} = useShoppingCart();
  const { showErrorAlert , showPromiseAlert} = useContext(UiContext)
  const { user } = useContext(AuthContext)

  console.log(totalPrice,"Cart")
  

  const handleCheckout = async (
    cartEntry: ItemInterface | undefined | CartEntry
  ) => {
    setLoading(true);
    setErrorMessage("");
    let data = cartDetails;
    let productsInCart:CartEntry[] = Object.values(cartDetails as CartEntry)
    if (cartEntry) {
      data = {
        [cartEntry.id]: { ...cartEntry, quantity: 1 },
      } as CartEntry;
     
      productsInCart = [{ ...cartEntry, quantity: 1 } as CartEntry]
    }
    console.log(cartDetails,productsInCart)
   
    try {
      
      const { data : saleCreate } = await fleetshopApi.post('/sales-product',{clienteId : user?.id ,products : productsInCart,totalPrice})
      const response = await fetchPostJSON(`/api/checkout_sessions/cart?saleId=${saleCreate.id}`, {products : data });
      
      if (response.statusCode > 399) {
        console.error(response.message);
        setErrorMessage(response.message);
        setLoading(false);
        showErrorAlert("Ops somethings is wrong... Please try later")
        return;
      }
      // console.log(saleCreate)
      // console.log(response, "response");
       showPromiseAlert( redirectToCheckout(response.id))
    } catch (error) {
      console.log(Error)
      showErrorAlert("Ops somethings is wrong... Please try later")

    }
    
    
  };



  return {
    handleCheckout,
    loading,
    errorMessage,
    cartCount
  };
};

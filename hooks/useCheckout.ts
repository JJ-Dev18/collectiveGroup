import { RedirectToCheckoutOptions } from "@stripe/stripe-js";
import { ItemInterface } from "fleed/interfaces";
import { fetchPostJSON } from "fleed/utils/api-helpers";
import { FC, useEffect, useState } from "react";
import { useShoppingCart } from "use-shopping-cart";
import { CartDetails, CartEntry } from "use-shopping-cart/core";

export const useCheckout = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { cartDetails, cartCount, redirectToCheckout } = useShoppingCart();

  const handleCheckout = async (
    cartEntry: ItemInterface | undefined
  ) => {
    setLoading(true);
    setErrorMessage("");
    let data = cartDetails;
    if (cartEntry) {
      data = {
        [cartEntry.id]: { ...cartEntry, quantity: 1 },
      } as CartEntry;
    }

    const response = await fetchPostJSON("/api/checkout_sessions/cart", data);

    if (response.statusCode > 399) {
      console.error(response.message);
      setErrorMessage(response.message);
      setLoading(false);
      return;
    }

    console.log(response, "response");
    redirectToCheckout(response.id);
  };

  useEffect(() => {
    console.log("se activo el hook ");
  }, []);

  return {
    handleCheckout,
    loading,
    errorMessage,
    cartCount
  };
};

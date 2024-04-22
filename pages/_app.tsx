import "fleed/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "fleed/context/auth";
import { UiProvider } from "fleed/context/ui";
import CartProviderComponent from "fleed/components/cart/CartProvider";
import 'react-toastify/dist/ReactToastify.css';

 function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
     <AuthProvider> 
         <UiProvider> 
         <CartProviderComponent> 
           <Component {...pageProps} />
         </CartProviderComponent> 
         </UiProvider> 
        </AuthProvider> 
    </SessionProvider> 
  );
}

export default appWithTranslation(App)

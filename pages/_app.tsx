import "fleed/styles/globals.css";
import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { lightTheme } from "fleed/themes";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "fleed/context/auth";
import { UiProvider } from "fleed/context/ui";
import CartProviderComponent from "fleed/components/CartProvider";

export default function App({ Component, pageProps }: AppProps) {
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

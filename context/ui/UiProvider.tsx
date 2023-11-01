
import { FC, useReducer , useEffect} from "react";
import { UiContext, uiReducer } from "./";
import Cookies from "js-cookie";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { customTheme, darkTheme, lightTheme } from "fleed/themes";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { StripeError } from "@stripe/stripe-js";
import { useTranslation } from 'next-i18next'
import { useRouter } from "next/router";
import { LANGS } from "fleed/components/admin/ui/adminHeader/LanguagePopover";

type Alert = {
  state : boolean
  msg : string
  type : string
}
export interface Language  {
  value : 'en' |'es',
  label : string,
  icon :string
 
}

export interface UiState {
  theme: Theme;
  alert : Alert
  language :Language
}

const UI_INITIAL_STATE: UiState = {
  theme: lightTheme,
  language :  {
    value: 'en',
    label: 'English',
    icon: '/flags/US.svg',
  },
  alert : {
    state : false,
    msg : '',
    type : ''
  }
};

interface Props {
  children?: React.ReactNode;
  
}

export const UiProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);
  const router = useRouter()
  const setTheme = (theme: string) => {
    dispatch({ type: "Set Theme", payload: (theme === 'light') ? lightTheme : darkTheme });
  };
 
  const setLanguage = (language:Language) => {
    // (language.value,"language")
    dispatch({type : 'Set Language',payload : language})
  }
  const showInfoAlert = (msg : string) =>{
    dispatch({type : 'Show Alert Info', payload : msg})
    toast.info(msg);
  }
  const showSuccessAlert = (msg : string) =>{
    dispatch({type : 'Show Alert Success', payload : msg})
    toast.success(msg);
  }
  const showWarningAlert = (msg : string) =>{
    dispatch({type : 'Show Alert Warning', payload : msg})
    toast.warning(msg);
  }
  const showErrorAlert = (msg : string) =>{
    dispatch({type : 'Show Alert Error', payload : msg})
    toast.error(msg);
  }

  const showPromiseAlert = async (promise:Promise<{ error: StripeError}> | undefined) =>{
    dispatch({type : 'Show Alert Promise'})
    if(promise)
    await toast.promise(promise,{
      pending: 'Redirecting to payment gateway',
      success: 'Done !  👌',
      error: 'Something is wrong with payment gateway 🤯'
    })
  }
  
  useEffect(() => { 
    const cookieTheme = Cookies.get("theme") || 'light'
    const language = LANGS.find(lang => lang.value === router.locale) 
    if(language){
      setLanguage(language)
    }
    const selectedTheme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'dark')
         ? darkTheme
         : customTheme
     setTheme(cookieTheme) 
   }, [])

  // useEffect(() => {
  //   setTheme(Cookies.get('theme') || 'light')
  // // (Cookies.get("theme"), "cookie")

  // }, [])
 
  return (
    <UiContext.Provider
      value={{
        state,
        setTheme,
        setLanguage,
        showInfoAlert,
        showSuccessAlert,
        showWarningAlert,
        showErrorAlert,
        showPromiseAlert,

      }}
    >
      <ThemeProvider theme={state.theme}>
        <CssBaseline/>
        {children}
        <ToastContainer position="top-left" autoClose={6000} closeButton={false} hideProgressBar={true} theme={state.theme.palette.mode} />

      </ThemeProvider>
    </UiContext.Provider>
  );
};



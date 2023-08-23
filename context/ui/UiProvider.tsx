
import { FC, useReducer , useEffect} from "react";
import { UiContext, uiReducer } from "./";
import Cookies from "js-cookie";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { customTheme, darkTheme, lightTheme } from "fleed/themes";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';

type Alert = {
  state : boolean
  msg : string
  type : string
}
export interface UiState {
  theme: Theme;
  alert : Alert
}

const UI_INITIAL_STATE: UiState = {
  theme: lightTheme,
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

  const setTheme = (theme: string) => {
    dispatch({ type: "Set Theme", payload: (theme === 'light') ? lightTheme : darkTheme });
  };

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

  const showPromiseAlert = async (promise:Promise<void>) =>{
    dispatch({type : 'Show Alert Promise'})
    await toast.promise(promise,{
      pending: 'Redirecting to payment gateway',
      success: 'Done !  👌',
      error: 'Something is wrong with payment gateway 🤯'
    })
  }
  
  useEffect(() => { 
    const cookieTheme = Cookies.get("theme") || 'light'
    const selectedTheme = cookieTheme === 'light'
      ? lightTheme
      : (cookieTheme === 'dark')
         ? darkTheme
         : customTheme
     setTheme(cookieTheme) 
   }, [])

  // useEffect(() => {
  //   setTheme(Cookies.get('theme') || 'light')
  // // console.log(Cookies.get("theme"), "cookie")

  // }, [])
 
  return (
    <UiContext.Provider
      value={{
        state,
        setTheme,
        showInfoAlert,
        showSuccessAlert,
        showWarningAlert,
        showErrorAlert,
        showPromiseAlert
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



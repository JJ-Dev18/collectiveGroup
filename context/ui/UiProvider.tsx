
import { FC, useReducer , useEffect} from "react";
import { UiContext, uiReducer } from "./";
import Cookies from "js-cookie";
import { CssBaseline, Theme, ThemeProvider } from "@mui/material";
import { customTheme, darkTheme, lightTheme } from "fleed/themes";


export interface UiState {
  theme: Theme;
}

const UI_INITIAL_STATE: UiState = {
  theme: lightTheme
};

interface Props {
  children?: React.ReactNode;
  
}

export const UiProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const setTheme = (theme: string) => {
    dispatch({ type: "Set Theme", payload: (theme === 'light') ? lightTheme : darkTheme });
  };

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
      }}
    >
      <ThemeProvider theme={state.theme}>
        <CssBaseline/>
      {children}
      </ThemeProvider>
    </UiContext.Provider>
  );
};



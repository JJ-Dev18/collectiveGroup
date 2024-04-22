import { StripeError } from "@stripe/stripe-js"
import { Language, UiState } from "fleed/context/ui"
import { lightTheme } from "fleed/themes"

const states :UiState  =  {
    theme: lightTheme,
    language :  {
      value: "en",
      label: 'English',
      icon: '/flags/US.svg',
    },
    alert : {
      state : false,
      msg : '',
      type : ''
    }
  }
export const initialSatetUiContext = {
    state : states,
    setTheme : (theme:string) => {},
    setLanguage : jest.fn(),
    showInfoAlert : (msg:string) => {},
    showErrorAlert : (msg:string) => {},
    showWarningAlert : (msg:string) => {},
    showSuccessAlert : (msg:string) => {},
    showPromiseAlert : (promise:Promise<{ error: StripeError}> | undefined) => {},

}
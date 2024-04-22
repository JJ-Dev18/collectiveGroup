import {  createContext } from 'react';
import { Language, UiState } from './UiProvider';
import { StripeError } from '@stripe/stripe-js';

export interface UiContextProps {
    state : UiState,
    setTheme : (theme:string) => void,
    setLanguage : (language:Language) => void,
    showInfoAlert : (msg:string) => void,
    showErrorAlert : (msg:string) => void,
    showWarningAlert : (msg:string) => void,
    showSuccessAlert : (msg:string) => void,
    showPromiseAlert : (promise:Promise<{ error: StripeError}> | undefined) => void,
}

export const UiContext = createContext({} as UiContextProps);
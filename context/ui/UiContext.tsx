import {  createContext } from 'react';
import { UiState } from './UiProvider';
import { StripeError } from '@stripe/stripe-js';

interface ContextProps {
    state : UiState,
    setTheme : (theme:string) => void,
    showInfoAlert : (msg:string) => void,
    showErrorAlert : (msg:string) => void,
    showWarningAlert : (msg:string) => void,
    showSuccessAlert : (msg:string) => void,
    showPromiseAlert : (promise:Promise<{ error: StripeError}> | undefined) => void,
}

export const UiContext = createContext({} as ContextProps);
import {  createContext } from 'react';
import { UiState } from './UiProvider';

interface ContextProps {
    state : UiState,
    setTheme : (theme:string) => void,
    showInfoAlert : (msg:string) => void,
    showErrorAlert : (msg:string) => void,
    showWarningAlert : (msg:string) => void,
    showSuccessAlert : (msg:string) => void,
    showPromiseAlert : (promise:Promise<void>) => void,
}

export const UiContext = createContext({} as ContextProps);
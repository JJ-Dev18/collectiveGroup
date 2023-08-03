import {  createContext } from 'react';
import { UiState } from './UiProvider';

interface ContextProps {
    state : UiState,
    setTheme : (theme:string) => void
}

export const UiContext = createContext({} as ContextProps);
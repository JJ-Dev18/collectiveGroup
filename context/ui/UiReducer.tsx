
import { UiState } from "./UiProvider";

import { Theme } from '@mui/material';

type UiAction = {type: 'Set Theme', payload: Theme } 




export const uiReducer = (state : UiState, action: UiAction ):UiState => {
  
    switch (action.type) {
        case 'Set Theme':
       
           return {
            ...state,
            theme : action.payload 
           }
        
                
        default:
            return state;
    }
}
import { Language, UiState } from "./UiProvider";

import { Theme } from "@mui/material";

type UiAction =
  | { type: "Set Theme"; payload: Theme }
  | { type : 'Set Language', payload : Language}
  | { type: "Show Alert Info"; payload: string }
  | { type: "Show Alert Error"; payload: string }
  | { type: "Show Alert Warning"; payload: string }
  | { type: "Show Alert Success"; payload: string }
  | { type: "Show Alert Promise" };

export const uiReducer = (state: UiState, action: UiAction): UiState => {
  switch (action.type) {
    case "Set Theme":
      return {
        ...state,
        theme: action.payload,
      };
      case 'Set Language':
        return {
          ...state,
          language: action.payload,
        };  
    case "Show Alert Info":
      return {
        ...state,
        alert: {
          state: true,
          msg: action.payload,
          type: "Info",
        },
      };
    case "Show Alert Error":
      return {
        ...state,
        alert: {
          state: true,
          msg: action.payload,
          type: "Error",
        },
      };
    case "Show Alert Warning":
      return {
        ...state,
        alert: {
          state: true,
          msg: action.payload,
          type: "Warning",
        },
      };
    case "Show Alert Success":
      return {
        ...state,
        alert: {
          state: true,
          msg: action.payload,
          type: "Success",
        },
      };
    case "Show Alert Promise":
      return {
        ...state,
        alert: {
          state: true,
          msg: 'Promise',
          type: "Promise",
        },
      };

    default:
      return state;
  }
};

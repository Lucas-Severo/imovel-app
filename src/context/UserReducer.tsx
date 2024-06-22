import { UserAction, UserContextType } from "./UserContext";

// Este componente obtém as ações que são possíveis realizar no sistema 
// SET_LOGGED e SIGN_OUT -> definidas no componente UserContext.tsx
// e executa cada ação
export const userReducer = (state: UserContextType, action: UserAction): UserContextType => {
    switch (action.type) {
      case 'SET_LOGGED':
        state = {
            ...state,
            currentUser: action.payload
        }
        return state
      case 'SIGN_OUT':
        state.currentUser = null
        return state
      default:
        return state;
    }
};

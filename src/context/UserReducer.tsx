import { UserAction, UserContextType } from "./UserContext";

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
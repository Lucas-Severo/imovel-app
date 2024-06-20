import { Dispatch, createContext, useReducer } from "react";
import { userReducer } from "./UserReducer";
import { User } from "firebase/auth";

export type UserContextType = {
    currentUser: User | null;
};

interface Store {
    state: UserContextType,
    dispatch: Dispatch<UserAction>
}

export type UserAction = { type: 'SET_LOGGED'; payload: User | null } | { type: 'SIGN_OUT'}

export const initialState = {
    currentUser: null
}

export const UserContext = createContext<Store>({} as Store)

const UserProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
import { Dispatch, createContext, useReducer } from "react";
import { userReducer } from "./UserReducer";
import { User } from "firebase/auth";

// Tipo para contexto do usuário
export type UserContextType = {
    currentUser: User | null;
};

// interface para passar as propriedades da Store
interface Store {
    state: UserContextType,
    dispatch: Dispatch<UserAction>
}

// Ações que podem ser feitas para o contexto do usuário
export type UserAction = { type: 'SET_LOGGED'; payload: User | null } | { type: 'SIGN_OUT'}


// Estado inicial da aplicação
export const initialState = {
    currentUser: null
}

export const UserContext = createContext<Store>({} as Store)

// Componente Criado para passar o estado da aplicação para os componentes filhos
const UserProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    return (
        <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/firebaseConnection";
import { UserContext } from "../context/UserContext";

interface PrivateProps {
  children: ReactNode;
}

export function Private({ children }: PrivateProps): JSX.Element {
  const [loading, setLoading] = useState(true);
  const {state, dispatch} = useContext(UserContext)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        // mudar para logado caso usuário autenticado
        dispatch({type: 'SET_LOGGED', payload: user})
      } else {
        setLoading(false);
        // mudar para deslogado caso usuário não autenticado
        dispatch({type: 'SET_LOGGED', payload: user})
      }
    });

    return () => {
      unsub();
    };
  }, []);

  if (loading) {
    return <div>Carregando.....</div>;
  }

  if (state?.currentUser === null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

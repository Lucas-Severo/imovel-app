import { signOut } from "firebase/auth";
import { useContext } from "react";
import { Link } from 'react-router-dom'
import { UserContext } from "../../context/UserContext";
import { auth } from "../../services/firebaseConnection";

export function Header() {

  const {state} = useContext(UserContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3" data-testid="header" style={{ minHeight: '80px' }}>
      <div className="container">
        <Link className="navbar-brand" to="/" id="bemVindoButton" data-testid="bemVindoButton">Bem-vindo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/imoveis" data-testid="imoveisButton">Imóveis</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/agendamentos" data-testid="agendamentosButton">Agendamentos</Link>
            </li>
            <li className="nav-item">
              {state?.currentUser && 
              <div className="d-flex align-items-center gap-3">
                <div className="vr"></div>
                <span>{state.currentUser.email}</span>
                <button className="btn btn-danger" onClick={() => signOut(auth)}>Sair</button>
              </div>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

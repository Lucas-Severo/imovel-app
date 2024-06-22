import { signInWithEmailAndPassword } from "firebase/auth"
import { FormEvent, useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { UserContext } from "../../context/UserContext"
import { auth } from "../../services/firebaseConnection"

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const { dispatch } = useContext(UserContext)

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        if (email === '' || password === '') {
            setError('Preencha todos os campos')
            return
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                console.log('Logado com sucesso')
                dispatch({type: 'SET_LOGGED', payload: auth.user})
                navigate('/imoveis', { replace: true })
            })
            .catch((error) => {
                console.error('Erro ao fazer login:', error.message)
                setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.')
            })
    }

    return (
        <div>
            <h1 style={{width: '300px', margin: '0 auto', padding: '20px', textAlign: 'center'}}>Login</h1>
            <div className="card" style={{width: '300px', margin: '0 auto'}}>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <input
                                data-testid="input-email"
                                className="input-group form-control"
                                style={{minWidth: '260px'}}
                                placeholder="joão@silva.com"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group mt-2">
                            <input
                                data-testid="input-senha"
                                className="form-control"
                                style={{minWidth: '260px'}}
                                placeholder="********"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <button data-testid="botao-login" className="btn btn-success" style={{minWidth: '260px', margin: '0 auto', marginTop: '20px'}} type="submit">Entrar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}


import { RouterProvider } from 'react-router-dom'
import './App.css'
import UserProvider from './context/UserContext'
import { router } from './routes'

// Todas as rotas receberão o estado do contexto do usuário
// Uma vez que estão embrulhadas pelo componente UserProvider, que conterá o estado da aplicação
function App() {

  return (
    <UserProvider>
      <RouterProvider router={ router } />
    </UserProvider>
  )
}

export default App

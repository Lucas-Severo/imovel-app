import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/layout';
import { Login } from './pages/login';
import { NotFound } from './pages/notfound';
import { Private } from './routes/Private';
import { ImovelCadastro } from './pages/imovel/ImovelCadastro';
import { ImovelDetalhes } from './pages/imovel/ImovelDetalhes';
import { ListaImoveis } from './pages/imovel/ListaImoveis';
import { ImovelEdicao } from './pages/imovel/ImovelEdicao';
import { ModalAgendamento } from './components/modal/ModalAgendamento';
import { ListaAgendamento } from './pages/agendamento/ListaAgendamento';
import { ModalAlugar } from './components/modal/ModalAlugar';
import { ModalComprar } from './components/modal/ModalComprar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Private><ListaImoveis/></Private>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/imoveis',
        element: <Private><ListaImoveis/></Private>
      },
      {
        path: '/imoveis/:id',
        element: <Private><ImovelDetalhes/></Private>,
        children: [{
          path: 'agendamento',
          element: <ModalAgendamento/>,
          children: []
        },
        {
          path: 'alugar',
          element: <ModalAlugar/>,
          children: []
        },
        {
          path: 'comprar',
          element: <ModalComprar/>,
          children: []
        }]
      },
      {
        path: '/imoveis/cadastrar',
        element: <Private><ImovelCadastro/></Private>
      },
      {
        path: '/imoveis/:id/editar',
        element: <Private><ImovelEdicao/></Private>
      },
      {
        path: '/agendamentos',
        element: <Private><ListaAgendamento/></Private>
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ]
  }
]);

export { router };

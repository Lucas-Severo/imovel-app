import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';
import { Private } from "../../routes/Private";
import { ListaAgendamento } from "./ListaAgendamento";


describe("No ListaAgendamento", () => {

    test('Deve montar componente ListaAgendamento', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Private><ListaAgendamento/></Private></RouterProvider></UserProvider>)

        expect(container).toBeTruthy()
    })

    
})
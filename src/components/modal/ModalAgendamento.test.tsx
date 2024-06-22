import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import { router } from '../../routes';
import { ModalAgendamento } from "./ModalAgendamento";
import UserProvider from "../../context/UserContext";
import { Private } from "../../routes/Private";


describe("No ModalAgendamento", () => {

    test('Deve montar componente modal agendamento', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Private><ModalAgendamento/></Private></RouterProvider></UserProvider>)

        expect(container).toBeTruthy()
    })

    
})
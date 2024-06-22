import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';
import { Private } from "../../routes/Private";
import { ListaImoveis } from "./ListaImoveis";


describe("No ImovelEdicao", () => {

    test('Deve montar componente ListaImoveis', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Private><ListaImoveis/></Private></RouterProvider></UserProvider>)

        expect(container).toBeTruthy()
    })

    
})
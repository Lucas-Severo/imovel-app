import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';
import { Private } from "../../routes/Private";
import { ImovelDetalhes } from "./ImovelDetalhes";


describe("No ImovelDetalhes", () => {

    test('Deve montar componente ImovelDetalhes', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Private><ImovelDetalhes/></Private></RouterProvider></UserProvider>)

        expect(container).toBeTruthy()
    })

    
})
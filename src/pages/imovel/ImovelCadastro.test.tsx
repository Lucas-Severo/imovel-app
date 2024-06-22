import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';
import { Private } from "../../routes/Private";
import { ImovelCadastro } from "./ImovelCadastro";


describe("No ImovelCadastro", () => {

    test('Deve montar componente ImovelCadastro', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Private><ImovelCadastro/></Private></RouterProvider></UserProvider>)

        expect(container).toBeTruthy()
    })

    
})
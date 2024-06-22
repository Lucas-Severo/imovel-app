import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';
import { Private } from "../../routes/Private";
import { ImovelEdicao } from "./ImovelEdicao";


describe("No ImovelEdicao", () => {

    test('Deve montar componente ImovelEdicao', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Private><ImovelEdicao/></Private></RouterProvider></UserProvider>)

        expect(container).toBeTruthy()
    })

    
})
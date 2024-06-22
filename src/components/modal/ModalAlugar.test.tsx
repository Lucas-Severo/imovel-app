import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';
import { Private } from "../../routes/Private";
import { ModalAlugar } from "./ModalAlugar";


describe("No ModaAlugar", () => {

    test('Deve montar componente modal alugar', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Private><ModalAlugar/></Private></RouterProvider></UserProvider>)
        expect(container).toBeTruthy()
    })
    
})
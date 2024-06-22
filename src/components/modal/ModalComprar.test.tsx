import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';
import { Private } from "../../routes/Private";
import { ModalComprar } from "./ModalComprar";


describe("No ModalComprar", () => {

    test('Deve montar componente modal comprar', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Private><ModalComprar/></Private></RouterProvider></UserProvider>)
        expect(container).toBeTruthy()
    })
    
})
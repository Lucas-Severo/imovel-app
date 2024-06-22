import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import { Login } from ".";
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';


describe("No Login", () => {

    test('Deve montar componente Login', async () => {
        const { container } = await render(<UserProvider><RouterProvider router={ router }><Login/></RouterProvider></UserProvider>)

        expect(container).toBeTruthy()
    })

    test('Deve conter o input de email', async () => {
        const { findByTestId } = await render(<UserProvider><RouterProvider router={ router }><Login/></RouterProvider></UserProvider>)

        expect(findByTestId("input-email")).toBeTruthy()
    })

    test('Deve conter o input de senha', async () => {
        const { findByTestId } = await render(<UserProvider><RouterProvider router={ router }><Login/></RouterProvider></UserProvider>)

        expect(findByTestId("input-senha")).toBeTruthy()
    })

    test('Deve conter botão login', async () => {
        const { findByTestId } = await render(<UserProvider><RouterProvider router={ router }><Login/></RouterProvider></UserProvider>)

        expect(findByTestId("botao-login")).toBeTruthy()
    })
    
})
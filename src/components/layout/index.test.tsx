import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import { Layout } from ".";
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';


describe("No Sobre", () => {

    test('Deve possuir um header', async () => {
        //ARRANGE - organiza os elementos em variáveis

        //Importa as funções e renderiza o componente Formulario
        const { getByTestId } = render(<UserProvider><RouterProvider router={ router }><Layout/></RouterProvider></UserProvider>)

        //Buscao botão pela função
        const header = await getByTestId("header")

        expect(header).toBeTruthy()
    })

    test('Deve possuir um body', async () => {
        //ARRANGE - organiza os elementos em variáveis

        //Importa as funções e renderiza o componente Formulario
        const { getByTestId } = render(<UserProvider><RouterProvider router={ router }><Layout/></RouterProvider></UserProvider>)

        const body = await getByTestId("body")

        expect(body).toBeTruthy()
    })

    test('Deve possuir um footer', async () => {
        //ARRANGE - organiza os elementos em variáveis

        //Importa as funções e renderiza o componente Formulario
        const { getByTestId } = render(<UserProvider><RouterProvider router={ router }><Layout/></RouterProvider></UserProvider>)

        const footer = await getByTestId("footer")

        expect(footer).toBeTruthy()
    })

    
})
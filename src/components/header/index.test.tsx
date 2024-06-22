import { render } from "@testing-library/react";
import { RouterProvider } from 'react-router-dom';
import { Header } from ".";
import UserProvider from "../../context/UserContext";
import { router } from '../../routes';


describe("No Sobre", () => {
    const dispatch = jest.fn();

    test('Deve ter botão bem vindo para página inicial', async () => {
        const { getByTestId } = render(<UserProvider><RouterProvider dispatch={ dispatch } router={ router }><Header/></RouterProvider></UserProvider>)

        //Buscao botão pela função
        const botaoAdicionar = await getByTestId("bemVindoButton")

        expect(botaoAdicionar?.textContent).toEqual("Bem-vindo")
    })

    test('Deve ter botão imóveis', async () => {
        const { getByTestId } = render(<UserProvider><RouterProvider router={ router }><Header/></RouterProvider></UserProvider>)

        //Buscao botão pela função
        const botaoAdicionar = await getByTestId("imoveisButton")

        expect(botaoAdicionar?.textContent).toEqual("Imóveis")
    })

    test('Deve ter botão agendamentos', async () => {
        const { getByTestId } = render(<UserProvider><RouterProvider router={ router }><Header/></RouterProvider></UserProvider>)

        //Buscao botão pela função
        const botaoAdicionar = await getByTestId("agendamentosButton")

        expect(botaoAdicionar?.textContent).toEqual("Agendamentos")
    })
})
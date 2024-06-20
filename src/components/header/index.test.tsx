import {render, waitForElementToBeRemoved} from "@testing-library/react"
import { NotFound } from "../../pages/notfound"

import { RouterProvider } from 'react-router-dom'
import { router } from '../../routes'


describe("No Sobre", () => {
    const mockAoSubmeter = jest.fn();

    test('Deve ter botão bem vindo para página inicial', async () => {

        //ARRANGE - organiza os elementos em variáveis

        //Importa as funções e renderiza o componente Formulario
        const { getByRole, getByTestId, container } = render(<RouterProvider router={ router }><NotFound/></RouterProvider>)

        //Buscao botão pela função
        const botaoAdicionar = await getByTestId("bemVindoButton")

        //ASSERT - cria hipóteses para serem testadas   

        //Verifica se os elementos estão na págin

        //Verifica se o botão está desabilitado
        expect(botaoAdicionar?.textContent).toEqual("Bem-vindo")
    })

    test('Deve ter botão favorito', async () => {

        //ARRANGE - organiza os elementos em variáveis

        //Importa as funções e renderiza o componente Formulario
        const { getByTestId, container } = render(<RouterProvider router={ router }><NotFound/></RouterProvider>)

        //Buscao botão pela função
        const botaoAdicionar = await getByTestId("favoritosButton")

        //ASSERT - cria hipóteses para serem testadas   

        //Verifica se os elementos estão na págin

        //Verifica se o botão está desabilitado
        expect(botaoAdicionar?.textContent).toEqual("Favoritos")
    })
})
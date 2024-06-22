import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Imovel, addImovel } from "../../services/imovelService";

export function ImovelCadastro() {
    const navigate = useNavigate()
    const [imovel] = useState<Imovel>({
        id: '',
        descricao: '',
        cidade: '',
        estado: '',
        endereco: '',
        numero: '',
        permiteCompra: false, 
        permiteAluguel: false,
        situacao: 'EM_ABERTO',
        valorAluguel: 0,
        valorCompra: 0
    })

    // inicializar lista de estados com lista padrão
    const [estados] = useState(['Acre (AC)', 'Alagoas (AL)', 'Amapá (AP)', 'Amazonas (AM)', 
        'Bahia (BA)', 'Ceará (CE)', 'Distrito Federal (DF)', 'Espírito Santo (ES)', 
        'Goiás (GO)', 'Maranhão (MA)', 'Mato Grosso (MT)', 'Mato Grosso do Sul (MS)', 
        'Minas Gerais (MG)', 'Pará (PA)', 'Paraíba (PB)', 'Paraná (PR)', 
        'Pernambuco (PE)', 'Piauí (PI)', 'Rio de Janeiro (RJ)', 'Rio Grande do Norte (RN)', 
        'Rio Grande do Sul (RS)', 'Rondônia (RO)', 'Roraima (RR)', 'Santa Catarina (SC)', 
        'São Paulo (SP)', 'Sergipe (SE)', 'Tocantins (TO)'])
    const [permiteAluguel, setPermiteAluguel] = useState(false)
    const [permiteCompra, setPermiteCompra] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    // salvar um imóvel
    const salvarImovel = async () => {
        if(validarFormulario()) {
            await addImovel(imovel)
            navigate('/imoveis')
        }
    }

    // validar todas as propriedades obrigatórias preenchidas
    const validarFormulario = () => {
        let message = ''
        if (imovel.descricao === undefined || imovel.descricao === '') {
            message = 'Preencha a descrição'
        }
        if (imovel.cidade === undefined || imovel.cidade === '') {
            message += ', Preencha a cidade'
        }
        if (imovel.estado === undefined || imovel.estado === '') {
            message += ', Preencha o estado'
        }
        if (imovel.endereco === undefined || imovel.endereco === '') {
            message += ', Preencha o endereço'
        }
        if (imovel.numero === undefined || imovel.numero === '') {
            message += ', Preencha o número'
        }
        if ((imovel.permiteAluguel === undefined && imovel.permiteCompra === undefined) || (imovel.permiteAluguel === false && imovel.permiteCompra === false)) {
            message += ', Informe se o imóvel permite aluguel ou compra'
        }
        if (imovel.permiteAluguel && (imovel.valorAluguel === undefined || imovel.valorAluguel < 1)) {
            message += ', Preencha o valor do aluguel'
        }
        if (imovel.permiteCompra && (imovel.valorCompra === undefined || imovel.valorCompra < 1)) {
            message += ', Preencha o valor da compra'
        }

        setErrorMessage(message)

        return message === ''
    }


  return (
    <div className="container" style={{paddingTop: '20px'}}>
      <form>
        <div className="row">
          <div className="col">
            <label htmlFor="formGroupDescricao">Descrição</label>
            <input type="text" className="form-control" id="formGroupDescricao" placeholder="Casa" onChange={value => imovel.descricao = value.target.value}/>
          </div>
          <div className="col">
            <label htmlFor="formGroupCidade">Cidade</label>
            <input type="text" className="form-control" id="formGroupCidade" placeholder="São Paulo" onChange={value => imovel.cidade = value.target.value}/>
          </div>
          <div className="col">
            <label htmlFor="formGroupEstado">Estado</label>
            <select className="form-control" id="formGroupEstado" onChange={value => imovel.estado = value.target.value}>
                {
                    estados.map(estado => (
                        <option key={estado}>{estado}</option>
                    ))
                }
            </select>
          </div>
        </div>
        <div className="row">
            <div className="col">
                <label htmlFor="formGroupEndereco">Endereço</label>
                <input type="text" className="form-control" id="formGroupEndereco" placeholder="Rua João" onChange={value => imovel.endereco = value.target.value}/>
            </div>
            <div className="col">
                <label htmlFor="formGroupNumero">Número</label>
                <input type="number" className="form-control" id="formGroupNumero" placeholder="Nº 10" onChange={value => imovel.numero = value.target.value}/>
            </div>
        </div>
        <div className="row">
            <div className="col-2">
                <div className="form-check">
                    <input onClick={() => {
                        imovel.permiteAluguel = !permiteAluguel
                        setPermiteAluguel(!permiteAluguel)
                    }} className="form-check-input" type="checkbox" value="" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        Alugar
                    </label>
                </div>
                <div className="form-check">
                    <input onClick={() => {
                        imovel.permiteCompra = !permiteCompra
                        setPermiteCompra(!permiteCompra)
                    }} className="form-check-input" type="checkbox" value="" id="defaultCheck2"/>
                    <label className="form-check-label" htmlFor="defaultCheck2">
                        Comprar
                    </label>
                </div>
            </div>
            {permiteAluguel && 
                <div className="col">
                <label htmlFor="formGroupNumero">Valor Aluguel</label>
                <input type="number" min={1} className="form-control" id="formGroupNumero" placeholder="10000,00" onChange={value => imovel.valorAluguel = Number(value.target.value)}/>
            </div>}
            {permiteCompra && 
                <div className="col">
                    <label htmlFor="formGroupNumero">Valor Compra</label>
                    <input type="number" min={1} className="form-control" id="formGroupNumero" placeholder="100000,00" onChange={value => imovel.valorCompra = Number(value.target.value)}/>
                </div>}
        </div>
        <button className="btn btn-success" onClick={event => {
            event.preventDefault()
            salvarImovel()
        }}>Salvar</button>
      </form>
      <div>
        <strong className="text-danger">{errorMessage}</strong>
      </div>
    </div>
  );
}

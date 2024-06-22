import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Imovel, getImovelById, updateImovel } from "../../services/imovelService";

export function ImovelEdicao() {
    const navigate = useNavigate()
    const { id } = useParams<{ id?: string }>();
    const [imovel, setImovel] = useState<Imovel>({
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

    // carregar informações salvas do imóvel
    useEffect(() => {
        if (id) {
            getImovelById(id).then(imovel => {
                setImovel(imovel)
                setPermiteAluguel(imovel.permiteAluguel)
                setPermiteCompra(imovel.permiteCompra)
            })
        }
    }, [])

    // método que atualiza imóvel e volta para a página de detalhes do imóvel
    const editarImovel = async () => {
        if(validarFormulario()) {
            await updateImovel(imovel)
            navigate(`/imoveis/${imovel.id}`)
        }
    }

    // validar se todas propriedades obrigatórias preenchidas
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
            <input 
                type="text" 
                className="form-control" 
                id="formGroupDescricao" 
                placeholder="Casa" 
                value={imovel.descricao} 
                onChange={value => setImovel({...imovel, descricao: value.target.value})}/>
          </div>
          <div className="col">
            <label htmlFor="formGroupCidade">Cidade</label>
            <input 
                type="text" 
                className="form-control" 
                id="formGroupCidade" 
                placeholder="São Paulo" 
                value={imovel.cidade} 
                onChange={value => setImovel({...imovel, cidade: value.target.value})}/>
          </div>
          <div className="col">
            <label htmlFor="formGroupEstado">Estado</label>
            <select 
                className="form-control" 
                id="formGroupEstado" 
                value={imovel.estado} 
                onChange={value => setImovel({...imovel, estado: value.target.value})}>
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
                <input 
                    type="text" 
                    className="form-control" 
                    id="formGroupEndereco" 
                    placeholder="Rua João"
                    value={imovel.endereco} 
                    onChange={value => setImovel({...imovel,endereco: value.target.value})}/>
            </div>
            <div className="col">
                <label htmlFor="formGroupNumero">Número</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="formGroupNumero" 
                    placeholder="Nº 10"
                    value={imovel.numero} 
                    onChange={value => setImovel({...imovel, numero: value.target.value})}/>
            </div>
        </div>
        <div className="row">
            <div className="col-2">
                <div className="form-check">
                    <input onChange={() => {
                        imovel.permiteAluguel = !permiteAluguel
                        setPermiteAluguel(!permiteAluguel)
                    }} checked={imovel.permiteAluguel} className="form-check-input" type="checkbox" id="defaultCheck1"/>
                    <label className="form-check-label" htmlFor="defaultCheck1">
                        Alugar
                    </label>
                </div>
                <div className="form-check">
                    <input onChange={() => {
                        imovel.permiteCompra = !permiteCompra
                        setPermiteCompra(!permiteCompra)
                    }} checked={imovel.permiteCompra} className="form-check-input" type="checkbox" id="defaultCheck2"/>
                    <label className="form-check-label" htmlFor="defaultCheck2">
                        Comprar
                    </label>
                </div>
            </div>
            {permiteAluguel && 
                <div className="col">
                <label htmlFor="formGroupValorAluguel">Valor Aluguel</label>
                <input 
                    type="number" 
                    min={1} 
                    className="form-control" 
                    id="formGroupValorAluguel" 
                    placeholder="10000,00" 
                    value={imovel.valorAluguel} 
                    onChange={value => setImovel({...imovel, valorAluguel: Number(value.target.value)})}/>
            </div>}
            {permiteCompra && 
                <div className="col">
                    <label htmlFor="formGroupValorCompra">Valor Compra</label>
                    <input 
                        type="number" 
                        min={1} 
                        className="form-control" 
                        id="formGroupValorCompra" 
                        placeholder="100000,00" 
                        value={imovel.valorCompra} 
                        onChange={value => setImovel({...imovel, valorCompra: Number(value.target.value)})}/>
                </div>}
        </div>
        <button className="btn btn-success" onClick={event => {
            event.preventDefault()
            editarImovel()
        }}>Salvar</button>
      </form>
      <div>
        <strong className="text-danger">{errorMessage}</strong>
      </div>
    </div>
  );
}

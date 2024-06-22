import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Imovel, getImovelById, liberarAluguelImovel, obterValorSituacao, removeImovelById } from "../../services/imovelService";

export function ImovelDetalhes() {
    const navigate = useNavigate()
    const { id } = useParams<{ id?: string }>();
    const [imovel, setImovel] = useState<Imovel>()

    // buscar o imóvel ao construir objeto
    useEffect(() => {
      buscarImovel()
    }, [])

    // buscar o imóvel por id passado na rota
    const buscarImovel = async () => {
      if (id) {
        getImovelById(id).then(imovel => {
            setImovel(imovel)
        })
      }
    }

    // método para remover imóvel e voltar para listagem de imóveis
    const removerImovel = async () => {
      if (id) {
        await removeImovelById(id)
        navigate('/imoveis')
      }
    }

    // método para abrir modal de alugar imóvel
    const alugarImovel = async (id: string) => {
      if (id) {
        navigate('alugar', {state: imovel})
      }
    }

    // método para abrir modal de comprar imóvel
    const comprarImovel = async (imovel: Imovel) => {
      if (imovel.id) {
        navigate('comprar', {state: imovel})
      }
    }

    // método para abrir modal de liberar imóvel
    const liberarImovel = async (imovel: Imovel) => {
      if (imovel.id) {
        await liberarAluguelImovel(imovel)
        await buscarImovel()
      }
    }

  return (
    <div className="container">
      {imovel?.situacao === 'EM_ABERTO' && (
        <div className="d-flex justify-content-center py-2 gap-3">
          <Link className="btn btn-primary" to={`agendamento`}>Agendar Visita</Link>
          <Link className="btn btn-dark" to={`/imoveis/${imovel?.id}/editar`}>Editar</Link>
          <button className="btn btn-secondary" onClick={removerImovel}>Remover</button>
        </div>
      )}
      <div className="row">
        <div className="col">
          {
            imovel && <div key={imovel.id} className="card col" style={{width: '750px', maxWidth: '100%', height: '100%', margin: '0 auto'}}>
                <img className="card-img-top" style={{width: '100%', margin: '0 auto'}} src="https://vgprojetos.com/wp-content/uploads/2022/09/P11-IMG-2.jpg.webp" alt="Card image cap"></img>
                <div className="card-body">
                    <h3 className="card-title">{imovel.descricao}</h3>
                    <p className="card-text">Cidade: {imovel.cidade}</p>
                    <p className="card-text">Estado: {imovel.estado}</p>
                    <p className="card-text">Endereço: {imovel.endereco} {imovel.numero}</p>
                    <p className="card-text">Situação: {obterValorSituacao(imovel.situacao)}</p>
                    {imovel.permiteAluguel && imovel.situacao === 'EM_ABERTO' && <p>Valor Aluguel: {imovel.valorAluguel}</p>}
                    {imovel.permiteCompra && imovel.situacao === 'EM_ABERTO' && <p>Valor Compra: {imovel.valorCompra}</p>}
                    {(imovel.permiteAluguel && imovel.situacao === 'EM_ABERTO') && <button className="btn btn-success" style={{marginRight: '8px'}} onClick={()=> alugarImovel(imovel.id)}>Alugar</button>}
                    {(imovel.permiteAluguel && imovel.situacao !== 'VENDIDO' && imovel.situacao !== 'EM_ABERTO') && <button className="btn btn-success" style={{marginRight: '8px'}} onClick={()=> liberarImovel(imovel)}>Liberar</button>}
                    {imovel.permiteCompra && imovel.situacao === 'EM_ABERTO' && <button className="btn btn-success" onClick={() => comprarImovel(imovel)}>Comprar</button>}
                </div>
            </div>
          }
        </div>
      </div>
      <Outlet/>
    </div>
  );
}

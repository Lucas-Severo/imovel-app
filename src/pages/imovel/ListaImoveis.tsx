import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Imovel, getImoveis, obterValorSituacao } from "../../services/imovelService";

export function ListaImoveis() {

    const [imoveis, setImoveis] = useState<Imovel[]>([])

    // obter todos imóveis cadastrados
    useEffect(() => {
        getImoveis().then(imoveis => {
            setImoveis(imoveis)
        })
    }, [])


  return (
    <div className="container">
      <Link className="btn btn-success" to={`/imoveis/cadastrar`}>Novo Imóvel</Link>
      <div className="row row-gap-3">
          {
            imoveis.map(imovel => (
                <div key={imovel.id} className="card col" style={{minWidth: '400px', maxWidth: '400px', margin: '5px'}}>
                    <img className="card-img-top" style={{ width: '100%' }} src="https://vgprojetos.com/wp-content/uploads/2022/09/P11-IMG-2.jpg.webp" alt="Card image cap"></img>
                    <div className="card-body">
                        <h5 className="card-title">{imovel.descricao}</h5>
                        <p className="card-text">Cidade: {imovel.cidade}</p>
                        <p className="card-text">Estado: {imovel.estado}</p>
                        <p className="card-text">Endereço: {imovel.endereco} {imovel.numero}</p>
                        <p className="card-text">Situação: {obterValorSituacao(imovel.situacao)}</p>
                        <Link className="btn btn-secondary" to={`/imoveis/${imovel.id}`}>Ver</Link>
                    </div>
                </div>
            ))
          }
      </div>
    </div>
  );
}

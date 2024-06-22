import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AgendamentoVisitaImovel, getAgendamentoVisitas, removeAgendamentoById } from "../../services/agendamentoService";

export function ListaAgendamento() {
    const [agendamentos, setAgendamentos] = useState<AgendamentoVisitaImovel[]>([])

    useEffect(() => {
      // buscar todos os agendamentos do banco de dados
      buscarAgendamentos()
    }, [])

    const buscarAgendamentos = () => {
      getAgendamentoVisitas().then(agendamentos => {
        setAgendamentos(agendamentos)
      })
    }

    // formatar data que está vindo do banco de dados
    const obterDataHoraFormatada = (agendamento: AgendamentoVisitaImovel) => {
      return agendamento.dataAgendamento.toDate().toLocaleString('pt-br')
    }

    // Remover agendamento
    const removerAgendamento = async (agendamento: AgendamentoVisitaImovel) => {
      if (agendamento.id) {
        await removeAgendamentoById(agendamento.id)
      }
      buscarAgendamentos()
    }

  return (
    <div className="container">
      <h2>Agendamentos</h2>
      <div className="row row-gap-3 gap-2">
          {
            agendamentos.map(agendamento => (
                <div key={agendamento.id} className="card col" style={{minWidth: '400px', maxWidth: 'auto', margin: '0 auto'}}>
                    <div className="card-body">
                        <h4 className="card-title">{obterDataHoraFormatada(agendamento)}</h4>
                        <p className="card-text">Endereço: {agendamento.imovel.descricao}, {agendamento.imovel.numero} - {agendamento.imovel.estado}</p>
                        <p className="card-text">Usuário: {agendamento.userEmail}</p>
                        <p className="card-text" style={{maxHeight: '50px', minHeight: '50px'}}>Observação: {agendamento.observacao || '-'}</p>
                        <div>
                          <Link className="btn btn-secondary" to={`/imoveis/${agendamento.imovel.id}`}>Ver Imóvel</Link>
                          <button className="btn btn-danger mx-3" onClick={() => removerAgendamento(agendamento)}>Remover</button>
                        </div>
                    </div>
                </div>
            ))
          }
      </div>
    </div>
  );
}

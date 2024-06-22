import { Timestamp, addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "./firebaseConnection"
import { Imovel } from "./imovelService"

//Tipo utilizado para salvar os dados da agenda no banco de dados
export type AgendamentoVisita = {
    id?: string,
    imovelId: string,
    dataAgendamento: Date,
    userEmail: string | null,
    observacao: string
}

//Tipos de retorno das informações do banco de dados
export type AgendamentoVisitaImovel = {
    id?: string,
    imovel: Imovel,
    dataAgendamento: Timestamp,
    userEmail: string | null,
    observacao: string
}

// Método para salvar uma nova agenda
export const addAgendamentoVisita = async (agendamentoVisita: AgendamentoVisita) => {
    const agendamentoVisitaReference = await collection(db, 'agendamento')

    const { id } = await addDoc(agendamentoVisitaReference, {});
    const agendamentoVisitaImovelReference = {
        id: id,
        imovelId: agendamentoVisita.imovelId,
        dataAgendamento: agendamentoVisita.dataAgendamento,
        userEmail: agendamentoVisita.userEmail,
        observacao: agendamentoVisita.observacao
    }

    const document = await setDoc(doc(db, 'agendamento', agendamentoVisitaImovelReference.id), agendamentoVisitaImovelReference)
    return document
}

// Método para obter todas as agendas cadastradas
export const getAgendamentoVisitas = async (): Promise<AgendamentoVisitaImovel[]> => {
    const agendamentoVisitaCollectionRef = collection(db, 'agendamento')
    const imovelCollectionRef = collection(db, 'imovel')
    const agendamentos : AgendamentoVisitaImovel[] = []
    const agendamentosData = await getDocs(agendamentoVisitaCollectionRef)

    for (let agendamento of agendamentosData.docs) {
        const imovel = await getDoc(doc(imovelCollectionRef, agendamento.data().imovelId))
        let agendamentoData = {
            id: agendamento.id,
            imovel: imovel.data(),
            ...agendamento.data()
        } as AgendamentoVisitaImovel

        agendamentos.push(agendamentoData as AgendamentoVisitaImovel)
    }

    return agendamentos
}

// Método para remover uma agenda
export const removeAgendamentoById = async (id: string) => {
    await deleteDoc(doc(db, "agendamento", id));
}
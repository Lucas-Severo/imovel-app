import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "./firebaseConnection"

export type Imovel = {
    id: string,
    cidade: string,
    descricao: string,
    endereco: string,
    estado: string,
    numero: string,
    permiteAluguel: boolean,
    permiteCompra: boolean,
    situacao: string,
    valorAluguel: number,
    valorCompra: number
}

export enum ImovelSituacao {
    EM_ABERTO = 'Em Aberto',
    ALUGADO = 'Alugado',
    VENDIDO = 'Vendido'
}

export const obterValorSituacao = (situacao: string) => {
    if (situacao) {
        const valor = ImovelSituacao[situacao as keyof typeof ImovelSituacao]
        return valor
    }
}

export const addImovel = async (imovel: Imovel) => {
    const imoveisCollectionRef = collection(db, 'imovel')
    const { id } = await addDoc(imoveisCollectionRef, {});
    imovel.id = id

    const document = await setDoc(doc(db, 'imovel', imovel.id), imovel)
    return document
}

export const updateImovel = async (imovel: Imovel) => {
    const document = await setDoc(doc(db, 'imovel', imovel.id), imovel)
    return document
}

export const alugarImovel = async (imovel: Imovel) => {
    imovel.situacao = 'ALUGADO'
    const document = await setDoc(doc(db, 'imovel', imovel.id), imovel)
    return document
}

export const comprarImovel = async (imovel: Imovel) => {
    imovel.situacao = 'VENDIDO'
    const document = await setDoc(doc(db, 'imovel', imovel.id), imovel)
    return document
}

export const liberarAluguelImovel = async (imovel: Imovel) => {
    imovel.situacao = 'EM_ABERTO'
    const document = await setDoc(doc(db, 'imovel', imovel.id), imovel)
    return document
}

export const getImoveis = async (): Promise<Imovel[]> => {
    const imoveisCollectionRef = collection(db, 'imovel')
    const imoveis : Imovel[] = []

    const imoveisData = await getDocs(imoveisCollectionRef)

    for (let imovel of imoveisData.docs) {
        imoveis.push({id: imovel.id, ...imovel.data()} as Imovel)
    }

    return imoveis
}


export const getImovelById = async (id: string): Promise<Imovel> => {
    const usersCollectionRef = collection(db, 'imovel')

    const imovel = await getDoc(doc(usersCollectionRef, id))

    return {id: imovel.id, ...imovel.data()} as Imovel
}

export const removeImovelById = async (id: string) => {
    await deleteDoc(doc(db, "imovel", id));
}
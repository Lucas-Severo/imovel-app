import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Imovel, alugarImovel } from '../../services/imovelService';


export function ModalAlugar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { id } = useParams<{ id?: string }>();
    const [imovel, setImovel] = useState<Imovel>()

    useEffect(() => {
        setImovel(location.state)
    }, [])

    // retorna para a rota de detalhes do imóvel
    const handleClose = () => {
        navigate(`/imoveis/${id}`)
    }

    // chama o método para atualizar a situação do imóvel para alugado
    const handleSave = async () => {
        if (imovel) {
            await alugarImovel(imovel)
        }
        handleClose()
    }

    return (
        <>
        <Modal 
            centered show={true} 
            keyboard={false}>
            <Modal.Header closeButton onHide={handleClose}>
            <Modal.Title>Alugar Imóvel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h5>Você deseja alugar este imóvel?</h5>
                    <p>Valor: R$ {imovel?.valorAluguel}/mês</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancelar
            </Button>
            <Button variant="success" onClick={handleSave}>
                Alugar Imóvel
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
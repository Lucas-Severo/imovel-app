import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { AgendamentoVisita, addAgendamentoVisita } from '../../services/agendamentoService';
import { UserContext } from '../../context/UserContext';
import { FloatingLabel, Form } from 'react-bootstrap';


export function ModalAgendamento() {
    const navigate = useNavigate()
    const { id } = useParams<{ id?: string }>();
    const {state} = useContext(UserContext)
    const [dateTime, setDateTime] = useState(new Date())
    const [observacao, setObservacao] = useState('')

    // redireciona de volta para a página de detalhes do imóvel
    const handleClose = () => {
        navigate(`/imoveis/${id}`)
    }

    // salva um novo agendamento e vincula ao usuário autenticado na sessão
    const handleSave = async () => {
        if (id && state.currentUser) {
            const agendamentoVisita: AgendamentoVisita = {
                imovelId: id,
                dataAgendamento: dateTime,
                userEmail: state.currentUser?.email,
                observacao: observacao
            }

            await addAgendamentoVisita(agendamentoVisita)

            handleClose()
        }
    }

    // formata a data que foi cadastrada no agendamento
    function obterDataPadrao() {
        return toLocalISOString(dateTime)
    }

    function toLocalISOString(date: any) {
        const localDate = new Date(date - date.getTimezoneOffset() * 60000);
        
        localDate.setSeconds(0);
        localDate.setMilliseconds(0);
        return localDate.toISOString().slice(0, -1);
    }

    return (
        <>
        <Modal 
            centered show={true} 
            keyboard={false}
            id="modal-agendamento">
            <Modal.Header closeButton onHide={handleClose}>
            <Modal.Title>Agendar Visita</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <input aria-label="Date and time" data-testid="input-data" type="datetime-local" value={obterDataPadrao()} onChange={value => setDateTime(new Date(value.target.value))} />
                    <FloatingLabel className='mt-3' controlId="floatingTextarea2" label="Observação">
                        <Form.Control
                        as="textarea"
                        max={10}
                        maxLength={200}
                        placeholder="Leave a comment here"
                        onChange={value => setObservacao(value.target.value)}
                        style={{ height: '100px', resize: 'none' }}
                        />
                    </FloatingLabel>
                </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Fechar
            </Button>
            <Button variant="primary" onClick={handleSave}>
                Salvar Agendamento
            </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
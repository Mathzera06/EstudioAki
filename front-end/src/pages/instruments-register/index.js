// InstrumentRegister.js

import { useState } from 'react';
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form, Alert } from 'react-bootstrap';
import Navigation from '../../components/Navigation';
import { useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-feather'

const Instrument_Register = () => {

  const { estudio_id } = useParams();
  const estudioId = estudio_id.replace(':', '')
  const [instrumentName, setInstrumentName] = useState('');
  const [instrumentDescription, setInstrumentDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onSubmitFunction = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/studios/${estudioId}/instruments`, {
        name: instrumentName,
        description: instrumentDescription,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        }
      })
      .then((res) => {
        setSuccessMsg('Instrumento cadastrado com sucesso');
        // Lógica adicional, se necessário
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg(error.response?.data);
      });
  };

  return (
    <div style={{ background: "#0E243B" }}>
      <Container>
        <Navigation />
        <Row className=" vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 mt-5">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Cadastre seu Equipamento
                  </h2>
                  <form onSubmit={onSubmitFunction}>
                    <Form.Group>
                      <Form.Label className='mb-2 '>Nome do Instrumento</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Digite o nome do instrumento"
                        value={instrumentName}
                        onChange={(e) => setInstrumentName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className='mb-2 mt-2 '>Descrição do Instrumento</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Digite a descrição do instrumento"
                        value={instrumentDescription}
                        onChange={(e) => setInstrumentDescription(e.target.value)}
                      />
                    </Form.Group>
                    {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                    {successMsg && <Alert variant="success">{successMsg}</Alert>}
                    <div className="d-flex justify-content-between">
                      <Button className='mb-2 mt-4' size='sm' onClick={() => window.history.back()}>
                        <ArrowLeft size={18} className="me-1" />Voltar
                      </Button>
                      <Button className='mb-2 mt-4' type="submit">Cadastrar</Button>
                    </div>
                  </form>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Instrument_Register;

// InstrumentRegister.js

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Button, Row, Container, Card, Form, Alert } from 'react-bootstrap';
import Navigation from '../../components/Navigation';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowRightCircle, Check, ChevronRight } from 'react-feather'
import { toast } from 'react-toastify';

const Instrument_Register = () => {

  const { estudio_id } = useParams();
  const estudioId = estudio_id.replace(':', '')
  const [instrumentName, setInstrumentName] = useState('');
  const [studioInstruments, setStudioInstruments] = useState([]);
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
        getStudioInstruments();
        toast.success('Instrumento criado!');
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg(error.response?.data);
      });
  };

  const getStudioInstruments = useCallback(() => {
    axios.get(`http://localhost:5000/studios/${estudioId}/instruments`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      }
    }).then(res => {
      setInstrumentName('');
      setInstrumentDescription('')
      setStudioInstruments(res.data);
    }).catch((error) => {
      console.error(error);
      setErrorMsg(error.response?.data);

    });
  }, [estudioId])

  useEffect(() => {
    getStudioInstruments();
  }, [getStudioInstruments])

  return (
    <div style={{ background: "#0E243B" }}>
      <Container>
        <Navigation />
        <Row className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4 mt-5">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h3 className="fw-bold mb-3 text-center text-uppercase ">
                    Cadastre seu <span className='text-primary'>Equipamento</span>
                  </h3>
                  <div className='text-center my-3'>
                    <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input type="radio" disabled className="btn-check cursor-normal" name="btnradio" id="btnradio1" />
                      <label className="btn btn-sm btn-outline-primary cursor-normal btn-disabled" for="btnradio1">
                        1 - Informações do estúdio
                      </label>

                      <input type="radio" className="btn-check" name="btnradio" id="btnradio2" checked />
                      <label className="btn btn-sm btn-outline-primary" for="btnradio2">
                        2 - Instrumentos
                      </label>
                    </div>
                  </div>
                  <form onSubmit={onSubmitFunction}>
                    <Form.Group>
                      <Form.Label className='mb-2 '>Nome do Instrumento</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Digite o nome do instrumento"
                        value={instrumentName}
                        onChange={(e) => setInstrumentName(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className='mb-2 mt-2 '>Descrição do Instrumento</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        rows={3}
                        placeholder="Estado de conservação, se há detalhes, se possui todos seus componentes..."
                        value={instrumentDescription}
                        onChange={(e) => setInstrumentDescription(e.target.value)}
                      />
                    </Form.Group>
                    {errorMsg && <Alert dismissible onClose={() => setErrorMsg(false)} variant="danger">{errorMsg}</Alert>}
                    {successMsg && <Alert dismissible onClose={() => setSuccessMsg(false)} className='mt-4' variant="success">{successMsg}!</Alert>}

                    <div className="text-right">
                      {!studioInstruments.length ? (
                        <Button className='mb-2 mt-4 bg-success btn-sm' type="submit">
                          Cadastrar Instrumento
                        </Button>
                      ) : (
                        <>
                          <Button className='mb-2 mt-4 bg-success btn-sm me-2' type="submit">
                            Cadastrar Novo Instrumento
                          </Button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
                {studioInstruments.length ? (
                  <div className='h6'>Instrumentos cadastrados:</div>
                ) : null}
                <ul className="list-group">
                  {studioInstruments.map((instrument, key) => (
                    <li key={key} className="list-group-item d-flex justify-content-between align-items-start">
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">{instrument.name}</div>
                        {instrument.description}
                      </div>
                    </li>
                  ))}
                </ul>
                {studioInstruments.length ? (
                  <div className='text-right'>
                    <Link to={`/detalhes-estudio/${estudioId}`}>
                      <Button className='mb-2 mt-4 bg-primary btn-block fw-bold' type="submit">
                        Finalizar Cadastro <Check className='ms-1' />
                      </Button>
                    </Link>
                  </div>
                ) : null}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Instrument_Register;

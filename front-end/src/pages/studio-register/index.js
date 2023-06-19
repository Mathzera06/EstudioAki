import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import Navigation from '../../components/Navigation';

export function Studio_Register() {

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const getErrorMsg = () => {
    if (typeof errorMsg === 'string' || errorMsg instanceof String) return errorMsg;
    return errorMsg.errors;
  }

  const onSubmitFunction = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/studios",
      {
        name: studioName,
        address: address,
        zip_code: zipCode,
        number: number,
        neighbourhood: neighborhood,
        description: description,
      }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      }
    }).then((res) => {
      console.log(res.data);
      setSuccessMsg('Estudio cadastrado com sucesso');
      navigate(`/estudios/:${res.data.id}/cadastrar-instrumentos`);
    }).catch(error => {
      console.error(error);
      setErrorMsg(error.response?.data);
    })
  }

  const [studioName, setStudioName] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');

  return (

    <>
      <div style={{ background: "#0E243B" }}>
        <Container>
          <Navigation />
          <Row className=" vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="px-4 mt-5">
                <Card.Body>
                  <form onSubmit={onSubmitFunction}>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2 text-center text-uppercase ">
                        Cadastre seu Studio
                      </h2>
                      <div className="mb-3">
                        <Form.Label className="mb-2 text-center">
                          Nome do Studio
                        </Form.Label>
                        <Form.Control
                          className="mb-2"
                          type="text"
                          required="true"
                          placeholder="Coloque o nome"
                          value={studioName}
                          onChange={(e) => setStudioName(e.target.value)}
                        />
                        <Form.Group
                          className="mb-3"
                          controlId="nomeDoStudio"
                        >
                          <Form.Label className="mb-1 mt-2 text-center">
                            Endereço
                          </Form.Label>
                          <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="Cidade"
                            value={address}
                            required="true"
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="CEP"
                            required="true"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                          <Form.Control
                            className="mb-3"
                            type="number"
                            placeholder="Numero"
                            required="true"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                          />

                          <Form.Control className="mb-3"
                            type="text"
                            placeholder="Bairro"
                            required="true"
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                          />
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="enderecoStudio"
                        >
                        </Form.Group>
                        <Form.Label className=" mb-3 text-center">
                          Descrição
                        </Form.Label>
                        <textarea className="mb-3 form-control" rows="5"
                          placeholder='Descreva o seu estudio'
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        {errorMsg ? (
                          <Alert variant='danger' className='mx-2'>
                            {getErrorMsg()}
                          </Alert>
                        ) : null}
                        <button type='submit'
                          className="btn btn-lg btn-primary w-100 fs-6"
                          style={{ background: '#546CCF' }} >
                          Cadastrar estúdio
                        </button>
                        <div className="small fst-italic text-center mt-1" style={{ color: 'rgba(0,0,0,0.5)' }}>
                          Em seguida, você será redirecionado p/ adicionar instrumentos ao estúdio
                        </div>
                      </div>
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}


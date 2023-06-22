import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form, Badge, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import Navigation from '../../components/Navigation';
import { ChevronRight } from 'react-feather';
import { toast } from "react-toastify";
import cep from 'cep-promise';

export function Studio_Register() {

  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

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
        state_uf: stateUf,
        city: city,
        hour_price: hourPrice
      }, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
      }
    }).then((res) => {
      toast.success('Estúdio criado com sucesso!');
      navigate(`/estudios/:${res.data.id}/cadastrar-instrumentos`);
    }).catch(error => {
      console.error(error);
      setErrorMsg(error.response?.data);
    })
  }

  const onChangeCEP = (e) => {
    setZipCode(e.target.value);
    if (e.target.value?.length > 7) {
      cep(e.target.value).then(res => {
        console.log('cep response', res);
        setNeighborhood(res.neighborhood || '');
        setCity(res.city);
        setStateUf(res.state);
        setAddress(res.street);
      }).catch(error => {
        console.log(error);
      })
    }
  }

  const [studioName, setStudioName] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [stateUf, setStateUf] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [description, setDescription] = useState('');
  const [hourPrice, setHourPrice] = useState('');

  return (

    <div style={{ background: "#0E243B" }}>
      <Container>
        <Navigation />
        <Row className="d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-sm-4 mt-5">
              <Card.Body>
                <form onSubmit={onSubmitFunction}>
                  <div className="mb-3 mt-md-4">
                    <h3 className="fw-bold mb-2 text-center text-uppercase ">
                      Cadastre seu <span className='text-primary'>Estúdio</span>
                    </h3>
                    <div className='text-center my-3'>
                      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check cursor-normal" name="btnradio" id="btnradio1" autoComplete="off" readOnly checked />
                        <label className="btn btn-sm btn-outline-primary cursor-normal" htmlFor="btnradio1">
                          1 - Informações do estúdio
                        </label>

                        <input type="radio" className="btn-check" disabled name="btnradio" readOnly id="btnradio2" autoComplete="off" />
                        <label className="btn btn-sm btn-outline-primary btn-disabled" htmlFor="btnradio2">
                          2 - Instrumentos
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <Form.Label className="mb-2 text-center fw-bolder">
                        Nome do Studio
                      </Form.Label>
                      <Form.Control
                        className="mb-2"
                        type="text"
                        required={true}
                        placeholder="Coloque o nome"
                        value={studioName}
                        onChange={(e) => setStudioName(e.target.value)}
                      />
                      <Form.Group
                        className="mb-2"
                        controlId="nomeDoStudio"
                      >
                        <h6 className='mb-0 mt-3'>Endereço:</h6>
                        <Row className='mb-2'>
                          <Col className='col-6 col-lg-4'>
                            <Form.Label className="mb-1 mt-2 text-center">
                              CEP
                            </Form.Label>
                            <Form.Group>
                              <Form.Control
                                type="text"
                                placeholder="12345-678"
                                required={true}
                                value={zipCode}
                                maxLength={9}
                                onChange={onChangeCEP}
                              />
                              <a
                                href="https://buscacepinter.correios.com.br/app/endereco/index.php?t"
                                target="_blank"
                                className="p-0 btn btn-link btn-sm"
                                style={{ fontSize: '0.8em' }}
                                rel="noreferrer"
                              >
                                Não sei o meu CEP
                              </a>

                            </Form.Group>
                          </Col>
                          <Col className='col-6 col-lg-4'>
                            <Form.Label className="mb-1 mt-2 text-center">
                              Estado (UF)
                            </Form.Label>
                            <Form.Control
                              className="mb-3"
                              type="text"
                              disabled={true}
                              placeholder="UF"
                              value={stateUf}
                              required={true}
                              onChange={(e) => setStateUf(e.target.value)}
                            />
                          </Col>
                          <Col className='col-6 col-lg-4'>
                            <Form.Label className="mb-1 mt-2 text-center">
                              Cidade
                            </Form.Label>
                            <Form.Control
                              className="mb-3"
                              type="text"
                              disabled={true}
                              placeholder="Nome da Cidade"
                              value={city}
                              required={true}
                              onChange={(e) => setCity(e.target.value)}
                            />
                          </Col>
                          <Col className='col-6 col-lg-4'>
                            <Form.Label className="mb-1 mt-2 text-center">
                              Logradouro
                            </Form.Label>
                            <Form.Control className="mb-3"
                              type="text"
                              placeholder="Rua Exemplo"
                              required={true}
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </Col>
                          <Col className='col-6 col-lg-3'>
                            <Form.Label className="mb-1 mt-2 text-center">
                              Número
                            </Form.Label>
                            <Form.Control
                              className="mb-3"
                              type="number"
                              placeholder="123"
                              required={true}
                              value={number}
                              onChange={(e) => setNumber(e.target.value)}
                            />
                          </Col>
                          <Col>
                            <Form.Label className="mb-1 mt-2 text-center">
                              Bairro
                            </Form.Label>
                            <Form.Control className="mb-3"
                              type="text"
                              disabled={true}
                              placeholder="Nome do bairro"
                              required={true}
                              value={neighborhood}
                              onChange={(e) => setNeighborhood(e.target.value)}
                            />
                          </Col>
                        </Row>
                      </Form.Group>
                      <Form.Label className="fw-bold mb-1 text-center">
                        Descrição
                      </Form.Label>
                      <textarea className="mb-3 form-control" rows="5"
                        placeholder='Descreva o seu estudio, dê detalhes sobre a estrutura, história, localização, acesso e etc. Seja criativo  e faça o seu marketing!'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                      <Row>
                        <Col className='col-6 col-lg-3 mb-2'>
                          <Form.Label className='fw-bold'>
                            Preço por hora
                          </Form.Label>
                          <InputGroup>
                            <InputGroup.Text>R$</InputGroup.Text>
                            <Form.Control
                              type="number"
                              placeholder="100"
                              required={true}
                              value={hourPrice}
                              onChange={(e) => setHourPrice(e.target.value)}
                            />
                          </InputGroup>
                        </Col>
                      </Row>
                      {errorMsg ? (
                        <Alert variant='danger' className='mx-2'>
                          {getErrorMsg()}
                        </Alert>
                      ) : null}
                      <button type='submit'
                        className="btn btn-lg btn-primary w-100 fs-6 d-flex align-items-center justify-content-center"
                        style={{ background: '#546CCF' }} >
                        Cadastrar estúdio <ChevronRight className='ms-1' />
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
  )
}


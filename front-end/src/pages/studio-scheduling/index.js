import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';
import { Calendar } from 'primereact/calendar';





export function StudioSchedule() {
    const [date, setDate] = useState('');
  
  
  return (

    <> 
    <div style={{ background: "#0E243B" }}>
      <Container>
        <Navigation />
        <Row className=" vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={10} xs={12}>
            <Card className="px-4 mt-5">
              <Card.Body>
                <form >
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                      Agenda de Disponibilidade 
                    </h2>
                    <div className="mb-3">
                      <Form>
                        <Form.Label className="mb-3 text-center">
                          Horario de funcionamento em dias uteis:
                        </Form.Label>
                        <div className="d-flex justify-content-between">
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Abre as:"
                        />
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Fecha as:"
                        />
                        </div>
                        <Form.Label className="mb-3 text-center">
                          Horario de funcionamento em Sabados,Domingos e feriados:
                        </Form.Label>
                        <div className="d-flex justify-content-between">
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Abre as:"
                        />
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Fecha as:"
                        />
                        </div>
                      </Form>
                      <Form.Label className="mb-3 text-center">
                          Selecione uma data 
                        </Form.Label>
                         <Calendar value={date} onChange={(e) => setDate(e.value)} showIcon
                            inputClassName='form-control form-control-lg bg-light fs-6 w-100 ' 
                            className='w-100 mb-3' />
                            <Form.Label className="mb-3 text-center">
                          Horario ja marcado:
                        </Form.Label>
                     <div className="d-flex justify-content-between">
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Das:"
                        />
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Ate as:"
                        />
                        </div>       
                       
                     <div className="d-flex justify-content-between">
                          <button
                            type='submit'
                            className="btn btn-lg btn-primary fs-6"
                            style={{ background: '#546CCF' }}
                          >
                            Salvar Alterações
                          </button>
                          <button
                            type='submit'
                            className="btn btn-lg btn-primary fs-6"
                            style={{ background: '#546CCF' }}
                          >
                            Alterar Senha
                          </button>
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


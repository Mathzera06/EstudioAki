import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Alert } from 'react-bootstrap';
import Navigation from '../../components/Navigation';
import { Lock } from 'react-feather';

export function UserProfile() {
  return (
    <>
      <div style={{ background: "#0E243B" }}>
        <Container>
          <Navigation />
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="px-4 mt-5">
                <Card.Body>
                  <form>
                    <div className="mb-3 mt-md-4">
                      <h2 className="fw-bold mb-2 text-center text-uppercase">
                        Minha Conta
                      </h2>
                      <div className="mb-3">
                        <Form>
                          <Form.Label className="mb-3 text-center">
                            Nome
                          </Form.Label>
                          <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="Coloque o nome"
                          />
                          <Form.Label className="mb-3 text-center">
                            Sobrenome
                          </Form.Label>
                          <Form.Control
                            className="mb-3"
                            type="text"
                            placeholder="Coloque o nome"
                          />
                          <Form.Group className="mb-3" controlId="nomeDoStudio">

                          </Form.Group>
                        </Form>
                        <Form.Label className="mb-3 text-center">
                          E-Mail
                        </Form.Label>
                        <Form.Control
                          className="mb-3"
                          type="text"
                          placeholder="Coloque o nome"
                        />
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
                            Alterar Senha <Lock />
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

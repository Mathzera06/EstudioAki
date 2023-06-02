import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from '../../components/Navigation';
import { Container, Col, Row, Form, Button, Card } from 'react-bootstrap';
import { Lock } from 'react-feather';

export function UserProfile() {

  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("")

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {

    try {
      const response = await axios.get(`http://localhost:9000/my-account`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        }
      });
      const { first_name, last_name, email,phone} = response.data;
      setFirstName(first_name)
      setLastName(last_name);
      setEmail(email);
      setPhone(phone)
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserData = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:9000/my-account`, {
        first_name,
        last_name,
        email,
        phone
      }, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        }
      });
      console.log(response.data);
      // Handle success message or further actions
    } catch (error) {
      console.error(error);
      // Handle error message or further actions
    }
  };

  const formatPhone = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length === 11) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7)}`;
    }
    return value;
  };
  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhone(e.target.value);
    setPhone(formattedPhone);
  };

  return (
    <>
      <div style={{ background: "#0E243B" }}>
        <Container>
          <Navigation />
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="px-4 mt-5">
                <Card.Body>
                  <div className="px-4 mt-5">
                    <h2 className="fw-bold mb-2 text-center text-uppercase">
                      Minha Conta
                    </h2>
                    <div className="mb-3">
                      <Form onSubmit={updateUserData}>
                        <Form.Label className="mb-3 text-center">
                          Nome
                        </Form.Label>
                        <Form.Control
                          className="custom-form-control mb-3"
                          type="text"
                          placeholder="Coloque o nome"
                          value={first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Form.Label className="mb-3 text-center">
                          Sobrenome
                        </Form.Label>
                        <Form.Control
                          className="custom-form-control mb-3"
                          type="text"
                          placeholder="Coloque o sobrenome"
                          value={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <Form.Group className="mb-3" controlId="telefoneStudio">
                            <Form.Label className="mb-3 text-center">Telefone</Form.Label>
                            <Form.Control
                              className="mb-3"
                              type="text"
                              placeholder="Telefone"
                              value={phone}
                              onChange={handlePhoneChange}
                            />
                          </Form.Group>
                        <Form.Group className="mb-3" controlId="nomeDoStudio">
                          {/* Conteúdo do Form.Group */}
                        </Form.Group>
                        <Form.Label className="mb-3 text-center">
                          E-Mail
                        </Form.Label>
                        <Form.Control
                          className="custom-form-control mb-3"
                          type="text"
                          placeholder="Coloque o email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="d-flex justify-content-between">
                          <Button
                            type="submit"
                            className="btn btn-lg btn-primary fs-6"
                            style={{ background: '#546CCF' }}
                          >
                            Salvar Alterações
                          </Button>
                          <Button
                            type="submit"
                            className="btn btn-lg btn-primary fs-6"
                            style={{ background: '#546CCF' }}
                          >
                            Alterar Senha <Lock />
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

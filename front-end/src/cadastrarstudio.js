
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';

export function Cadastro() {
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="px-4">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center text-uppercase ">
                    Cadastre seu Studio
                  </h2>
                  <div className="mb-3">
                    <Form>
                      <Form.Label className="mb-3 text-center">
                        Nome do Studio
                      </Form.Label>
                      <Form.Control
                      className="mb-3"
                        type="text"
                        placeholder="Coloque o nome"
                      />

                      <Form.Label className=" mb-3 text-center">
                        Descrição
                      </Form.Label>
                      <Form.Control
                      className="mb-3"
                        type="text"
                        placeholder="Descreva o seu studio"
                      />

                      <Form.Group
                        className="mb-3"
                        controlId="nomeDoStudio"
                      >
                        <Form.Label className="mb-3 text-center">
                          Endereço
                        </Form.Label>
                        <Form.Control
                        className="mb-3"
                          type="text"
                          placeholder="Cidade"
                        />

                        <Form.Control
                        className="mb-3"
                          type="text"
                          placeholder="CEP"
                        />


                        <Form.Control
                        className="mb-3"
                          type="text"
                          placeholder="Numero"
                        />

                        <Form.Control className="mb-3"
                          type="text"
                          placeholder="Bairro"
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="enderecoStudio"
                      >

                      </Form.Group>

                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}



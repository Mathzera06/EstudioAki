import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Card } from 'react-bootstrap';
import React from 'react';
import Navigation from '../../components/Navigation';
import { capitalizeFirstLetter } from '../../helpers/general'

export function StudioSchedule() {

  const getMonthOptions = () => {
    const months = [
      "janeiro",
      "fevereiro",
      "março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro"
    ];
    return months.map((month, index) => (
      <option value={index}>{capitalizeFirstLetter(month)}</option>
    ))
  }

  return (
    <>
      <div style={{ background: "#0E243B" }}>
        <Container>
          <Navigation />
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={10} xs={12}>
              <Card className="px-4 mt-5">
                <Card.Body>
                  <form >
                    <div className="mb-3 mt-md-4">
                      <div className="h3 fw-bold mb-4 text-center text-uppercase ">
                        Adicionar nova agenda de disponibilidade
                      </div>
                      <div class="row">
                        <div class="col">
                          <input type="text" class="form-control" placeholder="First name" aria-label="First name" />
                        </div>
                        <div class="col">
                          <input type="text" class="form-control" placeholder="Last name" aria-label="Last name" />
                        </div>
                      </div>
                      {/* <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                      </div> */}
                      {/* <div class="row mb-3">
                        <label htmlFor="inputEmail3" class="col-sm-4 col-lg-3 col-form-label">Selecionar mês</label>
                        <div class="col-sm-8 col-lg-3">
                          <select class="form-select" id='month' aria-label="Select month">
                            {getMonthOptions()}
                          </select>
                        </div>
                      </div> */}
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


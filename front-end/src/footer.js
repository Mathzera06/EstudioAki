import React, { Component } from 'react';
// import Banner from './componentes/imgs/studio.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './footer.css';
import Container from 'react-bootstrap/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

export function Footer() {
    return (
        <footer className="footer fixed-bottom">
        <Container>
          <Row>
            <Col md={4} className="text-center" style={{ color: "#ffffff" }}>
              <h5>Contato</h5>
              <p>Telefone: (11) 96542-6379</p>
            </Col>
            <Col md={4} className="text-center" style={{ color: "#ffffff" }}>
              <h5  >Links Úteis</h5>
              <ul className="list-unstyled">
                <li><a href="#" style={{ color: "#ffffff" }}>Sobre Nós</a></li>

              </ul>
            </Col>
            <Col md={4} className="text-center" style={{ color: "#ffffff" }}>
              <h5>Siga-nos</h5>
              <div className="social-icons" >
              <a href="https://www.instagram.com/munir_ale/"><FontAwesomeIcon icon={faInstagram} style={{ color: "#ffffff" }}/></a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
          );
        };
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row, Container, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import { capitalizeFirstLetter } from '../../helpers/general'
import { Calendar } from 'primereact/calendar';
import './style.css'

export function StudioSchedule() {
  const [date, setDate] = useState('');

  useEffect(() => {
    document.body.classList.add('body-primary');

    return () => {
      document.body.classList.remove('body-primary');
    }
  }, [])

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

  const getRentalDurationOptions = () => {
    let options = [];
    for (let i = 1; i < 25; i++) {
      options.push(<option value={i}>{i + (i > 1 ? ' horas' : ' hora')}</option>);
    }
    return options;
  }

  return (
    <>
      <div>
        <Container>
          <Navigation />
          <Card className="px-4 mx-auto" style={{ maxWidth: '1100px', marginTop: '100px' }}>
            <Card.Body>
              <form className="my-3 mx-auto" style={{ maxWidth: '700px' }}>
                <div className="h3 fw-bold mb-4 text-center text-uppercase ">
                  Nova agenda para o estúdio: <span className='text-primary'>NOME-Estudio</span>
                </div>
                <div class="row">
                  <div class="col-12 col-sm-6">
                    <label htmlFor="month" class="form-label">Selecionar Estúdio</label>
                    <select class="form-select" id='month' aria-label="Select month">
                      {getMonthOptions()}
                    </select>
                  </div>
                  <div class="col-12 col-sm-6">
                    <label htmlFor="month" class="form-label">Selecionar mês</label>
                    <select class="form-select" id='month' aria-label="Select month">
                      {getMonthOptions()}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div class="col-12 col-sm-6">
                    <label htmlFor="month" class="form-label">Tempo de alocação mínimo</label>
                    <select class="form-select" id='month' aria-label="Select month">
                      {getRentalDurationOptions()}
                    </select>
                  </div>
                  <div class="col-12 col-sm-6">
                    <label htmlFor="month" class="form-label">Horário disponível p/ alocação</label>
                    <div class="input-group mb-3">
                      <input type="text" class="form-control" placeholder="8:00" aria-label="Username" />
                      <span class="input-group-text">às</span>
                      <input type="text" class="form-control" placeholder="20:00" aria-label="Server" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <Calendar
                      value={date}
                      onChange={(e) => setDate(e.value)}
                      dateFormat={'dd/mm/yy'}
                      inline
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-end">
                    <button className="btn btn-outline-primary me-2">Cancelar</button>
                    <button className="btn btn-primary">Salvar</button>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  )
}


import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import { Formik } from 'formik';
import './style.css'
import CalendarInput from './calendar';
import axios from 'axios';
import { getUserAccessToken } from '../../helpers/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';

export function StudioSchedule() {
  const [studio, setStudio] = useState(null);
  const { estudio_id } = useParams();
  const navigate = useNavigate();
  const estudioId = estudio_id.replace(':', '');

  useEffect(() => {
    document.body.classList.add('body-primary');
    return () => {
      document.body.classList.remove('body-primary');
    }
  }, [])

  const getRentalDurationOptions = () => {
    let options = [];
    for (let i = 1; i < 25; i++) {
      options.push(<option key={i} value={i}>{i + (i > 1 ? ' horas' : ' hora')}</option>);
    }
    return options;
  }

  const getAvailableHourOptions = (selectedHour) => {
    let options = [];
    for (let i = 0; i < 24; i++) {
      options.push(
        <option key={i} value={i} selected={i === selectedHour}>
          {(i < 10 ? '0' : '') + i + (':00')}
        </option>
      );
    }
    return options;
  }

  const onSubmit = (values) => {
    axios.post(
      `http://localhost:8000/studios/${estudioId}/schedules`,
      values, {
      headers: {
        Authorization: `Bearer ${getUserAccessToken()}`
      }
    }).then(res => {
      navigate(`/detalhes-estudio/${estudioId}`);
      // apenas redirecionar p/ visualizacao de detalhes do estudio
      // talvez, se sobrar tempo, adicionar um toast
    }).catch(error => {
      // apresentar erro c/ alert
    })
  }

  const initialValues = {
    minRentHours: 1,
    availableFrom: 0,
    availableTo: 23,
    dates: []
  }

  const fetchStudio = () => {
    axios.get(`http://localhost:5000/studios/${estudioId}`).then(res => {
      setStudio(res.data);
    }).catch(error => {
      // apresentar erro c/ alert
    })
  }

  useEffect(() => {
    fetchStudio();
  }, [])

  return (
    <>
      <Navigation />
      <Container>
        <Card className="px-4 mx-auto" style={{ maxWidth: '1100px', marginTop: '100px' }}>
          <Card.Title className='mb-0 pt-3'>
            <Button size='sm' onClick={() => window.history.back()}>
              <ArrowLeft size={18} className="me-1" />Voltar
            </Button>
          </Card.Title>
          <Card.Body>
            {!studio ? (
              <div className='h3 text-center'>
                Carregando Studio... <Spinner className='ms-2' size='md'/>
              </div>
            ) : (
              <Formik
                onSubmit={onSubmit}
                initialValues={initialValues}
              >
                {({ setFieldValue, values, handleSubmit }) => (
                  <form onSubmit={handleSubmit} className="my-3 mx-auto" style={{ maxWidth: '700px' }}>
                    <div className="h3 fw-bold mb-4 text-center text-uppercase ">
                      Nova agenda para o estúdio: <span className='text-primary'>{studio.name}</span>
                    </div>
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <label htmlFor="month" className="form-label">Tempo de alocação mínimo</label>
                        <select
                          className="form-select"
                          id='month'
                          aria-label="Minimum rent hours"
                          onChange={e => setFieldValue('minRentHours', e.target.value)}
                        >
                          {getRentalDurationOptions()}
                        </select>
                      </div>
                      <div className="col-12 col-sm-6">
                        <label htmlFor="month" className="form-label">Horário disponível p/ alocação</label>
                        <div className="input-group mb-3">
                          <select
                            className="form-select"
                            aria-label="Available from"
                            onChange={e => setFieldValue('availableFrom', e.target.value)}
                          >
                            {getAvailableHourOptions()}
                          </select>
                          <span className="input-group-text">às</span>
                          <select
                            className="form-select"
                            aria-label="Available to"
                            onChange={e => setFieldValue('availableTo', e.target.value)}
                          >
                            {getAvailableHourOptions(values.availableTo)}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <CalendarInput />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col text-center text-dark">
                        Selecione os dias para criar os horários disponíveis
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-end">
                        <button className="btn btn-primary" type='submit'>Salvar Novos Horários</button>
                      </div>
                    </div>
                  </form>
                )}
              </Formik>
            )}
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}


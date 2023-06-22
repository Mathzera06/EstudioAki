import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Badge, Button, Card, Container } from 'react-bootstrap'
import Navigation from "../../components/Navigation";
import { ArrowDown, ArrowLeft, ArrowRight, Calendar, ChevronDown, PlusCircle, Trash } from "react-feather";
import './style.css'
import { getUserAccessToken, getUserData } from "../../helpers/auth";
import Reservations from "./reservations";
import { toast } from "react-toastify";

export function StudioDetails({ match }) {
  const { id } = useParams();
  const estudioId = id.replace(':', '');
  const [studio, setStudio] = useState(null);
  const [schedules, setSchedules] = useState(null);
  const [instruments, setInstruments] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const user = getUserData();

  useEffect(() => {
    document.body.classList.add('body-primary');

    return () => {
      document.body.classList.remove('body-primary');
    }
  }, [])

  const fetchStudioDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/studios/${estudioId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setStudio(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchReservations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/studios/${estudioId}/reservations?all=${getUserData()?.id === studio.user_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getUserAccessToken()}`
          },
        }
      );
      setReservations(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchStudioInstruments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/studios/${estudioId}/instruments`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      setInstruments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const fetchStudioSchedule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/studios/${estudioId}/schedules`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getUserAccessToken()}`
          },
          params: {
            user_id: getUserData()?.id
          }
        }
      );
      setSchedules(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (studio) {
      fetchReservations();
    }
  }, [studio])

  useEffect(() => {
    fetchStudioDetails();
    fetchStudioInstruments();
    fetchStudioSchedule();
  }, []);

  const handleScheduleClick = (schedule) => {
    const isSelected = isScheduleSelected(schedule);

    if (isSelected) {
      const updatedSchedules = selectedSchedules.filter(
        (selectedSchedule) => selectedSchedule.id !== schedule.id
      );
      setSelectedSchedules(updatedSchedules);
    } else {
      setSelectedSchedules([...selectedSchedules, schedule]);
    }
  };

  const isScheduleSelected = (schedule) => {
    return selectedSchedules.some((selectedSchedule) => selectedSchedule.id === schedule.id);
  };

  const deleteSchedules = () => {
    axios.post(`http://localhost:8000/studios/${estudioId}/schedules/delete_list`, {
      schedule_id_list: selectedSchedules.map(schedule => schedule.id)
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${getUserAccessToken()}`
      },
    }).then(() => {
      toast.success('Horários(s) excluído(s) com sucesso!');
      fetchStudioSchedule();
      setSelectedSchedules([]);
    }).catch(error => {
      toast.error('Erro ao excluir horários(s)')
    })
  }

  const handleReserveClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/studios/${estudioId}/reservations`,
        {
          studio_schedule_ids: selectedSchedules.map(schedule => schedule.id)
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${getUserAccessToken()}`
          },
        }
      );
      toast.success('Reserva solicitada com sucesso!');
      fetchStudioSchedule();
      fetchReservations();
    } catch (error) {
      console.error(error);
    }
  }

  if (!studio || !schedules || !instruments) {
    return (
      <div>Carregando Estudio</div>
    )
  }

  return (
    <>
      <Navigation />
      <Container>
        <Card className="p-4 mx-auto" style={{ maxWidth: '1100px', marginTop: '100px' }}>
          <Card.Title>
            <Button size='sm' onClick={() => window.history.back()} >
              <ArrowLeft size={18} className="me-1" />Voltar à lista
            </Button>
          </Card.Title>
          <Card.Body>
            <div className="h2">
              <span className="fw-normal">Estúdio: </span> {studio.name}
            </div>
            <div>
              Preço p/ hora:<Badge className="ms-2">{parseFloat(studio.hour_price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Badge>
            </div>
            <hr />
            <p>
              <span className="fw-bold">Localização:</span> {studio.address}, {studio.number} {studio.complement} {studio.neighbourhood} - CEP: {studio.zip_code}
            </p>
            <div className="h4 d-flex justify-content-between">
              Instrumentos:
              {studio?.user_id === user.id ? (
                <Link to={`/estudios/:${estudioId}/cadastrar-instrumentos`}>
                  <Button size="sm" variant="success" className="text-white">
                    <PlusCircle className="me-1" size={17} />
                    Adicionar Instrumento
                  </Button>
                </Link>
              ) : null}
            </div>
            {instruments.length ? (
              <ul className="list-group">
                {instruments.map((instrument, key) => (
                  <li key={key} className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div className="fw-bold">{instrument.name}</div>
                      {instrument.description}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h6 fw-normal">Estúdio não possui instrumentos</div>
            )}
            <div className="h4 mt-3 d-flex justify-content-between mb-4">
              Horários disponíveis:
              {studio?.user_id === user.id ?
                <Link to={`/estudios/${estudioId}/cadastrar-agenda`}>
                  <Button size="sm" variant='success' className="text-white">
                    <PlusCircle className="me-1" size={17} />
                    Adicionar novo horário
                  </Button>
                </Link>
                : null}
            </div>
            {schedules.length ? (
              <div className="d-flex flex-wrap">
                {schedules.map((schedule, index) => (
                  <Button
                    disabled={schedule.disabled}
                    key={index}
                    size="sm"
                    style={{ height: '50px' }}
                    className={`m-2 d-flex flex-column flex-vertical justify-content-center align-items-center ${isScheduleSelected(schedule) ? 'btn-schedule-selected' : ''}`}
                    onClick={() => handleScheduleClick(schedule)}
                  >
                    <div>
                      <Calendar size={19} className="me-2" />
                      {(new Date(schedule.date)).toLocaleDateString('pt-BR', { year: '2-digit', day: '2-digit', month: '2-digit' })}
                      <span className="ms-1">{schedule.hour_from}h às {schedule.hour_to}h</span>
                    </div>
                    {schedule.disabled ? (
                      <small>
                        {(schedule.hasAcceptedReservation && schedule.userAlreadyMadeReservation) ? (
                          <Badge className="bg-light text-dark">Já reservado por você</Badge>
                        ) : schedule.hasAcceptedReservation ? (
                          <Badge className="bg-success text-light">Já reservado</Badge>
                        ) : (
                          <Badge className="bg-success text-light">Já solicitado</Badge>
                        )}
                      </small>
                    ) : null}
                  </Button>
                ))}
              </div>
            ) : (
              <div className="h6 fw-normal">Estúdio não possui horários disponíveis</div>
            )}
            {studio?.user_id === user.id && selectedSchedules.length ? (
              <Button
                onClick={() => deleteSchedules()}
                size="sm"
                variant="danger"
                className="d-flex align-items-center justify-content-center mt-3"
              >
                <Badge className="m-0 mt-1 me-1 bg-light text-dark">{selectedSchedules.length}</Badge>
                Excluir horário(s)
                <Trash className="ms-1" size={16} />
              </Button>
            ) : null}
            {studio?.user_id !== user.id ? (
              <>
                <p className="text-dark mt-2">
                  Para solicitar a reserva de um horário, selecione os que desejar e clique em prosseguir
                </p>
                <div className="row">
                  <div className="col text-right">
                    <Button
                      disabled={selectedSchedules.length === 0}
                      onClick={handleReserveClick}
                    >
                      Solicitar Reserva <ArrowRight size={18} />
                    </Button>
                  </div>
                </div>
              </>
            ) : null}
            {reservations?.length ? (
              <Reservations
                reservations={reservations}
                studio={studio}
                fetchReservations={fetchReservations}
                fetchStudioSchedule={fetchStudioSchedule}
              />
            ) : null}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

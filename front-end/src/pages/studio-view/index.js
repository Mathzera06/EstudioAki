import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Card, Container } from 'react-bootstrap'
import Navigation from "../../components/Navigation";
import { ArrowDown, ArrowLeft, ArrowRight, Calendar, ChevronDown, PlusCircle } from "react-feather";
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
          },
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

  const handleReserveClick = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/studios/${estudioId}/reservations`,
        {
          studio_schedule_id: schedules[0]?.id
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
            <Link to={'/meus-estudios'}>
              <Button size='sm'>
                <ArrowLeft size={18} className="me-1" />Voltar à lista
              </Button>
            </Link>
          </Card.Title>
          <Card.Body>
            <div className="h2">
              <span className="fw-normal">Estúdio: </span> {studio.name}
            </div>
            <hr />
            <p>
              <span className="fw-bold">Localização:</span> {studio.address}, {studio.number} {studio.complement} {studio.neighbourhood} - CEP: {studio.zip_code}
            </p>
            <div className="h4 d-flex justify-content-between">
              Instrumentos:
              {studio?.user_id === user.id ? (
                <Button size="sm" variant="success" className="text-white">
                  <PlusCircle className="me-1" size={17} />
                  Adicionar Instrumento
                </Button>
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
                    key={index}
                    size="sm"
                    className={`m-2 d-flex align-items-center ${isScheduleSelected(schedule) ? 'btn-schedule-selected' : ''}`}
                    onClick={() => handleScheduleClick(schedule)}
                  >
                    <Calendar size={19} className="me-2" />
                    {(new Date(schedule.date)).toLocaleDateString('pt-BR', { year: '2-digit', day: '2-digit', month: '2-digit' })}
                    <span className="ms-1">{schedule.hour_from}h às {schedule.hour_to}h</span>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="h6 fw-normal">Estúdio não possui horários disponíveis</div>
            )}
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
              />
            ) : null}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

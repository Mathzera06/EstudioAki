import { Calendar, Check, ChevronDown, Trash, X } from "react-feather"
import { getUserAccessToken, getUserData } from "../../../helpers/auth"
import axios from "axios";
import { toast } from "react-toastify";

const Reservations = ({ reservations, studio, fetchReservations, fetchStudioSchedule }) => {
    const user = getUserData();
    const reservationStatuses = {
        '0': {
            class: 'text-warning',
            text: 'Pendente'
        },
        '1': {
            class: 'text-success',
            text: 'Aceito'
        },
        '-1': {
            class: 'text-danger',
            text: 'Recusado'
        }
    }

    const getSectionTitle = () => {
        if (user.id === studio.user_id) {
            return 'Ver Solicitações de Reservas Feitas';
        }
        return 'Ver Minhas Solicitações de Reservas'
    }

    const deleteReservationRequest = async (reservation) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/studios/${studio.id}/reservations/${reservation.id}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${getUserAccessToken()}`
                    },
                }
            );
            toast.success('Solicitação de reserva excluída c/ sucesso!');
            fetchReservations();
            fetchStudioSchedule();
        } catch (error) {
            console.error(error);
        }
    }

    const acceptReservationRequest = async (reservation) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/studios/${studio.id}/reservations/${reservation.id}/accept`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${getUserAccessToken()}`
                    },
                }
            );
            toast.success('Solicitação de reserva aceita c/ sucesso!');
            fetchReservations();
            fetchStudioSchedule();
        } catch (error) {
            console.error(error);
        }
    }

    const cancelReservationRequest = async (reservation) => {
        try {
            const response = await axios.put(
                `http://localhost:8000/studios/${studio.id}/reservations/${reservation.id}/cancel`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: `Bearer ${getUserAccessToken()}`
                    },
                }
            );
            toast.success('Solicitação de reserva cancelada!');
            fetchReservations();
            fetchStudioSchedule();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="row">
            <div className="col">
                <p>
                    <button className="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                        <ChevronDown /> {getSectionTitle()} <span className="badge ms-2 text-white text-bg-dark">{reservations.length}</span>
                    </button>
                </p>
                <div className="collapse" id="collapseExample">
                    <ul className="list-group">
                        {reservations.map((reservation, index) => (
                            <li className={"list-group-item "} key={index} style={{ maxWidth: '800px' }}>
                                Reserva #{reservation.id} -
                                <Calendar size={17} className="ms-2" /> Data: {(new Date(reservation.studio_schedule.date)).toLocaleDateString('pt-BR', { year: '2-digit', day: '2-digit', month: '2-digit' })} <span className="ms-1">{reservation.studio_schedule.hour_from}h às {reservation.studio_schedule.hour_to}h</span> -
                                Status:
                                <span className={reservationStatuses[reservation.accepted].class + ' ms-1 fw-bold'}>
                                    {reservationStatuses[reservation.accepted].text}
                                </span>
                                <span className="ms-2">
                                    ({reservation?.user?.first_name} - {reservation?.user?.phone})
                                </span>
                                {reservation.user_id === user.id ? (
                                    <button
                                        className="btn btn-danger btn-sm ms-4 me-2"
                                        onClick={() => deleteReservationRequest(reservation)}
                                    >
                                        <Trash size={17} />
                                    </button>
                                ) : null}
                                {user.id === studio.user_id && reservation.accepted === 0 ? (
                                    <span>
                                        <button
                                            className="btn btn-danger btn-sm ms-4 me-2"
                                            onClick={() => cancelReservationRequest(reservation)}
                                        >
                                            <X size={17} />
                                        </button>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => acceptReservationRequest(reservation)}
                                        >
                                            <Check size={17} />
                                        </button>
                                    </span>
                                ) : null}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Reservations
// InstrumentRegister.js

import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const Instrument_Register = ({ studioId }) => {
  const [instrumentName, setInstrumentName] = useState('');
  const [instrumentDescription, setInstrumentDescription] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:5000/studios/${studioId}/instruments`, {
        name: instrumentName,
        description: instrumentDescription,
      },{
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json',
          }
      })
      .then((res) => {
        setSuccessMsg('Instrumento cadastrado com sucesso');
        // Lógica adicional, se necessário
      })
      .catch((error) => {
        console.error(error);
        setErrorMsg(error.response?.data);
      });
  };

  return (
    <div>
      <h2>Cadastrar Instrumento</h2>
      <form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nome do Instrumento</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do instrumento"
            value={instrumentName}
            onChange={(e) => setInstrumentName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Descrição do Instrumento</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Digite a descrição do instrumento"
            value={instrumentDescription}
            onChange={(e) => setInstrumentDescription(e.target.value)}
          />
        </Form.Group>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
        {successMsg && <Alert variant="success">{successMsg}</Alert>}
        <Button type="submit">Cadastrar</Button>
      </form>
    </div>
  );
};

export default Instrument_Register;

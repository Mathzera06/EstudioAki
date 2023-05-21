import React, { useState, useEffect } from "react";
import axios from "axios";

export function StudioList() {
  const [studios, setStudios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudios();
  }, []);

  const fetchStudios = async () => {
    console.log(searchTerm)
    try {
      const response = await axios.get('http://localhost:5000/studios', {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
        params: {
          q: searchTerm // passando o valor de busca como parâmetro
        }
      });
      setStudios(response.data);
      console.log(studios)
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <h1>Lista de Estúdios</h1>
      <div className="row">
        <div className="col-md-6 mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar estúdio"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button onClick={fetchStudios}>Buscar</button>
        </div>
      </div>
      <div className="row">
        {studios.map((studio) => (
          <div key={studio.id} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{studio.name}</h5>
                <p className="card-text">
                  <strong>Endereço:</strong> {studio.address}, {studio.number}, {studio.complement}, {studio.neighbourhood}, {studio.zip_code}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

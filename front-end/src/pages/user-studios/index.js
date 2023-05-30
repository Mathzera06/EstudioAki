import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navigation from '../../components/Navigation';
import { getUserData } from "../../helpers/auth";
import { Book, Info } from "react-feather";
import './style.css'

export function UserStudios() {
  const [studios, setStudios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchStudios();
  }, []);

  const fetchStudios = async () => {
    const { id } = getUserData();

    try {
      const response = await axios.get(`http://localhost:9000/users/${id}/studios`, {
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json',
        },
        params: {
          q: searchTerm.trim()
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
    <div style={{ background: "#0E243B", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="container">
        <Navigation />
        <h1 className="text-center mt-8 text-white">Meus Estúdios</h1>
        <div className="row justify-content-center mb-3">
          <div className="col-md-6 mb-4 d-flex justify-content-center">
            <input
              type="text"
              className="form-control"
              placeholder="Buscar estúdio"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button className="btn btn-primary ml-2" onClick={fetchStudios}>Buscar</button>
          </div>
        </div>
        <div className="row justify-content-center">
          {studios.map((studio) => (
            <div key={studio.id} className="col-md-4">
              <div className="card mb-4">
                <div className="card-header bg-primary">
                  <h5 className="card-title m-0">{studio.name}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Endereço:</strong> {studio.address}, {studio.number},{" "}
                    {studio.complement}, {studio.neighbourhood}, {studio.zip_code}
                  </p>
                  <Link to={`/detalhes-estudio/${studio.id}`} className="me-3">
                    <Info size={14} className="me-1" />Ver detalhes
                  </Link>
                  <Link to={`/detalhes-estudio/${studio.id}`}>
                    <Book size={14} className="me-1" /> Ver agenda
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

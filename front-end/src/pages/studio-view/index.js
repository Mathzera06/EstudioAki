import React, { useState, useEffect } from "react";
import axios from "axios";

export function StudioDetails({ match }) {
  const [studio, setStudio] = useState(null);

  useEffect(() => {
    fetchStudioDetails();
  }, []);

  const fetchStudioDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/studios/${match.params.id}/instruments`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
          },
        }
      );
      setStudio(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Detalhes do Estúdio</h1>
      {studio ? (
        <div>
          <h2>{studio.name}</h2>
          <p>
            <strong>Endereço:</strong> {studio.address}, {studio.number},{" "}
            {studio.complement}, {studio.neighbourhood}, {studio.zip_code}
          </p>
        </div>
      ) : (
        <p>Carregando detalhes do estúdio...</p>
      )}
    </div>
  );
}

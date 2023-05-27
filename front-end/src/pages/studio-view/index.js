import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function StudioDetails({ match }) {

  const {id} = useParams();
  const estudioId = id.replace(':', '')
  const [studio, setStudio] = useState(null);

  useEffect(() => {
    fetchStudioDetails();
  }, []);

  const fetchStudioDetails = async () => {
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
      console.log(response.data)
      setStudio(response.data);
    } catch (error) {
      console.error(error);
    }
  };
 
  if(!studio){
    return(
      <div>Carregando Estudio</div>
    )
  }

  return (
    <div style={{ background: "#0E243B", minHeight: "100vh", display: "flex", alignItems: "center" }}>
    <div className="container">
      <h1 className="text-center mt-8 text-white">Detalhes do estudio</h1>
      <div className="row justify-content-center">
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h3 className="card-title text-center">Localização</h3>
                <h4 className="card-title text-center">{studio.name}</h4>
                <p className="card-text ">
                  Localizaç~~aodasdawd
                </p>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
}

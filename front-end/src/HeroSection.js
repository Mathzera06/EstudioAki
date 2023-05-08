import React from "react";
import { Button } from "./botoes";
import './HeroSection.css'
import Studioimg from "./componentes/imgs/studio.jpg"


export function HeroSection(){
    return(
        <div className="hero-container">
            <img className="studio" src={Studioimg} />
            <h1>Ache o estudio perfeito</h1>
            <p>Esta esperando o que?</p>
            <div className="hero-btns"></div>
                <Button className="btns" buttonStyle='btn--outline'
                buttonSize='btn--large'>
                    Começe a busca!!
                </Button>
                <Button className="btns"
                buttonStyle='btn--primary'
                buttonSize='btn--large'>
                    Veja os estudios!!
                </Button>
        </div>
    )
}
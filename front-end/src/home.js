import React from "react";
import { HeroSection } from "./HeroSection";
import { Navegacao } from "./navegacao";
import {Footer} from "./footer"
import Studioimg from "./componentes/imgs/studio.jpg"
import {Cards} from "./Cards"


export function Home (){
    return(
        <>

        <Navegacao />
        <HeroSection/>
        <Cards/>
        <Footer />
        
        </>
    )
}
import React from 'react'
import { ArrowRight } from 'react-feather'
import './style.css'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <header className="masthead text-center text-white">
            <div className="masthead-content">
                <div className="container px-5">
                    <h1 className="masthead-heading mb-0">
                        Da inspiração à criação
                    </h1>
                    <h2 className="masthead-subheading mt-2 mb-0">alugue o estúdio perfeito agora mesmo</h2>
                    <Link className="btn btn-primary btn-xl rounded-pill mt-5 btn-find-studio" to={'/listar-estudios'}>
                        Encontrar Estúdios <ArrowRight size={30}/>
                    </Link>
                </div>
            </div>
            <div className="bg-circle-1 bg-circle"></div>
            <div className="bg-circle-2 bg-circle"></div>
            <div className="bg-circle-3 bg-circle"></div>
            <div className="bg-circle-4 bg-circle"></div>
        </header>
    )
}

export default Header
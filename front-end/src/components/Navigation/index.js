import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
            <div class="container px-5">
                <a class="navbar-brand" href="#page-top">EstudioAKI</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <Link to={'/login'} className='nav-link'>
                                Entrar
                            </Link>
                        </li>
                        <li class="nav-item bg-dark text-info ms-2">
                            <Link class="nav-link text-white" to="/cadastrar">
                                Criar Conta
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
import React from 'react'
import { Link } from 'react-router-dom'
import logoImage from "../../assets/images/LogoTransparente.png"
import { isLoggedIn, getUserData, logout } from '../../helpers/auth'
import { LogOut, Settings, User } from 'react-feather'

const Navigation = () => {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
            <div class="container px-5">
                <Link to="/" className="navbar-brand">
                    <img src={logoImage} alt="Logo" style={{ width: '150px' }} />
                </Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto">
                        {isLoggedIn() ? (
                            <li className="nav-item">
                                <div class="dropdown">
                                    <button class="btn dropdown-toggle btn-primary d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <User size={20} className='me-2' />
                                        {getUserData()?.first_name}
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li>
                                            <Link className='dropdown-item' to={'/#'}>
                                                <Settings size={20} className='me-2' />
                                                Minha Conta
                                            </Link>
                                        </li>
                                        <li>
                                            <button className='dropdown-item' onClick={logout}>
                                                <LogOut size={20} className='me-2' />
                                                Sair
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        ) : (
                            <>
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
                            </>
                        )}
                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Navigation
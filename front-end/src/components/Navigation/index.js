import React from 'react'
import { Link } from 'react-router-dom'
import logoImage from "../../assets/images/LogoTransparente.png"
import { isLoggedIn, getUserData, logout } from '../../helpers/auth'
import { Home, LogOut, Search, Settings, User, Plus } from 'react-feather'

const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom fixed-top">
            <div className="container px-5">
                <Link to="/" className="navbar-brand">
                    <img src={logoImage} alt="Logo" style={{ width: '150px' }} />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto w-100">
                        <li className="nav-item text-light me-2 mt-3 w-100 d-lg-none">
                            <Link to={'/listar-estudios'} className="btn btn-light text-dark d-flex align-items-center justify-content-center">
                                Procurar Estúdios <Search size={20} className='ms-2' />
                            </Link>
                        </li>
                        <li className="nav-item mt-1 text-light me-2 d-none d-lg-block">
                            <Link to={'/listar-estudios'} className="btn btn-sm btn-light text-dark d-flex align-items-center justify-content-center">
                                Procurar Estúdios <Search size={18} className='ms-2' />
                            </Link>
                        </li>
                        <li className="nav-item text-light me-auto mt-3 w-100 d-lg-none">
                            <Link to={'/criar-estudio'} className="btn btn-secondary text-dark d-flex align-items-center justify-content-center ">
                                Criar Estúdio <Plus size={20} className="ms-2" />
                            </Link>
                        </li>
                        <li className="nav-item mt-1 ms-2 text-light me-auto d-none d-lg-block">
                            <Link to={'/criar-estudio'} className="btn btn-sm btn-secondary text-dark d-flex align-items-center justify-content-center">
                                Criar Estúdio <Plus size={20} className="ms-2" />
                            </Link>
                        </li>
                        {isLoggedIn() ? (
                            <li className="nav-item mt-2 mt-lg-0">
                                <div className="dropdown w-100 ">
                                    <button className="btn w-100 dropdown-toggle btn-primary d-flex align-items-center justify-content-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <User size={20} className='me-2' />
                                        {getUserData()?.first_name}
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className='dropdown-item' to={'/meus-estudios'}>
                                                <Home size={20} className='me-2' />
                                                Meus Estúdios
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className='dropdown-item' to={'/perfil'}>
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
                                <li className="nav-item">
                                    <Link to={'/login'} className='nav-link'>
                                        Entrar
                                    </Link>
                                </li>
                                <li className="nav-item bg-dark text-info ms-2">
                                    <Link className="nav-link text-white" to="/cadastrar">
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
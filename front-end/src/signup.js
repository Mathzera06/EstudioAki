import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import { Navegacao } from './navegacao';
// import Logogoogle from './componentes/imgs/Google.png';
// import stereo from './componentes/imgs/stereo.png'
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "/node_modules/primeflex/primeflex.css";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Alert } from 'react-bootstrap';
import Navigation from './components/Navigation';

export function Signup() {

    const navigate = useNavigate();
    const [errorMsg, setErrorMsg] = useState('');

    const header = <h6>Insira sua senha</h6>;
    const footer = (
        <div>
            <small>A senha deve conter pelo menos 8 caracteres</small>
            <br />
            <small>A senha deve conter pelo menos 1 letra Maiuscula</small>
        </div>
    );

    const onSubmitFunction = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/signup",
            {
                first_name: firstname,
                last_name: lastname,
                email: email,
                password: password
            }
        ).then(res => {
            navigate('/');
        }).catch(error => {
            console.error(error);
            setErrorMsg(error.response?.data);
        })
    }

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
            <Navigation />
            <form onSubmit={onSubmitFunction}  >
                <div style={{ background: "#ee0979" }}>
                    <div className="container d-flex justify-content-center align-items-center min-vh-100">
                        <div className="row border rounded-5 p-3 bg-white shadow box-area">
                            <div
                                className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
                                style={{ background: "#ee0979" }}
                            >
                                <div className="featured-image mb-3">
                                    {/* <img src={stereo} className="img-fluid" style={{ width: "150px" }} alt="featured" /> */}
                                </div>
                                <p
                                    className="text-white fs-2"
                                    style={{ fontFamily: "'Courier New', Courier, monospace", fontWeight: "600" }}
                                >
                                    Entre
                                </p>
                                <small
                                    className="text-white text-wrap text-center"
                                    style={{ width: "17rem", fontFamily: "'Courier New', Courier, monospace" }}
                                >
                                    Encontre o estudio que você quer!!
                                </small>
                            </div>
                            <div className="col-md-6 right-box">
                                <div className="row align-items-center">
                                    <div className="header-text mb-4">
                                        <h2>Cadastre-se!!</h2>
                                        <p>e muito bom ter você aqui.</p>
                                    </div>
                                    {errorMsg ? (
                                        <Alert variant='danger' className='mx-2'>
                                            {errorMsg}
                                        </Alert>
                                    ) : null}
                                    <div className="input-group mb-3">
                                        <input
                                            required
                                            type="text"
                                            className="form-control form-control-lg bg-light fs-6"
                                            placeholder="Nome"
                                            value={firstname}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <input
                                            required
                                            type="text"
                                            className="form-control form-control-lg bg-light fs-6"
                                            placeholder="Sobrenome"
                                            value={lastname}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        required
                                        type="email"
                                        className="form-control form-control-lg bg-light fs-6"
                                        placeholder="Endereço de Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="input-group mb-3">
                                    {/* <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Senha" /> */}
                                    <Password required value={password} header={header} footer={footer} placeholder="Crie uma senha" onChange={(e) => setPassword(e.target.value)}
                                        prompt="Digite uma senha" toggleMask inputClassName='form-control form-control-lg bg-light fs-6 w-100 ' className='w-100' />

                                    {/* <Password  placeholder="Repita a senha" toggleMask /> */}



                                    <div className="input-group mb-3 mt-4">
                                        <button type='submit' className="btn btn-lg btn-primary w-100 fs-6" style={{ background: '#ee0979' }} >Criar</button>
                                    </div>
                                    <div className="input-group mb-2">
                                        <Link to={'/login'} className='btn btn-lg btn-light w-100 fs-6'>
                                            Já possui uma conta? <span className='text-primary'>Faça login</span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}



// // @media screen and (max-width: 1000px) {
//   .form_container{
//     width:45%;
//   }
// }

// @media screen and (max-width: 700px) {
//   .form_container{
//     width:
//   }
// }

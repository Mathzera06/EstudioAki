import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Logogoogle from './componentes/imgs/Google.png';
// import stereo from './componentes/imgs/stereo.png'
import { Password } from 'primereact/password';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import Navigation from './components/Navigation';

export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/login', {
      email: email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    }).then(response => {
      localStorage.setItem('token', response.data.accessToken);
      navigate('/');
    }).catch(error => {
      console.error(error);
      setErrMsg(error.response?.data);
    })
  }

  return (
    <section>
      <Navigation />
      <div style={{ background: "#0E243B" }}>
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
          <div className="row border rounded-5 p-3 bg-white shadow box-area">
            <div
              className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
              style={{ background: "#546CCF" }}
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
                  <h2>Seja Bem-vindo!!</h2>
                  <p>e muito bom ter você aqui.</p>
                </div>
                {errMsg ? (
                  <Alert variant='danger' className='mx-2'>
                    {errMsg}
                  </Alert>
                ) : null}
                <form onSubmit={handleSubmit} >
                  <div className="input-group mb-3">
                    <input htmlFor='username' type="text" className="form-control form-control-lg bg-light fs-6" placeholder="Endereço de Email" id='username'
                      autoComplete='off' onChange={(e) => setEmail(e.target.value)} value={email} required />
                  </div>
                  <div className="input-group mb-1">
                    {/* <input type="password" className="form-control form-control-lg bg-light fs-6" placeholder="Senha" toggleMask /> */}
                    <Password type='password' value={password} id='password' autoComplete='off' required
                      onChange={(e) => setPassword(e.target.value)} feedback={false} placeholder="Senha" toggleMask inputClassName='form-control form-control-lg bg-light fs-6 w-100 ' className='w-100' />
                  </div>
                  <div className="input-group mb-5 d-flex justify-content-between">
                    <div className="form-check">
                      <input type="checkbox" className="form-check-input" id="formCheck" />
                      <label htmlFor="formCheck" className="form-check-label text-secondary">
                        <small>Lembreçe de mim</small>
                      </label>
                    </div>
                    <div className="forgot">
                      <small>
                        <a href="#">Esqueceu a senha?</a>
                      </small>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <button className="btn btn-lg btn-primary w-100 fs-6" style={{ background: '#546CCF' }}>Entrar</button>
                  </div>
                </form>
                <div className="row">
                  <small>
                    Ainda não tem uma conta? 
                    <Link to="/cadastrar" className='ms-2'>
                      Cadastre-se
                    </Link>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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


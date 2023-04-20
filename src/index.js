import { render } from '@testing-library/react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Logosa from './componentes/imgs/Logo.png'
import Banner from './componentes/imgs/studio.jpg'
import './index.css'

class App extends React.Component {

  componentDidMount() {
    // document.body.style.backgroundColor = '#0E243B';
  }



  icones = {

    'Inverno': 'fa-snowman'
  }



  //'#4169E1'

  //   render() {
  //     return (
  //       // <img src={Logosa}/>

  //       <div style={{
  //         margin: 'auto', width: "100%", padding: "35px 0",
  //         alignItems: 'center', justifyContent: "space-between" ,backgroundColor: '#546CCF',
  //         color: 'white', padding: 12, borderRadius: 8
  //       }}>
  //         {/* <img src={Logosa} /> */}
  //         <p className='white-text'>AQUI FICARIAM OS BOTÔES DE NAVEGAÇÃO</p>
  //       </div>

  //     )
  //   }
  // }

  render() {
    return (
      <div className='banner'>
        <div className='navbar'>
          <img src={Logosa} className='logo' />
          <ul>
            <li><a href="#">home</a></li>
            <li><a href="#">ENSAIO</a></li>
            <li><a href="#">Gravação</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#"></a></li>
          </ul>
        </div>

        <div className="content">
          <h1>ENCONTRE SEU STUDIO</h1>
          <p>seja para gravar ou ensaiar,
            <br/> aqui você vai encontrar o studio que esta peocurando</p>
            <div>
              <button type='button'><span> </span> SAIBA MAIS</button>
              <button type='button'><span> </span>VEJA OS STUDIOS</button>
            </div>
          
        </div>

      </div>

    )
  }
}


ReactDOM.render(
  <App />,
  document.querySelector("#root")
)



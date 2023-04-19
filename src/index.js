import { render } from '@testing-library/react';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import barra from './barra';

class App extends React.Component{

  componentDidMount() {
    document.body.style.backgroundColor ='#6495ED';
  }



  icones = {

    'Inverno': 'fa-snowman'
  }


  
//'#4169E1'

render(){
  return(
    
    <div style={{margin: 'auto', width: "inline-block", backgroundColor: 'black',color:'white', padding:12, borderRadius: 8}}> 
     <p className='white-text'>AQUI FICARIAM OS BOTÔES DE NAVEGAÇÃO</p>
    </div>
  
  )
}
}


ReactDOM.render(
  <App />,
  document.querySelector("#root")
)  


